<?php

function nene_w_center(array $p, array $ctx): string {
    $child = nene_render_widget($p['child'] ?? null, $ctx);
    return $child === '' ? '' : '<div class="nn-center">' . $child . '</div>';
}

nene_register('Center', 'nene_w_center');
