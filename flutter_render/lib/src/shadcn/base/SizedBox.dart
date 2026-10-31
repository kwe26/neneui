import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dSizedBox {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "SizedBox") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return SizedBox(
        child: reRender(data['props']['child']),
        width: double.parse(data['props']['width'].toString()),
        height: double.parse(data['props']['height'].toString()),
      );
    } else {
      return SizedBox();
    }
  }
}
