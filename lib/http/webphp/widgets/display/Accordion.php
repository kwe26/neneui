<?php

function nene_w_accordion(array $p, array $ctx): string {
    $items = nene_render_list($p['items'] ?? [], $ctx);
    return $items === '' ? '' : '<div class="nn-accordion">' . $items . '</div>';
}

function nene_w_accordion_item(array $p, array $ctx): string {
    return '<details class="nn-accordion-item"' . (!empty($p['expanded']) ? ' open' : '') . '>'
        . '<summary>' . nene_render_widget($p['trigger'] ?? null, nene_inline($ctx)) . '</summary>'
        . '<div class="nn-accordion-content">' . nene_render_widget($p['content'] ?? null, $ctx) . '</div>'
        . '</details>';
}

nene_register('Accordion', 'nene_w_accordion');
nene_register('AccordionItem', 'nene_w_accordion_item');
// The TS helper emits "AccordtionTrigger" (sic); accept both spellings.
nene_register(['AccordtionTrigger', 'AccordionTrigger'], fn (array $p, array $ctx) => nene_render_widget($p['child'] ?? null, $ctx));
