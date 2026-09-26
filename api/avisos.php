<?php
/* Avisos por email (novidades e eventos): inscrição com confirmação e cancelamento em 1 clique.
   POST {email, lang, site}  · GET ?a=confirmar&t=…  · GET ?a=sair&t=… */
require __DIR__ . '/conteudo.php';
$db = conteudo_db();
$pag = function (string $t, string $m) { header('Content-Type: text/html; charset=utf-8'); header('X-Robots-Tag: noindex');
  exit('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>' . $t . '</title><body style="font:18px system-ui;margin:40px;max-width:560px;line-height:1.5;color:#1B1D2A"><h1 style="font-size:1.6rem">' . $t . '</h1><p>' . $m . '</p><p><a href="' . SITE . '/">← De mãos dadas pelo Martim</a></p></body>'); };
$a = $_GET['a'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && in_array($a, ['confirmar', 'sair'], true)) {
  $t = preg_replace('/[^a-f0-9]/', '', (string)($_GET['t'] ?? ''));
  if (strlen($t) !== 40) $pag('Link inválido', 'Este link não é válido.');
  if ($a === 'confirmar') { $q = $db->prepare('UPDATE subscritores SET confirmado = 1 WHERE token = ?'); $q->execute([$t]);
    $q->rowCount() ? $pag('Inscrição confirmada 💛', 'Obrigado! Vais receber um email quando houver novidades do Martim ou um evento novo. Podes cancelar em qualquer email.') : $pag('Link inválido', 'Este link já não é válido.'); }
  $db->prepare('DELETE FROM subscritores WHERE token = ?')->execute([$t]);
  $pag('Inscrição cancelada', 'Já não vais receber emails. O teu endereço foi apagado.');
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false], 405);
$b = json_decode(file_get_contents('php://input') ?: '{}', true) ?: $_POST;
if (!empty($b['site'])) responde(['ok' => true]);
$email = mb_strtolower(trim((string)($b['email'] ?? '')));
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 160) responde(['ok' => false, 'why' => 'email'], 422);
if (!limite($db, 'avisos', 4, 3600)) responde(['ok' => false, 'why' => 'limite'], 429);
$lang = ($b['lang'] ?? 'pt') === 'en' ? 'en' : 'pt';
$q = $db->prepare('SELECT token, confirmado FROM subscritores WHERE email = ?'); $q->execute([$email]); $r = $q->fetch();
if ($r && $r['confirmado']) responde(['ok' => true, 'ja' => true]);
$tok = $r['token'] ?? bin2hex(random_bytes(20));
if (!$r) $db->prepare('INSERT INTO subscritores(email, token, confirmado, idioma, criado) VALUES (?,?,0,?,?)')->execute([$email, $tok, $lang, date('c')]);
$ok = envia($email, $lang === 'en' ? 'Confirm: news from Hand in Hand for Martim' : 'Confirma: avisos do De mãos dadas pelo Martim',
  ($lang === 'en' ? "Hi! Please confirm you want an email when there is news about Martim or a new event:\n\n" : "Olá! Confirma que queres receber um email quando houver novidades do Martim ou um evento novo:\n\n")
  . SITE . "/api/avisos.php?a=confirmar&t=$tok\n\n" . ($lang === 'en' ? "If you did not ask for this, just ignore this email." : "Se não foste tu que pediste, ignora este email."));
responde(['ok' => $ok]);
