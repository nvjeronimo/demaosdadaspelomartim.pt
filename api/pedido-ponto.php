<?php
/* "Queremos ser ponto de recolha": guarda o pedido para o painel dos pais e avisa por email. */
require __DIR__ . '/conteudo.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false, 'why' => 'metodo'], 405);
$in = json_decode(file_get_contents('php://input') ?: '{}', true) ?: $_POST;
if (!empty($in['site'])) responde(['ok' => true]);                       // armadilha para robôs
$c = fn($k, $n) => trim(mb_substr(strip_tags((string)($in[$k] ?? '')), 0, $n));
$nome = $c('nome', 120); $local = $c('localidade', 60); $morada = $c('morada', 200); $contacto = $c('contacto', 120); $nota = $c('nota', 1000);
$tipo = array_key_exists($in['tipo'] ?? '', TIPOS_PONTO) ? $in['tipo'] : 'comercio';
if ($nome === '' || $local === '' || $contacto === '' || empty($in['consentimento'])) responde(['ok' => false, 'why' => 'campos'], 422);
$db = conteudo_db();
if (!limite($db, 'pedido_ponto', 3, 3600)) responde(['ok' => false, 'why' => 'limite'], 429);
$db->prepare('INSERT INTO pedidos_pontos(nome,tipo,localidade,morada,contacto,nota,criado) VALUES (?,?,?,?,?,?,?)')->execute([$nome, $tipo, $local, $morada, $contacto, $nota, date('c')]);
$texto = "Novo pedido para ser ponto de recolha\n\nNome: $nome\nTipo: " . TIPOS_PONTO[$tipo] . "\nLocalidade: $local\nMorada: $morada\nContacto: $contacto\n" . ($nota !== '' ? "\nNota:\n$nota\n" : '') . "\n---\nPara aprovar e pôr no mapa: " . SITE . "/painel/?s=pedidos\n";
envia(DESTINO, "Site: $nome quer ser ponto de recolha", $texto, filter_var($contacto, FILTER_VALIDATE_EMAIL) ? $contacto : '');
responde(['ok' => true]);
