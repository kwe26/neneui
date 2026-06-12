import 'package:flutter_svg/flutter_svg.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/BoxDecoration.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class Iconify {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Iconify") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return SvgPicture.network(
        "https://api.iconify.design/${data['props']['icon']}.svg",
        height: double.parse(data['props']['size'].toString()),
        width: double.parse(data['props']['size'].toString()),
        errorBuilder: (context, obj, trace) => Icon(
          Icons.error,
          size: double.parse(data['props']['size'].toString()),
        ),
      );
    } else {
      return SizedBox();
    }
  }
}
