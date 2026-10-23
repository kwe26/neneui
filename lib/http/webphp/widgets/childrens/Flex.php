<?php

require_once __DIR__ . '/Column.php';

function nene_w_flex(array $p, array $ctx): string {
    $direction = ($p['direction'] ?? 'vertical') === 'horizontal' ? 'row' : 'column';
    $html = nene_flex_box($direction, $p, $ctx, nene_px($p['spacing'] ?? null));

    return ($p['textDirection'] ?? 'ltr') === 'rtl' && $html !== ''
        ? '<div dir="rtl">' . $html . '</div>'
        : $html;
}

nene_register('Flex', 'nene_w_flex');
