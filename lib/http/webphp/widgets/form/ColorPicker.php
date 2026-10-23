<?php

// <input type="color"> only accepts #rrggbb.
function nene_w_color_picker(array $p, array $ctx, array $w): string {
    $color = nene_color($p['value'] ?? null) ?? '#000000';
    if (strlen($color) === 4) $color = '#' . $color[1] . $color[1] . $color[2] . $color[2] . $color[3] . $color[3];
    if (!preg_match('/^#[0-9a-f]{6}/i', $color)) $color = '#000000';

    $input = '<input class="nn-color" type="color" name="' . nene_esc(nene_field_name($w)) . '" value="' . substr($color, 0, 7) . '">';

    return !empty($p['showLabel'])
        ? '<label class="nn-color-label">' . $input . '<span>' . substr($color, 0, 7) . '</span></label>'
        : $input;
}

nene_register('ColorPicker', 'nene_w_color_picker');
