import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/content/ForEachScope.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/render.dart';

class DForEach {
  static List<dynamic> run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required String baseUrl,
    required Function reRender,
    required Function event,
    Map<String, dynamic> idDatabase = const {},
  }) {
    if (data['name'] != "ForEach") {
      return [];
    }

    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    final variable = idDatabase['variables']?[data['props']['varToForEach']];

    if (variable is! List) {
      return [];
    }

    var a = [
      for (var i = 0; i < variable.length; i++)
        ForeachScope(
          var2Foreach: data['props']['varToForEach'],
          index: i,
          child: Builder(
            builder: (context) {
              return Daikon.Nene(
                context: context,
                idMap: idDatabase,
                ui: data['props']['child'],
                baseUrl: baseUrl,
                event: event,
                setState: () {},
              );
            },
          ),
        ),
    ];

    // print();

    return a;
  }
}
