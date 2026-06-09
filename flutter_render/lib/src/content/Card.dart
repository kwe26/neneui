import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:neneui_render/src/parser/TextStyle.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dCard {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Card") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Card(
        child: reRender(data['props']['child']),
        filled: data['props']['type'] == "filled" ? true : false,
        fillColor: ColorParse.parseColor(data['props']['color']),
        padding: CoreParser.parseEdge(data['props']['padding']),
      );
    } else {
      return SizedBox();
    }
  }
}
