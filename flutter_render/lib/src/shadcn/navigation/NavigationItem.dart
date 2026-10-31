import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dNavigationItem {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NavigationItem") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return NavigationItem(
        key: ValueKey(int.parse(data['props']['key'].toString())),
        child: reRender(data['props']['child']),
        label: Text(data['props']['label']),
      );
    } else {
      return SizedBox();
    }
  }
}
