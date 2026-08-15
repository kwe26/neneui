import 'dart:typed_data';

import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:neneui_render/src/content/ForEachScope.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dImage {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Image") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      var scope = ForeachScope.of(context);
      bool forForeach = false;
      String var2Foreach = "";
      int index = 0;

      if (scope != null) {
        forForeach = true;
        var2Foreach = scope.var2Foreach;
        index = scope.index;
      }

      var imagePath = CoreParser.parseVariable(
        data['props']['path'],
        idDatabase,
        forForeach: forForeach,
        varToForeach: var2Foreach,
        forIndex: index,
      );

      if (imagePath.toString().toLowerCase().endsWith(".svg")) {
        if (imagePath.toString().startsWith("local+")) {
          return SvgPicture.asset(
            imagePath.toString().replaceAll("local+", ""),
            width: double.parse(data['props']['width'].toString()),
            height: double.parse(data['props']['height'].toString()),
            fit: CoreParser.parseBfit(data['props']['fit']),
            alignment: CoreParser.parseAlignment(data['props']['alignment']),
          );
        } else {
          return SvgPicture.network(
            imagePath.toString().replaceAll("web+", ""),
            width: double.parse(data['props']['width'].toString()),
            height: double.parse(data['props']['height'].toString()),
            fit: CoreParser.parseBfit(data['props']['fit']),
            alignment: CoreParser.parseAlignment(data['props']['alignment']),
            placeholderBuilder: (_) => reRender(data['props']['loadingWidget']),
          );
        }
      }

      return Image(
        image:
            imagePath.toString().startsWith("memory+") &&
                idDatabase['variables']["${imagePath.replaceFirst("memory+", "")}.file"] !=
                    null
            ? MemoryImage(
                idDatabase['variables']["${imagePath.replaceFirst("memory+", "")}.file"]
                    as Uint8List,
              )
            : imagePath.toString().startsWith("local+")
            ? AssetImage(imagePath.toString().replaceAll("local+", ""))
            : NetworkImage(imagePath.toString().replaceAll("web+", "")),
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
