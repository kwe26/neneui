<?php

function nene_w_check_box(array $p, array $ctx, array $w): string {
    return '<label class="nn-checkbox">'
        . '<input type="checkbox" name="' . nene_esc(nene_field_name($w)) . '"' . (!empty($p['value']) ? ' checked' : '') . '>'
        . nene_render_widget($p['trailing'] ?? null, nene_inline($ctx))
        . '</label>';
}

nene_register('CheckBox', 'nene_w_check_box');
