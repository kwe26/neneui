<?php

function nene_w_image(array $p, array $ctx, array $w): string {
    $src = nene_image_src($p['path'] ?? null);
    if (!$src) return '';

    $fit = match ($p['fit'] ?? null) {
        'fill' => 'fill',
        'contain', 'fitWidth', 'fitHeight' => 'contain',
        'cover' => 'cover',
        default => null,
    };

    $attrs = 'src="' . nene_esc($src) . '" alt="' . nene_esc(nene_id_label($w)) . '" loading="lazy" decoding="async"';
    if (!empty($p['width'])) $attrs .= ' width="' . (int) $p['width'] . '"';
    if (!empty($p['height'])) $attrs .= ' height="' . (int) $p['height'] . '"';

    return '<img class="nn-image" ' . $attrs . nene_style(['object-fit' => $fit]) . '>';
}

nene_register('Image', 'nene_w_image');
