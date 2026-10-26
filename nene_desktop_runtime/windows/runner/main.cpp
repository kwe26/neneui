
#include <flutter/dart_project.h>
#include <flutter/flutter_view_controller.h>

#include <windows.h>
#include <shellapi.h>
#include <shobjidl.h>

#include <cstdlib>
#include <string>
#include <utility>
#include <vector>

#include "flutter_window.h"
#include "utils.h"

namespace {

struct AppConfig {
  std::wstring title = L"Nene Desktop Runtime";
  std::wstring icon_path;
  std::wstring app_id = L"Nene.DesktopRuntime";
};

AppConfig ParseAppConfig() {
  AppConfig config;

  int argc = 0;
  LPWSTR* argv = CommandLineToArgvW(
      GetCommandLineW(), &argc);

  if (!argv) {
    return config;
  }

  for (int i = 1; i < argc; ++i) {
    const std::wstring arg = argv[i];

    if (arg == L"--app-title" && i + 1 < argc) {
      config.title = argv[++i];
    } else if (arg == L"--app-icon" && i + 1 < argc) {
      config.icon_path = argv[++i];
    } else if (arg == L"--app-id" && i + 1 < argc) {
      config.app_id = argv[++i];
    }
  }

  LocalFree(argv);
  return config;
}

// Keep runtime-specific options out of the Dart application's arguments.
std::vector<std::string> FilterRuntimeArguments(
    std::vector<std::string> arguments) {
  std::vector<std::string> filtered;
  filtered.reserve(arguments.size());

  for (size_t i = 0; i < arguments.size(); ++i) {
    const std::string& arg = arguments[i];

    if (arg == "--app-title" ||
        arg == "--app-icon" ||
        arg == "--app-id") {
      // Consume the option and its value, if present.
      if (i + 1 < arguments.size()) {
        ++i;
      }
      continue;
    }

    filtered.push_back(arg);
  }

  return filtered;
}

}  // namespace

int APIENTRY wWinMain(
    _In_ HINSTANCE instance,
    _In_opt_ HINSTANCE prev,
    _In_ wchar_t* command_line,
    _In_ int show_command) {

  // Attach to the parent console when available.
  if (!::AttachConsole(ATTACH_PARENT_PROCESS) &&
      ::IsDebuggerPresent()) {
    CreateAndAttachConsole();
  }

  // Initialize COM for Flutter and its plugins.
  const HRESULT com_result =
      ::CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);

  const AppConfig config = ParseAppConfig();

  // Set a distinct Windows taskbar identity before creating any windows.
  const HRESULT app_id_result =
      SetCurrentProcessExplicitAppUserModelID(
          config.app_id.c_str());

  if (FAILED(app_id_result)) {
    OutputDebugStringW(
        L"Nene Runtime: failed to set AppUserModelID.\n");
  }

  flutter::DartProject project(L"data");

  std::vector<std::string> dart_arguments =
      GetCommandLineArguments();

  dart_arguments =
      FilterRuntimeArguments(std::move(dart_arguments));

  project.set_dart_entrypoint_arguments(
      std::move(dart_arguments));

  FlutterWindow window(project);

  // Preserve the existing default window dimensions.
  Win32Window::Point origin(10, 10);
  Win32Window::Size size(1280, 720);

  // Configure the native window before creating it.
  window.SetAppTitle(config.title);
  window.SetAppIcon(config.icon_path);

  if (!window.Create(config.title, origin, size)) {
    if (SUCCEEDED(com_result)) {
      ::CoUninitialize();
    }
    return EXIT_FAILURE;
  }

  window.SetQuitOnClose(true);

  ::MSG msg;
  while (::GetMessage(&msg, nullptr, 0, 0) > 0) {
    ::TranslateMessage(&msg);
    ::DispatchMessage(&msg);
  }

  if (SUCCEEDED(com_result)) {
    ::CoUninitialize();
  }

  return EXIT_SUCCESS;
}
