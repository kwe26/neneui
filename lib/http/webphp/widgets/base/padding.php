<?php

function nene_w_padding(array $p, array $ctx): string {
    $child = nene_render_widget($p['child'] ?? null, $ctx);
    if ($child === '') return '';

    return '<div' . nene_style(['padding' => nene_edge_insets($p['padding'] ?? null)]) . '>' . $child . '</div>';
}

nene_register('Padding', 'nene_w_padding');
