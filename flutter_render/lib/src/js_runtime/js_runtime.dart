export 'js_runtime_stub.dart'
    if (dart.library.io) 'js_runtime_native.dart'
    if (dart.library.js_interop) 'js_runtime_web.dart';
