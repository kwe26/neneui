<?php

// Each Layout's width is treated as the minimum viewport width it applies
// from; the widest matching layout wins. Implemented with scoped media queries.
function nene_w_layouts(array $p, array $ctx, array $w): string {
    static $count = 0;

    $layouts = array_values(array_filter(
        is_array($p['layouts'] ?? null) ? $p['layouts'] : [],
        fn ($l) => is_array($l) && ($l['name'] ?? '') === 'Layout'
    ));
    if (!$layouts) return '';

    usort($layouts, fn ($a, $b) => (nene_props($a)['width'] ?? 0) <=> (nene_props($b)['width'] ?? 0));

    $scope = 'nn-l' . (++$count);
    $html = '';
    $css = ".$scope>.nn-layout{display:none}";

    foreach ($layouts as $i => $layout) {
        $min = (float) (nene_props($layout)['width'] ?? 0);
        $next = isset($layouts[$i + 1]) ? (float) (nene_props($layouts[$i + 1])['width'] ?? 0) : null;

        $query = [];
        if ($min > 0) $query[] = "(min-width:{$min}px)";
        if ($next !== null && $next > $min) $query[] = '(max-width:' . ($next - 0.02) . 'px)';

        $rule = ".$scope>.nn-layout-$i{display:block}";
        $css .= $query ? '@media ' . implode(' and ', $query) . '{' . $rule . '}' : $rule;

        $html .= '<div class="nn-layout nn-layout-' . $i . '">' . nene_render_widget(nene_props($layout)['widget'] ?? null, $ctx) . '</div>';
    }

    return '<style>' . $css . '</style><div class="nn-layouts ' . $scope . '">' . $html . '</div>';
}

nene_register('Layouts', 'nene_w_layouts');
nene_register('Layout', fn (array $p, array $ctx) => nene_render_widget($p['widget'] ?? null, $ctx));
