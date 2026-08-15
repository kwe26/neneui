import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DChatGroup {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "ChatGroup") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return ChatGroup(
        alignment: CoreParser.parseAxisAlignDirect(data['props']['alignment']),
        color: ColorParse.parseColor(data['props']['color']),
        type: CoreParser.parseChaBubbleType(data['props']['type']),
        avatarPrefix: reRender(data['props']['avatarPrefix']),
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
