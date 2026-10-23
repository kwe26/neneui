<?php

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/seo.php';
require_once __DIR__ . '/widgets.php';


function render_ui($ui): void {
    if (is_string($ui)) $ui = json_decode($ui, true);
    if (!is_array($ui)) {
        http_response_code(500);
        return;
    }

    print(build_html($ui));
}

// style.css is inlined so the page renders styled from a single response.
function nene_stylesheet(): string {
    static $css = null;
    $css ??= (string) @file_get_contents(__DIR__ . '/style.css');
    return $css === '' ? '' : "<style>\n" . $css . "\n</style>";
}

function build_html(array $ui): string {
    // Non-Scaffold roots still get a document, just without SEO metadata.
    $scaffold = ($ui['name'] ?? '') === 'Scaffold' ? $ui : ['name' => 'Scaffold', 'props' => ['body' => $ui]];
    $p = nene_props($scaffold);

    $lang = nene_esc(nene_seo_lang(nene_seo($scaffold)));

    $header = nene_render_widget($p['appBar'] ?? null);
    $drawer = nene_render_widget($p['drawer'] ?? null, ['inline' => true]);
    $main = nene_render_widget($p['body'] ?? null);
    $footer = nene_render_widget($p['bottom'] ?? null, ['inline' => true]);
    $fab = nene_render_widget($p['floatingActionButton'] ?? null);

    $bodyStyle = nene_style(['background' => nene_color($p['backgroundColor'] ?? null)]);

    return "<!doctype html>\n"
        . "<html lang=\"$lang\">\n"
        . nene_render_head($scaffold, nene_stylesheet()) . "\n"
        . "<body class=\"nn-scaffold\"$bodyStyle>\n"
        . $header
        . '<div class="nn-scaffold-content">'
        . ($drawer !== '' ? '<aside class="nn-drawer">' . $drawer . '</aside>' : '')
        . '<main class="nn-main">' . $main . '</main>'
        . '</div>'
        . ($footer !== '' ? '<footer class="nn-footer">' . $footer . '</footer>' : '')
        . ($fab !== '' ? '<div class="nn-fab">' . $fab . '</div>' : '')
        . "\n</body>\n</html>";
}
