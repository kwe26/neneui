<?php

require_once __DIR__ . '/Column.php';

nene_register('Row', fn (array $p, array $ctx) => nene_flex_box('row', $p, $ctx));
