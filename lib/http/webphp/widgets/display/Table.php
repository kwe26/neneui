<?php

// defaultColumnWidth is FixedTableSize({ value }) or FlexTableSize({ flex, fit });
// only fixed sizes translate to a CSS width.
function nene_w_table(array $p, array $ctx): string {
    $size = $p['defaultColumnWidth'] ?? null;
    $colWidth = is_array($size) && ($size['name'] ?? '') === 'FixedTableSize'
        ? nene_px(nene_props($size)['value'] ?? null)
        : null;

    $rows = nene_render_list($p['rows'] ?? [], $ctx);
    if ($rows === '') return '';

    return '<div class="nn-table-wrap"><table class="nn-table"' . nene_style(['--nn-col-min' => $colWidth]) . '><tbody>'
        . $rows
        . '</tbody></table></div>';
}

nene_register('Table', 'nene_w_table');
