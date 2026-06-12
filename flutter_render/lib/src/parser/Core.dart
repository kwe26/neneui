import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

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
      var varK = parseKVariable(vars[key]);

      template = template.replaceAll('%${i + 1}', varK?.toString() ?? '%E');
    }

    return template;
  }

  static dynamic parseKVariable(var varK) {
    if (varK is TextEditingController) {
      varK = varK.value.text;
    }

    if (varK is CheckboxState) {
      if (varK == CheckboxState.checked) {
        varK = true;
      } else {
        varK = false;
      }
    }

    if (varK is DateTime) {
      return '${varK.day.toString().padLeft(2, '0')}-${varK.month.toString().padLeft(2, '0')}-${varK.year}';
    }

    return varK;
  }

  static BoxConstraints parseBoxC(var data) {
    return BoxConstraints(
      minWidth: double.parse(data['minWidth'].toString()),
      minHeight: double.parse(data['minHeight'].toString()),
      maxHeight: double.parse(data['maxHeight'].toString()),
      maxWidth: double.parse(data['maxWidth'].toString()),
    );
  }

  static NavigationBarAlignment parseNavBarAlign(var data) {
    switch (data) {
      case 'start':
        return .start;
      case 'center':
        return .center;
      case 'end':
        return .end;
      case 'spaceEvenly':
        return .spaceEvenly;
      case 'spaceBetween':
        return .spaceBetween;
      case 'spaceAround':
        return .spaceAround;
      default:
        return .center;
    }
  }

  static NavigationRailAlignment parseNavRailAlign(var data) {
    switch (data) {
      case 'start':
        return .start;
      case 'center':
        return .center;
      case 'end':
        return .end;
      default:
        return .center;
    }
  }

  static NavigationLabelType parseLbType(var data) {
    switch (data) {
      case 'selected':
        return .selected;
      case 'tootlip':
        return .tooltip;
      case 'all':
        return .all;
      case 'expanded':
        return .expanded;
      case 'none':
        return .none;
      default:
        return .none;
    }
  }

  static NavigationLabelPosition parselabelPos(var data) {
    switch (data) {
      case 'start':
        return .start;
      case 'end':
        return .end;
      case 'top':
        return .top;
      case 'bottom':
        return .bottom;
      default:
        return .start;
    }
  }

  static TextInputType parseIpt(var data) {
    if (data == "text") return .text;
    if (data == "phone") return .phone;
    if (data == "number") return .number;
    if (data == "twitter") return .twitter;

    return .text;
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
