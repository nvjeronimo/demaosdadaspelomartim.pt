<?php
/* Estatísticas que respeitam a privacidade: só contadores por dia (página ou ação). Sem cookies, sem IP, sem dispositivo.
   POST {t:'v'|'e', k:'/mapa.html'|'desafio_fim', …}  → 204
   GET  ?a=painel&k=<chave>                          → tabela dos últimos 60 dias (a chave está em ~/dados/painel.txt) */
require __DIR__ . '/config.php';
$db = db();
$db->exec('CREATE TABLE IF NOT EXISTS stats(dia TEXT, tipo TEXT, chave TEXT, n INT, PRIMARY KEY(dia,tipo,chave))');
function chave_painel(): string {
  $f = DADOS . '/painel.txt';
  if (!is_file($f)) { file_put_contents($f, substr(hash_hmac('sha256', 'painel', segredo()), 0, 32)); chmod($f, 0600); }
  return trim(file_get_contents($f));
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $b = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
  $t = ($b['t'] ?? '') === 'e' ? 'acao' : 'visita';
  $k = substr(preg_replace('/[^a-z0-9_\/.\-:]/i', '', (string)($b['k'] ?? '')), 0, 80);
  if ($k !== '' && limite($db, 'stats', 400, 600)) {
    $db->prepare('INSERT INTO stats VALUES (?,?,?,1) ON CONFLICT(dia,tipo,chave) DO UPDATE SET n = n + 1')->execute([date('Y-m-d'), $t, $k]);
  }
  http_response_code(204); exit;
}
if (($_GET['a'] ?? '') === 'painel' && hash_equals(chave_painel(), (string)($_GET['k'] ?? ''))) {
  $desde = date('Y-m-d', strtotime('-60 days'));
  $q = $db->prepare('SELECT tipo, chave, SUM(n) n, SUM(CASE WHEN dia >= ? THEN n ELSE 0 END) n7 FROM stats WHERE dia >= ? GROUP BY tipo, chave ORDER BY tipo DESC, n DESC');
  $q->execute([date('Y-m-d', strtotime('-7 days')), $desde]);
  $dias = $db->prepare("SELECT dia, SUM(n) n FROM stats WHERE tipo='visita' AND dia >= ? GROUP BY dia ORDER BY dia DESC"); $dias->execute([$desde]);
  header('Content-Type: text/html; charset=utf-8'); header('X-Robots-Tag: noindex');
  $h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
  echo '<!doctype html><meta name="viewport" content="width=device-width"><title>Estatísticas · De mãos dadas pelo Martim</title><style>body{font:16px system-ui;margin:24px;max-width:760px;color:#1B1D2A}table{border-collapse:collapse;width:100%;margin:10px 0 28px}td,th{padding:6px 8px;border-bottom:1px solid #ddd;text-align:left}td.n{text-align:right;font-variant-numeric:tabular-nums}h2{margin:24px 0 4px}</style>';
  echo '<h1>Estatísticas (últimos 60 dias)</h1><p>Contagens simples, sem cookies nem dados pessoais. Uma "visita" é uma página aberta.</p>';
  foreach (['visita' => 'Páginas vistas', 'acao' => 'Ações'] as $tipo => $titulo) {
    echo "<h2>$titulo</h2><table><tr><th></th><th class=n>7 dias</th><th class=n>60 dias</th></tr>";
    foreach ($q->fetchAll() as $r) if ($r['tipo'] === $tipo) echo '<tr><td>' . $h($r['chave']) . '</td><td class=n>' . (int)$r['n7'] . '</td><td class=n>' . (int)$r['n'] . '</td></tr>';
    echo '</table>'; $q->execute([date('Y-m-d', strtotime('-7 days')), $desde]);
  }
  echo '<h2>Páginas vistas por dia</h2><table>';
  foreach ($dias as $r) echo '<tr><td>' . $h($r['dia']) . '</td><td class=n>' . (int)$r['n'] . '</td></tr>';
  echo '</table>'; exit;
}
http_response_code(404);
