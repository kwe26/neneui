import 'package:shadcn_flutter/shadcn_flutter.dart';

class ForeachScope extends InheritedWidget {
  final String var2Foreach;
  final int index;

  const ForeachScope({
    super.key,
    required this.var2Foreach,
    required this.index,
    required super.child,
  });

  static ForeachScope? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<ForeachScope>();
  }

  @override
  bool updateShouldNotify(ForeachScope oldWidget) => true;
}
