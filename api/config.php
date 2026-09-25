<?php
/* De mãos dadas pelo Martim · configuração do servidor (DreamHost)
   "Passar a pasta": muda só o DESTINO para o email da pessoa que passa a receber os pedidos. */
const DESTINO   = 'micka.a.cruz@gmail.com';            // quem recebe as mensagens do formulário
const REMETENTE = 'ajudar@demaosdadaspelomartim.pt';   // de onde saem os emails do site
const MODERACAO = 'ajudar@demaosdadaspelomartim.pt';   // recebe o aviso de cada nome novo no top 10 do mural
const SITE      = 'https://demaosdadaspelomartim.pt';
// dados fora da pasta pública: /home/<utilizador>/dados
define('DADOS', dirname(__DIR__, 2) . '/dados');

function db(): PDO {
  if (!is_dir(DADOS)) mkdir(DADOS, 0700, true);
  $pdo = new PDO('sqlite:' . DADOS . '/site.sqlite');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('PRAGMA busy_timeout=4000');
  $pdo->exec('CREATE TABLE IF NOT EXISTS mural(id TEXT PRIMARY KEY, n TEXT, terra TEXT, lv INT, r INT, t INT, s INT, d TEXT, criado TEXT, oculto INT DEFAULT 0)');
  $pdo->exec('CREATE TABLE IF NOT EXISTS limites(chave TEXT, t INT)');
  return $pdo;
}
function segredo(): string {
  $f = DADOS . '/segredo.key';
  if (!is_file($f)) { if (!is_dir(DADOS)) mkdir(DADOS, 0700, true); file_put_contents($f, bin2hex(random_bytes(32))); chmod($f, 0600); }
  return trim(file_get_contents($f));
}
/* no máximo $max pedidos por $janela segundos para esta chave (o IP é guardado só como hash) */
function limite(PDO $db, string $tipo, int $max, int $janela): bool {
  $k = $tipo . ':' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . segredo());
  $agora = time();
  $db->prepare('DELETE FROM limites WHERE t < ?')->execute([$agora - 86400]);
  $q = $db->prepare('SELECT COUNT(*) FROM limites WHERE chave = ? AND t > ?'); $q->execute([$k, $agora - $janela]);
  if ((int)$q->fetchColumn() >= $max) return false;
  $db->prepare('INSERT INTO limites VALUES (?, ?)')->execute([$k, $agora]);
  return true;
}
function responde(array $o, int $codigo = 200): never {
  http_response_code($codigo);
  header('Content-Type: application/json; charset=utf-8');
  header('Cache-Control: no-store');
  echo json_encode($o, JSON_UNESCAPED_UNICODE);
  exit;
}
function envia(string $para, string $assunto, string $texto, string $responder = ''): bool {
  $h = ['From: De mãos dadas pelo Martim <' . REMETENTE . '>', 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: 8bit'];
  if ($responder && filter_var($responder, FILTER_VALIDATE_EMAIL)) $h[] = 'Reply-To: ' . $responder;
  return mail($para, '=?UTF-8?B?' . base64_encode($assunto) . '?=', $texto, implode("\r\n", $h), '-f' . REMETENTE);
}
const PALAVROES = '/(merd|foda|fod[ae]|caralh|puta|put[ao]|cabr[aã]o|paneleir|cona\b|piç|pila\b|idiota|estupid|fuck|shit|bitch|dick|porn)/iu';
