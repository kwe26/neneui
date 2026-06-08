import 'package:flutter_render/src/base/AppBar.dart';
import 'package:flutter_render/src/base/Scaffold.dart';
import 'package:flutter_render/src/rowscol/SingleChildScrollView.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class Daikon {
  static Widget Nene({
    required BuildContext context,
    required Map<String, dynamic> idMap,
    required Map<String, dynamic> ui,
    required Function event,
  }) {
    String wName = ui['name'];

    Widget reRender(Map<String, dynamic> nene) {
      return Daikon.Nene(
        context: context,
        idMap: idMap,
        ui: nene,
        event: event,
      );
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

      case 'Empty':
        return SizedBox();

      // ***********************BASE************************************

      // ***********************ROWSCOL************************************
      case 'SingleChildScrollView':
        dSingleChildScrollView.run(
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
