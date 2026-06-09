import 'package:flutter/material.dart';
import 'package:neneui_render/src/enum.dart';

class ActionsPerf {
  static void perform(
    BuildContext context,
    Function event,
    String action,
    String mainData, {
    Map<String, dynamic> data = const {},
  }) {
    if (action == "show_toast") {
      event(Events.INVOKE_TOAST, mainData);
    } else if (action == "navigate") {
      event(Events.INVOKE_NAVIGATE, mainData);
    } else if (action == "navigate_pushreplace") {
      event(Events.INVOKE_NAVIGATE_REPLACE, mainData);
    } else if (action == "hide") {
      event(Events.HIDE_IDB, mainData);
    } else if (action == "show") {
      event(Events.SHOW_IDB, mainData);
    }
  }
}
