import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dNavigationGroup {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NavigationGroup") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return NavigationGroup(
        label: Text(data['props']['label']),
        labelAlignment: CoreParser.parseAlignment(
          data['props']['labelAlignment'],
        ),
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
