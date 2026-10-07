import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class DNeneDisplay {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NeneDisplay") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});
      event(Events.SET_DISPLAY_URLS, data['props']);
      event(Events.RELOAD_DISPLAY_ONCE, "");

      return idDatabase['variables']['_displayLoading_'] == true
          ? Center(child: CircularProgressIndicator())
          : reRender(idDatabase['variables']['_display_']);
    } else {
      return SizedBox();
    }
  }
}
