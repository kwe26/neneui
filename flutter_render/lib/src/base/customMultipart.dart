import 'package:http/http.dart' as http;

class ProgressMultipartRequest extends http.MultipartRequest {
  ProgressMultipartRequest(super.method, super.url, {required this.onProgress});

  final void Function(int sentBytes, int totalBytes) onProgress;

  @override
  http.ByteStream finalize() {
    final byteStream = super.finalize();
    final total = contentLength;

    int sent = 0;

    final stream = byteStream.map((chunk) {
      sent += chunk.length;
      onProgress(sent, total);
      return chunk;
    });

    return http.ByteStream(stream);
  }
}
