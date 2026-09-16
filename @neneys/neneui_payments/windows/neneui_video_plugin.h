#ifndef FLUTTER_PLUGIN_NENEUI_VIDEO_PLUGIN_H_
#define FLUTTER_PLUGIN_NENEUI_VIDEO_PLUGIN_H_

#include <flutter/method_channel.h>
#include <flutter/plugin_registrar_windows.h>

#include <memory>

namespace neneui_video_plugin {

class NeneuiVideoPlugin : public flutter::Plugin {
 public:
  static void RegisterWithRegistrar(flutter::PluginRegistrarWindows *registrar);

  NeneuiVideoPlugin();

  virtual ~NeneuiVideoPlugin();

  // Disallow copy and assign.
  NeneuiVideoPlugin(const NeneuiVideoPlugin&) = delete;
  NeneuiVideoPlugin& operator=(const NeneuiVideoPlugin&) = delete;

  // Called when a method is called on this plugin's channel from Dart.
  void HandleMethodCall(
      const flutter::MethodCall<flutter::EncodableValue> &method_call,
      std::unique_ptr<flutter::MethodResult<flutter::EncodableValue>> result);
};

}  // namespace neneui_video_plugin

#endif  // FLUTTER_PLUGIN_NENEUI_VIDEO_PLUGIN_H_
