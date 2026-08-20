import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:neneui_render/src/base/AppBar.dart';
import 'package:neneui_render/src/base/Center.dart';
import 'package:neneui_render/src/base/Compare.dart';
import 'package:neneui_render/src/base/Container.dart';
import 'package:neneui_render/src/base/Expanded.dart';
import 'package:neneui_render/src/base/Frame.dart';
import 'package:neneui_render/src/base/Iconify.dart';
import 'package:neneui_render/src/base/Padding.dart';
import 'package:neneui_render/src/base/Scaffold.dart';
import 'package:neneui_render/src/base/SizedBox.dart';
import 'package:neneui_render/src/content/Card.dart';
import 'package:neneui_render/src/content/ForEach.dart';
import 'package:neneui_render/src/content/Image.dart';
import 'package:neneui_render/src/content/Text.dart';
import 'package:neneui_render/src/dispaly/Accordion.dart';
import 'package:neneui_render/src/dispaly/AlertDialog.dart';
import 'package:neneui_render/src/dispaly/Avatar.dart';
import 'package:neneui_render/src/dispaly/ChatBubble.dart';
import 'package:neneui_render/src/dispaly/ChatGroup.dart';
import 'package:neneui_render/src/dispaly/CodeSnippet.dart';
import 'package:neneui_render/src/dispaly/Table.dart';
import 'package:neneui_render/src/dispaly/TableCell.dart';
import 'package:neneui_render/src/dispaly/TableRow.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/feedback/Button.dart';
import 'package:neneui_render/src/feedback/ButtonGroup.dart';
import 'package:neneui_render/src/feedback/Progress.dart';
import 'package:neneui_render/src/feedback/ProgressIndicator.dart';
import 'package:neneui_render/src/form/CheckBox.dart';
import 'package:neneui_render/src/form/DatePicker.dart';
import 'package:neneui_render/src/form/InputOTP.dart';
import 'package:neneui_render/src/form/TextField.dart';
import 'package:neneui_render/src/navigation/Breadcrumb.dart';
import 'package:neneui_render/src/navigation/NavigationBar.dart';
import 'package:neneui_render/src/navigation/NavigationDivider.dart';
import 'package:neneui_render/src/navigation/NavigationGroup.dart';
import 'package:neneui_render/src/navigation/NavigationItem.dart';
import 'package:neneui_render/src/navigation/NavigationRail.dart';
import 'package:neneui_render/src/overlay/HoverCard.dart';
import 'package:neneui_render/src/rowscol/Column.dart';
import 'package:neneui_render/src/rowscol/Flex.dart';
import 'package:neneui_render/src/rowscol/Row.dart';
import 'package:neneui_render/src/rowscol/SingleChildScrollView.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class Daikon {
  static dynamic Nene({
    required BuildContext context,
    required Map<String, dynamic> idMap,
    required var ui,
    required String baseUrl,
    required Function event,
    required Function setState,
  }) {
    if (ui is! Map<String, dynamic>) {
      print("INVALID UI:");
      print(ui.runtimeType);
      print(ui);
      throw Exception("UI must be a Map");
    }
    String wName = ui['name'].toString();

    const contextMenuWidgets = ['Text', 'Image', 'Scaffold'];

    Widget reRender(
      var nene, {
      Map<String, dynamic> infectForeach = const {},
      useList = false,
    }) {
      final widget = Daikon.Nene(
        context: context,
        idMap: idMap,
        ui: nene,
        event: event,
        baseUrl: baseUrl,
        setState: setState,
      );

      if (contextMenuWidgets.contains(nene['name'])) {
        return ContextMenu(
          child: widget,
          items: [
            if (kDebugMode)
              MenuButton(
                trailing: Icon(Icons.info),
                enabled: true,
                onPressed: (context) {
                  showOverlay(
                    context,
                    DialogConfiguration(
                      builder: (context) {
                        return AlertDialog(
                          title: Text("Widget Information"),
                          content: SizedBox(
                            width: 400,
                            child: Text(jsonEncode(nene)),
                          ),
                          actions: [
                            TextButton(
                              child: Text("Copy"),
                              onPressed: () {
                                Clipboard.setData(
                                  ClipboardData(text: jsonEncode(nene)),
                                );
                              },
                            ),
                            DestructiveButton(
                              child: const Text("Close"),
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                            ),
                          ],
                        );
                      },
                    ),
                  );
                },
                child: Text('Info - ${nene['name']}'),
              ),

            if (nene['name'] == "Image")
              MenuButton(
                trailing: Icon(Icons.copy),
                onPressed: (context) {
                  Clipboard.setData(
                    ClipboardData(
                      text: nene['props']['path']
                          .toString()
                          .replaceFirst("local+", "")
                          .replaceFirst("web+", ""),
                    ),
                  );
                },
                child: Text("Copy Image Address"),
              ),

            if (nene['name'] == "Text")
              MenuButton(
                trailing: Icon(Icons.copy),
                onPressed: (context) {
                  Clipboard.setData(
                    ClipboardData(text: nene['props']['text'].toString()),
                  );
                },
                child: Text("Copy Text"),
              ),
          ],
        );
      }

      return widget;
    }

    List reRenderList(dynamic nene) {
      if (nene is List) {
        return [
          for (final item in nene)
            ...(Daikon.Nene(
                  context: context,
                  idMap: idMap,
                  ui: item,
                  event: event,
                  baseUrl: baseUrl,
                  setState: setState,
                )
                as List<Widget>),
        ];
      }

      final result = Daikon.Nene(
        context: context,
        idMap: idMap,
        ui: nene,
        event: event,
        baseUrl: baseUrl,
        setState: setState,
      );

      if (result is Widget) {
        return [result];
      }

      if (result is List) {
        return result.cast<Widget>();
      }

      throw Exception(
        "Expected Widget or List<Widget>, got ${result.runtimeType}",
      );
    }

    List reRenderTRow(dynamic nene) {
      if (nene is List) {
        return [
          for (final item in nene)
            ...(Daikon.Nene(
                  context: context,
                  idMap: idMap,
                  ui: item,
                  event: event,
                  baseUrl: baseUrl,
                  setState: setState,
                )
                as List<TableRow>),
        ];
      }

      final result = Daikon.Nene(
        context: context,
        idMap: idMap,
        ui: nene,
        event: event,
        baseUrl: baseUrl,
        setState: setState,
      );

      if (result is Widget) {
        return [result];
      }

      if (result is List) {
        return result.cast<Widget>();
      }

      throw Exception(
        "Expected Widget or List<Widget>, got ${result.runtimeType}",
      );
    }

    if (idMap.containsKey(ui['id']) && idMap[ui['id']]['visible'] == false) {
      return const SizedBox();
    }

    if (idMap.containsKey(ui['id']) && idMap[ui['id']]['override'] == true) {
      setState(() {
        try {
          ui['props'] = idMap[ui['id']]['props'];
          debugPrint('Daikon! ${ui['id']}: Props have been overwritten');
        } catch (error) {
          debugPrint('Daikon! ${ui['id']}: Props failed to be overwritten');
        }
      });
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

      case 'Iconify':
        return Iconify.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Frame':
        return dFrame.run(
          context: context,
          data: ui,
          reRender: reRender,
          baseUrl: baseUrl,
          event: event,
        );

      case 'TextEditingController':
        event(Events.SET_VAR, {
          'var': ui['id'] + ".controller",
          'val': TextEditingController(text: ui['props']['value']),
        });

      case 'Compare':
        return dCompare.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'Divider':
        return Divider();

      case 'VerticalDivider':
        return VerticalDivider();

      case 'Empty':
        return SizedBox();

      // ***********************BASE************************************

      // ***********************FORM************************************
      case 'TextField':
        return dTextField.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'InputOTP':
        return DInputOTP.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'CheckBox':
        return dCheckBox.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'DatePicker':
        return dDatePicker.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      // ***********************Navigation**********************************
      case 'NavigationItem':
        return dNavigationItem.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Breadcrumb':
        return DBreadcrumb.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'MoreDots':
        return DBreadcrumb.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'NavigationBar':
        return dNavigationBar.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'NavigationGroup':
        return dNavigationGroup.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'NavigationRail':
        return dNavigationRail.run(
          context: context,
          data: ui,
          idDatabase: idMap,
          reRender: reRender,
          event: event,
        );

      case 'NavigationDivider':
        return dNavigationDivider.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      // ***********************Content************************************
      case 'Text':
        return dText.run(
          context: context,
          data: ui,
          reRender: reRender,
          idDatabase: idMap,
          event: event,
        );

      case 'ForEach':
        return DForEach.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
          baseUrl: baseUrl,
          idDatabase: idMap,
        );

      case 'Image':
        return dImage.run(
          context: context,
          data: ui,
          idDatabase: idMap,
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

      // ***********************DISPLAY************************************
      case 'Avatar':
        return dAvatar.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'ChatGroup':
        return DChatGroup.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'ChatBubble':
        return DChatBubble.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'AvatarBadge':
        return dAvatarBadge.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'CodeSnippet':
        return dCodeSnippet.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Accordion':
        return DAccordion.run(
          context: context,
          data: ui,
          reRenderList: reRenderList,
          reRender: reRender,
          event: event,
        );

      case 'AccordionItem':
        return DAccordion.run(
          context: context,
          data: ui,
          reRenderList: reRenderList,
          reRender: reRender,
          event: event,
        );

      case 'AccordionTrigger':
        return DAccordion.run(
          context: context,
          data: ui,
          reRenderList: reRenderList,
          reRender: reRender,
          event: event,
        );

      case 'Table':
        return DTable.run(
          context: context,
          data: ui,
          reRender: reRender,
          reRenderList: reRenderList,
          reRenderTRow: reRenderTRow,
          event: event,
        );

      case 'TableRow':
        return DTableRow.run(
          context: context,
          data: ui,
          reRender: reRender,
          reRenderList: reRenderList,
          event: event,
        );

      case 'TableCell':
        return DTableCell.run(
          context: context,
          data: ui,
          reRender: reRender,
          reRenderList: reRenderList,
          event: event,
        );

      case 'Skeleton':
        return reRender(ui['props']['child']).asSkeleton();
      // ***********************DISPALY************************************

      // ***********************Overlay************************************
      case 'HoverCard':
        return DHoverCard.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );
      // ***********************Overlay************************************

      // ***********************Feedback************************************
      case 'Button':
        return dButton.run(
          context: context,
          data: ui,
          reRender: reRender,
          event: event,
        );

      case 'Progress':
        return DProgress.run(
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

      case 'AlertDialog':
        return dAlertDialog.run(
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

      case 'ButtonGroup':
        return dButtonGroup.run(
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
          reRenderList: reRenderList,
          event: event,
        );

      case 'Row':
        return dRow.run(
          context: context,
          data: ui,
          reRenderList: reRenderList,
          reRender: reRender,
          event: event,
        );

      case 'Flex':
        return dFlex.run(
          context: context,
          data: ui,
          reRender: reRender,
          reRenderList: reRenderList,
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
