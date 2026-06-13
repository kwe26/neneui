import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dCodeSnippet {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "CodeSnippet") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return CodeSnippet(
        constraints: CoreParser.parseBoxC(
          data['props']['constraints']['props'],
        ),
        code: Text(data['props']['code'].toString()),
        actions: [
          GhostButton(
            child: Icon(Icons.copy),
            onPressed: () {
              Clipboard.setData(
                ClipboardData(text: data['props']['code'].toString()),
              );
            },
          ),
          for (var ui in List.from(data['props']['actions'])) reRender(ui),
        ],
      );
    } else {
      return SizedBox();
    }
  }
}
