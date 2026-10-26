
#include "win32_window.h"

#include <windows.h>
#include <dwmapi.h>
#include <flutter_windows.h>
#include <shellscalingapi.h>

#include <string>

#include "resource.h"

#pragma comment(lib, "Dwmapi.lib")
#pragma comment(lib, "Shcore.lib")

namespace {

#ifndef DWMWA_USE_IMMERSIVE_DARK_MODE
#define DWMWA_USE_IMMERSIVE_DARK_MODE 20
#endif

constexpr wchar_t kWindowClassName[] =
    L"FLUTTER_RUNNER_WIN32_WINDOW";

constexpr wchar_t kGetPreferredBrightnessRegKey[] =
    L"Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize";

constexpr wchar_t kGetPreferredBrightnessRegValue[] =
    L"AppsUseLightTheme";

int g_active_window_count = 0;

int Scale(int value, double scale_factor) {
  return static_cast<int>(value * scale_factor);
}

using EnableNonClientDpiScaling = BOOL(WINAPI*)(HWND);

void EnableFullDpiSupportIfAvailable(HWND hwnd) {
  HMODULE user32_module = GetModuleHandleW(L"user32.dll");
  if (!user32_module) {
    return;
  }

  auto enable_non_client_dpi_scaling =
      reinterpret_cast<EnableNonClientDpiScaling>(
          GetProcAddress(
              user32_module,
              "EnableNonClientDpiScaling"));

  if (enable_non_client_dpi_scaling) {
    enable_non_client_dpi_scaling(hwnd);
  }
}

int GetMetricForDpi(int metric, UINT dpi) {
  using GetSystemMetricsForDpiFn = int(WINAPI*)(int, UINT);

  static const auto get_system_metrics_for_dpi =
      reinterpret_cast<GetSystemMetricsForDpiFn>(
          GetProcAddress(
              GetModuleHandleW(L"user32.dll"),
              "GetSystemMetricsForDpi"));

  if (get_system_metrics_for_dpi) {
    return get_system_metrics_for_dpi(metric, dpi);
  }

  return GetSystemMetrics(metric);
}

class WindowClassRegistrar {
 public:
  static WindowClassRegistrar* GetInstance() {
    static WindowClassRegistrar instance;
    return &instance;
  }

  const wchar_t* GetWindowClass();

  void UnregisterWindowClass();

 private:
  WindowClassRegistrar() = default;

  bool class_registered_ = false;
};

const wchar_t* WindowClassRegistrar::GetWindowClass() {
  if (!class_registered_) {
    WNDCLASSW window_class{};

    window_class.hCursor = LoadCursorW(nullptr, IDC_ARROW);
    window_class.lpszClassName = kWindowClassName;
    window_class.style = CS_HREDRAW | CS_VREDRAW;
    window_class.cbClsExtra = 0;
    window_class.cbWndExtra = 0;
    window_class.hInstance = GetModuleHandleW(nullptr);

    window_class.hIcon = LoadIconW(
        window_class.hInstance,
        MAKEINTRESOURCEW(IDI_APP_ICON));

    window_class.hbrBackground = nullptr;
    window_class.lpszMenuName = nullptr;
    window_class.lpfnWndProc = Win32Window::WndProc;

    if (!RegisterClassW(&window_class)) {
      if (GetLastError() != ERROR_CLASS_ALREADY_EXISTS) {
        return nullptr;
      }
    }

    class_registered_ = true;
  }

  return kWindowClassName;
}

void WindowClassRegistrar::UnregisterWindowClass() {
  if (class_registered_) {
    UnregisterClassW(
        kWindowClassName,
        GetModuleHandleW(nullptr));

    class_registered_ = false;
  }
}

}  // namespace

Win32Window::Win32Window() {
  ++g_active_window_count;
}

Win32Window::~Win32Window() {
  Destroy();

  if (app_icon_big_) {
    DestroyIcon(app_icon_big_);
    app_icon_big_ = nullptr;
  }

  if (app_icon_small_) {
    DestroyIcon(app_icon_small_);
    app_icon_small_ = nullptr;
  }

  --g_active_window_count;

  if (g_active_window_count == 0) {
    WindowClassRegistrar::GetInstance()->UnregisterWindowClass();
  }
}

void Win32Window::SetAppTitle(const std::wstring& title) {
  app_title_ = title;

  if (window_handle_) {
    SetWindowTextW(
        window_handle_,
        app_title_.c_str());
  }
}

void Win32Window::SetAppIcon(
    const std::wstring& icon_path) {
  if (app_icon_big_) {
    DestroyIcon(app_icon_big_);
    app_icon_big_ = nullptr;
  }

  if (app_icon_small_) {
    DestroyIcon(app_icon_small_);
    app_icon_small_ = nullptr;
  }

  if (icon_path.empty()) {
    return;
  }

  UINT dpi = 96;

  if (window_handle_) {
    using GetDpiForWindowFn = UINT(WINAPI*)(HWND);

    static const auto get_dpi_for_window =
        reinterpret_cast<GetDpiForWindowFn>(
            GetProcAddress(
                GetModuleHandleW(L"user32.dll"),
                "GetDpiForWindow"));

    if (get_dpi_for_window) {
      dpi = get_dpi_for_window(window_handle_);
    }
  }

  const int big_width =
      GetMetricForDpi(SM_CXICON, dpi);
  const int big_height =
      GetMetricForDpi(SM_CYICON, dpi);

  const int small_width =
      GetMetricForDpi(SM_CXSMICON, dpi);
  const int small_height =
      GetMetricForDpi(SM_CYSMICON, dpi);

  app_icon_big_ = static_cast<HICON>(
      LoadImageW(
          nullptr,
          icon_path.c_str(),
          IMAGE_ICON,
          big_width,
          big_height,
          LR_LOADFROMFILE));

  app_icon_small_ = static_cast<HICON>(
      LoadImageW(
          nullptr,
          icon_path.c_str(),
          IMAGE_ICON,
          small_width,
          small_height,
          LR_LOADFROMFILE));

  if (!app_icon_big_ && !app_icon_small_) {
    // Keep the executable's default icon if loading failed.
    return;
  }

  if (window_handle_) {
    if (app_icon_big_) {
      SendMessageW(
          window_handle_,
          WM_SETICON,
          ICON_BIG,
          reinterpret_cast<LPARAM>(app_icon_big_));
    }

    if (app_icon_small_) {
      SendMessageW(
          window_handle_,
          WM_SETICON,
          ICON_SMALL,
          reinterpret_cast<LPARAM>(app_icon_small_));
    }
  }
}

bool Win32Window::Create(
    const std::wstring& title,
    const Point& origin,
    const Size& size) {
  Destroy();

  const wchar_t* window_class =
      WindowClassRegistrar::GetInstance()->GetWindowClass();

  if (!window_class) {
    return false;
  }

  const std::wstring& effective_title =
      app_title_.empty() ? title : app_title_;

  const POINT target_point = {
      static_cast<LONG>(origin.x),
      static_cast<LONG>(origin.y)};

  HMONITOR monitor = MonitorFromPoint(
      target_point,
      MONITOR_DEFAULTTONEAREST);

  UINT dpi = FlutterDesktopGetDpiForMonitor(monitor);
  if (dpi == 0) {
    dpi = 96;
  }

  const double scale_factor =
      static_cast<double>(dpi) / 96.0;

  HWND window = CreateWindowExW(
      0,
      window_class,
      effective_title.c_str(),
      WS_OVERLAPPEDWINDOW,
      Scale(origin.x, scale_factor),
      Scale(origin.y, scale_factor),
      Scale(size.width, scale_factor),
      Scale(size.height, scale_factor),
      nullptr,
      nullptr,
      GetModuleHandleW(nullptr),
      this);

  if (!window) {
    return false;
  }

  UpdateTheme(window);

  // Apply per-application icons after the native window exists.
  if (app_icon_big_) {
    SendMessageW(
        window,
        WM_SETICON,
        ICON_BIG,
        reinterpret_cast<LPARAM>(app_icon_big_));
  }

  if (app_icon_small_) {
    SendMessageW(
        window,
        WM_SETICON,
        ICON_SMALL,
        reinterpret_cast<LPARAM>(app_icon_small_));
  }

  return OnCreate();
}

bool Win32Window::Show() {
  if (!window_handle_) {
    return false;
  }

  ShowWindow(window_handle_, SW_SHOWNORMAL);
  return true;
}

// static
LRESULT CALLBACK Win32Window::WndProc(
    HWND const window,
    UINT const message,
    WPARAM const wparam,
    LPARAM const lparam) noexcept {
  if (message == WM_NCCREATE) {
    const auto* create_struct =
        reinterpret_cast<CREATESTRUCTW*>(lparam);

    auto* that = static_cast<Win32Window*>(
        create_struct->lpCreateParams);

    SetWindowLongPtrW(
        window,
        GWLP_USERDATA,
        reinterpret_cast<LONG_PTR>(that));

    that->window_handle_ = window;

    EnableFullDpiSupportIfAvailable(window);
  } else if (Win32Window* that =
                 GetThisFromHandle(window)) {
    return that->MessageHandler(
        window,
        message,
        wparam,
        lparam);
  }

  return DefWindowProcW(
      window,
      message,
      wparam,
      lparam);
}

LRESULT Win32Window::MessageHandler(
    HWND hwnd,
    UINT const message,
    WPARAM const wparam,
    LPARAM const lparam) noexcept {
  switch (message) {
    case WM_DESTROY: {
      window_handle_ = nullptr;

      OnDestroy();

      if (quit_on_close_) {
        PostQuitMessage(0);
      }

      return 0;
    }

    case WM_DPICHANGED: {
      const auto* new_rect =
          reinterpret_cast<RECT*>(lparam);

      SetWindowPos(
          hwnd,
          nullptr,
          new_rect->left,
          new_rect->top,
          new_rect->right - new_rect->left,
          new_rect->bottom - new_rect->top,
          SWP_NOZORDER | SWP_NOACTIVATE);

      return 0;
    }

    case WM_SIZE: {
      if (child_content_ != nullptr) {
        RECT rect = GetClientArea();

        MoveWindow(
            child_content_,
            rect.left,
            rect.top,
            rect.right - rect.left,
            rect.bottom - rect.top,
            TRUE);
      }

      return 0;
    }

    case WM_ACTIVATE: {
      if (child_content_ != nullptr &&
          LOWORD(wparam) != WA_INACTIVE) {
        SetFocus(child_content_);
      }

      break;
    }

    case WM_DWMCOLORIZATIONCOLORCHANGED:
      UpdateTheme(hwnd);
      break;
  }

  return DefWindowProcW(
      hwnd,
      message,
      wparam,
      lparam);
}

void Win32Window::Destroy() {
  if (window_handle_) {
    HWND window = window_handle_;
    DestroyWindow(window);

    // WM_DESTROY normally clears this handle.
    if (window_handle_ == window) {
      window_handle_ = nullptr;
    }
  }
}

Win32Window* Win32Window::GetThisFromHandle(
    HWND const window) noexcept {
  return reinterpret_cast<Win32Window*>(
      GetWindowLongPtrW(window, GWLP_USERDATA));
}

void Win32Window::SetChildContent(HWND content) {
  child_content_ = content;

  if (!content || !window_handle_) {
    return;
  }

  SetParent(content, window_handle_);

  RECT frame = GetClientArea();

  MoveWindow(
      content,
      frame.left,
      frame.top,
      frame.right - frame.left,
      frame.bottom - frame.top,
      TRUE);

  SetFocus(content);
}

RECT Win32Window::GetClientArea() {
  RECT frame{};

  if (window_handle_) {
    GetClientRect(window_handle_, &frame);
  }

  return frame;
}

HWND Win32Window::GetHandle() {
  return window_handle_;
}

void Win32Window::SetQuitOnClose(
    bool quit_on_close) {
  quit_on_close_ = quit_on_close;
}

bool Win32Window::OnCreate() {
  return true;
}

void Win32Window::OnDestroy() {
}

void Win32Window::UpdateTheme(
    HWND const window) {
  DWORD light_mode = 1;
  DWORD light_mode_size = sizeof(light_mode);

  const LSTATUS result = RegGetValueW(
      HKEY_CURRENT_USER,
      kGetPreferredBrightnessRegKey,
      kGetPreferredBrightnessRegValue,
      RRF_RT_REG_DWORD,
      nullptr,
      &light_mode,
      &light_mode_size);

  if (result == ERROR_SUCCESS) {
    const BOOL enable_dark_mode =
        (light_mode == 0) ? TRUE : FALSE;

    DwmSetWindowAttribute(
        window,
        DWMWA_USE_IMMERSIVE_DARK_MODE,
        &enable_dark_mode,
        sizeof(enable_dark_mode));
  }
}
