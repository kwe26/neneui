<?php

// Buttons whose action navigates or opens a URL render as <a> so crawlers can
// follow them; everything else is a plain <button>.
function nene_w_button(array $p, array $ctx): string {
    $inline = nene_inline($ctx);
    $label = nene_render_widget($p['child'] ?? null, $inline);
    $leading = nene_render_widget($p['leading'] ?? null, $inline);
    if ($label === '' && $leading === '') return '';

    $variant = match ($p['type'] ?? 'normal') {
        'primary' => 'primary',
        'secondary' => 'secondary',
        'danger' => 'destructive',
        'success' => 'success',
        'info' => 'info',
        'warning' => 'warning',
        default => 'outline',
    };

    $size = match ($p['density'] ?? 'normal') {
        'compact', 'dense' => 'sm',
        'comfortable' => 'lg',
        'icon' => 'icon',
        default => 'md',
    };

    $class = "nn-btn nn-btn-$variant nn-btn-$size" . (($p['shape'] ?? '') === 'circle' ? ' nn-btn-circle' : '');
    $inner = $leading . $label;
    $disabled = !empty($p['disabled']);

    $link = $disabled ? null : nene_action_link($p['onPressed'] ?? null);
    if ($link) {
        return '<a class="' . $class . '" href="' . nene_esc($link['href']) . '"'
            . ($link['external'] ? ' target="_blank" rel="noopener noreferrer"' : '')
            . '>' . $inner . '</a>';
    }

    return '<button class="' . $class . '" type="button"' . ($disabled ? ' disabled' : '') . '>' . $inner . '</button>';
}

nene_register(['Button', 'Submit'], 'nene_w_button');
