import 'package:quickjs_engine/quickjs_engine.dart';

class NeneJsRuntime {
  final JavascriptRuntime runtime;

  NeneJsRuntime({
    bool forceJavascriptCoreOnAndroid = false,
    bool xhr = true,
    Map<String, dynamic>? extraArgs = const {},
  }) : runtime = getJavascriptRuntime(
         forceJavascriptCoreOnAndroid: forceJavascriptCoreOnAndroid,
         xhr: xhr,
         extraArgs: extraArgs,
       );

  void evaluate(String code) {
    runtime.evaluate(code);
  }

  void onMessage(String name, dynamic Function(dynamic args) callback) {
    runtime.onMessage(name, callback);
  }
}
