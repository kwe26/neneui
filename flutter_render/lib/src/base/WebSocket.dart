import 'dart:async';
import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';

class NeneWebSocket {
  WebSocketChannel? _channel;
  StreamSubscription<dynamic>? _subscription;

  final StreamController<dynamic> _messages =
      StreamController<dynamic>.broadcast();

  final StreamController<Object> _errors = StreamController<Object>.broadcast();

  bool _disposed = false;

  Stream<dynamic> get messages => _messages.stream;
  Stream<Object> get errors => _errors.stream;

  bool get isConnected => _channel != null && !_disposed;

  Future<void> connect(String url) async {
    if (_disposed) {
      throw StateError('WebSocket has been disposed.');
    }

    if (_channel != null) {
      throw StateError('WebSocket is already connected.');
    }

    final channel = WebSocketChannel.connect(Uri.parse(url));
    _channel = channel;

    try {
      await channel.ready;

      _subscription = channel.stream.listen(
        (message) {
          if (!_disposed) _messages.add(message);
        },
        onError: (Object error, StackTrace stackTrace) {
          if (!_disposed) _errors.add(error);
        },
        onDone: () {
          _channel = null;
        },
      );
    } catch (_) {
      _channel = null;
      await channel.sink.close();
      rethrow;
    }
  }

  void send(dynamic data) {
    final channel = _channel;

    if (_disposed || channel == null) {
      throw StateError('WebSocket is not connected.');
    }

    channel.sink.add(data is String ? data : jsonEncode(data));
  }

  void sendJson(Map<String, dynamic> data) {
    send(jsonEncode(data));
  }

  Future<void> close() async {
    final channel = _channel;
    _channel = null;

    await _subscription?.cancel();
    _subscription = null;

    await channel?.sink.close();
  }

  Future<void> dispose() async {
    if (_disposed) return;
    _disposed = true;

    await close();
    await _messages.close();
    await _errors.close();
  }
}
