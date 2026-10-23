<?php

// The card is revealed with CSS on hover / keyboard focus.
function nene_w_hover_card(array $p, array $ctx): string {
    $child = nene_render_widget($p['child'] ?? null, $ctx);
    $card = nene_render_widget($p['hoverCard'] ?? null, $ctx);
    if ($card === '') return $child;

    return '<span class="nn-hover" tabindex="0">' . $child . '<span class="nn-hover-card" role="tooltip">' . $card . '</span></span>';
}

nene_register('HoverCard', 'nene_w_hover_card');
