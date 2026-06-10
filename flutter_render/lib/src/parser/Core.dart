import 'dart:ui';

import 'package:flutter/material.dart';

class CoreParser {
  static String parseVariable(dynamic data, Map<String, dynamic> idDatabase) {
    if (data is! Map) {
      return data?.toString() ?? '';
    }

    final vars = idDatabase['variables'] as Map<String, dynamic>? ?? {};

    String template = data['template']?.toString() ?? '';

    final variables = data['variable']?.toString().split(',') ?? [];

    for (int i = 0; i < variables.length; i++) {
      final key = variables[i].trim();
      var varK = vars[key];

      if (varK is TextEditingController) {
        varK = (vars[key] as TextEditingController).value.text;
      }

      template = template.replaceAll('%${i + 1}', varK?.toString() ?? '%E');
    }

    return template;
  }

  static MainAxisAlignment parseW(String m) {
    switch (m) {
      case 'start':
        return MainAxisAlignment.start;
      case 'center':
        return MainAxisAlignment.center;
      case 'spaceBetween':
        return MainAxisAlignment.spaceBetween;
      case 'spaceAround':
        return MainAxisAlignment.spaceAround;
      case 'spaceEvenly':
        return MainAxisAlignment.spaceEvenly;
      case 'end':
        return MainAxisAlignment.end;
      default:
        return MainAxisAlignment.start;
    }
  }

  static CrossAxisAlignment crossParse(String c) {
    switch (c) {
      case 'start':
        CrossAxisAlignment.start;
      case 'stretch':
        CrossAxisAlignment.stretch;
      case 'end':
        CrossAxisAlignment.end;
      case 'center':
        CrossAxisAlignment.center;
      case 'baseline':
        CrossAxisAlignment.baseline;
      default:
        CrossAxisAlignment.start;
    }
    return CrossAxisAlignment.center;
  }

  static TextAlign parseTx(String tx) {
    switch (tx) {
      case 'start':
        return TextAlign.start;
      case 'center':
        return TextAlign.center;
      case 'end':
        return TextAlign.end;
      case 'justify':
        return TextAlign.justify;
      case 'left':
        return TextAlign.left;
      case 'right':
        return TextAlign.right;
      default:
        return TextAlign.start;
    }
  }

  static EdgeInsets parseEdge(data) {
    return EdgeInsets.fromLTRB(
      double.parse(data['l'].toString()),
      double.parse(data['t'].toString()),
      double.parse(data['r'].toString()),
      double.parse(data['b'].toString()),
    );
  }

  static BoxFit parseBfit(data) {
    if (data == "fill") return BoxFit.fill;
    if (data == "contain") return BoxFit.contain;
    if (data == "cover") return BoxFit.cover;
    if (data == "fitHeight") return BoxFit.fitHeight;
    if (data == "fitWidth") return BoxFit.fitWidth;
    if (data == "none") return BoxFit.none;

    return BoxFit.none;
  }

  static FilterQuality parseFtq(String data) {
    if (data == "low") return FilterQuality.low;
    if (data == "high") return FilterQuality.high;
    if (data == "medium") return FilterQuality.medium;
    if (data == "none") return FilterQuality.none;

    return FilterQuality.none;
  }

  static Alignment parseAlignment(String data) {
    switch (data) {
      case 'bottomCenter':
        return .bottomCenter;
      case 'bottomLeft':
        return .bottomLeft;
      case 'bottomRight':
        return .bottomRight;
      case 'center':
        return .center;
      case 'centerLeft':
        return .centerLeft;
      case 'centerRight':
        return .centerRight;
      case 'topLeft':
        return .topLeft;
      case 'topRight':
        return .topRight;
      default:
        return Alignment.center;
    }
  }

  static TextOverflow parseOvf(String ovf) {
    if (ovf == "visible") return TextOverflow.visible;
    if (ovf == "ellipsis") return TextOverflow.ellipsis;
    if (ovf == "clip") return TextOverflow.clip;
    if (ovf == "fade") return TextOverflow.fade;

    return TextOverflow.visible;
  }
}
