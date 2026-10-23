<?php

// progress is a 0..1 fraction.
function nene_w_progress(array $p): string {
    $value = max(0.0, min(1.0, (float) ($p['progress'] ?? 0)));
    $percent = round($value * 100, 2);

    return '<div class="nn-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' . $percent . '"' . nene_style([
        'background' => nene_color($p['backgroundColor'] ?? null),
        'color' => nene_color($p['color'] ?? null),
    ]) . '><div class="nn-progress-bar"' . nene_style(['width' => $percent . '%']) . '></div></div>';
}

nene_register('Progress', 'nene_w_progress');
