import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dTextField {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "TextField") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final controllerKey = "${data['id']}.controller";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {
          'var': controllerKey,
          'val': TextEditingController(
            text: data['props']['controller']?['props']?['value'] ?? "",
          ),
        });
      }

      return TextField(
        controller: idDatabase['variables'][controllerKey],
        keyboardType: CoreParser.parseIpt(data['props']['inputType']),
        placeholder: reRender(data['props']['placeholder']),
        obscureText: data['props']['inputType'] == "password" ? true : false,
        features: [
          for (var ui in List.from(data['props']['features'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
