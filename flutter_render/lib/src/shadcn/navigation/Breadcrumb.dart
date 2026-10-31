import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class DBreadcrumb {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Breadcrumb") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Breadcrumb(
        separator: CoreParser.parseBcrumb(data['props']['separator']),
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else if (data['name'] == "MoreDots") {
      return MoreDots();
    } else {
      return SizedBox();
    }
  }
}
