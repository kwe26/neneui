<?php

function nene_w_navigation_rail(array $p, array $ctx): string {
    $inline = nene_inline($ctx);

    $header = nene_render_list($p['header'] ?? [], $inline);
    $items = nene_render_list($p['children'] ?? [], $inline, 'li');
    $footer = nene_render_list($p['footer'] ?? [], $inline);
    if ($header . $items . $footer === '') return '';

    return '<nav class="nn-rail' . (!empty($p['expanded']) ? ' nn-rail-expanded' : '') . '">'
        . ($header !== '' ? '<div class="nn-rail-header">' . $header . '</div>' : '')
        . ($items !== '' ? '<ul>' . $items . '</ul>' : '')
        . ($footer !== '' ? '<div class="nn-rail-footer">' . $footer . '</div>' : '')
        . '</nav>';
}

nene_register('NavigationRail', 'nene_w_navigation_rail');
