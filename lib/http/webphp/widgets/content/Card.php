<?php

function nene_w_card(array $p, array $ctx): string {
    $type = in_array($p['type'] ?? '', ['filled', 'outlined'], true) ? $p['type'] : 'normal';

    return '<article class="nn-card nn-card-' . $type . '"' . nene_style([
        'padding' => nene_edge_insets($p['padding'] ?? null),
        'background' => nene_color($p['color'] ?? null),
    ]) . '>' . nene_render_widget($p['child'] ?? null, $ctx) . '</article>';
}

nene_register('Card', 'nene_w_card');
