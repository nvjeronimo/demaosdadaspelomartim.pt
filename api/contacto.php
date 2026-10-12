<?php
/* Formulário "Junta-te à minha equipa": envia a mensagem por email a partir do site. Não guarda a mensagem. */
require __DIR__ . '/config.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false, 'why' => 'metodo'], 405);
$in = json_decode(file_get_contents('php://input') ?: '{}', true) ?: $_POST;
if (!mesmo_site()) responde(['ok' => false, 'why' => 'origem'], 403);     // só o formulário deste site pode enviar
if (!empty($in['site'])) responde(['ok' => true]);                       // armadilha para robôs
$db = db();
$prova = exige_prova($db, $in);                                          // prova de browser real (config.php)
$nome = trim(mb_substr(strip_tags($in['nome'] ?? ''), 0, 80));
$contacto = trim(mb_substr(strip_tags($in['contacto'] ?? ''), 0, 120));
$msg = trim(mb_substr(strip_tags($in['mensagem'] ?? ''), 0, 3000));
$quero = array_slice(array_map(fn($x) => mb_substr(strip_tags((string)$x), 0, 40), (array)($in['quero'] ?? [])), 0, 6);
$lang = ($in['lang'] ?? 'pt') === 'en' ? 'en' : 'pt';
if ($nome === '' || $contacto === '' || empty($in['consentimento'])) responde(['ok' => false, 'why' => 'campos'], 422);
if (!limite($db, 'contacto', 5, 3600)) responde(['ok' => false, 'why' => 'limite'], 429);
guarda_gasta($db, $prova);
/* passou a prova mas tem ar de máquina (todas as opções assinaladas, ou a mensagem cheia de links): chega marcado */
$duvida = count($quero) >= 5 || muitos_links($msg);   // o formulário tem 5 opções
$q = $quero ? implode(', ', $quero) : 'outra coisa';
$texto = "Nova mensagem do site demaosdadaspelomartim.pt\n\n"
       . "Nome: $nome\nContacto: $contacto\nQuer: $q\nIdioma: " . strtoupper($lang) . "\n\n"
       . ($msg !== '' ? "Mensagem:\n$msg\n\n" : '')
       . "---\nPara responder, usa o contacto acima" . (filter_var($contacto, FILTER_VALIDATE_EMAIL) ? " (ou carrega em Responder)." : ".") . "\n";
$ok = envia(DESTINO, ($duvida ? MARCA_DUVIDA : '') . "Site: $nome quer $q", $texto, $duvida ? '' : $contacto);
responde(['ok' => $ok, 'why' => $ok ? null : 'envio'], $ok ? 200 : 500);
