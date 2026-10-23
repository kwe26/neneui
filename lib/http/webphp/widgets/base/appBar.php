<?php

// The AppBar title is the page's single <h1>.
function nene_w_app_bar(array $p, array $ctx): string {
    $inline = nene_inline($ctx);

    $leading = nene_render_widget($p['leading'] ?? null, $inline);
    $title = nene_render_widget($p['title'] ?? null, $inline);
    $actions = nene_render_list($p['actions'] ?? [], $inline, 'li');

    return '<header class="nn-appbar"' . nene_style(['background' => nene_color($p['backgroundColor'] ?? null)]) . '>'
        . ($leading !== '' ? '<div class="nn-appbar-leading">' . $leading . '</div>' : '')
        . ($title !== '' ? '<h1 class="nn-appbar-title">' . $title . '</h1>' : '')
        . ($actions !== '' ? '<nav class="nn-appbar-actions"><ul>' . $actions . '</ul></nav>' : '')
        . '</header>';
}

nene_register('AppBar', 'nene_w_app_bar');
