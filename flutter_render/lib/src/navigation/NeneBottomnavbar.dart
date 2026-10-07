import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Core.dart';
import 'package:shadcn_flutter/shadcn_flutter.dart';

class DNeneBottomnavbar {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Map<String, dynamic> idDatabase,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] == "NeneNavbottom") {
      event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

      if (data['props']['type'] == "float") {
        return Padding(
          padding: const EdgeInsets.all(12),
          child: SurfaceCard(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            borderRadius: BorderRadius.circular(20),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                for (var icn in data['props']['items'])
                  Builder(
                    builder: (context) {
                      final index = icn['index'] as int;
                      final selected =
                          idDatabase['variables']['_index_'] == index;

                      event(Events.RELOAD_DISPLAY, "");

                      return GestureDetector(
                        onTap: () {
                          event(Events.UPDATE_INDEX, index);
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 180),
                          curve: Curves.easeOut,
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                          decoration: BoxDecoration(
                            color: selected
                                ? Theme.of(context).colorScheme.primary
                                      .withValues(alpha: 0.12)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                height: 28,
                                child: reRender(icn['icon']),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                icn['title'].toString(),
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: selected
                                      ? FontWeight.w600
                                      : FontWeight.w400,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
              ],
            ),
          ),
        );
      }

      return SizedBox(
        height: 76,
        child: SurfaceCard(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              for (var icn in data['props']['items'])
                Expanded(
                  child: Builder(
                    builder: (context) {
                      final index = icn['index'] as int;
                      final selected =
                          idDatabase['variables']['_index_'] == index;

                      return GestureDetector(
                        onTap: () {
                          event(Events.UPDATE_INDEX, index);

                          event(Events.RELOAD_DISPLAY, "");
                        },
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 180),
                          curve: Curves.easeOut,
                          margin: const EdgeInsets.symmetric(horizontal: 4),
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: selected
                                ? Theme.of(context).colorScheme.primary
                                      .withValues(alpha: 0.12)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              SizedBox(
                                height: 28,
                                child: reRender(icn['icon']),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                icn['title'].toString(),
                                style: TextStyle(
                                  fontSize: 11,
                                  fontWeight: selected
                                      ? FontWeight.w600
                                      : FontWeight.w400,
                                ),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
            ],
          ),
        ),
      );
    } else if (data['name'] == "MoreDots") {
      return MoreDots();
    } else {
      return SizedBox();
    }
  }
}
