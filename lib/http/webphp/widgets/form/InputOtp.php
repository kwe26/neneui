<?php

function nene_w_input_otp(array $p, array $ctx, array $w): string {
    $chars = nene_chars((string) ($p['initialValue'] ?? ''));
    $name = nene_esc(nene_field_name($w));

    $html = '';
    $i = 0;
    foreach (is_array($p['children'] ?? null) ? $p['children'] : [] as $child) {
        switch ($child['name'] ?? '') {
            case 'InputOTPCharacter':
                $c = nene_props($child);
                $digitsOnly = !empty($c['allowDigit']) && empty($c['allowLowercaseAlphabet']) && empty($c['allowUppercaseAlphabet'])
                    && empty($c['onlyLowercaseAlphabet']) && empty($c['onlyUppercaseAlphabet']);

                $html .= '<input class="nn-otp-slot" type="' . (!empty($c['obscured']) ? 'password' : 'text') . '"'
                    . ' name="' . $name . '[]" maxlength="1" aria-label="Character ' . ($i + 1) . '"'
                    . ($digitsOnly ? ' inputmode="numeric" pattern="[0-9]"' : '')
                    . (isset($chars[$i]) ? ' value="' . nene_esc($chars[$i]) . '"' : '')
                    . (!empty($c['readOnly']) ? ' readonly' : '')
                    . '>';
                $i++;
                break;

            case 'InputOTPSpace':
                $html .= '<span class="nn-otp-space"></span>';
                break;

            case 'InputOTPSeparator':
                $html .= '<span class="nn-otp-separator" aria-hidden="true">-</span>';
                break;
        }
    }

    return $html === '' ? '' : '<div class="nn-otp" role="group">' . $html . '</div>';
}

nene_register('InputOTP', 'nene_w_input_otp');
