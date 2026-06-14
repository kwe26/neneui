import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DHoverCard {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "HoverCard") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return HoverCard(
        child: reRender(data['props']['child']),
        hoverBuilder: (context) {
          return reRender(data['props']['hoverCard']);
        },
      );
    } else {
      return SizedBox();
    }
  }
}
