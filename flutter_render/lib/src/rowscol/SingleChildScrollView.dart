import 'package:flutter/widgets.dart';
import 'package:flutter_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dSingleChildScrollView {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "SingleChildScrollView") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return SingleChildScrollView(
        physics: data['props']['physics'] == "never_scroll"
            ? const NeverScrollableScrollPhysics()
            : null,
        scrollDirection: data['props']['scrollDirection'] == "Horizontal"
            ? Axis.horizontal
            : Axis.vertical,
        child: reRender(data['props']['child']),
        reverse: bool.parse(data['props']['reverse'].toString()),
      );
    } else {
      return SizedBox();
    }
  }
}
