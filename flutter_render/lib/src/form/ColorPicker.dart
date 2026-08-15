import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class DColorPicker {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "ColorPicker") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final controllerKey = "${data['id']}";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {
          'var': controllerKey,
          'val': ColorDerivative.fromColor(
            ColorParse.parseColor(data['props']['value']),
          ),
        });
      }

      return ColorInput(
        value: idDatabase['variables'][controllerKey],
        orientation: CoreParser.parseAxis(data['props']['orientation']),
      );
    } else {
      return SizedBox();
    }
  }
}
