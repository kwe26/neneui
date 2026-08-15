import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class CoreParser {
  static String parseVariable(
    dynamic data,
    Map<String, dynamic> idDatabase, {
    String varToForeach = "",
    bool forForeach = false,
    int forIndex = 0,
  }) {
    if (data is! Map) {
      return data?.toString() ?? '';
    }

    final vars = idDatabase['variables'] as Map<String, dynamic>? ?? {};

    String template = data['template']?.toString() ?? '';

    final variables = data['variable']?.toString().split(',') ?? [];

    for (int i = 0; i < variables.length; i++) {
      final key = variables[i].trim();
      dynamic varK;
      if (forForeach || key.contains("for.")) {
        varK = key == "%%"
            ? parseKVariable(vars[varToForeach][forIndex])
            : parseKVariable(
                vars[varToForeach][forIndex][key.replaceFirst("for.", "")],
              );
      } else {
        varK = parseKVariable(vars[key]);
      }

      template = template.replaceAll('%${i + 1}', varK?.toString() ?? '%E');
    }

    return template;
  }

  static dynamic parseKVariable(dynamic varK) {
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

  static PromptMode parsePromptMode(dynamic data) {
    if (data == "popover") return .popover;
    if (data == "dialog") return .dialog;

    return .popover;
  }

  static BoxConstraints parseBoxC(dynamic data) {
    return BoxConstraints(
      minWidth: double.parse(data['minWidth'].toString()),
      minHeight: double.parse(data['minHeight'].toString()),
      maxHeight: double.parse(data['maxHeight'].toString()),
      maxWidth: double.parse(data['maxWidth'].toString()),
    );
  }

  static NavigationBarAlignment parseNavBarAlign(dynamic data) {
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

  static NavigationRailAlignment parseNavRailAlign(dynamic data) {
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

  static FlexFit parseFlexFit(dynamic data) {
    if (data == "loose") return .loose;
    if (data == "tight") return .tight;
    return FlexFit.loose;
  }

  static FlexTableSize parseFlexTableSz(dynamic data) {
    return FlexTableSize(
      flex: double.parse(data['props']['flex'].toString()),
      fit: parseFlexFit(data['props']['fit']),
    );
  }

  static FixedTableSize parseFxTbSz(dynamic data) {
    return FixedTableSize(data['props']['value']);
  }

  static NavigationLabelType parseLbType(dynamic data) {
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

  static NavigationLabelPosition parselabelPos(dynamic data) {
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

  static TextInputType parseIpt(dynamic data) {
    if (data == "text") return .text;
    if (data == "phone") return .phone;
    if (data == "password") return .visiblePassword;
    if (data == "number") return .number;
    if (data == "twitter") return .twitter;

    return .text;
  }

  static Axis parseAxis(String ax) {
    if (ax == "horizontal") return .horizontal;
    return .vertical;
  }

  static Widget parseBcrumb(String crumb) {
    if (crumb == "arrowSeparator") return Breadcrumb.arrowSeparator;

    return Breadcrumb.slashSeparator;
  }

  static AxisAlignmentDirectional parseAxisAlignDirect(String axisAlign) {
    if (axisAlign == "center") return .center;
    if (axisAlign == "end") return .end;
    if (axisAlign == "start") return .start;

    return .start;
  }

  static ChatBubbleType parseChaBubbleType(String bubble) {
    if (bubble == "plain") return .plain;
    if (bubble == "sharpCorner") return .sharpCorner;
    if (bubble == "tail") return .tail;

    return .sharpCorner;
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
