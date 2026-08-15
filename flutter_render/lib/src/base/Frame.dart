import 'package:neneui_render/neneui_render.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dFrame {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required String baseUrl,
    required Function event,
  }) {
    if (data['name'] == "Frame") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return NeneUIMain(
        baseUrl: baseUrl,
        path: baseUrl + data['props']['framePath'],
        showScaffold: false,
      );
    } else {
      return SizedBox();
    }
  }
}
