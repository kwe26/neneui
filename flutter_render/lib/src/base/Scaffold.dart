import 'package:flutter/widgets.dart';
import 'package:flutter_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dScaffold {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Scaffold") {
      event(Events.REGISTER_ID, {'id': data['id']});

      return Scaffold(
        headers: [reRender(data['props']['appBar'])],
        // drawer: reRender(data['props']['drawer']),
        child: reRender(data['props']['body']),
      );
    } else {
      return SizedBox();
    }
  }
}
