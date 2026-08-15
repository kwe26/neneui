import 'package:neneui_render/src/dispaly/TableRow.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DTable {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function reRenderList,
    required Function reRenderTRow,
    required Function event,
  }) {
    if (data['name'] == "Table") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final rawChildren = data['props']['rows'];

      final childrenList = rawChildren is List ? rawChildren : [rawChildren];

      final children = <TableRow>[];

      for (var ui in childrenList) {
        if (data['props']['foreach']) {
          children.addAll(reRenderTRow(ui));
        } else {
          children.add(
            DTableRow.run(
              context: context,
              data: ui,
              reRender: reRender,
              reRenderList: reRenderList,
              event: event,
            ),
          );
        }
      }

      return Table(
        rows: children,
        columnWidths: Map.from(data['props']['columnWidths']),
        defaultColumnWidth:
            data['props']['defaultColumnWidth']['name'] == "FlexTableSize"
            ? CoreParser.parseFlexTableSz(data['props']['defaultColumnWidth'])
            : CoreParser.parseFxTbSz(data['props']['defaultColumnWidth']),
      );
    } else {
      return SizedBox();
    }
  }
}
