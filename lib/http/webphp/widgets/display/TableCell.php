<?php

function nene_w_table_cell(array $p, array $ctx): string {
    $attrs = '';
    if (($p['columnSpan'] ?? 1) > 1) $attrs .= ' colspan="' . (int) $p['columnSpan'] . '"';
    if (($p['rowSpan'] ?? 1) > 1) $attrs .= ' rowspan="' . (int) $p['rowSpan'] . '"';

    return '<td' . $attrs . nene_style(['background' => nene_color($p['backgroundColor'] ?? null)]) . '>'
        . nene_render_widget($p['child'] ?? null, nene_inline($ctx))
        . '</td>';
}

nene_register('TableCell', 'nene_w_table_cell');
