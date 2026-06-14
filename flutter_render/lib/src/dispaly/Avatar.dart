// ignore: file_names
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dAvatar {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    return Avatar(
      initials: Avatar.getInitials(data['props']['initials'].toString()),
      backgroundColor: ColorParse.parseColor(
        data['props']['backgroundColor'].toString(),
      ),
      size: double.parse(data['props']['size'].toString()),
      badge: reRender(data['props']['badge']),
      provider: data['props']['image'].toString().startsWith("local+")
          ? AssetImage(
              data['props']['image'].toString().replaceAll("local+", ""),
            )
          : NetworkImage(
              data['props']['image'].toString().replaceAll("web+", ""),
            ),
    );
  }
}

class dAvatarBadge {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    return AvatarBadge(
      child: reRender(data['props']['child']),
      size: double.parse(data['props']['size'].toString()),
      color: ColorParse.parseColor(data['props']['color']),
    );
  }
}
