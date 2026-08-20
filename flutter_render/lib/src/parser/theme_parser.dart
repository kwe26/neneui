import 'package:neneui_render/src/parser/color_scheme.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class ThemeParser {
  static Density parseDensity(String data) {
    if (data == "defaultDensity") return .defaultDensity;
    if (data == "compactDensity") return .compactDensity;
    if (data == "reducedDensity") return .reducedDensity;
    if (data == "spaciousDensity") return .spaciousDensity;

    return .defaultDensity;
  }

  static ThemeData parseTheme(Map<String, dynamic> data) {
    return ThemeData(
      colorScheme: ColorSchemeParser.parseColorScheme(data['colorScheme']),
      radius: double.parse(data['radius'].toString()),
      scaling: double.parse(data['scaling'].toString()),
      surfaceOpacity: double.parse(data['surfaceOpacity'].toString()),
      surfaceBlur: double.parse(data['surfaceBlur'].toString()),
      density: parseDensity(data['density']),
    );
  }

  static ThemeData parseThemeDark(Map<String, dynamic> data) {
    return ThemeData.dark(
      colorScheme: ColorSchemeParser.parseColorScheme(data['colorScheme']),
      radius: double.parse(data['radius'].toString()),
      scaling: double.parse(data['scaling'].toString()),
      surfaceOpacity: double.parse(data['surfaceOpacity'].toString()),
      surfaceBlur: double.parse(data['surfaceBlur'].toString()),
      density: parseDensity(data['density']),
    );
  }
}
