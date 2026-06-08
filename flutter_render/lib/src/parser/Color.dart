import 'package:shadcn_flutter/shadcn_flutter.dart';

class ColorParse {
  static Color parseColor(String color) {
    try {
      color = color.replaceAll("#", '');

      if (color.length == 6) {
        color = 'FF$color';
      }

      return Color(int.parse(color, radix: 16));
    } catch (error) {
      if (color == "red") return Colors.red;
      if (color == "blue") return Colors.blue;

      return Colors.black;
    }
  }
}
