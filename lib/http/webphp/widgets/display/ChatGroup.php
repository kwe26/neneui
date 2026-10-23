<?php

function nene_w_chat_group(array $p, array $ctx): string {
    $align = in_array($p['alignment'] ?? '', ['center', 'end'], true) ? $p['alignment'] : 'start';

    $bubbles = nene_render_list($p['children'] ?? [], [
        'chatColor' => nene_color($p['color'] ?? null),
        'chatType' => $p['type'] ?? 'plain',
        'chatRadius' => nene_px($p['borderRadius'] ?? null),
    ] + $ctx);
    if ($bubbles === '') return '';

    $avatar = nene_render_widget($p['avatarPrefix'] ?? null, $ctx);

    return '<div class="nn-chat-group nn-chat-' . $align . '">'
        . ($avatar !== '' ? '<div class="nn-chat-avatar">' . $avatar . '</div>' : '')
        . '<div class="nn-chat-bubbles">' . $bubbles . '</div>'
        . '</div>';
}

nene_register('ChatGroup', 'nene_w_chat_group');
