<?php

require_once __DIR__ . '/helpers.php';

// Scaffold.props.seo as produced by Seo() in lib/base/seo.ts.
// Optional fields left undefined in TS are absent from the JSON.
function nene_seo(array $scaffold): array {
    $seo = nene_props($scaffold)['seo'] ?? [];
    return is_array($seo) ? $seo : [];
}

// "en_US" -> "en-US" for <html lang>.
function nene_seo_lang(array $seo): string {
    return str_replace('_', '-', (string) ($seo['locale'] ?? 'en'));
}

function nene_meta(string $attr, string $key, $value): ?string {
    if ($value === null || $value === '') return null;
    return '<meta ' . $attr . '="' . nene_esc($key) . '" content="' . nene_esc($value) . '">';
}

// $extra is appended after the SEO tags (e.g. the inlined stylesheet).
function nene_render_head(array $scaffold, string $extra = ''): string {
    $seo = nene_seo($scaffold);

    $title = $seo['title'] ?? '';
    $desc = $seo['desc'] ?? '';
    $image = $seo['image'] ?? '';
    $keywords = is_array($seo['keywords'] ?? null) ? implode(', ', $seo['keywords']) : '';

    $tags = [
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        $title !== '' ? '<title>' . nene_esc($title) . '</title>' : null,
        nene_meta('name', 'description', $desc),
        nene_meta('name', 'keywords', $keywords),
        nene_meta('name', 'author', $seo['author'] ?? null),
        nene_meta('name', 'robots', $seo['robots'] ?? null),
        nene_meta('name', 'theme-color', $seo['themeColor'] ?? null),
        !empty($seo['canonical']) ? '<link rel="canonical" href="' . nene_esc($seo['canonical']) . '">' : null,

        // Open Graph
        nene_meta('property', 'og:type', $seo['type'] ?? null),
        nene_meta('property', 'og:title', $title),
        nene_meta('property', 'og:description', $desc),
        nene_meta('property', 'og:url', $seo['canonical'] ?? null),
        nene_meta('property', 'og:site_name', $seo['siteName'] ?? null),
        nene_meta('property', 'og:locale', $seo['locale'] ?? null),
        nene_meta('property', 'og:image', $image),
        nene_meta('property', 'og:image:alt', $image !== '' ? ($seo['imageAlt'] ?? null) : null),
        nene_meta('property', 'og:image:width', $image !== '' ? ($seo['imageWidth'] ?? null) : null),
        nene_meta('property', 'og:image:height', $image !== '' ? ($seo['imageHeight'] ?? null) : null),
        nene_meta('property', 'article:published_time', $seo['publishedTime'] ?? null),
        nene_meta('property', 'article:modified_time', $seo['modifiedTime'] ?? null),

        // Twitter / X
        nene_meta('name', 'twitter:card', $seo['twitterCard'] ?? null),
        nene_meta('name', 'twitter:site', $seo['twitterSite'] ?? null),
        nene_meta('name', 'twitter:creator', $seo['twitterCreator'] ?? null),
        nene_meta('name', 'twitter:title', $title),
        nene_meta('name', 'twitter:description', $desc),
        nene_meta('name', 'twitter:image', $image),
        nene_meta('name', 'twitter:image:alt', $image !== '' ? ($seo['imageAlt'] ?? null) : null),
    ];

    // Structured data; JSON_HEX_TAG keeps "</script>" in values from closing the tag.
    if (!empty($seo['jsonLd']) && is_array($seo['jsonLd'])) {
        $json = json_encode($seo['jsonLd'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG);
        if ($json !== false) $tags[] = '<script type="application/ld+json">' . $json . '</script>';
    }

    if ($extra !== '') $tags[] = $extra;

    $tags = array_filter($tags);
    return "<head>\n    " . implode("\n    ", $tags) . "\n</head>";
}
