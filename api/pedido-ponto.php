<?php
/* "Queremos ser ponto de recolha": guarda o pedido para o painel dos pais e avisa por email. */
require __DIR__ . '/conteudo.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false, 'why' => 'metodo'], 405);
$in = json_decode(file_get_contents('php://input') ?: '{}', true) ?: $_POST;
if (!mesmo_site()) responde(['ok' => false, 'why' => 'origem'], 403);     // só o formulário deste site pode enviar
if (!empty($in['site'])) responde(['ok' => true]);                       // armadilha para robôs
$db = conteudo_db();
$prova = exige_prova($db, $in);                                          // prova de browser real (config.php)
$c = fn($k, $n) => trim(mb_substr(strip_tags((string)($in[$k] ?? '')), 0, $n));
$nome = $c('nome', 120); $local = $c('localidade', 60); $morada = $c('morada', 200); $contacto = $c('contacto', 120); $nota = $c('nota', 1000);
$tipo = array_key_exists($in['tipo'] ?? '', TIPOS_PONTO) ? $in['tipo'] : 'comercio';
if ($nome === '' || $local === '' || $contacto === '' || empty($in['consentimento'])) responde(['ok' => false, 'why' => 'campos'], 422);
if (!limite($db, 'pedido_ponto', 3, 3600)) responde(['ok' => false, 'why' => 'limite'], 429);
guarda_gasta($db, $prova);
/* cheio de links: chega por email marcado, mas não entra na lista de pedidos do painel */
$duvida = muitos_links($nota . ' ' . $morada . ' ' . $nome);
if (!$duvida) $db->prepare('INSERT INTO pedidos_pontos(nome,tipo,localidade,morada,contacto,nota,criado) VALUES (?,?,?,?,?,?,?)')->execute([$nome, $tipo, $local, $morada, $contacto, $nota, date('c')]);
$texto = "Novo pedido para ser ponto de recolha\n\nNome: $nome\nTipo: " . TIPOS_PONTO[$tipo] . "\nLocalidade: $local\nMorada: $morada\nContacto: $contacto\n" . ($nota !== '' ? "\nNota:\n$nota\n" : '') . "\n---\n" . ($duvida ? "Este pedido não foi guardado no painel (possível spam).\n" : "Para aprovar e pôr no mapa: " . SITE . "/painel/?s=pedidos\n");
envia(DESTINO, ($duvida ? MARCA_DUVIDA : '') . "Site: $nome quer ser ponto de recolha", $texto, !$duvida && filter_var($contacto, FILTER_VALIDATE_EMAIL) ? $contacto : '');
responde(['ok' => true]);
