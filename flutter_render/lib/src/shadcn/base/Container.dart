import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/BoxDecoration.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dContainer {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Container") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Container(
        child: reRender(data['props']['child']),
        decoration: BoxDecorartionParser.parse(data['props']['decoration']),
      );
    } else {
      return SizedBox();
    }
  }
}
