<?php
/* "Tampas por todo o lado": cada visitante marca a sua terra. A posição é arredondada a ~5 km; nada pessoal.
   GET → {ok, pins:[[lat,lng,n],…]}  · POST {lat,lng} → {ok} */
require __DIR__ . '/config.php';
$db = db();
$db->exec('CREATE TABLE IF NOT EXISTS pins(lat REAL, lng REAL, n INT, PRIMARY KEY(lat,lng))');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $b = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
  $lat = (float)($b['lat'] ?? 999); $lng = (float)($b['lng'] ?? 999);
  if ($lat < -85 || $lat > 85 || $lng < -180 || $lng > 180) responde(['ok' => false], 422);
  if (!limite($db, 'pins', 3, 86400)) responde(['ok' => false, 'why' => 'limite'], 429);
  $r = fn($v) => round($v / 0.05) * 0.05;
  $db->prepare('INSERT INTO pins VALUES (?,?,1) ON CONFLICT(lat,lng) DO UPDATE SET n = n + 1')->execute([$r($lat), $r($lng)]);
  responde(['ok' => true]);
}
header('Cache-Control: public, max-age=60');
responde(['ok' => true, 'pins' => array_map(fn($p) => [(float)$p['lat'], (float)$p['lng'], (int)$p['n']], $db->query('SELECT lat, lng, n FROM pins')->fetchAll())]);
