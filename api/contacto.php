<?php
/* Formulário "Junta-te à minha equipa": envia a mensagem por email a partir do site. Não guarda a mensagem. */
require __DIR__ . '/config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false, 'why' => 'metodo'], 405);
$in = json_decode(file_get_contents('php://input') ?: '{}', true) ?: $_POST;
if (!empty($in['site'])) responde(['ok' => true]);                       // armadilha para robôs
$nome = trim(mb_substr(strip_tags($in['nome'] ?? ''), 0, 80));
$contacto = trim(mb_substr(strip_tags($in['contacto'] ?? ''), 0, 120));
$msg = trim(mb_substr(strip_tags($in['mensagem'] ?? ''), 0, 3000));
$quero = array_slice(array_map(fn($x) => mb_substr(strip_tags((string)$x), 0, 40), (array)($in['quero'] ?? [])), 0, 6);
$lang = ($in['lang'] ?? 'pt') === 'en' ? 'en' : 'pt';
if ($nome === '' || $contacto === '' || empty($in['consentimento'])) responde(['ok' => false, 'why' => 'campos'], 422);
$db = db();
if (!limite($db, 'contacto', 5, 3600)) responde(['ok' => false, 'why' => 'limite'], 429);
$q = $quero ? implode(', ', $quero) : 'outra coisa';
$texto = "Nova mensagem do site demaosdadaspelomartim.pt\n\n"
       . "Nome: $nome\nContacto: $contacto\nQuer: $q\nIdioma: " . strtoupper($lang) . "\n\n"
       . ($msg !== '' ? "Mensagem:\n$msg\n\n" : '')
       . "---\nPara responder, usa o contacto acima" . (filter_var($contacto, FILTER_VALIDATE_EMAIL) ? " (ou carrega em Responder)." : ".") . "\n";
$ok = envia(DESTINO, "Site: $nome quer $q", $texto, $contacto);
responde(['ok' => $ok, 'why' => $ok ? null : 'envio'], $ok ? 200 : 500);
