import 'package:flutter/material.dart';

class CoreParser {
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

  static TextOverflow parseOvf(String ovf) {
    if (ovf == "visible") return TextOverflow.visible;
    if (ovf == "ellipsis") return TextOverflow.ellipsis;
    if (ovf == "clip") return TextOverflow.clip;
    if (ovf == "fade") return TextOverflow.fade;

    return TextOverflow.visible;
  }
}
