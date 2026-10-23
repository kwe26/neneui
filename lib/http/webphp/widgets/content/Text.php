<?php

function nene_text_style(array $p): array {
    $s = is_array($p['style'] ?? null) ? $p['style'] : [];

    $weight = $s['fontWeight'] ?? null;
    $weight = $weight === 'bold' ? '700' : (preg_match('/^w(\d00)$/', (string) $weight, $m) ? $m[1] : null);

    $align = $p['align'] ?? null;

    return [
        'font-size' => nene_px($s['fontSize'] ?? null),
        'font-weight' => $weight === '400' ? null : $weight,
        'line-height' => isset($s['height']) && (float) $s['height'] !== 1.0 ? (string) (float) $s['height'] : null,
        'color' => nene_color($s['color'] ?? null),
        'font-style' => ($s['fontStyle'] ?? null) === 'italic' ? 'italic' : null,
        'text-decoration' => match ($s['decoration'] ?? null) {
            'lineThrough' => 'line-through',
            'underline' => 'underline',
            'overline' => 'overline',
            default => null,
        },
        'text-align' => in_array($align, ['left', 'right', 'center', 'justify', 'end'], true) ? $align : null,
    ];
}

// Large text becomes a heading so crawlers can see the page outline.
function nene_w_text(array $p, array $ctx): string {
    $text = nene_text_value($p['text'] ?? '');
    if ($text === '') return '';

    $style = nene_text_style($p);
    $class = ($p['overflow'] ?? null) === 'ellipsis' ? ' class="nn-truncate"' : '';

    // The default 14px is the theme's base size, so don't pin it inline.
    $size = (float) ($p['style']['fontSize'] ?? 14);
    if ($size === 14.0) $style['font-size'] = null;

    $tag = !empty($ctx['inline']) ? 'span' : match (true) {
        $size >= 28 => 'h2',
        $size >= 22 => 'h3',
        $size >= 18 => 'h4',
        default => 'p',
    };

    return "<$tag$class" . nene_style($style) . '>' . nene_esc($text) . "</$tag>";
}

nene_register('Text', 'nene_w_text');
