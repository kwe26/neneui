import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:neneui_render/src/parser/TextStyle.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dText {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Text") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return Text(
        data['props']['text'].toString(),
        textAlign: CoreParser.parseTx(data['props']['align']),
        overflow: CoreParser.parseOvf(data['props']['overflow']),
        style: dTextstyle.run(data['props']['style']),
      );
    } else {
      return SizedBox();
    }
  }
}
