import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

// ignore: camel_case_types
class dCenter {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Center") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Center(child: reRender(data['props']['child']));
    } else {
      return SizedBox();
    }
  }
}
