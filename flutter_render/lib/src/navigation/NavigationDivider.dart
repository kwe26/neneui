import 'package:shadcn_flutter/shadcn_flutter.dart';

class dNavigationDivider {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NavigationDivider") {
      return NavigationDivider();
    } else {
      return SizedBox();
    }
  }
}
