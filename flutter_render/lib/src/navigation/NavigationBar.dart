import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dNavigationBar {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NavigationBar") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});
      final controllerKey = "${data['id']}";

      if (!idDatabase['variables'].containsKey(controllerKey)) {
        event(Events.SET_VAR, {'var': controllerKey, 'val': const ValueKey(0)});
      }

      return NavigationBar(
        alignment: CoreParser.parseNavBarAlign(data['props']['alignment']),
        labelType: CoreParser.parseLbType(data['props']['labelType']),
        expanded: bool.parse(data['props']['expanded'].toString()),
        selectedKey: idDatabase['variables'][controllerKey],
        onSelected: (value) {
          event(Events.SET_VAR, {'var': controllerKey, 'val': value});
        },
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
