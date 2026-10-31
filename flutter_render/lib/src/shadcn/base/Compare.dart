import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dCompare {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Compare") {
      Widget thenWidget = reRender(data['props']['then']);
      Widget orWidget = reRender(data['props']['or']);

      // print(
      //   CoreParser.parseKVariable(
      //         idDatabase['variables'][data['props']['fi']],
      //       ).toString() ==
      //       data['props']['ifEqualTo'].toString(),
      // );

      if (CoreParser.parseKVariable(
            idDatabase['variables'][data['props']['fi']],
          ).toString() ==
          data['props']['ifEqualTo'].toString()) {
        return thenWidget;
      } else {
        return orWidget;
      }
    } else {
      return SizedBox();
    }
  }
}
