<?php

// Without a child a SizedBox is just a spacer.
function nene_w_sized_box(array $p, array $ctx): string {
    $style = nene_style([
        'width' => nene_px($p['width'] ?? null),
        'height' => nene_px($p['height'] ?? null),
    ]);

    $child = nene_render_widget($p['child'] ?? null, $ctx);

    return $child === ''
        ? '<div class="nn-spacer" aria-hidden="true"' . $style . '></div>'
        : '<div class="nn-sizedbox"' . $style . '>' . $child . '</div>';
}

nene_register('SizedBox', 'nene_w_sized_box');
