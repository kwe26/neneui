import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class DWebSocket {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});
    event(Events.INIT_WSS_ONCE, data['props']);
    if (idDatabase['variables'].containsKey("_wsScroll_") == false) {
      event(Events.SET_VAR, {'var': "_wsScroll_", 'val': ScrollController()});
    }

    final dataScroll = data['props']?['dataScroll']?.toString().toLowerCase();

    final reverse = dataScroll == 'up';

    return idDatabase['variables']['_wssLoading_']
        ? Center(child: CircularProgressIndicator())
        : ListView(
            reverse: reverse,
            shrinkWrap: true,
            controller: idDatabase['variables']['_wsScroll_'],
            children: [
              for (var widget in idDatabase['variables']['wss'])
                reRender(widget),
            ],
          );
  }
}
