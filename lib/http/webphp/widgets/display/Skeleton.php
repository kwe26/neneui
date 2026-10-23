<?php

// Placeholder while loading: keeps the child's size but hides its content.
function nene_w_skeleton(array $p, array $ctx): string {
    return '<div class="nn-skeleton" aria-hidden="true">' . nene_render_widget($p['child'] ?? null, $ctx) . '</div>';
}

nene_register('Skeleton', 'nene_w_skeleton');
