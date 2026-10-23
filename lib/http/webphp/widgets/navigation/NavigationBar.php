<?php

function nene_w_navigation_bar(array $p, array $ctx): string {
    $items = nene_render_list($p['children'] ?? [], ['navSelected' => $p['selectedKey'] ?? null] + nene_inline($ctx), 'li');
    if ($items === '') return '';

    return '<nav class="nn-navbar"><ul' . nene_style([
        'justify-content' => nene_main_axis($p['alignment'] ?? null),
    ]) . '>' . $items . '</ul></nav>';
}

nene_register('NavigationBar', 'nene_w_navigation_bar');
