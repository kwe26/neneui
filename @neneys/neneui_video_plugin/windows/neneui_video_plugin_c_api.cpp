#include "include/neneui_video_plugin/neneui_video_plugin_c_api.h"

#include <flutter/plugin_registrar_windows.h>

#include "neneui_video_plugin.h"

void NeneuiVideoPluginCApiRegisterWithRegistrar(
    FlutterDesktopPluginRegistrarRef registrar) {
  neneui_video_plugin::NeneuiVideoPlugin::RegisterWithRegistrar(
      flutter::PluginRegistrarManager::GetInstance()
          ->GetRegistrar<flutter::PluginRegistrarWindows>(registrar));
}
