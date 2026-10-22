import 'dart:async';
import 'dart:convert';
import 'dart:js_interop';
import 'dart:js_interop_unsafe';

@JS()
external JSObject get globalThis;

@JS('eval')
external JSAny? _jsEval(JSString code);

class NeneJsRuntime {
  final Map<String, FutureOr<dynamic> Function(dynamic args)> _handlers = {};

  bool _disposed = false;

  NeneJsRuntime() {
    _installBridge();
  }

  void _installBridge() {
    final sendMessage = ((JSString name, JSString args) {
      return _dispatch(name.toDart, args.toDart).toJS;
    }).toJS;

    final bridge = <String, dynamic>{'sendMessage': sendMessage}.jsify();

    // Keep compatibility with code using neneBridge.sendMessage().
    globalThis['neneBridge'] = bridge;

    // Expose sendMessage globally for existing NeneUI helpers.
    globalThis['sendMessage'] = sendMessage;
  }

  Future<String> _dispatch(String name, String args) async {
    if (_disposed) {
      throw StateError('NeneJsRuntime has been disposed.');
    }

    final handler = _handlers[name];

    if (handler == null) {
      throw StateError('No NeneUI JavaScript handler registered for "$name".');
    }

    final decoded = jsonDecode(args);
    final result = await handler(decoded);

    return jsonEncode(result);
  }

  void evaluate(String code) {
    if (_disposed) {
      throw StateError('NeneJsRuntime has been disposed.');
    }

    _jsEval(code.toJS);
  }

  void onMessage(
    String name,
    FutureOr<dynamic> Function(dynamic args) callback,
  ) {
    if (_disposed) {
      throw StateError('NeneJsRuntime has been disposed.');
    }

    _handlers[name] = callback;
  }

  void dispose() {
    if (_disposed) return;

    _disposed = true;
    _handlers.clear();
    globalThis['neneBridge'] = null;
  }
}
