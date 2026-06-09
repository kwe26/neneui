import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Actions.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class dButton {
  static ButtonStyle parseStyle(
    String data,
    ButtonDensity density,
    ButtonShape shape,
  ) {
    if (data == "normal") {
      return ButtonStyle.primary(density: density, shape: shape);
    }
    if (data == "primary") {
      return ButtonStyle.primary(density: density, shape: shape);
    }
    if (data == "secondary") {
      return ButtonStyle.secondary(density: density, shape: shape);
    }
    if (data == "success") {
      return ButtonStyle.primary(density: density, shape: shape);
    }
    if (data == "danger") {
      return ButtonStyle.destructive(density: density, shape: shape);
    }
    if (data == "info") {
      return ButtonStyle.secondary(density: density, shape: shape);
    }
    if (data == "warning") {
      return ButtonStyle.outline(density: density, shape: shape);
    }

    return ButtonStyle.primary(density: density, shape: shape);
  }

  static ButtonDensity parseDensity(String ds) {
    if (ds == "compact") ButtonDensity.compact;
    if (ds == "dense") ButtonDensity.dense;
    if (ds == "normal") ButtonDensity.normal;
    if (ds == "comfortable") ButtonDensity.comfortable;
    if (ds == "icon") ButtonDensity.icon;

    return .normal;
  }

  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "Button") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      return Button(
        child: reRender(data['props']['child']),
        style: dButton.parseStyle(
          data['props']['type'],
          dButton.parseDensity(data['props']['density']),
          data['props']['shape'] == "circle" ? .circle : .rectangle,
        ),
        onPressed: bool.parse(data['props']['disabled'].toString()) == true
            ? null
            : () {
                ActionsPerf.perform(
                  context,
                  event,
                  data['props']['onPressed']['action'],
                  data['props']['onPressed']['data'],
                );
              },
      );
    } else {
      return SizedBox();
    }
  }
}
