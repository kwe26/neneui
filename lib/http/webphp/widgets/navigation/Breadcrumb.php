<?php

function nene_w_breadcrumb(array $p, array $ctx): string {
    $items = nene_render_list($p['children'] ?? [], nene_inline($ctx), 'li');
    if ($items === '') return '';

    $sep = ($p['separator'] ?? '') === 'slashSeparator' ? 'slash' : 'arrow';
    return '<nav class="nn-breadcrumb nn-breadcrumb-' . $sep . '" aria-label="Breadcrumb"><ol>' . $items . '</ol></nav>';
}

nene_register('Breadcrumb', 'nene_w_breadcrumb');
nene_register('MoreDots', fn () => '<span aria-hidden="true">…</span>');
