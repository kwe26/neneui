<?php

// Escape any value for safe output inside HTML text or attributes.
function nene_esc($value): string {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// Widgets that carry no content (Empty() has no props).
function nene_is_empty($widget): bool {
    return !is_array($widget) || !isset($widget['name']) || $widget['name'] === 'Empty';
}

function nene_props($widget): array {
    return (is_array($widget) && isset($widget['props']) && is_array($widget['props'])) ? $widget['props'] : [];
}

// Text can be a plain string or a Var({ template, variable }); for crawlers we
// fall back to the template with its %1 / {%1} placeholders removed.
function nene_text_value($text): string {
    if (is_array($text)) {
        $text = $text['template'] ?? '';
        $text = preg_replace('/\{?%\d+\}?/', '', (string) $text);
        $text = preg_replace(['/\(\s*\)/u', '/\s+([,.!?;:)])/u', '/\s{2,}/u'], ['', '$1', ' '], $text);
    }
    return trim((string) $text);
}

// UTF-8 safe character helpers (the mbstring extension isn't guaranteed).
function nene_chars(string $text): array {
    preg_match_all('/./us', $text, $m);
    return $m[0];
}

function nene_first_chars(string $text, int $n): string {
    return implode('', array_slice(nene_chars($text), 0, $n));
}

// Text content of a widget tree (used for labels/placeholders given as Text widgets).
function nene_plain_text($widget): string {
    if (is_string($widget)) return trim($widget);
    if (nene_is_empty($widget)) return '';
    if ($widget['name'] === 'Text') return nene_text_value(nene_props($widget)['text'] ?? '');

    $parts = [];
    foreach (nene_props($widget) as $value) {
        if (!is_array($value)) continue;
        foreach (isset($value['name']) ? [$value] : (array_is_list($value) ? $value : []) as $child) {
            $text = nene_plain_text($child);
            if ($text !== '') $parts[] = $text;
        }
    }
    return implode(' ', $parts);
}

// Image paths are encoded as "local+...", "web+..." or "memory+..." (see core.ts).
function nene_image_src($path): ?string {
    if (!is_string($path) || $path === '') return null;

    if (str_starts_with($path, 'web+')) return substr($path, 4);
    if (str_starts_with($path, 'local+')) {
        $local = substr($path, 6);
        return $local === '' ? null : '/' . ltrim($local, '/');
    }

    // memory+ images only exist at runtime.
    return null;
}

// Turns an id like "#hero_banner" into "hero banner" for alt text fallbacks.
function nene_id_label($widget): string {
    $id = is_array($widget) ? (string) ($widget['id'] ?? '') : '';
    return trim(preg_replace('/[#_\-]+/', ' ', $id));
}

// "#userName" -> "userName", for form field names.
function nene_field_name($widget): string {
    $id = is_array($widget) ? (string) ($widget['id'] ?? '') : '';
    return preg_replace('/[^A-Za-z0-9_\-]/', '', $id);
}

// ---------------------------------------------------------------------------
// Styling
// ---------------------------------------------------------------------------

// Builds a style="" attribute from [property => value], skipping null/'' values.
function nene_style(array $decls): string {
    $css = [];
    foreach ($decls as $prop => $value) {
        if ($value === null || $value === '') continue;
        $css[] = $prop . ':' . $value;
    }
    return $css ? ' style="' . nene_esc(implode(';', $css)) . '"' : '';
}

function nene_px($value): ?string {
    if (!is_numeric($value)) return null;
    return ((float) $value + 0) . 'px';
}

// Accepts "#rgb", "#rrggbb", "#aarrggbb" (Flutter order) and the Colors enum
// names. "#DEFAULT" and malformed values return null so the theme applies.
function nene_color($color): ?string {
    if (!is_string($color)) return null;
    $color = trim($color);

    if (in_array(strtolower($color), ['red', 'blue', 'green', 'black', 'white', 'violet', 'transparent'], true)) {
        return strtolower($color);
    }

    if (!preg_match('/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i', $color, $m)) return null;

    $hex = $m[1];
    if (strlen($hex) === 8) {
        // Flutter's 0xAARRGGBB -> CSS #RRGGBBAA
        return '#' . substr($hex, 2) . substr($hex, 0, 2);
    }
    return '#' . $hex;
}

function nene_main_axis($value): ?string {
    return match ($value) {
        'start' => 'flex-start',
        'center' => 'center',
        'end' => 'flex-end',
        'spaceBetween' => 'space-between',
        'spaceAround' => 'space-around',
        'spaceEvenly' => 'space-evenly',
        default => null,
    };
}

function nene_cross_axis($value): ?string {
    return match ($value) {
        'start' => 'flex-start',
        'center' => 'center',
        'end' => 'flex-end',
        'stretch' => 'stretch',
        default => null,
    };
}

// EdgeInsets { l, r, t, b } -> CSS padding shorthand.
function nene_edge_insets($insets): ?string {
    if (!is_array($insets)) return null;
    $side = fn ($k) => ((float) ($insets[$k] ?? 0) + 0) . 'px';
    return $side('t') . ' ' . $side('r') . ' ' . $side('b') . ' ' . $side('l');
}

// ---------------------------------------------------------------------------
// Links
// ---------------------------------------------------------------------------

// NeneUI routes ("/ui/home") are mapped to page URLs by a resolver, so the
// host page (e.g. http.php) decides how routes are served.
function nene_set_route_resolver(callable $resolver): void {
    $GLOBALS['__nene_route_resolver'] = $resolver;
}

function nene_route_href(string $path): string {
    $resolver = $GLOBALS['__nene_route_resolver'] ?? null;
    return $resolver ? $resolver($path) : $path;
}

// Turns navigation / launch_url actions into a crawlable link.
// Returns ['href' => ..., 'external' => bool] or null.
function nene_action_link($action): ?array {
    if (!is_array($action)) return null;

    $data = $action['data'] ?? null;

    switch ($action['action'] ?? null) {
        case 'navigate':
        case 'navigate_pushreplace':
            return is_string($data) && $data !== '' ? ['href' => nene_route_href($data), 'external' => false] : null;

        case 'launch_url':
            $url = is_array($data) ? ($data['url'] ?? '') : '';
            return preg_match('#^(https?:|mailto:|tel:)#i', $url) ? ['href' => $url, 'external' => true] : null;

        case 'multi_action':
            foreach (is_array($data) ? $data : [] as $sub) {
                if ($link = nene_action_link($sub)) return $link;
            }
            return null;
    }

    return null;
}
