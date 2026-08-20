import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class ColorSchemeParser {
  static ColorScheme parseColorScheme(Map<String, dynamic> colorScheme) {
    return ColorScheme(
      brightness: colorScheme['brightness'] == "light" ? .light : .dark,

      background: ColorParse.parseColor(colorScheme['background']),
      foreground: ColorParse.parseColor(colorScheme['foreground']),

      card: ColorParse.parseColor(colorScheme['card']),
      cardForeground: ColorParse.parseColor(colorScheme['cardForeground']),

      popover: ColorParse.parseColor(colorScheme['popover']),
      popoverForeground: ColorParse.parseColor(
        colorScheme['popoverForeground'],
      ),

      primary: ColorParse.parseColor(colorScheme['primary']),
      primaryForeground: ColorParse.parseColor(
        colorScheme['primaryForeground'],
      ),

      secondary: ColorParse.parseColor(colorScheme['secondary']),
      secondaryForeground: ColorParse.parseColor(
        colorScheme['secondaryForeground'],
      ),

      muted: ColorParse.parseColor(colorScheme['muted']),
      mutedForeground: ColorParse.parseColor(colorScheme['mutedForeground']),

      accent: ColorParse.parseColor(colorScheme['accent']),
      accentForeground: ColorParse.parseColor(colorScheme['accentForeground']),

      destructive: ColorParse.parseColor(colorScheme['destructive']),
      destructiveForeground: ColorParse.parseColor(
        colorScheme['destructiveForeground'],
      ),

      border: ColorParse.parseColor(colorScheme['border']),
      input: ColorParse.parseColor(colorScheme['input']),
      ring: ColorParse.parseColor(colorScheme['ring']),

      chart1: ColorParse.parseColor(colorScheme['chart1']),
      chart2: ColorParse.parseColor(colorScheme['chart2']),
      chart3: ColorParse.parseColor(colorScheme['chart3']),
      chart4: ColorParse.parseColor(colorScheme['chart4']),
      chart5: ColorParse.parseColor(colorScheme['chart5']),
    );
  }
}
