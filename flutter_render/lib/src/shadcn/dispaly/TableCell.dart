import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DTableCell {
  static TableCell run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function event,
  }) {
    if (data['name'] == "TableCell") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return TableCell(
        columnSpan: int.parse(data['props']['columnSpan'].toString()),
        rowSpan: int.parse(data['props']['rowSpan']),
        child: reRender(data['props']['child']),
      );
    } else {
      return TableCell(child: Text(""));
    }
  }
}
