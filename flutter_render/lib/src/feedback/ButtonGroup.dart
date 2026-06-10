import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dButtonGroup {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "ButtonGroup") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return ButtonGroup(
        direction: data['props']['direction'] == "vertical"
            ? .vertical
            : .horizontal,
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
