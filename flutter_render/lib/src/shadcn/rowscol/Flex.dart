import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dFlex {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function event,
  }) {
    if (data['name'] == "Flex") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final rawChildren = data['props']['children'];

      final childrenList = rawChildren is List ? rawChildren : [rawChildren];

      final children = <Widget>[];

      for (var ui in childrenList) {
        if (data['props']['foreach']) {
          children.addAll(reRenderList(ui));
        } else {
          children.add(reRender(ui));
        }
      }

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
        children: children,
      );
    } else {
      return SizedBox();
    }
  }
}
