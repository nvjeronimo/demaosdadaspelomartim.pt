/* Mural dos amigos: top 10 por nível.
   MURAL_API_URL = endereço da "app web" do Google Apps Script (ver backend/LEIA-ME.md).
   Enquanto estiver vazio, o mural mostra os nomes de js/mural.js (afixados à mão) e o teu resultado guardado neste navegador. */
const MURAL_API_URL = '';

window.MuralAPI = (() => {
  const qs = new URLSearchParams(location.search);
  const API = qs.get('api') || MURAL_API_URL;            // ?api=… só para testes
  const BAD = /(merd|foda|fod[ae]|caralh|puta|put[ao]|cabr[aã]o|paneleir|cona\b|piç|pila\b|idiota|estupid|fuck|shit|bitch|dick|porn)/i;
  const clean = s => String(s || '').normalize('NFC').replace(/[^\p{L}\p{M} '\-.]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 20);
  const firstName = s => clean(s).split(' ')[0] || '';
  const valid = e => e && e.n && !BAD.test(e.n) && !BAD.test(e.terra || '') && e.r >= 0 && e.r <= e.t && [6, 10].includes(+e.t) && [1, 2, 3].includes(+e.lv) && e.s >= e.t;
  const key = e => (firstName(e.n) + '|' + clean(e.terra)).toLowerCase() + '|' + e.lv;
  /* melhor resultado por pessoa e nível; ordena por certas, depois tempo, depois quem chegou primeiro */
  const rank = list => {
    const best = {};
    list.filter(valid).forEach(e => { const k = key(e), b = best[k]; if (!b || e.r > b.r || (e.r === b.r && e.s < b.s)) best[k] = e; });
    const out = { 1: [], 2: [], 3: [] };
    Object.values(best).forEach(e => out[e.lv].push(e));
    Object.keys(out).forEach(l => out[l].sort((a, b) => b.r - a.r || a.s - b.s || String(a.d).localeCompare(String(b.d))).splice(10));
    return out;
  };
  const mine = () => { try { return JSON.parse(localStorage.getItem('mural-meu') || 'null') } catch (e) { return null } };
  const sent = () => { try { return JSON.parse(localStorage.getItem('mural-enviados') || '[]') } catch (e) { return [] } };
  const markSent = id => { try { const s = sent(); s.push(id); localStorage.setItem('mural-enviados', JSON.stringify(s.slice(-50))) } catch (e) {} };

  async function top() {
    if (API) {
      try {
        const r = await fetch(API + (API.includes('?') ? '&' : '?') + 'a=top', { cache: 'no-store' });
        const j = await r.json();
        if (j && j.ok) return { live: true, levels: rank([].concat(j.top[1] || [], j.top[2] || [], j.top[3] || [])) };
      } catch (e) {}
    }
    /* sem servidor: nomes afixados à mão + o teu resultado, se o puseste no mural */
    const list = (window.MURAL || []).slice();
    const m = mine();
    if (m && m.pub) list.push(Object.assign({ me: true }, m));
    return { live: false, levels: rank(list) };
  }

  /* envia o resultado (só com consentimento). Devolve {ok, pos} quando há servidor. */
  async function send(e) {
    const entry = { id: e.id, n: firstName(e.n), terra: clean(e.terra), r: +e.r, t: +e.t, lv: +e.lv, s: Math.max(1, Math.round(e.s)), d: e.d };
    if (!valid(entry)) return { ok: false, why: 'nome' };
    if (sent().includes(entry.id)) return { ok: true, repeat: true };
    if (!API) { markSent(entry.id); return { ok: true, local: true } }
    try {
      const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(entry) });
      const j = await r.json();
      if (j && j.ok) { markSent(entry.id); return { ok: true, pos: j.pos } }
      return { ok: false, why: (j && j.why) || 'servidor' };
    } catch (err) { return { ok: false, why: 'rede' } }
  }
  return { top, send, rank, firstName, live: !!API };
})();
