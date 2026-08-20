import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dTextstyle {
  static FontWeight fw(String w) {
    switch (w) {
      case 'bold':
        return FontWeight.bold;
      case 'w100':
        return FontWeight.w100;
      case 'w200':
        return FontWeight.w200;
      case 'w300':
        return FontWeight.w300;
      case 'w400':
        return FontWeight.w400;
      case 'w500':
        return FontWeight.w300;
      default:
        return FontWeight.normal;
    }
  }

  static TextDecoration textDParse(String pw) {
    if (pw == "none") return TextDecoration.none;
    if (pw == "lineThrough") return TextDecoration.lineThrough;
    if (pw == "overline") return TextDecoration.overline;
    if (pw == "underline") return TextDecoration.underline;

    return TextDecoration.none;
  }

  static FontStyle fst(String fst) {
    if (fst == "normal") return FontStyle.normal;
    if (fst == "italic") return FontStyle.italic;

    return FontStyle.italic;
  }

  static TextStyle run(
    Map<String, dynamic> data,
    BuildContext context,
    bool isAppBar,
  ) {
    return TextStyle(
      height: double.parse(data['height'].toString()),
      fontSize: double.parse(data['fontSize'].toString()),
      fontWeight: dTextstyle.fw(data['fontWeight']),
      color: isAppBar
          ? data['color'] == '#DEFAULT'
                ? Theme.of(context).colorScheme.primaryForeground
                : ColorParse.parseColor(data['color'])
          : ColorParse.parseColor(data['color']),
      decoration: dTextstyle.textDParse(data['decoration']),
      fontStyle: dTextstyle.fst(data['fontStyle']),
    );
  }
}
