import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

// ignore: camel_case_types
class dCircularProgressIndicator {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "CircularProgressIndicator") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return CircularProgressIndicator(
        color: ColorParse.parseColor(data['props']['color']),
        size: double.parse(data['props']['strokeWidth'].toString()),
      );
    } else {
      return SizedBox(child: Text("invalid"));
    }
  }
}

// ignore: camel_case_types
class dLinearProgressIndicator {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "LinearProgressIndicator") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return LinearProgressIndicator(
        color: ColorParse.parseColor(data['props']['color']),
        minHeight: double.parse(data['props']['strokeWidth'].toString()),
      );
    } else {
      return SizedBox();
    }
  }
}
