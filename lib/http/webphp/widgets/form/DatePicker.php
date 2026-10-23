<?php

// defaultDate is a millisecond timestamp sent as a string.
function nene_w_date_picker(array $p, array $ctx, array $w): string {
    $ms = $p['defaultDate'] ?? null;
    $value = is_numeric($ms) ? gmdate('Y-m-d', (int) floor(((float) $ms) / 1000)) : '';
    $label = nene_plain_text($p['dialogTitle'] ?? null);

    return '<input class="nn-input nn-date" type="date" name="' . nene_esc(nene_field_name($w)) . '"'
        . ($value !== '' ? ' value="' . $value . '"' : '')
        . ($label !== '' ? ' aria-label="' . nene_esc($label) . '"' : '')
        . '>';
}

nene_register('DatePicker', 'nene_w_date_picker');
