<?php

function nene_w_scroll_view(array $p, array $ctx): string {
    $child = nene_render_widget($p['child'] ?? null, $ctx);
    if ($child === '') return '';

    $horizontal = ($p['scrollDirection'] ?? 'vertical') === 'horizontal';
    $scrolls = ($p['physics'] ?? 'scroll') !== 'never_scroll';

    $class = 'nn-scroll' . ($horizontal ? ' nn-scroll-x' : ' nn-scroll-y') . ($scrolls ? '' : ' nn-scroll-none');
    return '<div class="' . $class . '">' . $child . '</div>';
}

nene_register('SingleChildScrollView', 'nene_w_scroll_view');
