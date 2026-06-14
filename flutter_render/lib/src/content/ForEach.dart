import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/content/ForEachScope.dart';
import 'package:neneui_render/src/enum.dart';

class DForEach {
  static List<Widget> run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
    Map<String, dynamic> idDatabase = const {},
  }) {
    if (data['name'] != "ForEach") {
      return [];
    }

    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    final variable = idDatabase['variables']?[data['props']['varToForEach']];

    print("FOREACH VAR: ${data['props']['varToForEach']}");
    print("TYPE: ${variable.runtimeType}");
    print("VALUE: $variable");

    if (variable is! List) {
      print("ERROR: variable is not a List");
      return [];
    }

    return [
      for (var i = 0; i < variable.length; i++)
        ForeachScope(
          var2Foreach: data['props']['varToForEach'],
          index: i,
          child: reRender(data['props']['child']),
        ),
    ];
  }
}
