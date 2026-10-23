<?php

// items are NeneNavItem({ index, icon, title }) plain objects, not widgets.
function nene_w_nene_navbottom(array $p, array $ctx): string {
    $items = '';
    foreach (is_array($p['items'] ?? null) ? $p['items'] : [] as $item) {
        if (!is_array($item)) continue;

        $icon = nene_render_widget($item['icon'] ?? null, nene_inline($ctx));
        $title = nene_text_value($item['title'] ?? '');
        if ($icon === '' && $title === '') continue;

        $items .= '<li><span class="nn-nav-item">' . $icon
            . ($title !== '' ? '<span class="nn-nav-label">' . nene_esc($title) . '</span>' : '')
            . '</span></li>';
    }

    if ($items === '') return '';

    $type = ($p['type'] ?? 'normal') === 'float' ? ' nn-bottom-nav-float' : '';
    return '<nav class="nn-bottom-nav' . $type . '"><ul>' . $items . '</ul></nav>';
}

nene_register('NeneNavbottom', 'nene_w_nene_navbottom');
