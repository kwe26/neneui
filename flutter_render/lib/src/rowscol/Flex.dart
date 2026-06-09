import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dFlex {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Flex") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Flex(
        mainAxisAlignment: CoreParser.parseW(data['props']['mainAxis']),
        crossAxisAlignment: CoreParser.crossParse(data['props']['crossAxis']),
        spacing: double.parse(data['props']['spacing'].toString()),
        direction: data['props']['direction'] == "horizontal"
            ? Axis.horizontal
            : Axis.vertical,
        textDirection: data['props']['textDirection'] == "ltr"
            ? TextDirection.ltr
            : .rtl,
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
