import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
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

      if (data['props']['path'].toString().toLowerCase().endsWith(".svg")) {
        if (data['props']['path'].toString().startsWith("local+")) {
          return SvgPicture.asset(
            data['props']['path'].toString().replaceAll("local+", ""),
            width: double.parse(data['props']['width'].toString()),
            height: double.parse(data['props']['height'].toString()),
            fit: CoreParser.parseBfit(data['props']['fit']),
            alignment: CoreParser.parseAlignment(data['props']['alignment']),
          );
        } else {
          return SvgPicture.network(
            data['props']['path'].toString().replaceAll("web+", ""),
            width: double.parse(data['props']['width'].toString()),
            height: double.parse(data['props']['height'].toString()),
            fit: CoreParser.parseBfit(data['props']['fit']),
            alignment: CoreParser.parseAlignment(data['props']['alignment']),
            placeholderBuilder: (_) => reRender(data['props']['loadingWidget']),
          );
        }
      }

      return Image(
        image: data['props']['path'].toString().startsWith("local+")
            ? AssetImage(
                data['props']['path'].toString().replaceAll("local+", ""),
              )
            : NetworkImage(
                data['props']['path'].toString().replaceAll("web+", ""),
              ),
        width: double.parse(data['props']['width'].toString()),
        height: double.parse(data['props']['height'].toString()),
        fit: CoreParser.parseBfit(data['props']['fit']),
        alignment: CoreParser.parseAlignment(data['props']['alignment']),
        filterQuality: CoreParser.parseFtq(data['props']['filterQuality']),
        loadingBuilder: (context, child, chunk) {
          if (chunk == null) return child;
          return reRender(data['props']['loadingWidget']);
        },
        errorBuilder: (context, wg, trace) =>
            reRender(data['props']['errorWidget']),
      );
    } else {
      return SizedBox();
    }
  }
}
