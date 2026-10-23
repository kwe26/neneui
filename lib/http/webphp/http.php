<?php
include_once 'render.php';

$path = $_GET['path'];
$port = $_GET['port'];

// NeneUI routes (e.g. Action.NAVIGATE '/ui/home') link back through this page.
nene_set_route_resolver(fn ($route) => '?' . http_build_query(['path' => $route, 'port' => $port]));

$ch = curl_init();

$payload = array();

curl_setopt($ch, CURLOPT_URL, "http://localhost:$port$path");

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload), // Payload converted to a JSON string
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ]
]);

$response = json_decode(curl_exec($ch), "false");

render_ui($response);

curl_close($ch);