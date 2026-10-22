import 'dart:async';

import 'package:web/web.dart' as web;

String getCurrentNeneUIPath() {
  return '${web.window.location.pathname}'
      '${web.window.location.search}'
      '${web.window.location.hash}';
}

void pushNeneUIUrl(String path) {
  web.window.history.pushState(null, '', path);
}

void replaceNeneUIUrl(String path) {
  web.window.history.replaceState(null, '', path);
}

void listenForBrowserBack(void Function(String path) onBack) {
  web.window.onPopState.listen((_) {
    onBack(getCurrentNeneUIPath());
  });
}
