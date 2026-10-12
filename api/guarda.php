<?php
/* Prova de browser dos formulários (ver guarda_* em config.php): entrega um desafio assinado e datado. A página pede-o
   quando alguém começa a preencher um formulário, resolve-o em segundo plano e envia a resposta com o pedido. */
require __DIR__ . '/config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') responde(['ok' => false], 405);
$de = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if (($de !== '' && !in_array(parse_url($de, PHP_URL_HOST), DOMINIOS, true)) || !limite(db(), 'guarda', 30, 600)) responde(['ok' => false], 429);
responde(['ok' => true] + guarda_emite());
