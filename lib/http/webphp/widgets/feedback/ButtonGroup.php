<?php

function nene_w_button_group(array $p, array $ctx): string {
    $buttons = nene_render_list($p['children'] ?? [], $ctx);
    if ($buttons === '') return '';

    $vertical = ($p['direction'] ?? 'horizontal') === 'vertical';
    return '<div class="nn-btn-group' . ($vertical ? ' nn-btn-group-vertical' : '') . '" role="group">' . $buttons . '</div>';
}

nene_register('ButtonGroup', 'nene_w_button_group');
