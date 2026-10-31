import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dPadding {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Padding") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Padding(
        child: reRender(data['props']['child']),
        padding: CoreParser.parseEdge(data['props']['padding']),
      );
    } else {
      return SizedBox();
    }
  }
}
