import 'package:flutter/material.dart';
import 'package:neneui_render/neneui_render.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return InitUI.init(
      baseUrl: "http://localhost:3500",
      title: "Nene",
      debugShowCheckedModeBanner: false,
    );
  }
}
