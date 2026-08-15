import 'package:neneui_render/src/dispaly/TableCell.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DTableRow {
  static TableRow run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function event,
  }) {
    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    if (data['name'] == "TableFooter") {
      return TableFooter(
        cells: [
          for (var cell in List.from(data['props']['cells']))
            DTableCell.run(
              context: context,
              data: cell,
              reRender: reRender,
              reRenderList: reRenderList,
              event: event,
            ),
        ],
      );
    }

    return TableRow(
      cells: [
        for (var cell in List.from(data['props']['cells']))
          DTableCell.run(
            context: context,
            data: cell,
            reRender: reRender,
            reRenderList: reRenderList,
            event: event,
          ),
      ],
    );
  }
}
