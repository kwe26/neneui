<?php

function nene_w_table_footer(array $p, array $ctx): string {
    return '<tr class="nn-table-footer">' . nene_render_list($p['cells'] ?? [], $ctx) . '</tr>';
}

nene_register('TableFooter', 'nene_w_table_footer');
