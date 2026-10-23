<?php

function nene_w_navigation_item(array $p, array $ctx): string {
    $icon = nene_render_widget($p['child'] ?? null, nene_inline($ctx));
    $label = nene_text_value($p['label'] ?? '');

    $selected = isset($ctx['navSelected']) && (string) ($p['key'] ?? '') === (string) $ctx['navSelected'];

    return '<span class="nn-nav-item' . ($selected ? ' nn-active' : '') . '"' . ($selected ? ' aria-current="page"' : '') . '>'
        . $icon
        . ($label !== '' ? '<span class="nn-nav-label">' . nene_esc($label) . '</span>' : '')
        . '</span>';
}

nene_register('NavigationItem', 'nene_w_navigation_item');
