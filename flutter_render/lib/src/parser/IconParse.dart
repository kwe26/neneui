import 'package:flutter/material.dart';

class IconParser {
  static IconData parseIcon(String name) {
    switch (name) {
      case 'home':
        return Icons.home;
      case 'settings':
        return Icons.settings;
      default:
        return Icons.abc;
    }
  }
}
