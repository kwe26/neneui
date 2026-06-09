import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dImage {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Image") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Image(
        image: data['props']['image'].toString().startsWith("local+")
            ? AssetImage(
                data['props']['image'].toString().replaceAll("local+", ""),
              )
            : NetworkImage(
                data['props']['image'].toString().replaceAll("web+", ""),
              ),
        width: double.parse(data['props']['width'].toString()),
        height: double.parse(data['props']['width'].toString()),
        fit: CoreParser.parseBfit(data['props']['fit']),
        alignment: CoreParser.parseAlignment(data['props']['alignment']),
        filterQuality: CoreParser.parseFtq(data['props']['filterQuality']),
        loadingBuilder: (context, wg, chunk) =>
            reRender(data['props']['loadingWidget']),
        errorBuilder: (context, wg, trace) =>
            reRender(data['props']['errorWidget']),
      );
    } else {
      return SizedBox();
    }
  }
}
