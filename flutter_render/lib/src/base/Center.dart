import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dCenter {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Center") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return Center(child: reRender(data['props']['child']));
    } else {
      return SizedBox();
    }
  }
}
