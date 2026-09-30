import 'package:flutter/widgets.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class dScaffold {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Map<String, dynamic> idMap,
    required Function event,
  }) {
    if (data['name'] == "Scaffold") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});
      event(Events.INVOKE_ONE_TIME_EXECUTION, data['props']['preActions']);

      return Scaffold(
        headers: [
          if (idMap['variables']['_debugOrb_'] == true)
            SizedBox(
              height: 3,
              child: idMap['variables']['_stateLoading_']
                  ? const LinearProgressIndicator(
                      showSparks: true,
                      minHeight: 3,
                    )
                  : const SizedBox(),
            ),
          if (idMap['variables']['_debugOrb_'])
            AppBar(
              leading: [Icon(LucideIcons.bug)],
              title: Text("Debug (Bar) - Enabled"),
              trailing: [
                IconButton(
                  icon: Icon(LucideIcons.mouse),
                  variance: ButtonStyle.primaryIcon(),
                  onPressed: () {
                    event(Events.TOGGL_MOUSEHOVER, "Daikon-Legs");
                  },
                ),
                IconButton(
                  icon: Icon(LucideIcons.bug),
                  variance: ButtonStyle.destructiveIcon(),
                  onPressed: () {
                    event(Events.DAIKON_DEBUG, "Daikon-Legs");
                  },
                ),
                IconButton(
                  icon: Icon(LucideIcons.arrowLeft),
                  variance: ButtonStyle.outlineIcon(),
                  onPressed: Navigator.canPop(context)
                      ? () {
                          if (Navigator.canPop(context)) {
                            Navigator.of(context).pop();
                          }
                        }
                      : null,
                ),
                IconButton(
                  icon: Icon(LucideIcons.refreshCcw),
                  variance: ButtonStyle.outlineIcon(),
                  onPressed: () {
                    event(Events.RELOAD, "A");
                  },
                ),
              ],
            ),
          reRender(data['props']['appBar']),
          if (idMap['variables']['_debugOrb_'] == false)
            SizedBox(
              height: 2,
              child: idMap['variables']['_stateLoading_']
                  ? const LinearProgressIndicator(
                      showSparks: true,
                      minHeight: 2,
                    )
                  : const SizedBox(),
            ),
        ],
        // drawer: reRender(data['props']['drawer']),
        child: reRender(data['props']['body']),
        footers: [reRender(data['props']['bottom'] ?? {})],
      );
    } else {
      return SizedBox();
    }
  }
}
