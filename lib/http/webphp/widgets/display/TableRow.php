<?php

function nene_w_table_row(array $p, array $ctx): string {
    $selected = !empty($p['selected']);
    return '<tr' . ($selected ? ' class="nn-selected" aria-selected="true"' : '') . '>' . nene_render_list($p['cells'] ?? [], $ctx) . '</tr>';
}

nene_register('TableRow', 'nene_w_table_row');
