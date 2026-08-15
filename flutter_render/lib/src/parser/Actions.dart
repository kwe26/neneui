import 'package:flutter/material.dart';
import 'package:neneui_render/src/enum.dart';

class ActionsPerf {
  static void perform(
    BuildContext context,
    Function event,
    String action,
    dynamic mainData, {
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
    } else if (action == "daikon") {
      event(Events.DAIKON_DEBUG, mainData);
    } else if (action == "setvar") {
      event(Events.SET_VAR, mainData);
    } else if (action == "dialog") {
      event(Events.DIALOG, mainData);
    } else if (action == "submit") {
      event(Events.SUBMIT, mainData);
    } else if (action == "pop") {
      event(Events.INVOKE_POP, "pop");
    } else if (action == "props") {
      event(Events.INVOKE_REPLACE_PROPS, mainData);
    } else if (action == "js") {
      event(Events.INVOKE_JS, mainData);
    } else if (action == "select_file") {
      event(Events.SELECT_FILE, mainData);
    }

    debugPrint(action);
  }
}
