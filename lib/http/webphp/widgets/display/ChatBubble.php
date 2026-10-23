<?php

// ChatBubble's own color defaults to #ffffff, so the ChatGroup color is used
// unless the bubble sets something else.
function nene_w_chat_bubble(array $p, array $ctx): string {
    $color = strtolower((string) ($p['color'] ?? '#ffffff')) === '#ffffff'
        ? ($ctx['chatColor'] ?? null)
        : nene_color($p['color']);

    return '<div class="nn-chat-bubble nn-chat-' . nene_esc($ctx['chatType'] ?? 'plain') . '"' . nene_style([
        'background' => $color,
        'color' => $color ? '#fff' : null,
        'border-radius' => $ctx['chatRadius'] ?? null,
    ]) . '>' . nene_render_widget($p['child'] ?? null, nene_inline($ctx)) . '</div>';
}

nene_register('ChatBubble', 'nene_w_chat_bubble');
