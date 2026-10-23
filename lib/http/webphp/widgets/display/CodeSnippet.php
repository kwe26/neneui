<?php

function nene_w_code_snippet(array $p, array $ctx): string {
    $lang = preg_replace('/[^a-z0-9_+\-]/i', '', (string) ($p['lang'] ?? ''));
    $actions = nene_render_list($p['actions'] ?? [], nene_inline($ctx));

    return '<figure class="nn-code">'
        . ($lang !== '' || $actions !== '' ? '<figcaption class="nn-code-bar"><span>' . nene_esc($lang) . '</span>' . $actions . '</figcaption>' : '')
        . '<pre><code' . ($lang !== '' ? ' class="language-' . $lang . '"' : '') . '>' . nene_esc($p['code'] ?? '') . '</code></pre>'
        . '</figure>';
}

nene_register('CodeSnippet', 'nene_w_code_snippet');
