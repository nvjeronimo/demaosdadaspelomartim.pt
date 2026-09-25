<?php
/* Mural dos amigos: top 10 por nível guardado no próprio servidor (SQLite fora da pasta pública).
   GET  ?a=top                    → {ok, top:{1:[…],2:[…],3:[…]}}
   POST {id,n,terra,r,t,lv,s}     → {ok, pos}  (pos 0 = fora do top 10)
   GET  ?a=ocultar&id=…&k=…       → esconde um nome (link enviado por email à moderação) */
require __DIR__ . '/config.php';
$db = db();

function limpa(string $s): string { return mb_substr(trim(preg_replace('/\s+/u', ' ', preg_replace("/[^\p{L}\p{M} '\-.]/u", '', $s))), 0, 20); }
function valido(array $e): bool {
  return $e['n'] !== '' && !preg_match(PALAVROES, $e['n']) && !preg_match(PALAVROES, $e['terra'])
    && in_array($e['t'], [6, 10], true) && in_array($e['lv'], [1, 2, 3], true)
    && $e['r'] >= 0 && $e['r'] <= $e['t'] && $e['s'] >= $e['t'] && $e['s'] < 3600;
}
function top(PDO $db): array {
  $best = [];
  foreach ($db->query('SELECT id,n,terra,lv,r,t,s,d FROM mural WHERE oculto = 0') as $e) {
    foreach (['lv', 'r', 't', 's'] as $k) $e[$k] = (int)$e[$k];
    $k = mb_strtolower($e['n'] . '|' . $e['terra']) . '|' . $e['lv'];
    $b = $best[$k] ?? null;
    if (!$b || $e['r'] > $b['r'] || ($e['r'] === $b['r'] && $e['s'] < $b['s'])) $best[$k] = $e;
  }
  $out = [1 => [], 2 => [], 3 => []];
  foreach ($best as $e) $out[$e['lv']][] = $e;
  foreach ($out as $l => $list) {
    usort($list, fn($a, $b) => [$b['r'], $a['s'], $a['d']] <=> [$a['r'], $b['s'], $b['d']]);
    $out[$l] = array_slice($list, 0, 10);
  }
  return $out;
}
function chave(string $id): string { return substr(hash_hmac('sha256', $id, segredo()), 0, 24); }

$a = $_GET['a'] ?? '';
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $a === 'ocultar') {
  $id = (string)($_GET['id'] ?? '');
  header('Content-Type: text/html; charset=utf-8');
  if (!hash_equals(chave($id), (string)($_GET['k'] ?? ''))) { http_response_code(403); exit('<p>Link inválido.</p>'); }
  $db->prepare('UPDATE mural SET oculto = 1 WHERE id = ?')->execute([$id]);
  exit('<meta name="viewport" content="width=device-width"><p style="font:18px system-ui;margin:40px">Feito: esse nome já não aparece no <a href="' . SITE . '/mural.html">mural</a>.</p>');
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') responde(['ok' => true, 'top' => top($db)]);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') responde(['ok' => false, 'why' => 'metodo'], 405);

$b = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
$e = ['id' => substr(preg_replace('/[^a-z0-9]/', '', (string)($b['id'] ?? '')), 0, 20),
      'n' => explode(' ', limpa((string)($b['n'] ?? '')))[0], 'terra' => limpa((string)($b['terra'] ?? '')),
      'lv' => (int)($b['lv'] ?? 0), 'r' => (int)($b['r'] ?? -1), 't' => (int)($b['t'] ?? 0), 's' => (int)round((float)($b['s'] ?? 0))];
if ($e['id'] === '' || !valido($e)) responde(['ok' => false, 'why' => 'nome'], 422);
if (!limite($db, 'mural', 12, 600)) responde(['ok' => false, 'why' => 'limite'], 429);
$novo = $db->prepare('INSERT OR IGNORE INTO mural(id,n,terra,lv,r,t,s,d,criado) VALUES (?,?,?,?,?,?,?,?,?)');
$novo->execute([$e['id'], $e['n'], $e['terra'], $e['lv'], $e['r'], $e['t'], $e['s'], date('Y-m-d'), date('c')]);
$t = top($db);
$pos = 0;
foreach ($t[$e['lv']] as $i => $o) if ($o['id'] === $e['id']) { $pos = $i + 1; break; }
if ($pos && $novo->rowCount()) {
  $nivel = [1 => 'fácil', 2 => 'normal', 3 => 'difícil'][$e['lv']];
  envia(MODERACAO, "Mural: {$e['n']} entrou no top 10 ({$pos}.º, nível $nivel)",
    "Novo nome no top 10 do mural:\n\n{$e['n']}" . ($e['terra'] ? " ({$e['terra']})" : '') . "\n{$e['r']} de {$e['t']} · nível $nivel · {$e['s']} s · {$pos}.º lugar\n\n"
    . "Se este nome não deve aparecer, abre este link para o esconder:\n" . SITE . "/api/mural.php?a=ocultar&id={$e['id']}&k=" . chave($e['id']) . "\n");
}
responde(['ok' => true, 'pos' => $pos]);
