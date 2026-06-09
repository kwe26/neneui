import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dColumn {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Column") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return Column(
        mainAxisAlignment: CoreParser.parseW(data['props']['mainAxis']),
        crossAxisAlignment: CoreParser.crossParse(data['props']['crossAxis']),
        children: [
          for (var ui in List.from(data['props']['children'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
