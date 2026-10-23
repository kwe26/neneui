<?php

function nene_w_text_field(array $p, array $ctx, array $w): string {
    $type = match ($p['inputType'] ?? 'text') {
        'number' => 'number',
        'phone' => 'tel',
        'password' => 'password',
        default => 'text',
    };

    $placeholder = nene_plain_text($p['placeholder'] ?? null);
    $value = nene_props($p['controller'] ?? null)['value'] ?? '';

    return '<input class="nn-input" type="' . $type . '" name="' . nene_esc(nene_field_name($w)) . '"'
        . ($placeholder !== '' ? ' placeholder="' . nene_esc($placeholder) . '" aria-label="' . nene_esc($placeholder) . '"' : '')
        . (is_string($value) && $value !== '' ? ' value="' . nene_esc($value) . '"' : '')
        . ($type === 'password' ? ' autocomplete="current-password"' : '')
        . '>';
}

nene_register('TextField', 'nene_w_text_field');
