import "dart:convert";

import "package:http/http.dart" as http;

class NeneRPC {
  final Uri endpoint;
  final http.Client _client;

  int _nextId = 0;

  NeneRPC(String baseUrl)
    : endpoint = Uri.parse(baseUrl),
      _client = http.Client();

  Future<dynamic> call(
    String method, [
    Map<String, dynamic> params = const {},
  ]) async {
    final id = ++_nextId;

    final response = await _client.post(
      endpoint,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'id': id, 'method': method, 'params': params}),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw Exception('RPC HTTP error: ${response.statusCode}');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    if (data.containsKey('error')) {
      throw Exception(data['error']['message']);
    }

    if (data['id'] != id) {
      throw StateError('RPC response ID mismatch');
    }

    return data['result'];
  }

  void dispose() {
    _client.close();
  }
}
