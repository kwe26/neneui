<?php

function nene_w_video(array $p): string {
    $url = $p['url'] ?? '';
    if (!is_string($url) || $url === '') return '';

    return '<video class="nn-video" src="' . nene_esc($url) . '" controls preload="metadata" playsinline'
        . (!empty($p['width']) ? ' width="' . (int) $p['width'] . '"' : '')
        . (!empty($p['height']) ? ' height="' . (int) $p['height'] . '"' : '')
        . '></video>';
}

// VideoPlugin() emits name "VideoFrame".
nene_register('VideoFrame', 'nene_w_video');
