<?php
/* Conteúdo gerido no painel dos pais (SQLite em ~/dados/site.sqlite). Incluído por dados.js.php e painel/index.php. */
require_once __DIR__ . '/config.php';
const CATEGORIAS = ['video' => 'Só nos vídeos', 'martim' => 'Martim', 'bff' => 'BFF 2026', 'padel' => 'Padel', 'bolos' => 'Bolos', 'comunidade' => 'Comunidade', 'recolhas' => 'Recolhas', 'eventos' => 'Eventos'];
const TIPOS_PONTO = ['escola' => 'Escola', 'comunidade' => 'Comunidade', 'saude' => 'Saúde', 'desporto' => 'Desporto', 'comercio' => 'Comércio'];
function conteudo_db(): PDO {
  $db = db();
  $db->exec('CREATE TABLE IF NOT EXISTS eventos(id INTEGER PRIMARY KEY, titulo TEXT, data TEXT, fim TEXT, hora TEXT, local TEXT, inscricao TEXT, texto TEXT, foto TEXT, publicado INT DEFAULT 1)');
  $db->exec('CREATE TABLE IF NOT EXISTS pontos(id INTEGER PRIMARY KEY, nome TEXT, tipo TEXT, localidade TEXT, lat REAL, lng REAL, aprox INT DEFAULT 0, ordem INT DEFAULT 0, ativo INT DEFAULT 1)');
  $db->exec('CREATE TABLE IF NOT EXISTS album(id INTEGER PRIMARY KEY, tipo TEXT DEFAULT \'foto\', src TEXT, poster TEXT, dur TEXT, legenda TEXT, etiqueta TEXT, categoria TEXT, alt TEXT, forma TEXT DEFAULT \'w\', data TEXT, ordem INT DEFAULT 0, visivel INT DEFAULT 1)');
  $db->exec('CREATE TABLE IF NOT EXISTS novidades(id INTEGER PRIMARY KEY, data TEXT, titulo TEXT, texto TEXT, foto TEXT, link TEXT, publicado INT DEFAULT 1)');
  $db->exec('CREATE TABLE IF NOT EXISTS textos(chave TEXT PRIMARY KEY, valor TEXT)');
  $db->exec('CREATE TABLE IF NOT EXISTS escolas(id INTEGER PRIMARY KEY, nome TEXT, localidade TEXT, kg REAL DEFAULT 0, garrafoes INT DEFAULT 0, ativo INT DEFAULT 1)');
  $db->exec('CREATE TABLE IF NOT EXISTS subscritores(id INTEGER PRIMARY KEY, email TEXT UNIQUE, token TEXT, confirmado INT DEFAULT 0, idioma TEXT, criado TEXT)');
  foreach (['eventos', 'novidades'] as $t) { try { $db->exec("ALTER TABLE $t ADD COLUMN avisado INT DEFAULT 0"); } catch (Throwable $e) {} }
  return $db;
}
function texto(PDO $db, string $k, $def = null) { $q = $db->prepare('SELECT valor FROM textos WHERE chave = ?'); $q->execute([$k]); $v = $q->fetchColumn(); return $v === false ? $def : json_decode($v, true); }
function guarda_texto(PDO $db, string $k, $v): void { $db->prepare('INSERT INTO textos VALUES (?, ?) ON CONFLICT(chave) DO UPDATE SET valor = excluded.valor')->execute([$k, json_encode($v, JSON_UNESCAPED_UNICODE)]); }
/* avisa por email os subscritores confirmados; devolve quantos emails foram enviados */
function avisar_subscritores(PDO $db, string $assunto, string $texto, string $url): int {
  $n = 0;
  foreach ($db->query('SELECT email, token FROM subscritores WHERE confirmado = 1') as $s) {
    $corpo = $texto . "\n\n" . $url . "\n\n---\nRecebes este email porque pediste avisos do site De mãos dadas pelo Martim.\nPara deixares de receber: " . SITE . "/api/avisos.php?a=sair&t=" . $s['token'] . "\n";
    if (envia($s['email'], $assunto, $corpo)) $n++;
    usleep(300000);
  }
  return $n;
}
