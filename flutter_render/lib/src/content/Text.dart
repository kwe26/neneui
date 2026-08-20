import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/content/ForEachScope.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:neneui_render/src/parser/TextStyle.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dText {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
    Map<String, dynamic> idDatabase = const {},
  }) {
    if (data['name'] == "Text") {
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

      final appBar = context.findAncestorWidgetOfExactType<AppBar>();

      return Text(
        CoreParser.parseVariable(
          data['props']['text'],
          idDatabase,
          forForeach: forForeach,
          varToForeach: var2Foreach,
          forIndex: index,
        ),
        textAlign: CoreParser.parseTx(data['props']['align']),
        overflow: CoreParser.parseOvf(data['props']['overflow']),
        style: dTextstyle.run(data['props']['style'], context, appBar != null),
      );
    } else {
      return SizedBox();
    }
  }
}
