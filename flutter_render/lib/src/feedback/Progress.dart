import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DProgress {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Progress") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Progress(
        progress: double.parse(data['props']['progress'].toString()),
        color: ColorParse.parseColor(data['props']['color']),
        backgroundColor: ColorParse.parseColor(
          data['props']['backgroundColor'],
        ),
      );
    } else {
      return SizedBox(child: Text("invalid"));
    }
  }
}
