import 'package:neneui_render/src/base/AppBar.dart';
import 'package:neneui_render/src/base/Center.dart';
import 'package:neneui_render/src/base/Container.dart';
import 'package:neneui_render/src/base/Expanded.dart';
import 'package:neneui_render/src/base/Padding.dart';
import 'package:neneui_render/src/base/Scaffold.dart';
import 'package:neneui_render/src/base/SizedBox.dart';
import 'package:neneui_render/src/content/Card.dart';
import 'package:neneui_render/src/content/Image.dart';
import 'package:neneui_render/src/content/Text.dart';
import 'package:neneui_render/src/feedback/Button.dart';
import 'package:neneui_render/src/feedback/ProgressIndicator.dart';
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

    if (idMap.containsKey(ui['id']) && idMap[ui['id']]['override'] == true) {
      try {
        ui['props'] = idMap[ui['id']]['props'];
        debugPrint('Daikon! ${ui['id']}: Props have been overwritten');
      } catch (error) {
        debugPrint('Daikon! ${ui['id']}: Props failed to be overwritten');
      }
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

      case 'Container':
        return dContainer.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'SizedBox':
        return dSizedBox.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Expanded':
        return dExpanded.run(
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

      case 'Image':
        return dImage.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Card':
        return dCard.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      // ***********************Content************************************

      // ***********************Feedbacl************************************
      case 'Button':
        return dButton.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'CircularProgressIndicator':
        return dCircularProgressIndicator.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'LinearProgressIndicator':
        return dLinearProgressIndicator.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      // ***********************Feedback************************************

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
        print("[Nene is a daikon: Error Widget not registered]");
        SizedBox(
          child: Text("[Nene is a daikon: Error Widget not registered]"),
        );
    }

    return SizedBox();
  }
}
