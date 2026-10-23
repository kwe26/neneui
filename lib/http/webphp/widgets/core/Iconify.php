<?php

// Icons are drawn with the Iconify SVG API as a CSS mask, so they follow
// currentColor unless a color is given.
function nene_w_iconify(array $p): string {
    $icon = (string) ($p['icon'] ?? '');
    if (!preg_match('#^([a-z0-9\-]+)/([a-z0-9\-]+)$#i', $icon, $m)) return '';

    $url = 'https://api.iconify.design/' . $m[1] . '/' . $m[2] . '.svg';
    $size = nene_px($p['size'] ?? 24);

    return '<span class="nn-icon" aria-hidden="true"' . nene_style([
        '--nn-icon' => 'url("' . $url . '")',
        'width' => $size,
        'height' => $size,
        'color' => nene_color($p['color'] ?? null),
    ]) . '></span>';
}

nene_register('Iconify', 'nene_w_iconify');
