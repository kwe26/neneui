<?php

function nene_w_avatar(array $p, array $ctx): string {
    $size = nene_px($p['size'] ?? 32);
    $initials = nene_text_value($p['initials'] ?? '');
    $src = nene_image_src($p['image'] ?? null);

    $inner = $src
        ? '<img src="' . nene_esc($src) . '" alt="' . nene_esc($initials) . '" loading="lazy" decoding="async">'
        : '<span class="nn-avatar-fallback">' . nene_esc(nene_first_chars($initials, 2)) . '</span>';

    $badge = '';
    $b = $p['badge'] ?? null;
    if (is_array($b) && ($b['name'] ?? '') === 'AvatarBadge' && (float) (nene_props($b)['size'] ?? 0) > 1) {
        $bp = nene_props($b);
        $badge = '<span class="nn-avatar-badge"' . nene_style([
            'width' => nene_px($bp['size']),
            'height' => nene_px($bp['size']),
            'background' => nene_color($bp['color'] ?? null),
        ]) . '>' . nene_render_widget($bp['child'] ?? null, nene_inline($ctx)) . '</span>';
    }

    return '<span class="nn-avatar"' . nene_style([
        'width' => $size,
        'height' => $size,
        'background' => $src ? null : nene_color($p['backgroundColor'] ?? null),
    ]) . '>' . $inner . $badge . '</span>';
}

nene_register('Avatar', 'nene_w_avatar');
