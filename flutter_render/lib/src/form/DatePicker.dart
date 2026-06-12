import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dDatePicker {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "DatePicker") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final controllerKey = "${data['id']}.controller";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {
          'var': controllerKey,
          'val': DateTime.fromMillisecondsSinceEpoch(
            data['props']['defaultDate'],
          ),
        });
      }

      return DatePicker(
        value: idDatabase['variables'][controllerKey],
        onChanged: (value) {
          event(Events.SET_VAR, {'var': controllerKey, 'val': value});
        },
        mode: data['props']['mode'] == "popup" ? .popover : .dialog,
        dialogTitle: reRender(data['props']['dialogTitle']),
      );
    } else {
      return SizedBox();
    }
  }
}
