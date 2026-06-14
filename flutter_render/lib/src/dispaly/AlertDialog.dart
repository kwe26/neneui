import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dAlertDialog {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    return AlertDialog(
      title: reRender(data['props']['title']),
      leading: reRender(data['props']['leading']),
      content: reRender(data['props']['content']),
      actions: [
        for (var ui in List.from(data['props']['actions'])) reRender(ui),
      ],
    );
  }
}
