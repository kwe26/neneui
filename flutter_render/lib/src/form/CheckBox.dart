import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dCheckBox {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "CheckBox") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final controllerKey = "${data['id']}.controller";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {
          'var': controllerKey,
          'val': bool.parse(data['props']['value'].toString())
              ? CheckboxState.checked
              : CheckboxState.unchecked,
        });
      }

      return Checkbox(
        state: idDatabase['variables'][controllerKey],
        onChanged: (CheckboxState? state) {
          event(Events.SET_VAR, {'var': controllerKey, 'val': state});
        },
        trailing: reRender(data['props']['trailing']),
      );
    } else {
      return SizedBox();
    }
  }
}
