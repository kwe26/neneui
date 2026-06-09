import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dExpanded {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Expanded") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Expanded(
        child: reRender(data['props']['child']),
        flex: int.parse(data['props']['flex'].toString()),
      );
    } else {
      return SizedBox();
    }
  }
}
