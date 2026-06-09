import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

// ignore: camel_case_types
class dAppBar {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "AppBar") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return AppBar(
        leading: [reRender(data['props']['leading'])],
        title: reRender(data['props']['title']),
        backgroundColor: ColorParse.parseColor(
          data['props']['backgroundColor'],
        ),
        trailing: [
          for (var ui in List.from(data['props']['actions'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
