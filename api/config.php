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
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
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
/* ---- Proteção dos formulários contra envios automáticos. Sem serviços externos, sem cookies, nada para o visitante resolver.
   A página pede um desafio a api/guarda.php: a hora, uma parte aleatória e uma assinatura que só este servidor sabe fazer.
   O browser procura depois um número que, junto com o desafio, dá um SHA-256 a começar por GUARDA_BITS bits a zero (uma
   fração de segundo de trabalho) e envia o desafio e o número com o pedido. O pedido passa quando a assinatura é nossa,
   o desafio tem pelo menos uns segundos e no máximo duas horas (ninguém preenche o formulário mais depressa; um programa
   envia logo), o número está certo e o desafio ainda não foi usado. */
const GUARDA_BITS = 12;
const DOMINIOS = ['demaosdadaspelomartim.pt', 'www.demaosdadaspelomartim.pt'];
/* um browser diz sempre de onde vem um POST: sem Origin nem Referer deste site, é um programa */
function mesmo_site(): bool {
  $de = (string)($_SERVER['HTTP_ORIGIN'] ?? '') ?: (string)($_SERVER['HTTP_REFERER'] ?? '');
  return in_array(parse_url($de, PHP_URL_HOST), DOMINIOS, true);
}
function guarda_chave(): string {
  $f = DADOS . '/guarda.key';
  $k = is_file($f) ? trim((string)file_get_contents($f)) : '';
  if (strlen($k) < 32) { if (!is_dir(DADOS)) mkdir(DADOS, 0700, true); $k = bin2hex(random_bytes(32)); file_put_contents($f, $k, LOCK_EX); chmod($f, 0600); }
  return $k;
}
function guarda_emite(): array {
  $c = time() . '.' . bin2hex(random_bytes(8));
  return ['c' => $c . '.' . hash_hmac('sha256', $c, guarda_chave()), 'bits' => GUARDA_BITS];
}
/* '' quando o desafio e a resposta estão bons; senão, o motivo (ao visitante só se diz "prova") */
function guarda_verifica(PDO $db, string $c, string $resposta, int $idadeMin = 3): string {
  $p = explode('.', $c);
  if (count($p) !== 3 || !ctype_digit($p[0]) || !preg_match('/^\d{1,12}$/', $resposta)) return 'falta';
  if (!hash_equals(hash_hmac('sha256', $p[0] . '.' . $p[1], guarda_chave()), $p[2])) return 'falsa';
  $idade = time() - (int)$p[0];
  if ($idade < $idadeMin) return 'cedo';
  if ($idade > 7200) return 'velha';
  $h = hash('sha256', $c . '.' . $resposta, true);
  for ($i = 0, $bits = GUARDA_BITS; $bits > 0; $i++, $bits -= 8) { $byte = ord($h[$i]); if ($bits >= 8 ? $byte !== 0 : ($byte >> (8 - $bits)) !== 0) return 'trabalho'; }
  $db->exec('CREATE TABLE IF NOT EXISTS guarda_usados(c TEXT PRIMARY KEY, t INT)');
  $q = $db->prepare('SELECT 1 FROM guarda_usados WHERE c = ?'); $q->execute([hash('sha256', $c)]);
  return $q->fetchColumn() ? 'usada' : '';
}
/* um desafio serve para um pedido: chamado quando o pedido é aceite */
function guarda_gasta(PDO $db, string $c): void {
  $db->exec('CREATE TABLE IF NOT EXISTS guarda_usados(c TEXT PRIMARY KEY, t INT)');
  $db->prepare('DELETE FROM guarda_usados WHERE t < ?')->execute([time() - 3 * 3600]);
  $db->prepare('INSERT OR IGNORE INTO guarda_usados VALUES (?, ?)')->execute([hash('sha256', $c), time()]);
}
/* origem e prova de uma vez, para os formulários: termina o pedido se falhar */
function exige_prova(PDO $db, array $in): string {
  if (!mesmo_site()) responde(['ok' => false, 'why' => 'origem'], 403);
  $c = (string)($in['g'] ?? '');
  if (guarda_verifica($db, $c, (string)($in['ga'] ?? '')) !== '') responde(['ok' => false, 'why' => 'prova'], 400);
  return $c;
}
/* sinais de um pedido duvidoso que passou a prova: 3 ou mais links no texto */
function muitos_links(string $t): bool { return preg_match_all('~https?://|www\.~i', $t) >= 3; }
const MARCA_DUVIDA = '[verificar: possível spam] ';
const PALAVROES = '/(merd|foda|fod[ae]|caralh|puta|put[ao]|cabr[aã]o|paneleir|cona\b|piç|pila\b|idiota|estupid|fuck|shit|bitch|dick|porn)/iu';
