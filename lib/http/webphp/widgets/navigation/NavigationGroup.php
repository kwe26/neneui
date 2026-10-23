<?php

function nene_w_navigation_group(array $p, array $ctx): string {
    $items = nene_render_list($p['children'] ?? [], $ctx, 'li');
    if ($items === '') return '';

    $label = nene_text_value($p['label'] ?? '');
    return '<div class="nn-nav-group">'
        . ($label !== '' ? '<span class="nn-nav-group-label">' . nene_esc($label) . '</span>' : '')
        . '<ul>' . $items . '</ul>'
        . '</div>';
}

nene_register('NavigationGroup', 'nene_w_navigation_group');
