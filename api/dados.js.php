<?php
/* Dados do painel para as páginas públicas (JS). Se falhar, as páginas usam o que já trazem. */
require __DIR__ . '/conteudo.php';
header('Content-Type: application/javascript; charset=utf-8');
header('Cache-Control: public, max-age=60');
try {
  $db = conteudo_db();
  $o = [];
  $ev = $db->query('SELECT id, titulo, data, fim, hora, local, inscricao, texto, foto FROM eventos WHERE publicado = 1 ORDER BY data')->fetchAll();
  $o['EVENTOS_PAINEL'] = array_map(fn($e) => ['id' => (int)$e['id'], 'slug' => 'e' . $e['id'], 'url' => 'evento.html?id=' . $e['id'], 'date' => $e['data'], 'end' => $e['fim'] ?: $e['data'],
    'title' => [$e['titulo'], $e['titulo']], 'where' => [$e['local'], $e['local']], 'time' => $e['hora'], 'fee' => [$e['inscricao'], $e['inscricao']],
    'poster' => $e['foto'], 'alt' => [$e['titulo'], $e['titulo']], 'share' => [$e['titulo'], $e['titulo']], 'texto' => $e['texto']], $ev);
  $p = $db->query('SELECT nome n, tipo t, localidade l, lat, lng, aprox FROM pontos WHERE ativo = 1 ORDER BY ordem, id')->fetchAll();
  if ($p) $o['PONTOS'] = array_map(fn($x) => ['n' => $x['n'], 't' => $x['t'], 'l' => $x['l'], 'lat' => (float)$x['lat'], 'lng' => (float)$x['lng'], 'aprox' => (bool)$x['aprox']], $p);
  $a = $db->query('SELECT tipo, src, poster, dur, legenda, etiqueta, categoria, alt, forma FROM album WHERE visivel = 1 ORDER BY ordem, id')->fetchAll();
  if ($a) $o['ALBUM'] = $a;
  $o['RESULTADO'] = texto($db, 'resultado');
  $o['CONTADOR'] = texto($db, 'contador');
  $o['WHATSAPP'] = texto($db, 'whatsapp');
  $o['ESCOLAS'] = $db->query('SELECT nome, localidade, kg, garrafoes FROM escolas WHERE ativo = 1 ORDER BY kg DESC, garrafoes DESC, nome')->fetchAll();
  $o['NOVIDADES'] = $db->query('SELECT id, data, titulo, texto, foto, link FROM novidades WHERE publicado = 1 ORDER BY data DESC, id DESC LIMIT 50')->fetchAll();
  foreach ($o as $k => $v) if ($v !== null) echo "window.$k=" . json_encode($v, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG) . ";\n";
} catch (Throwable $e) { echo "/* sem dados */\n"; }
