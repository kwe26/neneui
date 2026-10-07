import 'package:flutter_svg/flutter_svg.dart';
import 'package:neneui_render/src/enum.dart';
import 'package:neneui_render/src/parser/Color.dart';
import 'package:shadcn_flutter/shadcn_flutter_experimental.dart';

class Iconify {
  static Widget run({
    required BuildContext context,
    required Map<String, dynamic> data,
    required Function reRender,
    required Function event,
  }) {
    if (data['name'] != 'Iconify') {
      return const SizedBox();
    }

    event(Events.REGISTER_ID, {'id': data['id'], 'props': data['props']});

    final props = data['props'];

    final size = double.tryParse(props['size']?.toString() ?? '') ?? 24;

    final color = props['color']?.toString();

    final iconColor = color == null || color == '#DEFAULT'
        ? Theme.of(context).colorScheme.foreground
        : ColorParse.parseColor(color);

    return SvgPicture.network(
      'https://api.iconify.design/${props['icon']}.svg',
      height: size,
      width: size,
      colorFilter: ColorFilter.mode(iconColor, BlendMode.srcIn),
      errorBuilder: (context, error, stackTrace) {
        return Icon(LucideIcons.imageOff, size: size, color: iconColor);
      },
    );
  }
}
