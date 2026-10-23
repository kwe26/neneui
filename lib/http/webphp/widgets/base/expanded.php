<?php

function nene_w_expanded(array $p, array $ctx): string {
    $flex = max(1, (int) ($p['flex'] ?? 1));
    return '<div class="nn-expanded"' . nene_style(['flex' => "$flex 1 0%"]) . '>'
        . nene_render_widget($p['child'] ?? null, $ctx)
        . '</div>';
}

nene_register('Expanded', 'nene_w_expanded');
