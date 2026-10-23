<?php

// Shared by Column / Row: a flex container with Flutter-style axis alignment.
function nene_flex_box(string $direction, array $p, array $ctx, ?string $gap = null): string {
    $children = nene_render_list($p['children'] ?? [], $ctx);
    if ($children === '') return '';

    return '<div class="nn-flex nn-' . $direction . '"' . nene_style([
        'justify-content' => nene_main_axis($p['mainAxis'] ?? $p['mainAxisAlignment'] ?? null),
        'align-items' => nene_cross_axis($p['crossAxis'] ?? $p['crossAxisAlignment'] ?? null),
        'gap' => $gap,
    ]) . '>' . $children . '</div>';
}

nene_register('Column', fn (array $p, array $ctx) => nene_flex_box('column', $p, $ctx));
