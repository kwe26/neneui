<?php

function nene_w_circular_progress(array $p): string {
    return '<span class="nn-spinner" role="status" aria-label="Loading"' . nene_style([
        'color' => nene_color($p['color'] ?? null),
    ]) . '></span>';
}

function nene_w_linear_progress(array $p): string {
    return '<div class="nn-progress nn-progress-indeterminate" role="progressbar" aria-label="Loading"' . nene_style([
        'height' => nene_px($p['minHeight'] ?? null),
        'color' => nene_color($p['color'] ?? null),
    ]) . '><div class="nn-progress-bar"></div></div>';
}

nene_register('CircularProgressIndicator', 'nene_w_circular_progress');
nene_register('LinearProgressIndicator', 'nene_w_linear_progress');
