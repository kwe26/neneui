import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
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

      final controllerKey = "${data['id']}";
      final parseControllerKey = "${data['id']}.controller";

      String parseDateTime(DateTime now) {
        if (data['props']['dateFormat'] == "ddmmyyyy") {
          return '${now.day.toString().padLeft(2, '0')}'
              '${now.month.toString().padLeft(2, '0')}'
              '${now.year}';
        } else if (data['props']['dateFormat'] == "yyyyMMdd") {
          return '${now.year}'
              '${now.month.toString().padLeft(2, '0')}'
              '${now.day.toString().padLeft(2, '0')}';
        } else if (data['props']['dateFormat'] == "dd-mm-yyyy") {
          return '${now.day.toString().padLeft(2, '0')}-'
              '${now.month.toString().padLeft(2, '0')}-'
              '${now.year}';
        } else if (data['props']['dateFormat'] == "millisecondsSinceEpoch") {
          return now.millisecondsSinceEpoch.toString();
        }

        return '${now.year}'
            '${now.month.toString().padLeft(2, '0')}'
            '${now.day.toString().padLeft(2, '0')}';
      }

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        DateTime time = DateTime.fromMillisecondsSinceEpoch(
          int.parse(data['props']['defaultDate'].toString()),
        );

        event(Events.SET_VAR, {'var': controllerKey, 'val': time});

        event(Events.SET_VAR, {
          'var': parseControllerKey,
          'val': parseDateTime(time),
        });
      }

      return DatePicker(
        value: idDatabase['variables'][controllerKey],
        onChanged: (value) {
          event(Events.SET_VAR, {'var': controllerKey, 'val': value});
          event(Events.SET_VAR, {
            'var': parseControllerKey,
            'val': parseDateTime(value!),
          });
        },
        mode: CoreParser.parsePromptMode(data['props']['mode']),
        dialogTitle: reRender(data['props']['dialogTitle']),
      );
    } else {
      return SizedBox();
    }
  }
}
