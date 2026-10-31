import 'package:neneui_render/src/enum.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class DAccordion {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRenderList,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Accordion") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      final rawChildren = data['props']['items'];

      final childrenList = rawChildren is List ? rawChildren : [rawChildren];

      final children = <Widget>[];

      for (var ui in childrenList) {
        if (data['props']['foreach']) {
          children.addAll(reRenderList(ui));
        } else {
          children.add(reRender(ui));
        }
      }

      return Accordion(items: children);
    } else if (data['name'] == "AccordionItem") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return AccordionItem(
        trigger: reRender(data['props']['trigger']),
        content: reRender(data['props']['content']),
        expanded: bool.parse(data['props']['expanded'].toString()),
      );
    } else if (data['name'] == "AccordionTrigger") {
      return AccordionTrigger(child: reRender(data['props']['child']));
    } else {
      return SizedBox();
    }
  }
}
