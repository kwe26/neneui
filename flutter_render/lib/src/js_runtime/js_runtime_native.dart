import 'package:quickjs_engine/quickjs_engine.dart';

class NeneJsRuntime {
  final runtime = getJavascriptRuntime(xhr: true);

  void evaluate(String code) {
    runtime.evaluate(code);
  }

  void onMessage(String name, dynamic Function(dynamic args) callback) {
    runtime.onMessage(name, callback);
  }
}
