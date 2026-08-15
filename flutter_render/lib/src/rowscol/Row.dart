import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dRow {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function event,
  }) {
    if (data['name'] == "Row") {
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

      return Row(
        mainAxisAlignment: CoreParser.parseW(data['props']['mainAxis']),
        crossAxisAlignment: CoreParser.crossParse(data['props']['crossAxis']),
        children: children,
      );
    } else {
      return SizedBox();
    }
  }
}
