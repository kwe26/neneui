<?php

// decoration is a BoxDecoration ({ color, image, radius, borderColor, borderWidth })
// or Empty() when unset.
function nene_w_container(array $p, array $ctx): string {
    $deco = $p['decoration'] ?? null;
    $style = [];

    if (is_array($deco) && !isset($deco['name'])) {
        $image = nene_image_src($deco['image'] ?? null);
        $borderWidth = nene_px($deco['borderWidth'] ?? null);
        $borderColor = nene_color($deco['borderColor'] ?? null);

        $style = [
            'background-color' => nene_color($deco['color'] ?? null),
            'background-image' => $image ? 'url("' . $image . '")' : null,
            'background-size' => $image ? 'cover' : null,
            'border-radius' => nene_px($deco['radius'] ?? null),
            'border' => $borderWidth && $borderColor ? "$borderWidth solid $borderColor" : null,
        ];
    }

    return '<div class="nn-container"' . nene_style($style) . '>' . nene_render_widget($p['child'] ?? null, $ctx) . '</div>';
}

nene_register('Container', 'nene_w_container');
