<?php

// Frame embeds another NeneUI route; served through the route resolver.
function nene_w_frame(array $p): string {
    $path = $p['framePath'] ?? '';
    if (!is_string($path) || $path === '') return '';

    return '<iframe class="nn-frame" src="' . nene_esc(nene_route_href($path)) . '" loading="lazy" title="' . nene_esc($path) . '"></iframe>';
}

nene_register('Frame', 'nene_w_frame');
