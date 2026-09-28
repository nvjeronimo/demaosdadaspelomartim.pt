<?php
/* Painel dos pais · De mãos dadas pelo Martim
   1.º acesso: /painel/?setup=<chave em ~/dados/painel-setup.txt> para definir a palavra-passe. */
require __DIR__ . '/../api/conteudo.php';
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
session_name('mdm_painel');
session_set_cookie_params(['lifetime' => 0, 'path' => '/painel/', 'secure' => true, 'httponly' => true, 'samesite' => 'Strict']);
session_start();
$db = conteudo_db();
$UP = dirname(__DIR__) . '/uploads';                       // ~/demaosdadaspelomartim.pt/uploads (fora da sincronização)
$ADMIN = DADOS . '/admin.json';
$h = fn($s) => htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
$msg = ''; $erro = '';

function ok_csrf(): bool { return hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? '')); }
function limpo(string $k, int $max = 300): string { return trim(mb_substr(strip_tags((string)($_POST[$k] ?? '')), 0, $max)); }
function data_ok(string $d): string { return preg_match('/^\d{4}-\d{2}-\d{2}$/', $d) ? $d : ''; }
/* guarda uma foto enviada: endireita, reduz a 1600px, JPEG + WebP, nome aleatório. Devolve "uploads/xxx.jpg" ou '' */
function foto_enviada(string $campo, string $UP): string {
  if (empty($_FILES[$campo]['tmp_name']) || $_FILES[$campo]['error'] !== UPLOAD_ERR_OK) return '';
  if ($_FILES[$campo]['size'] > 20 * 1024 * 1024) throw new RuntimeException('A foto é demasiado grande (máximo 20 MB).');
  $tmp = $_FILES[$campo]['tmp_name'];
  $info = @getimagesize($tmp);
  if (!$info || !in_array($info[2], [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP], true)) throw new RuntimeException('Envia uma foto em JPG, PNG ou WebP.');
  $im = @imagecreatefromstring(file_get_contents($tmp));
  if (!$im) throw new RuntimeException('Não consegui ler a foto.');
  if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
    $o = (@exif_read_data($tmp)['Orientation']) ?? 1;
    $im = match ((int)$o) { 3 => imagerotate($im, 180, 0), 6 => imagerotate($im, -90, 0), 8 => imagerotate($im, 90, 0), default => $im };
  }
  $w = imagesx($im); $hh = imagesy($im); $s = min(1, 1600 / max($w, $hh));
  if ($s < 1) { $im = imagescale($im, (int)round($w * $s), (int)round($hh * $s), IMG_BICUBIC); }
  if (!is_dir($UP)) { mkdir($UP, 0755, true); }
  if (!is_file("$UP/.htaccess")) file_put_contents("$UP/.htaccess", "Options -Indexes -ExecCGI\nRemoveHandler .php .phtml .php5\nRemoveType .php .phtml .php5\n<FilesMatch \"\\.(php|phtml|php5|phar|html?|svg|js)$\">\n  Require all denied\n</FilesMatch>\n");
  $nome = date('Ymd') . '-' . bin2hex(random_bytes(5));
  imagejpeg($im, "$UP/$nome.jpg", 82);
  if (function_exists('imagewebp')) imagewebp($im, "$UP/$nome.jpg.webp", 78);
  return "uploads/$nome.jpg";
}
function forma_de(string $rel): string { $i = @getimagesize(dirname(__DIR__) . '/' . $rel); if (!$i) return 'w'; return $i[1] > $i[0] * 1.15 ? 'p' : ($i[0] > $i[1] * 1.3 ? 'w' : 'l'); }

/* ---------- 1.º acesso: definir palavra-passe ---------- */
$setupFile = DADOS . '/painel-setup.txt';
if (!is_file($ADMIN)) {
  $tok = is_file($setupFile) ? trim(file_get_contents($setupFile)) : '';
  if ($tok === '' || !hash_equals($tok, (string)($_GET['setup'] ?? $_POST['setup'] ?? ''))) { http_response_code(403); header('Content-Type: text/html; charset=utf-8'); exit('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Painel</title><body style="font:18px system-ui;margin:40px;max-width:560px;line-height:1.5"><h1>Painel ainda não configurado</h1><p>O primeiro acesso é feito com o <b>link de configuração</b> (um endereço que termina em <code>?setup=…</code>), que só funciona uma vez. Abre esse link para escolheres a palavra-passe; depois entras aqui só com ela.</p></body>'); }
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && ok_csrf()) {
    $p1 = (string)($_POST['p1'] ?? ''); $p2 = (string)($_POST['p2'] ?? '');
    if (mb_strlen($p1) < 10) $erro = 'A palavra-passe tem de ter pelo menos 10 caracteres.';
    elseif ($p1 !== $p2) $erro = 'As duas palavras-passe não são iguais.';
    else { file_put_contents($ADMIN, json_encode(['hash' => password_hash($p1, PASSWORD_DEFAULT)])); chmod($ADMIN, 0600); unlink($setupFile); session_regenerate_id(true); $_SESSION['ok'] = 1; header('Location: ./'); exit; }
  }
  $pagina = 'setup';
}
/* ---------- entrar / sair ---------- */
elseif (empty($_SESSION['ok'])) {
  if ($_SERVER['REQUEST_METHOD'] === 'POST' && ok_csrf()) {
    if (!limite($db, 'login', 6, 900)) $erro = 'Demasiadas tentativas. Espera 15 minutos.';
    elseif (password_verify((string)($_POST['p'] ?? ''), json_decode(file_get_contents($ADMIN), true)['hash'] ?? '')) { session_regenerate_id(true); $_SESSION['ok'] = 1; header('Location: ./'); exit; }
    else $erro = 'Palavra-passe errada.';
  }
  $pagina = 'login';
}
else {
  if (isset($_GET['sair'])) { $_SESSION = []; session_destroy(); header('Location: ./'); exit; }
  $s = $_GET['s'] ?? 'inicio';
  /* ---------- ações ---------- */
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!ok_csrf()) { $erro = 'A sessão expirou. Tenta outra vez.'; }
    else try {
      $a = $_POST['a'] ?? ''; $id = (int)($_POST['id'] ?? 0);
      if ($a === 'contador') { $n = fn($k) => max(0, (float)str_replace(',', '.', (string)($_POST[$k] ?? 0)));
        guarda_texto($db, 'contador', ['ano' => (int)($_POST['ano'] ?? date('Y')), 'plastico' => $n('plastico'), 'caricas' => $n('caricas'), 'cortica' => $n('cortica'), 'nota' => limpo('nota', 200)]); $msg = 'Contador do ano guardado.'; }
      if ($a === 'whatsapp') { $l = limpo('whatsapp', 300); guarda_texto($db, 'whatsapp', preg_match('#^https://(whatsapp\.com|chat\.whatsapp\.com|wa\.me)/#', $l) ? $l : ''); $msg = 'Link do WhatsApp guardado.'; }
      if ($a === 'escola') { $v = [limpo('nome', 120), limpo('localidade', 60), max(0, (float)str_replace(',', '.', (string)($_POST['kg'] ?? 0))), max(0, (int)($_POST['garrafoes'] ?? 0)), isset($_POST['ativo']) ? 1 : 0];
        if ($v[0] === '') throw new RuntimeException('Falta o nome da escola.');
        if ($id) $db->prepare('UPDATE escolas SET nome=?, localidade=?, kg=?, garrafoes=?, ativo=? WHERE id=?')->execute(array_merge($v, [$id])); else $db->prepare('INSERT INTO escolas(nome,localidade,kg,garrafoes,ativo) VALUES (?,?,?,?,?)')->execute($v);
        $msg = 'Escola guardada.'; }
      if ($a === 'tirar_subscritor' && $id) { $db->prepare('DELETE FROM subscritores WHERE id = ?')->execute([$id]); $msg = 'Endereço apagado.'; }
      if ($a === 'resultado') { guarda_texto($db, 'resultado', ['valor' => limpo('valor', 20), 'titulo' => limpo('titulo', 120), 'texto' => limpo('texto', 400), 'link' => limpo('link', 200)]); $msg = 'Último resultado guardado.'; }
      if ($a === 'evento') {
        $f = foto_enviada('foto', $UP); $d = data_ok(limpo('data', 10)); if (!$d || limpo('titulo') === '') throw new RuntimeException('Falta o título ou a data.');
        $v = [limpo('titulo', 120), $d, data_ok(limpo('fim', 10)) ?: $d, limpo('hora', 40), limpo('local', 160), limpo('inscricao', 80), limpo('texto', 2000), isset($_POST['publicado']) ? 1 : 0];
        if ($id) { $db->prepare('UPDATE eventos SET titulo=?, data=?, fim=?, hora=?, local=?, inscricao=?, texto=?, publicado=?' . ($f ? ', foto=?' : '') . ' WHERE id=?')->execute(array_merge($v, $f ? [$f] : [], [$id])); }
        else { $db->prepare('INSERT INTO eventos(titulo,data,fim,hora,local,inscricao,texto,publicado,foto) VALUES (?,?,?,?,?,?,?,?,?)')->execute(array_merge($v, [$f])); }
        $eid = $id ?: (int)$db->lastInsertId(); $msg = 'Evento guardado.';
        if (isset($_POST['avisar']) && $v[7]) { $x = $db->query('SELECT avisado FROM eventos WHERE id=' . $eid)->fetchColumn();
          if (!$x) { $k = avisar_subscritores($db, 'Novo evento: ' . $v[0], $v[0] . "\n" . $v[1] . ($v[3] ? ' · ' . $v[3] : '') . ($v[4] ? "\n" . $v[4] : '') . ($v[6] ? "\n\n" . mb_substr($v[6], 0, 400) : ''), SITE . '/evento.html?id=' . $eid);
            $db->exec('UPDATE eventos SET avisado=1 WHERE id=' . $eid); $msg .= " Aviso enviado a $k pessoas."; } }
      }
      if ($a === 'ponto') {
        $t = array_key_exists($_POST['tipo'] ?? '', TIPOS_PONTO) ? $_POST['tipo'] : 'comunidade';
        $lat = (float)($_POST['lat'] ?? 0); $lng = (float)($_POST['lng'] ?? 0);
        if (limpo('nome') === '' || !$lat || !$lng) throw new RuntimeException('Falta o nome ou a posição no mapa.');
        $v = [limpo('nome', 120), $t, limpo('localidade', 60), $lat, $lng, isset($_POST['aprox']) ? 1 : 0, isset($_POST['ativo']) ? 1 : 0];
        if ($id) $db->prepare('UPDATE pontos SET nome=?, tipo=?, localidade=?, lat=?, lng=?, aprox=?, ativo=? WHERE id=?')->execute(array_merge($v, [$id]));
        else $db->prepare('INSERT INTO pontos(nome,tipo,localidade,lat,lng,aprox,ativo,ordem) VALUES (?,?,?,?,?,?,?,999)')->execute($v);
        if ($pid = (int)($_POST['pedido'] ?? 0)) $db->prepare("UPDATE pedidos_pontos SET estado = 'aprovado' WHERE id = ?")->execute([$pid]);
        $msg = 'Ponto de recolha guardado.';
      }
      if ($a === 'foto') {
        $c = array_key_exists($_POST['categoria'] ?? '', CATEGORIAS) ? $_POST['categoria'] : 'comunidade';
        $f = foto_enviada('foto', $UP);
        $v = [limpo('legenda', 120), limpo('etiqueta', 40) ?: CATEGORIAS[$c], $c, limpo('alt', 250) ?: limpo('legenda', 120), data_ok(limpo('data', 10)), isset($_POST['visivel']) ? 1 : 0];
        if ($id) $db->prepare('UPDATE album SET legenda=?, etiqueta=?, categoria=?, alt=?, data=?, visivel=?' . ($f ? ', src=?, forma=?' : '') . ' WHERE id=?')->execute(array_merge($v, $f ? [$f, forma_de($f)] : [], [$id]));
        else { if (!$f) throw new RuntimeException('Escolhe uma foto.'); $db->prepare('INSERT INTO album(legenda,etiqueta,categoria,alt,data,visivel,src,forma,tipo,ordem) VALUES (?,?,?,?,?,?,?,?,"foto",-1)')->execute(array_merge($v, [$f, forma_de($f)])); }
        $msg = 'Foto guardada.';
      }
      if ($a === 'novidade') {
        $f = foto_enviada('foto', $UP); $d = data_ok(limpo('data', 10)) ?: date('Y-m-d');
        if (limpo('titulo') === '') throw new RuntimeException('Falta o título.');
        $link = limpo('link', 300); if ($link && !preg_match('#^https://#', $link)) $link = '';
        $v = [$d, limpo('titulo', 140), limpo('texto', 3000), $link, isset($_POST['publicado']) ? 1 : 0];
        if ($id) $db->prepare('UPDATE novidades SET data=?, titulo=?, texto=?, link=?, publicado=?' . ($f ? ', foto=?' : '') . ' WHERE id=?')->execute(array_merge($v, $f ? [$f] : [], [$id]));
        else $db->prepare('INSERT INTO novidades(data,titulo,texto,link,publicado,foto) VALUES (?,?,?,?,?,?)')->execute(array_merge($v, [$f]));
        $nid = $id ?: (int)$db->lastInsertId(); $msg = 'Novidade guardada.';
        if (isset($_POST['avisar']) && $v[4]) { $x = $db->query('SELECT avisado FROM novidades WHERE id=' . $nid)->fetchColumn();
          if (!$x) { $k = avisar_subscritores($db, 'Novidades do Martim: ' . $v[1], $v[1] . "\n\n" . mb_substr($v[2], 0, 600), SITE . '/novidades.html#n-' . $nid);
            $db->exec('UPDATE novidades SET avisado=1 WHERE id=' . $nid); $msg .= " Aviso enviado a $k pessoas."; } }
      }
      if ($a === 'valor_evento') { $ev = limpo('evento', 80); $v = max(0, (float)str_replace([' ', '€', ','], ['', '', '.'], (string)($_POST['valor'] ?? '')));
        if ($ev === '') throw new RuntimeException('Falta o evento.');
        if ($v > 0) $db->prepare('INSERT INTO valores_evento VALUES (?, ?) ON CONFLICT(evento) DO UPDATE SET valor = excluded.valor')->execute([$ev, $v]);
        else $db->prepare('DELETE FROM valores_evento WHERE evento = ?')->execute([$ev]);
        $msg = 'Valor guardado.'; }
      if ($a === 'fotos_evento') { $ev = limpo('evento', 80); if ($ev === '') throw new RuntimeException('Falta o evento.');
        $n = 0; $F = $_FILES['fotos'] ?? null;
        if ($F && is_array($F['name'])) foreach ($F['name'] as $i => $nm) {
          $_FILES['_uma'] = ['name' => $nm, 'type' => $F['type'][$i], 'tmp_name' => $F['tmp_name'][$i], 'error' => $F['error'][$i], 'size' => $F['size'][$i]];
          $f = foto_enviada('_uma', $UP); if ($f) { $db->prepare('INSERT INTO fotos_evento(evento,src,legenda,ordem,criado) VALUES (?,?,?,?,?)')->execute([$ev, $f, limpo('legenda', 120), $n, date('c')]); $n++; }
        }
        if (!$n) throw new RuntimeException('Escolhe pelo menos uma foto.');
        $msg = $n === 1 ? '1 foto juntada.' : "$n fotos juntadas."; }
      if ($a === 'legenda_foto' && $id) { $db->prepare('UPDATE fotos_evento SET legenda = ? WHERE id = ?')->execute([limpo('legenda', 120), $id]); $msg = 'Legenda guardada.'; }
      if ($a === 'pedido' && $id) { $e = ($_POST['estado'] ?? '') === 'recusado' ? 'recusado' : 'arquivado';
        if (($_POST['apagar'] ?? '') === '1') { $db->prepare('DELETE FROM pedidos_pontos WHERE id = ?')->execute([$id]); $msg = 'Pedido apagado.'; }
        else { $db->prepare('UPDATE pedidos_pontos SET estado = ? WHERE id = ?')->execute([$e, $id]); $msg = 'Pedido arquivado.'; } }
      if ($a === 'apagar') {
        $t = ['evento' => 'eventos', 'ponto' => 'pontos', 'foto' => 'album', 'novidade' => 'novidades', 'escola' => 'escolas', 'foto_evento' => 'fotos_evento'][$_POST['tipo'] ?? ''] ?? '';
        if ($t && $id) { $db->prepare("DELETE FROM $t WHERE id = ?")->execute([$id]); $msg = 'Apagado.'; }
      }
      if ($a === 'ordem' && $id) {
        $d = ($_POST['dir'] ?? '') === 'cima' ? -15 : 15;
        $db->prepare('UPDATE album SET ordem = ordem * 10 + ? WHERE id = ?')->execute([$d, $id]);
        $i = 0; foreach ($db->query('SELECT id FROM album ORDER BY ordem, id')->fetchAll() as $r) $db->prepare('UPDATE album SET ordem=? WHERE id=?')->execute([$i++, $r['id']]);
      }
      if ($a === 'senha') {
        if (!password_verify((string)($_POST['atual'] ?? ''), json_decode(file_get_contents($ADMIN), true)['hash'] ?? '')) throw new RuntimeException('A palavra-passe atual está errada.');
        $p1 = (string)($_POST['p1'] ?? ''); if (mb_strlen($p1) < 10 || $p1 !== ($_POST['p2'] ?? '')) throw new RuntimeException('A nova palavra-passe tem de ter 10 caracteres ou mais e ser igual nas duas caixas.');
        file_put_contents($ADMIN, json_encode(['hash' => password_hash($p1, PASSWORD_DEFAULT)])); $msg = 'Palavra-passe mudada.';
      }
    } catch (Throwable $e) { $erro = $e instanceof RuntimeException ? $e->getMessage() : 'Algo correu mal. Tenta outra vez.'; }
  }
  $pagina = 'painel';
}
$ed = (int)($_GET['id'] ?? 0);
$sel = function (array $opts, string $cur) use ($h) { $o = ''; foreach ($opts as $k => $v) $o .= '<option value="' . $h($k) . '"' . ($k === $cur ? ' selected' : '') . '>' . $h($v) . '</option>'; return $o; };
$csrf = '<input type="hidden" name="csrf" value="' . $h($_SESSION['csrf']) . '">';
$img = fn($src) => $src ? '<img src="/' . $h($src) . '" alt="" class="th">' : '';
?><!doctype html>
<html lang="pt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>Painel · De mãos dadas pelo Martim</title>
<link rel="icon" href="/img/marca/favicon.svg">
<link rel="stylesheet" href="/css/fonts.css">
<style>
:root{--ink:#1B1D2A;--pen:#1E2B45;--hl:#FFB86B;--act:#F2784B;--line:#DCE0E8;--bg:#F6F8FC;--ok:#12884A;--err:#C21F0E}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.5 "Atkinson Hyperlegible",system-ui,sans-serif}
header{background:var(--pen);color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
header b{font:800 1.25rem/1 "Bricolage Grotesque",system-ui;font-stretch:84%}header a{color:#fff}
nav{display:flex;gap:6px;flex-wrap:wrap;padding:10px 16px;background:#fff;border-bottom:2px solid var(--ink);position:sticky;top:0;z-index:5}
nav a{padding:.5em .8em;border-radius:999px;border:2px solid var(--ink);color:var(--ink);text-decoration:none;font-weight:700;font-size:.95rem}nav a.on{background:var(--ink);color:#fff}
main{max-width:860px;margin:0 auto;padding:18px 16px 60px}
h1,h2{font-family:"Bricolage Grotesque",system-ui;font-stretch:84%;line-height:1.05;margin:8px 0 12px}h1{font-size:2rem}h2{font-size:1.4rem}
.card{background:#fff;border:2px solid var(--ink);border-radius:14px;padding:16px;margin:0 0 16px}
label{display:block;font-weight:700;margin:10px 0 4px}input[type=text],input[type=date],input[type=password],input[type=url],select,textarea{width:100%;font:inherit;padding:10px 12px;border:2px solid var(--ink);border-radius:10px;background:#fff}
textarea{min-height:110px}.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:560px){.row{grid-template-columns:1fr}}
.chk{display:flex;gap:8px;align-items:center;font-weight:400;margin-top:12px}.chk input{width:22px;height:22px;accent-color:var(--act)}
button,.btn{font:700 1rem/1 inherit;padding:.8em 1.2em;border-radius:10px;border:2px solid var(--ink);background:var(--act);color:var(--ink);cursor:pointer;text-decoration:none;display:inline-block;margin-top:14px}
.btn-l,button.l{background:#fff}.del{background:#fff;color:var(--err);border-color:var(--err)}
.msg{background:#E7F6EE;border:2px solid var(--ok);border-radius:10px;padding:10px 14px;margin-bottom:14px}.err{background:#FFF0EE;border-color:var(--err)}
.list{list-style:none;padding:0;margin:0}.list li{display:grid;grid-template-columns:64px 1fr auto;gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
.th{width:64px;height:64px;object-fit:cover;border-radius:8px;background:#eee}.list .muted{color:#5B6070;font-size:.9rem}.list form{display:inline}.list button{margin:0;padding:.5em .7em;font-size:.9rem}
.hint{color:#5B6070;font-size:.93rem;margin:4px 0 0}#map{height:280px;border:2px solid var(--ink);border-radius:10px;margin-top:6px}
.tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.tiles a{display:block;background:#fff;border:2px solid var(--ink);border-radius:14px;padding:16px;color:var(--ink);text-decoration:none;font-weight:700}
.tiles small{display:block;font-weight:400;color:#5B6070;margin-top:4px}
</style></head><body>
<header><b>Painel · De mãos dadas pelo Martim</b><?php if ($pagina === 'painel'): ?><span><a href="/" target="_blank">Ver o site</a> · <a href="?sair=1">Sair</a></span><?php endif; ?></header>
<?php if ($pagina === 'setup'): ?>
<main><h1>Bem-vindos ao painel</h1><div class="card"><p>Escolham uma palavra-passe para o painel (10 caracteres ou mais). Guardem-na num sítio seguro: este link de configuração só funciona uma vez.</p>
<?php if ($erro): ?><p class="msg err"><?= $h($erro) ?></p><?php endif; ?>
<form method="post"><?= $csrf ?><input type="hidden" name="setup" value="<?= $h($_GET['setup'] ?? $_POST['setup'] ?? '') ?>">
<label for="p1">Palavra-passe</label><input type="password" id="p1" name="p1" autocomplete="new-password" required minlength="10">
<label for="p2">Repetir</label><input type="password" id="p2" name="p2" autocomplete="new-password" required minlength="10">
<button>Guardar e entrar</button></form></div></main>
<?php elseif ($pagina === 'login'): ?>
<main><h1>Entrar</h1><div class="card"><?php if ($erro): ?><p class="msg err"><?= $h($erro) ?></p><?php endif; ?>
<form method="post"><?= $csrf ?><label for="p">Palavra-passe</label><input type="password" id="p" name="p" autocomplete="current-password" required autofocus><button>Entrar</button></form></div></main>
<?php else:
$tabs = ['inicio' => 'Início', 'novidades' => 'Novidades', 'eventos' => 'Eventos', 'passados' => 'Eventos passados', 'album' => 'Álbum', 'pontos' => 'Pontos de recolha', 'pedidos' => 'Pedidos' . (($np = (int)$db->query("SELECT COUNT(*) FROM pedidos_pontos WHERE estado = 'novo'")->fetchColumn()) ? " ($np)" : ''), 'resultado' => 'Resultados', 'escolas' => 'Escolas', 'avisos' => 'Avisos', 'senha' => 'Palavra-passe']; ?>
<nav><?php foreach ($tabs as $k => $v): ?><a href="?s=<?= $k ?>" class="<?= $s === $k ? 'on' : '' ?>"><?= $v ?></a><?php endforeach; ?></nav>
<main>
<?php if ($msg): ?><p class="msg"><?= $h($msg) ?> As mudanças aparecem no site em cerca de 1 minuto.</p><?php endif; ?>
<?php if ($erro): ?><p class="msg err"><?= $h($erro) ?></p><?php endif; ?>

<?php if ($s === 'inicio'): ?>
<h1>Olá! O que querem atualizar?</h1>
<div class="tiles">
<a href="?s=novidades">📰 Novidades<small>Uma notícia com foto depois de um tratamento</small></a>
<a href="?s=eventos">📅 Eventos<small>Próximos eventos e os detalhes</small></a>
<a href="?s=album">📷 Álbum<small>Juntar fotos e corrigir legendas</small></a>
<a href="?s=passados">🖼️ Eventos passados<small>Fotos e valor angariado de cada evento</small></a>
<a href="?s=pontos">📍 Pontos de recolha<small>Acrescentar, mudar ou retirar</small></a>
<a href="?s=pedidos">🙋 Pedidos<small>Quem quer ser ponto de recolha</small></a>
<a href="?s=resultado">🧢 Resultados<small>Último resultado e contador do ano</small></a>
<a href="?s=escolas">🏫 Escolas<small>O desafio entre escolas</small></a>
<a href="?s=avisos">✉️ Avisos<small>Quem pediu avisos por email</small></a>
</div>

<?php elseif ($s === 'resultado'): $r = texto($db, 'resultado', []) ?: []; ?>
<h1>Último resultado</h1><div class="card"><form method="post"><?= $csrf ?><input type="hidden" name="a" value="resultado">
<div class="row"><div><label for="valor">Valor (ex.: 576 €)</label><input type="text" id="valor" name="valor" value="<?= $h($r['valor'] ?? '') ?>"></div>
<div><label for="titulo">Título</label><input type="text" id="titulo" name="titulo" value="<?= $h($r['titulo'] ?? '') ?>" placeholder="Último resultado: BFF Solidário 2026."></div></div>
<label for="texto">Texto</label><textarea id="texto" name="texto"><?= $h($r['texto'] ?? '') ?></textarea>
<label for="link">Link (opcional)</label><input type="text" id="link" name="link" value="<?= $h($r['link'] ?? '') ?>" placeholder="eventos/bff-solidario-2026.html">
<p class="hint">Enquanto estiver vazio, o site mostra o texto que já lá está.</p><button>Guardar</button></form></div>
<?php $c = texto($db, 'contador', []) ?: []; ?>
<h2>Contador de tampas do ano</h2><div class="card"><form method="post"><?= $csrf ?><input type="hidden" name="a" value="contador">
<div class="row"><div><label for="ano">Ano</label><input type="text" inputmode="numeric" id="ano" name="ano" value="<?= $h($c['ano'] ?? date('Y')) ?>"></div><div><label for="plastico">Kg de tampas de plástico entregues</label><input type="text" inputmode="decimal" id="plastico" name="plastico" value="<?= $h($c['plastico'] ?? 0) ?>"></div></div>
<div class="row"><div><label for="caricas">Kg de caricas</label><input type="text" inputmode="decimal" id="caricas" name="caricas" value="<?= $h($c['caricas'] ?? 0) ?>"></div><div><label for="cortica">Kg de cortiça</label><input type="text" inputmode="decimal" id="cortica" name="cortica" value="<?= $h($c['cortica'] ?? 0) ?>"></div></div>
<label for="nota">Nota (opcional)</label><input type="text" id="nota" name="nota" value="<?= $h($c['nota'] ?? '') ?>" placeholder="Última entrega: 3 BigBags em setembro">
<p class="hint">O site calcula sozinho os euros e os dias de tratamento com os valores de cada material. Enquanto estiver tudo a zero, o contador não aparece.</p><button>Guardar</button></form></div>
<h2>Canal de WhatsApp</h2><div class="card"><form method="post"><?= $csrf ?><input type="hidden" name="a" value="whatsapp">
<label for="whatsapp">Link do canal ou grupo (https://whatsapp.com/channel/… ou https://chat.whatsapp.com/…)</label><input type="url" id="whatsapp" name="whatsapp" value="<?= $h(texto($db, 'whatsapp', '') ?: '') ?>">
<p class="hint">Quando tiver um link, aparece "Segue no WhatsApp" no rodapé do site.</p><button>Guardar</button></form></div>

<?php elseif ($s === 'novidades'): $e = $ed ? $db->query('SELECT * FROM novidades WHERE id=' . $ed)->fetch() : []; ?>
<h1>Novidades do Martim</h1>
<div class="card"><h2><?= $ed ? 'Editar novidade' : 'Nova novidade' ?></h2><form method="post" enctype="multipart/form-data"><?= $csrf ?><input type="hidden" name="a" value="novidade"><input type="hidden" name="id" value="<?= $ed ?>">
<div class="row"><div><label for="titulo">Título</label><input type="text" id="titulo" name="titulo" required value="<?= $h($e['titulo'] ?? '') ?>" placeholder="De volta da Kinésio!"></div>
<div><label for="data">Data</label><input type="date" id="data" name="data" value="<?= $h($e['data'] ?? date('Y-m-d')) ?>"></div></div>
<label for="texto">Texto</label><textarea id="texto" name="texto" placeholder="Duas ou três frases, na voz do Martim."><?= $h($e['texto'] ?? '') ?></textarea>
<label for="foto">Foto <?= !empty($e['foto']) ? '(deixa vazio para manter)' : '' ?></label><input type="file" id="foto" name="foto" accept="image/*">
<label for="link">Link da publicação no Facebook (opcional)</label><input type="url" id="link" name="link" value="<?= $h($e['link'] ?? '') ?>" placeholder="https://www.facebook.com/...">
<label class="chk"><input type="checkbox" name="publicado" <?= ($e['publicado'] ?? 1) ? 'checked' : '' ?>> Publicada no site</label>
<?php if (empty($e['avisado'])): ?><label class="chk"><input type="checkbox" name="avisar"> Avisar por email quem pediu avisos (<?= (int)$db->query('SELECT COUNT(*) FROM subscritores WHERE confirmado=1')->fetchColumn() ?> pessoas)</label><?php else: ?><p class="hint">O aviso por email já foi enviado.</p><?php endif; ?>
<button>Guardar</button> <?php if ($ed): ?><a class="btn btn-l" href="?s=novidades">Cancelar</a><?php endif; ?></form></div>
<div class="card"><h2>Publicadas</h2><ul class="list"><?php foreach ($db->query('SELECT * FROM novidades ORDER BY data DESC, id DESC') as $n): ?>
<li><?= $img($n['foto']) ?: '<span></span>' ?><div><b><?= $h($n['titulo']) ?></b><div class="muted"><?= $h($n['data']) ?><?= $n['publicado'] ? '' : ' · escondida' ?></div></div>
<div><a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=novidades&id=<?= $n['id'] ?>">Editar</a> <form method="post" onsubmit="return confirm('Apagar esta novidade?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="novidade"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul></div>

<?php elseif ($s === 'eventos'): $e = $ed ? $db->query('SELECT * FROM eventos WHERE id=' . $ed)->fetch() : []; ?>
<h1>Eventos</h1>
<div class="card"><h2><?= $ed ? 'Editar evento' : 'Novo evento' ?></h2><form method="post" enctype="multipart/form-data"><?= $csrf ?><input type="hidden" name="a" value="evento"><input type="hidden" name="id" value="<?= $ed ?>">
<label for="titulo">Nome do evento</label><input type="text" id="titulo" name="titulo" required value="<?= $h($e['titulo'] ?? '') ?>" placeholder="Torneio de padel pelo Martim">
<div class="row"><div><label for="data">Dia</label><input type="date" id="data" name="data" required value="<?= $h($e['data'] ?? '') ?>"></div><div><label for="fim">Último dia (se durar vários dias)</label><input type="date" id="fim" name="fim" value="<?= $h(($e['fim'] ?? '') !== ($e['data'] ?? '') ? ($e['fim'] ?? '') : '') ?>"></div></div>
<div class="row"><div><label for="hora">Hora</label><input type="text" id="hora" name="hora" value="<?= $h($e['hora'] ?? '') ?>" placeholder="09:00 – 12:00"></div><div><label for="inscricao">Inscrição / preço</label><input type="text" id="inscricao" name="inscricao" value="<?= $h($e['inscricao'] ?? '') ?>" placeholder="10 € ou Entrada livre"></div></div>
<label for="local">Onde</label><input type="text" id="local" name="local" value="<?= $h($e['local'] ?? '') ?>" placeholder="Largo da Feira, Boliqueime">
<label for="texto">Descrição</label><textarea id="texto" name="texto"><?= $h($e['texto'] ?? '') ?></textarea>
<label for="foto">Cartaz ou foto <?= !empty($e['foto']) ? '(deixa vazio para manter)' : '' ?></label><input type="file" id="foto" name="foto" accept="image/*">
<label class="chk"><input type="checkbox" name="publicado" <?= ($e['publicado'] ?? 1) ? 'checked' : '' ?>> Publicado no site</label>
<?php if (empty($e['avisado'])): ?><label class="chk"><input type="checkbox" name="avisar"> Avisar por email quem pediu avisos (<?= (int)$db->query('SELECT COUNT(*) FROM subscritores WHERE confirmado=1')->fetchColumn() ?> pessoas)</label><?php else: ?><p class="hint">O aviso por email já foi enviado.</p><?php endif; ?>
<p class="hint">O próximo evento aparece sozinho no topo do site e na agenda, e desaparece depois do dia.</p>
<button>Guardar</button> <?php if ($ed): ?><a class="btn btn-l" href="?s=eventos">Cancelar</a><?php endif; ?></form></div>
<div class="card"><h2>Eventos do painel</h2><ul class="list"><?php foreach ($db->query('SELECT * FROM eventos ORDER BY data DESC') as $n): ?>
<li><?= $img($n['foto']) ?: '<span></span>' ?><div><b><?= $h($n['titulo']) ?></b><div class="muted"><?= $h($n['data']) ?> · <?= $h($n['local']) ?><?= $n['publicado'] ? '' : ' · escondido' ?></div></div>
<div><a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=eventos&id=<?= $n['id'] ?>">Editar</a> <form method="post" onsubmit="return confirm('Apagar este evento?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="evento"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul><p class="hint">Os eventos antigos (caminhada, baile, BFF, padel) têm página própria e continuam no site.</p></div>

<?php elseif ($s === 'album'): $e = $ed ? $db->query('SELECT * FROM album WHERE id=' . $ed)->fetch() : []; ?>
<h1>Álbum da minha equipa</h1>
<div class="card"><h2><?= $ed ? 'Editar foto' : 'Juntar foto' ?></h2><form method="post" enctype="multipart/form-data"><?= $csrf ?><input type="hidden" name="a" value="foto"><input type="hidden" name="id" value="<?= $ed ?>">
<?php if (!empty($e['src'])): ?><img src="/<?= $h($e['tipo'] === 'video' ? $e['poster'] : $e['src']) ?>" alt="" style="max-width:220px;border-radius:10px;display:block"><?php endif; ?>
<?php if (($e['tipo'] ?? 'foto') === 'foto'): ?><label for="foto">Foto <?= $ed ? '(deixa vazio para manter)' : '' ?></label><input type="file" id="foto" name="foto" accept="image/*" <?= $ed ? '' : 'required' ?>><?php endif; ?>
<label for="legenda">Legenda (escrita à mão no site)</label><input type="text" id="legenda" name="legenda" required value="<?= $h($e['legenda'] ?? '') ?>" placeholder="A separar no BFF 2026">
<div class="row"><div><label for="categoria">Filtro</label><select id="categoria" name="categoria"><?= $sel(CATEGORIAS, $e['categoria'] ?? 'comunidade') ?></select></div>
<div><label for="etiqueta">Etiqueta pequena (evento ou ano)</label><input type="text" id="etiqueta" name="etiqueta" value="<?= $h($e['etiqueta'] ?? '') ?>" placeholder="BFF 2026"></div></div>
<div class="row"><div><label for="data">Data (opcional)</label><input type="date" id="data" name="data" value="<?= $h($e['data'] ?? '') ?>"></div>
<div><label for="alt">Descrição para quem não vê (opcional)</label><input type="text" id="alt" name="alt" value="<?= $h($e['alt'] ?? '') ?>" placeholder="O que se vê na foto"></div></div>
<label class="chk"><input type="checkbox" name="visivel" <?= ($e['visivel'] ?? 1) ? 'checked' : '' ?>> Visível no site</label>
<button>Guardar</button> <?php if ($ed): ?><a class="btn btn-l" href="?s=album">Cancelar</a><?php endif; ?></form></div>
<div class="card"><h2>Fotos e vídeos (pela ordem do site)</h2><ul class="list"><?php foreach ($db->query('SELECT * FROM album ORDER BY ordem, id') as $n): ?>
<li><?= $img($n['tipo'] === 'video' ? $n['poster'] : $n['src']) ?><div><b><?= $h($n['legenda']) ?></b><div class="muted"><?= $h(CATEGORIAS[$n['categoria']] ?? $n['categoria']) ?> · <?= $h($n['etiqueta']) ?><?= $n['tipo'] === 'video' ? ' · vídeo' : '' ?><?= $n['visivel'] ? '' : ' · escondida' ?></div></div>
<div><form method="post"><?= $csrf ?><input type="hidden" name="a" value="ordem"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="l" name="dir" value="cima" aria-label="Subir">↑</button><button class="l" name="dir" value="baixo" aria-label="Descer">↓</button></form>
<a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=album&id=<?= $n['id'] ?>">Editar</a>
<?php if ($n['tipo'] === 'foto'): ?><form method="post" onsubmit="return confirm('Retirar esta foto do álbum?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="foto"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form><?php endif; ?></div></li>
<?php endforeach; ?></ul></div>

<?php elseif ($s === 'pontos'): $e = $ed ? $db->query('SELECT * FROM pontos WHERE id=' . $ed)->fetch() : [];
  $pd = (int)($_GET['pedido'] ?? 0); if ($pd && !$ed) { $q = $db->prepare('SELECT * FROM pedidos_pontos WHERE id = ?'); $q->execute([$pd]); if ($r = $q->fetch()) $e = ['nome' => $r['nome'], 'tipo' => $r['tipo'], 'localidade' => $r['localidade'], 'ativo' => 1]; } ?>
<h1>Pontos de recolha</h1>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" integrity="sha384-c6Rcwz4e4CITMbu/NBmnNS8yN2sC3cUElMEMfP3vqqKFp7GOYaaBBCqmaWBjmkjb" crossorigin="anonymous">
<div class="card"><h2><?= $ed ? 'Editar ponto' : 'Novo ponto' ?></h2><form method="post"><?= $csrf ?><input type="hidden" name="a" value="ponto"><input type="hidden" name="id" value="<?= $ed ?>"><?php if (!empty($pd)): ?><input type="hidden" name="pedido" value="<?= $pd ?>"><p class="hint">A partir do pedido. Falta só tocar no mapa onde fica o ponto.</p><?php endif; ?>
<label for="nome">Nome</label><input type="text" id="nome" name="nome" required value="<?= $h($e['nome'] ?? '') ?>" placeholder="Café Central">
<div class="row"><div><label for="tipo">Tipo</label><select id="tipo" name="tipo"><?= $sel(TIPOS_PONTO, $e['tipo'] ?? 'comunidade') ?></select></div>
<div><label for="localidade">Localidade</label><input type="text" id="localidade" name="localidade" value="<?= $h($e['localidade'] ?? '') ?>" placeholder="Boliqueime"></div></div>
<label>Posição: toca no mapa onde fica o ponto</label><div id="map"></div>
<input type="hidden" id="lat" name="lat" value="<?= $h($e['lat'] ?? '') ?>"><input type="hidden" id="lng" name="lng" value="<?= $h($e['lng'] ?? '') ?>">
<label class="chk"><input type="checkbox" name="aprox" <?= !empty($e['aprox']) ? 'checked' : '' ?>> Localização aproximada (mostra * no site)</label>
<label class="chk"><input type="checkbox" name="ativo" <?= ($e['ativo'] ?? 1) ? 'checked' : '' ?>> Ativo (aparece no site)</label>
<button>Guardar</button> <?php if ($ed): ?><a class="btn btn-l" href="?s=pontos">Cancelar</a><?php endif; ?></form></div>
<div class="card"><h2>Pontos</h2><ul class="list"><?php foreach ($db->query('SELECT * FROM pontos ORDER BY ordem, id') as $n): ?>
<li><span></span><div><b><?= $h($n['nome']) ?><?= $n['aprox'] ? ' *' : '' ?></b><div class="muted"><?= $h(TIPOS_PONTO[$n['tipo']] ?? $n['tipo']) ?> · <?= $h($n['localidade']) ?><?= $n['ativo'] ? '' : ' · inativo' ?></div></div>
<div><a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=pontos&id=<?= $n['id'] ?>">Editar</a> <form method="post" onsubmit="return confirm('Apagar este ponto?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="ponto"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" integrity="sha384-NElt3Op+9NBMCYaef5HxeJmU4Xeard/Lku8ek6hoPTvYkQPh3zLIrJP7KiRocsxO" crossorigin="anonymous"></script>
<script>
const la=document.getElementById('lat'),ln=document.getElementById('lng'),has=la.value&&ln.value;
const m=L.map('map').setView(has?[+la.value,+ln.value]:[37.13,-8.17],has?16:12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap'}).addTo(m);
let mk=has?L.marker([+la.value,+ln.value]).addTo(m):null;
m.on('click',e=>{la.value=e.latlng.lat.toFixed(5);ln.value=e.latlng.lng.toFixed(5);mk?mk.setLatLng(e.latlng):mk=L.marker(e.latlng).addTo(m)});
</script>

<?php elseif ($s === 'passados'): $EV = lista_eventos($db); $ev = array_key_exists($_GET['ev'] ?? '', $EV) ? $_GET['ev'] : ''; ?>
<h1>Eventos passados</h1>
<?php if (!$ev): $cnt = []; foreach ($db->query('SELECT evento, COUNT(*) n FROM fotos_evento GROUP BY evento') as $r) $cnt[$r['evento']] = $r['n']; $vals = $db->query('SELECT evento, valor FROM valores_evento')->fetchAll(PDO::FETCH_KEY_PAIR); ?>
<div class="card"><p class="hint" style="margin-top:0">Escolhe um evento para juntar fotos ou escrever o valor angariado. As fotos aparecem na página do evento; o valor aparece na agenda e no total.</p><ul class="list">
<?php foreach ($EV as $k => $t): ?><li><span></span><div><b><?= $h($t) ?></b><div class="muted"><?= (int)($cnt[$k] ?? 0) ?> fotos<?= isset($vals[$k]) ? ' · ' . $h(number_format($vals[$k], 2, ',', ' ')) . ' €' : '' ?></div></div><div><a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=passados&ev=<?= $h(urlencode($k)) ?>">Abrir</a></div></li><?php endforeach; ?>
</ul></div>
<?php else: $q = $db->prepare('SELECT valor FROM valores_evento WHERE evento = ?'); $q->execute([$ev]); $val = $q->fetchColumn(); ?>
<p><a href="?s=passados">← Todos os eventos</a></p><h2><?= $h($EV[$ev]) ?></h2>
<div class="card"><form method="post"><?= $csrf ?><input type="hidden" name="a" value="valor_evento"><input type="hidden" name="evento" value="<?= $h($ev) ?>">
<label for="valor">Valor angariado para os tratamentos (€)</label><input type="text" inputmode="decimal" id="valor" name="valor" value="<?= $val ? $h(str_replace('.', ',', (string)(float)$val)) : '' ?>" placeholder="ex.: 576">
<p class="hint">Deixa vazio (ou 0) se ainda não sabes. Aparece como "576 € para os tratamentos" e soma no total dos eventos.</p><button>Guardar valor</button></form></div>
<div class="card"><h2>Juntar fotos</h2><form method="post" enctype="multipart/form-data"><?= $csrf ?><input type="hidden" name="a" value="fotos_evento"><input type="hidden" name="evento" value="<?= $h($ev) ?>">
<label for="fotos">Fotos (podes escolher várias de uma vez)</label><input type="file" id="fotos" name="fotos[]" accept="image/*" multiple required>
<label for="legenda">Legenda para todas (opcional, escrita à mão no site)</label><input type="text" id="legenda" name="legenda" placeholder="tanta gente a ajudar!">
<p class="hint">Cada foto é reduzida sozinha. Se forem muitas, junta 10 de cada vez.</p><button>Juntar</button></form></div>
<div class="card"><h2>Fotos deste evento</h2><ul class="list"><?php $q = $db->prepare('SELECT * FROM fotos_evento WHERE evento = ? ORDER BY ordem, id'); $q->execute([$ev]); foreach ($q as $n): ?>
<li><?= $img($n['src']) ?><div><form method="post" style="display:flex;gap:6px"><?= $csrf ?><input type="hidden" name="a" value="legenda_foto"><input type="hidden" name="id" value="<?= $n['id'] ?>"><input type="text" name="legenda" value="<?= $h($n['legenda']) ?>" placeholder="legenda" aria-label="Legenda"><button class="l" style="margin:0">OK</button></form></div>
<div><form method="post" onsubmit="return confirm('Apagar esta foto?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="foto_evento"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul></div>
<?php endif; ?>

<?php elseif ($s === 'pedidos'): ?>
<h1>Pedidos para ser ponto de recolha</h1>
<?php foreach (['novo' => 'Novos', 'aprovado' => 'Já no mapa', 'arquivado' => 'Arquivados', 'recusado' => 'Recusados'] as $st => $tt): $q = $db->prepare('SELECT * FROM pedidos_pontos WHERE estado = ? ORDER BY criado DESC'); $q->execute([$st]); $rows = $q->fetchAll(); if (!$rows && $st !== 'novo') continue; ?>
<div class="card"><h2><?= $tt ?></h2><?php if (!$rows): ?><p class="hint">Não há pedidos novos.</p><?php endif; ?><ul class="list">
<?php foreach ($rows as $n): ?><li><span></span><div><b><?= $h($n['nome']) ?></b><div class="muted"><?= $h(TIPOS_PONTO[$n['tipo']] ?? $n['tipo']) ?> · <?= $h($n['localidade']) ?><?= $n['morada'] ? ' · ' . $h($n['morada']) : '' ?></div><div class="muted">Contacto: <?= $h($n['contacto']) ?> · <?= $h(substr($n['criado'], 0, 10)) ?></div><?php if ($n['nota']): ?><div class="muted">“<?= $h($n['nota']) ?>”</div><?php endif; ?></div>
<div><?php if ($st === 'novo'): ?><a class="btn" style="margin:0 0 6px;padding:.5em .7em;font-size:.9rem" href="?s=pontos&pedido=<?= $n['id'] ?>">Pôr no mapa</a>
<form method="post"><?= $csrf ?><input type="hidden" name="a" value="pedido"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="l" name="estado" value="arquivado">Arquivar</button></form><?php endif; ?>
<form method="post" onsubmit="return confirm('Apagar este pedido e o contacto?')"><?= $csrf ?><input type="hidden" name="a" value="pedido"><input type="hidden" name="id" value="<?= $n['id'] ?>"><input type="hidden" name="apagar" value="1"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul></div>
<?php endforeach; ?>
<p class="hint">Os pedidos chegam também por email. Depois de tratares um pedido, podes apagá-lo; os pedidos tratados são apagados sozinhos ao fim de 6 meses.</p>

<?php elseif ($s === 'escolas'): $e = $ed ? $db->query('SELECT * FROM escolas WHERE id=' . $ed)->fetch() : []; ?>
<h1>Desafio das escolas</h1>
<div class="card"><h2><?= $ed ? 'Editar escola' : 'Nova escola' ?></h2><form method="post"><?= $csrf ?><input type="hidden" name="a" value="escola"><input type="hidden" name="id" value="<?= $ed ?>">
<div class="row"><div><label for="nome">Escola</label><input type="text" id="nome" name="nome" required value="<?= $h($e['nome'] ?? '') ?>" placeholder="EB1 Benfarras"></div><div><label for="localidade">Localidade</label><input type="text" id="localidade" name="localidade" value="<?= $h($e['localidade'] ?? '') ?>"></div></div>
<div class="row"><div><label for="kg">Kg entregues este ano</label><input type="text" inputmode="decimal" id="kg" name="kg" value="<?= $h($e['kg'] ?? '0') ?>"></div><div><label for="garrafoes">Garrafões cheios</label><input type="text" inputmode="numeric" id="garrafoes" name="garrafoes" value="<?= $h($e['garrafoes'] ?? '0') ?>"></div></div>
<label class="chk"><input type="checkbox" name="ativo" <?= ($e['ativo'] ?? 1) ? 'checked' : '' ?>> Aparece no ranking</label>
<button>Guardar</button> <?php if ($ed): ?><a class="btn btn-l" href="?s=escolas">Cancelar</a><?php endif; ?></form></div>
<div class="card"><h2>Ranking</h2><ul class="list"><?php $i = 0; foreach ($db->query('SELECT * FROM escolas ORDER BY kg DESC, garrafoes DESC') as $n): $i++; ?>
<li><b style="font-size:1.4rem;text-align:center"><?= $i ?>.º</b><div><b><?= $h($n['nome']) ?></b><div class="muted"><?= $h($n['localidade']) ?> · <?= $h($n['kg']) ?> kg · <?= (int)$n['garrafoes'] ?> garrafões<?= $n['ativo'] ? '' : ' · escondida' ?></div></div>
<div><a class="btn btn-l" style="margin:0;padding:.5em .7em;font-size:.9rem" href="?s=escolas&id=<?= $n['id'] ?>">Editar</a> <form method="post" onsubmit="return confirm('Apagar esta escola?')"><?= $csrf ?><input type="hidden" name="a" value="apagar"><input type="hidden" name="tipo" value="escola"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul><p class="hint">O ranking aparece na página do mural. Ordem: kg, depois garrafões.</p></div>

<?php elseif ($s === 'avisos'): $c = (int)$db->query('SELECT COUNT(*) FROM subscritores WHERE confirmado=1')->fetchColumn(); $pend = (int)$db->query('SELECT COUNT(*) FROM subscritores WHERE confirmado=0')->fetchColumn(); ?>
<h1>Avisos por email</h1>
<div class="card"><p><b><?= $c ?></b> pessoas confirmaram que querem avisos<?= $pend ? " · $pend ainda por confirmar" : '' ?>.</p><p class="hint">Para enviar um aviso, marca "Avisar por email" ao publicar uma novidade ou um evento. Cada email tem um link para a pessoa cancelar. Não uses estes endereços para outra coisa.</p></div>
<div class="card"><h2>Endereços</h2><ul class="list"><?php foreach ($db->query('SELECT * FROM subscritores ORDER BY criado DESC') as $n): ?>
<li><span></span><div><b><?= $h($n['email']) ?></b><div class="muted"><?= $n['confirmado'] ? 'confirmado' : 'por confirmar' ?> · <?= $h(substr($n['criado'], 0, 10)) ?></div></div>
<div><form method="post" onsubmit="return confirm('Apagar este endereço?')"><?= $csrf ?><input type="hidden" name="a" value="tirar_subscritor"><input type="hidden" name="id" value="<?= $n['id'] ?>"><button class="del">Apagar</button></form></div></li>
<?php endforeach; ?></ul></div>

<?php elseif ($s === 'senha'): ?>
<h1>Mudar a palavra-passe</h1><div class="card"><form method="post"><?= $csrf ?><input type="hidden" name="a" value="senha">
<label for="atual">Palavra-passe atual</label><input type="password" id="atual" name="atual" autocomplete="current-password" required>
<label for="p1">Nova (10 caracteres ou mais)</label><input type="password" id="p1" name="p1" autocomplete="new-password" required minlength="10">
<label for="p2">Repetir a nova</label><input type="password" id="p2" name="p2" autocomplete="new-password" required minlength="10"><button>Mudar</button></form></div>
<?php endif; ?>
</main>
<?php endif; ?>
</body></html>
