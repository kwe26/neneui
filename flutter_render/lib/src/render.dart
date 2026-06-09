import 'package:neneui_render/src/base/AppBar.dart';
import 'package:neneui_render/src/base/Center.dart';
import 'package:neneui_render/src/base/Padding.dart';
import 'package:neneui_render/src/base/Scaffold.dart';
import 'package:neneui_render/src/content/Text.dart';
import 'package:neneui_render/src/rowscol/Column.dart';
import 'package:neneui_render/src/rowscol/Row.dart';
import 'package:neneui_render/src/rowscol/SingleChildScrollView.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class Daikon {
  static dynamic Nene({
    required BuildContext context,
    required Map<String, dynamic> idMap,
    required var ui,
    required Function event,
  }) {
    String wName = ui['name'];

    Widget reRender(var nene) {
      return Daikon.Nene(
        context: context,
        idMap: idMap,
        ui: nene,
        event: event,
      );
    }

    if (idMap.containsKey(ui['id']) && idMap[ui['id']]['visible'] == false) {
      return const SizedBox();
    }

    switch (wName) {
      // ***********************BASE************************************

      case 'Scaffold':
        return dScaffold.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'AppBar':
        return dAppBar.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Center':
        return dCenter.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Padding':
        return dPadding.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Empty':
        return SizedBox();

      // ***********************BASE************************************

      // ***********************Content************************************
      case 'Text':
        return dText.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      // ***********************ROWSCOL************************************
      case 'SingleChildScrollView':
        return dSingleChildScrollView.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Column':
        return dColumn.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Row':
        return dRow.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      default:
        SizedBox(
          child: Text("[Nene is a daikon: Error Widget not registered]"),
        );
    }

    return SizedBox();
  }
}
