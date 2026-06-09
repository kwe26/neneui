import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class BoxDecorartionParser {
  static BoxDecoration parse(Map<String, dynamic> data) {
    return BoxDecoration(
      color: ColorParse.parseColor(data['color']),
      border: Border.all(
        color: ColorParse.parseColor(data['borderColor']),
        width: double.parse(data['borderWidth'].toString()),
      ),
      borderRadius: BorderRadius.circular(
        double.parse(data['radius'].toString()),
      ),
      image: data['image'] == "none"
          ? null
          : DecorationImage(
              image: data['image'].toString().startsWith("local+")
                  ? AssetImage(
                      data['image'].toString().replaceAll("local+", ""),
                    )
                  : NetworkImage(
                      data['image'].toString().replaceAll("web+", ""),
                    ),
            ),
    );
  }
}
