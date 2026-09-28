/* O desafio das tampinhas: jogo de separar, uma peça de cada vez, com diploma, mural e partilha.
   Usado na página inicial (#ficha) e na página de jogos. Precisa de js/pecas.js e js/mural-api.js. */
(()=>{if(!document.getElementById('game')||!window.PECAS)return;
const LNG=document.documentElement.lang==='en';
const T=a=>a[LNG?1:0];
const POOL=window.PECAS;
const LEVELS={1:{n:6,pt:'fácil',en:'easy'},2:{n:10,pt:'normal',en:'normal'},3:{n:10,pt:'difícil',en:'hard'}};
let LEVEL=2;try{LEVEL=+localStorage.getItem('ficha-nivel')||2}catch(e){}if(!LEVELS[LEVEL])LEVEL=2;
let ROUND=LEVELS[LEVEL].n;
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
/* rotação: dá prioridade às peças que esta pessoa viu há mais tempo (ou nunca viu) */
let SEEN=[];try{SEEN=JSON.parse(localStorage.getItem('ficha-vistos')||'[]')}catch(e){}
const age=i=>{const k=SEEN.lastIndexOf(i.id);return k<0?1e9:SEEN.length-k};
const fresh=list=>shuffle(list).sort((a,b)=>age(b)-age(a));
function drawDeck(){
  ROUND=LEVELS[LEVEL].n;
  /* fácil: só peças óbvias; difícil: pelo menos 6 rasteiras */
  const pool=LEVEL===1?POOL.filter(i=>i.lv===1):POOL;
  const pick=['plastico','caricas','cortica','nao'].map(b=>{const c=fresh(pool.filter(i=>i.bin===b));return (LEVEL===3&&c.find(i=>i.lv===3))||c[0]});
  let rest=fresh(pool.filter(i=>!pick.includes(i)));
  if(LEVEL===3)rest=[...rest.filter(i=>i.lv===3),...rest.filter(i=>i.lv!==3)];
  const deck=shuffle([...pick,...rest.slice(0,ROUND-pick.length)]);
  SEEN=SEEN.filter(id=>!deck.some(i=>i.id===id)).concat(deck.map(i=>i.id)).slice(-80);
  try{localStorage.setItem('ficha-vistos',JSON.stringify(SEEN))}catch(e){}
  return deck;
}
const G={card:document.getElementById('card'),fb:document.getElementById('feedback'),score:document.getElementById('score'),dots:document.getElementById('dots'),
  streak:document.getElementById('streak'),stamp:document.getElementById('stamp'),dip:document.getElementById('diploma'),stage:document.getElementById('stage'),
  bins:[...document.querySelectorAll('#bins .bin')],name:document.getElementById('g-name'),game:document.getElementById('game')};
let deck=[],pos=0,right=0,run=0,best=0,busy=false,t0=0,secs=0,rid='';
try{G.name.value=localStorage.getItem('ficha-nome')||''}catch(e){}
G.name.addEventListener('input',()=>{try{localStorage.setItem('ficha-nome',G.name.value.trim())}catch(e){}});
function start(){
  deck=drawDeck();t0=0;secs=0;rid=Date.now().toString(36)+Math.random().toString(36).slice(2,7);document.querySelectorAll('.levels [data-lv]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.lv===LEVEL));pos=0;right=0;run=0;best=0;busy=false;
  G.dots.innerHTML=deck.map(()=>'<li></li>').join('');
  G.bins.forEach(b=>{b.querySelector('.count').textContent='0';b.disabled=false;b.classList.remove('right','wrong')});
  G.dip.hidden=true;G.stage.hidden=false;G.game.classList.remove('done');G.stamp.classList.remove('on');G.streak.textContent='';
  G.fb.className='feedback';G.fb.textContent='';
  show();upd();
}
function show(){
  if(!t0)t0=performance.now();
  const it=deck[pos];
  G.card.innerHTML=`<svg aria-hidden="true" style="color:${it.color||'#5AB8E6'}"><use href="#${it.icon}"/></svg><span>${T(it.label)}</span><small class="num">${pos+1} / ${deck.length}</small>`;
  G.card.classList.remove('in');void G.card.offsetWidth;G.card.classList.add('in');
}
function upd(){G.score.textContent=right+' / '+ROUND}
function pick(bin){
  if(busy)return;busy=true;
  const it=deck[pos],good=it.bin===bin.dataset.bin,target=G.bins.find(b=>b.dataset.bin===it.bin);
  const dot=G.dots.children[pos];dot.classList.add(good?'ok':'no');
  if(good){right++;run++;best=Math.max(best,run)}else{run=0}
  target.querySelector('.count').textContent=+target.querySelector('.count').textContent+1;
  bin.classList.add(good?'right':'wrong');if(!good)target.classList.add('right');
  G.fb.className='feedback'+(good?'':' bad');
  G.fb.innerHTML=`<svg aria-hidden="true"><use href="#${good?'i-tick':'i-cross'}"/></svg><span>${good?T(it.ok):(LNG?'Almost! ':'Quase! ')+T(it.hint)}</span>`;
  G.streak.textContent=run>=3?(LNG?run+' in a row!':run+' seguidas!'):'';
  G.card.classList.add(good?'fly':'shake');upd();
  setTimeout(()=>{G.bins.forEach(b=>b.classList.remove('right','wrong'));G.card.classList.remove('fly','shake');pos++;busy=false;
    if(pos<deck.length)show();else finish()},good?900:1700);
}
function dipName(){return (document.getElementById('dip-name').value||G.name.value||'').trim()}
function shareTxt(){const n=dipName()||(LNG?'A friend of Martim':'Um amigo do Martim');
  return LNG?`${n} scored ${right}/${ROUND} in Martim’s bottle-cap challenge and earned the Friend of Martim diploma! Can you beat that?`:`${n} fez ${right}/${ROUND} no desafio das tampinhas e ganhou o diploma de amigo do Martim! Consegues fazer melhor?`}
/* resultado: o diploma cai no caderno, as estrelas saltam uma a uma, o selo carimba e chovem tampinhas */
function reveal(){
  const d=G.dip;d.classList.remove('reveal');void d.offsetWidth;d.classList.add('reveal');
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const b=document.getElementById('dip-body').querySelector('b');
  if(b){const tgt=right,txt=b.textContent;let n=0;const tick=()=>{b.textContent=txt.replace(/^\d+/,n);if(n++<tgt)setTimeout(tick,70)};setTimeout(tick,500)}
  const box=document.createElement('div');box.className='confetti';box.setAttribute('aria-hidden','true');
  const cols=['var(--cap1)','var(--cap2)','var(--cap3)','var(--cap4)','var(--hl)','#FF7A1A'];
  for(let i=0;i<(right>=Math.ceil(ROUND*.75)?34:14);i++){const c=document.createElement('i');
    c.style.cssText=`--x:${Math.random()*100}%;--dx:${(Math.random()-.5)*160}px;--r:${Math.random()*720-360}deg;--d:${1.4+Math.random()*1.2}s;--w:${.9+Math.random()*.9}s;--s:${10+Math.random()*12}px;background:${cols[i%cols.length]}`;box.appendChild(c)}
  d.appendChild(box);setTimeout(()=>box.remove(),3200);
}
function finish(){
  if(window.conta)conta('desafio_fim_nivel'+LEVEL);
  secs=Math.max(1,Math.round((performance.now()-t0)/1000));
  G.stage.hidden=true;G.game.classList.add('done');G.dip.hidden=false;reveal();
  const dn=document.getElementById('dip-name');dn.value=(G.name.value||'').trim();
  const stars=right===ROUND?3:right>=Math.ceil(ROUND*.75)?2:1;
  document.getElementById('stars').innerHTML='<svg><use href="#i-star"/></svg>'.repeat(stars)+'<svg class="off"><use href="#i-star"/></svg>'.repeat(3-stars);
  document.getElementById('dip-body').innerHTML=LNG?`sorted <b>${right} out of ${ROUND}</b> items into the right bag in the Bottle-Cap Challenge (${LEVELS[LEVEL].en} level, ${secs} s) and is, from today, an official <b>Friend of Martim</b> and bottle-cap sorter.`:`separou <b>${right} de ${ROUND}</b> peças no saco certo no Desafio das Tampinhas (nível ${LEVELS[LEVEL].pt}, em ${secs} s) e é, a partir de hoje, <b>Amigo do Martim</b> e separador oficial de tampinhas.`;
  document.getElementById('dip-text').textContent=LNG?(right===ROUND?'Perfect score. You sort like my dad!':'You already know more than most people!'):(right===ROUND?'Tudo certo. Já separas como o meu pai!':'Já sabes mais do que muita gente!');
  const d=new Date(),m=LNG?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  document.getElementById('dip-date').textContent=d.getDate()+' '+m[d.getMonth()]+' '+d.getFullYear();
  document.getElementById('dip-date-label').textContent=LNG?'Date':'Data';
  if(right>=Math.ceil(ROUND*.75))G.stamp.classList.add('on');
  G.fb.className='feedback';G.fb.textContent='';
  document.getElementById('game-share').dataset.shareText=shareTxt();
  saveResult();
  if(!dn.value)setTimeout(()=>dn.focus({preventScroll:true}),600);
  G.dip.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
}
function saveResult(){try{localStorage.setItem('mural-meu',JSON.stringify({id:rid,n:dipName(),r:right,t:ROUND,lv:LEVEL,s:secs,d:new Date().toISOString().slice(0,10),p:document.documentElement.dataset.paleta,pub:document.getElementById('dip-mural').checked}))}catch(e){}}
/* mural: ao guardar ou partilhar o diploma, entra no top 10 se a pessoa autorizou */
async function toMural(){const st=document.getElementById('dip-mural-st');if(!document.getElementById('dip-mural').checked)return;
  if(!dipName()){st.textContent=LNG?'Write your name on the diploma to join the wall.':'Escreve o teu nome no diploma para entrar no mural.';return}
  saveResult();const res=await MuralAPI.send({id:rid,n:dipName(),r:right,t:ROUND,lv:LEVEL,s:secs,d:new Date().toISOString().slice(0,10)});
  const lv=LNG?LEVELS[LEVEL].en:LEVELS[LEVEL].pt,link=`<a href="mural.html">${LNG?'See the wall →':'Ver o mural →'}</a>`;
  if(!res.ok){st.innerHTML=res.why==='nome'?(LNG?'That name can’t go on the wall. Try your first name.':'Esse nome não pode ir para o mural. Experimenta o teu primeiro nome.'):(LNG?'We couldn’t reach the wall right now. Try again later.':'Não conseguimos chegar ao mural agora. Tenta mais tarde.');return}
  st.innerHTML=res.pos?(LNG?`You’re number ${res.pos} on the ${lv} level! `:`Estás em ${res.pos}.º lugar no nível ${lv}! `)+link:(res.pos===0?(LNG?`You’re on the wall, outside the ${lv} top 10 for now. `:`Estás no mural, ainda fora do top 10 do nível ${lv}. `)+link:res.local?(LNG?'Saved on this device’s wall. The shared wall goes live once the family switches it on. ':'Guardado no mural deste aparelho. O mural partilhado com todos fica ativo quando a família o ligar. ')+link:(LNG?'Your result is on the wall. ':'O teu resultado está no mural. ')+link)}
document.getElementById('dip-name').addEventListener('input',e=>{G.name.value=e.target.value;saveResult();try{localStorage.setItem('ficha-nome',e.target.value.trim())}catch(x){}document.getElementById('game-share').dataset.shareText=shareTxt()});

/* diploma como imagem (PNG) para guardar ou partilhar */
async function diplomaPNG(){
  await document.fonts.ready;
  const W=1600,H=1130,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const css=getComputedStyle(document.documentElement),v=k=>css.getPropertyValue(k).trim()||'#1E2B45';
  const cover=v('--cover'),pen=v('--pen'),hl=v('--hl'),act=v('--logo-1'),ink='#1B1D2A';
  x.fillStyle='#FFFDF7';x.fillRect(0,0,W,H);
  x.strokeStyle=cover;x.lineWidth=14;x.strokeRect(40,40,W-80,H-80);x.lineWidth=3;x.strokeRect(70,70,W-140,H-140);
  [[70,70],[W-70,70],[70,H-70],[W-70,H-70]].forEach(([a,b])=>{x.fillStyle=hl;x.beginPath();x.arc(a,b,22,0,7);x.fill();x.strokeStyle=ink;x.lineWidth=3;x.stroke()});
  x.textAlign='center';x.fillStyle=pen;
  x.font='700 26px "Atkinson Hyperlegible", sans-serif';x.fillText((LNG?'HAND IN HAND FOR MARTIM · CASE NO. 167 · BOLIQUEIME':'DE MÃOS DADAS PELO MARTIM · PROCESSO Nº 167 · BOLIQUEIME'),W/2,170);
  x.fillStyle=ink;x.font='800 96px "Bricolage Grotesque", sans-serif';x.fillText(LNG?'Friend of Martim Diploma':'Diploma de Amigo do Martim',W/2,290);
  x.fillStyle=pen;x.font='400 44px "Gochi Hand", cursive';x.fillText(LNG?'This certifies that':'Certifica-se que',W/2,380);
  const nm=dipName()||(LNG?'A friend of Martim':'Um amigo do Martim');
  x.fillStyle=act;x.font='400 110px "Gochi Hand", cursive';x.fillText(nm,W/2,510);
  x.strokeStyle=pen;x.lineWidth=3;x.beginPath();x.moveTo(W/2-460,540);x.lineTo(W/2+460,540);x.stroke();
  x.fillStyle=ink;x.font='400 36px "Atkinson Hyperlegible", sans-serif';
  const body=LNG?[`sorted ${right} out of ${ROUND} items into the right bag in the Bottle-Cap Challenge (${LEVELS[LEVEL].en} level, ${secs} s)`,'and is, from today, an official Friend of Martim and bottle-cap sorter.']:[`separou ${right} de ${ROUND} peças no saco certo no Desafio das Tampinhas (nível ${LEVELS[LEVEL].pt}, em ${secs} s)`,'e é, a partir de hoje, Amigo do Martim e separador oficial de tampinhas.'];
  body.forEach((l,i)=>x.fillText(l,W/2,620+i*52));
  const st=right===ROUND?3:right>=Math.ceil(ROUND*.75)?2:1;
  for(let i=0;i<3;i++){const cx=W/2-90+i*90,cy=780;x.beginPath();for(let k=0;k<10;k++){const r=k%2?18:40,a=-Math.PI/2+k*Math.PI/5;x.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a))}x.closePath();x.fillStyle=i<st?hl:'#fff';x.fill();x.strokeStyle=ink;x.lineWidth=3;x.stroke()}
  x.fillStyle=pen;x.font='400 64px "Gochi Hand", cursive';x.fillText('Martim',360,960);
  x.strokeStyle=ink;x.lineWidth=2;x.beginPath();x.moveTo(210,985);x.lineTo(510,985);x.stroke();
  x.fillStyle=ink;x.font='700 24px "Atkinson Hyperlegible", sans-serif';x.fillText('Martim Silva Cruz',360,1022);
  x.fillStyle=pen;x.font='400 54px "Gochi Hand", cursive';x.fillText(document.getElementById('dip-date').textContent,W-360,960);
  x.beginPath();x.moveTo(W-510,985);x.lineTo(W-210,985);x.stroke();x.fillStyle=ink;x.font='700 24px "Atkinson Hyperlegible", sans-serif';x.fillText(LNG?'Date':'Data',W-360,1022);
  x.save();x.translate(W/2,960);x.rotate(-.18);x.strokeStyle='#E0301E';x.fillStyle='rgba(224,48,30,.06)';x.lineWidth=7;x.beginPath();x.arc(0,0,104,0,7);x.fill();x.stroke();
  x.setLineDash([10,8]);x.lineWidth=3;x.beginPath();x.arc(0,0,86,0,7);x.stroke();x.setLineDash([]);x.fillStyle='#E0301E';
  x.font='800 30px "Bricolage Grotesque", sans-serif';x.fillText(LNG?'FRIEND OF':'AMIGO DO',0,-18);x.fillText('MARTIM',0,16);x.font='800 40px "Bricolage Grotesque", sans-serif';x.fillText('167',0,62);x.restore();
  return new Promise(r=>c.toBlob(r,'image/png'));
}
document.getElementById('dip-cover').addEventListener('click',e=>{e.stopPropagation();const t=document.querySelector('.paleta-toggle');if(t&&t.getAttribute('aria-expanded')!=='true')t.click()});
document.getElementById('dip-save').addEventListener('click',async()=>{
  toMural();
  const blob=await diplomaPNG(),name=(LNG?'Friend of Martim diploma':'Diploma Amigo do Martim')+(dipName()?' - '+dipName().replace(/[\\/:*?"<>|]+/g,''):'')+'.png',file=new File([blob],name,{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:LNG?'Friend of Martim Diploma':'Diploma de Amigo do Martim',text:shareTxt()});return}catch(e){if(e.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
});
/* TikTok: a imagem do diploma vai para a folha de partilha (telemóvel) ou é descarregada; a legenda fica copiada */
document.getElementById('game-share').addEventListener('click',e=>{if(e.target.closest('[data-share]'))toMural()});
document.getElementById('dip-mural').addEventListener('change',e=>{try{localStorage.setItem('mural-ok',e.target.checked?'1':'')}catch(x){}saveResult()});
try{document.getElementById('dip-mural').checked=!!localStorage.getItem('mural-ok')}catch(x){}
document.getElementById('game-share').addEventListener('share-tiktok',async e=>{
  toMural();
  const b=e.detail.btn,s=b.querySelector('span'),old=s.textContent,u=new URL('#ficha',location.href).href,cap=shareTxt()+' '+u+' #DeMaosDadasPeloMartim #tampinhas';
  try{await navigator.clipboard.writeText(cap)}catch(x){}
  const blob=await diplomaPNG(),name=(LNG?'Friend of Martim diploma':'Diploma Amigo do Martim')+(dipName()?' - '+dipName().replace(/[\\/:*?"<>|]+/g,''):'')+'.png',file=new File([blob],name,{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],text:cap});return}catch(x){if(x.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
  s.textContent=LNG?'Diploma saved, caption copied':'Diploma guardado, legenda copiada';b.classList.add('done');setTimeout(()=>{s.textContent=old;b.classList.remove('done')},3600);
  window.open('https://www.tiktok.com/upload','_blank','noopener');
});
G.bins.forEach(b=>b.addEventListener('click',()=>pick(b)));
document.getElementById('again').addEventListener('click',()=>{start();G.game.scrollIntoView({behavior:'smooth',block:'start'})});
document.querySelectorAll('.levels [data-lv]').forEach(b=>b.addEventListener('click',()=>{LEVEL=+b.dataset.lv;try{localStorage.setItem('ficha-nivel',LEVEL)}catch(e){}start()}));
start();
})();
