import 'package:flutter/material.dart';
import 'package:neneui_render/neneui_render.dart';

void main(List<String> args) {
  final appUriArg = args.firstWhere(
    (arg) => arg.startsWith('--appuri='),
    orElse: () => '--appuri=http://localhost:3500',
  );

  final appUri = appUriArg.substring('--appuri='.length);

  final appDebug = args.contains('--appdebug');

  runApp(MyApp(baseUrl: appUri, appDebug: appDebug));
}

class MyApp extends StatelessWidget {
  final String baseUrl;
  final bool appDebug;

  const MyApp({super.key, required this.baseUrl, required this.appDebug});

  @override
  Widget build(BuildContext context) {
    return InitUI.init(
      baseUrl: baseUrl,
      title: 'Nene',
      plugins: const {},
      debugOrb: appDebug,
      debugShowCheckedModeBanner: false,
    );
  }
}
