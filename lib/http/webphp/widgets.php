<?php

require_once __DIR__ . '/helpers.php';

// Maps NeneUI widgets to semantic HTML. Each widget lives in
// widgets/<category>/<Widget>.php (mirroring lib/) and registers itself with
// nene_register(). Renderers receive (array $props, array $ctx, array $widget).
//
// $ctx carries rendering context down the tree:
//   inline => true when inside a button/link/heading, so Text renders as <span>

function &nene_registry(): array {
    static $registry = [];
    return $registry;
}

function nene_register(string|array $names, callable $render): void {
    $registry = &nene_registry();
    foreach ((array) $names as $name) $registry[$name] = $render;
}

function nene_render_widget($widget, array $ctx = []): string {
    if (!is_array($widget)) return '';

    // A plain list of widgets.
    if (array_is_list($widget)) return nene_render_list($widget, $ctx);

    if (nene_is_empty($widget)) return '';

    $render = nene_registry()[$widget['name']] ?? null;
    $props = nene_props($widget);

    // Unknown wrappers: render every widget-like prop in order.
    return $render ? $render($props, $ctx, $widget) : nene_render_children($props, $ctx);
}

function nene_render_list($widgets, array $ctx = [], ?string $wrap = null): string {
    if (!is_array($widgets)) return '';
    if (isset($widgets['name'])) $widgets = [$widgets];

    $html = '';
    foreach ($widgets as $child) {
        $inner = nene_render_widget($child, $ctx);
        if ($inner === '') continue;
        $html .= $wrap ? "<$wrap>$inner</$wrap>" : $inner;
    }
    return $html;
}

// Generic fallback: render any prop that is a widget or a list of widgets.
function nene_render_children(array $props, array $ctx): string {
    $html = '';
    foreach ($props as $value) {
        if (!is_array($value)) continue;
        if (isset($value['name']) || array_is_list($value)) {
            $html .= nene_render_widget($value, $ctx);
        }
    }
    return $html;
}

function nene_inline(array $ctx): array {
    return ['inline' => true] + $ctx;
}

// Runtime-only widgets with no static representation.
nene_register(['ForEach', 'NeneDisplay', 'WebSocket', 'AlertDialog', 'TextEditingController'], fn () => '');

foreach (glob(__DIR__ . '/widgets/*/*.php') as $file) require_once $file;
