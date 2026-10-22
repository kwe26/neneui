class NeneJsRuntime {
  void evaluate(String code) {
    throw UnsupportedError(
      'JavaScript execution is not supported on this platform.',
    );
  }

  void onMessage(String name, dynamic Function(dynamic args) callback) {
    throw UnsupportedError(
      'JavaScript message handlers are not supported on this platform.',
    );
  }

  void dispose() {}
}
