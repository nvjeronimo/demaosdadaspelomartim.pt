/* Vamos Ajudar o Martim: comportamento partilhado por todas as páginas */
/* ---------- copiar (IBAN, link) ---------- */
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
  const lbl=b.dataset.label||(b.dataset.label=b.textContent);
  try{await navigator.clipboard.writeText(b.dataset.copy)}catch(e){}
  b.textContent='Copiado';b.classList.add('done');setTimeout(()=>{b.textContent=lbl;b.classList.remove('done')},2200);
}));


/* ---------- cover picker (visitor feature, remembered per browser) ---------- */
const PALETTES={
 kraft:{n:'Kraft e tampinhas',cover:'#D8BB93',on:'#2A2118',hl:'#FFB68C',pen:'#23405A',act:'#C24A22',ai:'#fff',caps:['#F28A3B','#EB86AD','#5FAEDB','#6CB672']},
 menta:{n:'Menta e tangerina',cover:'#BFE6D6',on:'#173A2E',hl:'#FFB066',pen:'#1F4A3E',act:'#B3471A',ai:'#fff',caps:['#FF8A3D','#F27BA5','#4FA8D8','#2FA36B']},
 ceu:{n:'Céu e marinho',cover:'#C3DFF4',on:'#14304A',hl:'#FFD27A',pen:'#1B3F66',act:'#1C4F80',ai:'#fff',caps:['#F29A4A','#EE8AB0','#1C4F80','#5DBB8A']},
 pessego:{n:'Pêssego e azul',cover:'#FFD4BC',on:'#3A1F12',hl:'#9FD4F2',pen:'#264466',act:'#1F5E8C',ai:'#fff',caps:['#F07F45','#E97BA3','#4B9ED6','#6DBB7C']},
 limao:{n:'Limão e grafite',cover:'#F3E98F',on:'#22221E',hl:'#A3E2C9',pen:'#2F3440',act:'#2B2D33',ai:'#fff',caps:['#FF8A3D','#EE7FA8','#4FA8D8','#2FA36B']},
 rosa:{n:'Rosa e verde',cover:'#F6C7D4',on:'#3A1623',hl:'#BFE8A9',pen:'#2E4A3A',act:'#2F7A4F',ai:'#fff',caps:['#F28A3B','#D94F84','#5FAEDB','#3E9E5E']},
 noite:{n:'Azul-noite e tampinhas',cover:'#1E2B45',on:'#F4F1EA',hl:'#FFB86B',pen:'#1E2B45',act:'#F2784B',ai:'#1B1D2A',hoc:'#FFB86B',caps:['#FF9A4D','#F28AB3','#6EC1EA','#79C98A']},
 oceano:{n:'Oceano e areia',cover:'#226873',on:'#FFFFFF',hl:'#F5D7A6',pen:'#1D4F57',act:'#E3703F',ai:'#1B1D2A',hoc:'#F5D7A6',caps:['#F5A25D','#F29BB8','#BFE6F0','#F5D7A6']},
 alperce:{n:'Alperce e ameixa',cover:'#F7B774',on:'#2D1A2E',hl:'#D8C6F1',pen:'#4A2C5E',act:'#6A3B8C',ai:'#fff',caps:['#E0602A','#D96A9A','#5A8FD0','#7A5AA6']},
 algodao:{n:'Algodão-doce',cover:'#CFE3F7',on:'#1E2F45',hl:'#FFC4E1',pen:'#2B3F66',act:'#B8336F',ai:'#fff',caps:['#FF9C6B','#F07AB2','#6BA7E8','#8AD1B0']},
 reciclado:{n:'Papel reciclado e laranja',cover:'#D8D5CE',on:'#262626',hl:'#FFA25F',pen:'#2F3A45',act:'#B24612',ai:'#fff',caps:['#FF8A3D','#EE7FA8','#4FA8D8','#2FA36B']},
 festa:{n:'Festa das tampinhas',cover:'#FFF3D6',on:'#1B1D2A',hl:'#FFD166',pen:'#1A3E5C',act:'#C02A55',ai:'#fff',caps:['#EF476F','#FFD166','#06D6A0','#118AB2']},
 agua:{n:'Verde-água e coral',cover:'#A2D9CC',on:'#15352E',hl:'#FFA286',pen:'#1D4A42',act:'#C9452B',ai:'#fff',caps:['#FF8660','#F08AB0','#4FA8D8','#E8B84A']}
};
let PICKER=['menta','ceu','pessego','limao','rosa','noite','oceano','alperce','algodao','reciclado','festa','agua'];
const root=document.documentElement;
function applyPal(id){
  const P=PALETTES[id]||PALETTES.noite,st=root.style,mix=(a,b,w)=>`color-mix(in srgb, ${a} ${w}%, ${b})`;
  const dark=!!P.hoc;
  const vars={'--cover':P.cover,'--cover-deep':mix(P.cover,'#000',dark?70:80),'--on-cover':P.on,'--on-cover-soft':mix(P.on,P.cover,86),'--cover-ink':mix(P.on,P.cover,86),
   '--hl':P.hl,'--hl-soft':mix(P.hl,'#fff',26),'--hl-on-cover':P.hoc||mix(P.on,'#7A3412',55),'--pen':P.pen,'--grid':mix(P.pen,'transparent',14),'--rule':mix(P.pen,'#fff',13),
   '--ring':mix(P.pen,'transparent',26),'--tape':'rgba(255,255,255,.6)','--action':P.act,'--action-ink':P.ai,'--cap1':P.caps[0],'--cap2':P.caps[1],'--cap3':P.caps[2],'--cap4':P.caps[3]};
  for(const k in vars)st.setProperty(k,vars[k]);
  root.dataset.paleta=id;if(dark)root.dataset.dark='';else delete root.dataset.dark;
  document.querySelectorAll('.paleta [data-p]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===id));
  const t=document.querySelector('.paleta-toggle');if(t)t.setAttribute('aria-label','Escolhe a capa (atual: '+P.n+')');
}
function buildPicker(){
  const panel=document.getElementById('paleta-panel'),tog=document.querySelector('.paleta-toggle');
  panel.querySelectorAll('button').forEach(b=>b.remove());
  PICKER.forEach(id=>{const P=PALETTES[id],b=document.createElement('button');b.type='button';b.dataset.p=id;b.setAttribute('aria-pressed','false');
    b.style.setProperty('--a',P.cover);b.style.setProperty('--b',P.hl);b.style.setProperty('--c1',P.caps[0]);b.style.setProperty('--c2',P.caps[2]);
    b.innerHTML='<span class="sw" aria-hidden="true"></span>'+P.n;
    b.addEventListener('click',()=>{applyPal(id);try{localStorage.setItem('paleta',id)}catch(e){}});panel.appendChild(b)});
  const close=()=>{panel.hidden=true;tog.setAttribute('aria-expanded','false')};
  tog.onclick=()=>{const o=panel.hidden;panel.hidden=!o;tog.setAttribute('aria-expanded',String(o));if(o)(panel.querySelector('[aria-pressed="true"]')||panel.querySelector('button')).focus()};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){close();tog.focus()}});
  document.addEventListener('click',e=>{if(!e.target.closest('.paleta'))close()});
}
{const qs=new URLSearchParams(location.search);let q=qs.get('paleta'),st=null;try{st=localStorage.getItem('paleta')}catch(e){}
 if(qs.get('picker'))PICKER=qs.get('picker').split(',').filter(x=>PALETTES[x]);
 buildPicker();applyPal(q&&PALETTES[q]?q:(st&&PICKER.includes(st)?st:'noite'));
 if(qs.has('semseletor'))document.querySelector('.paleta').hidden=true;
 if(qs.has('abrircapas'))document.querySelector('.paleta-toggle').click();}


/* ---------- datas relativas: "Hoje!", "Amanhã!", "Faltam N dias", "Já foi" ---------- */
(function(){
  const dias=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],meses=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const t=new Date();t.setHours(0,0,0,0);
  document.querySelectorAll('[data-quando]').forEach(el=>{
    const [y,m,d]=el.dataset.quando.split('-').map(Number),dt=new Date(y,m-1,d),diff=Math.round((dt-t)/864e5);
    const base=dias[dt.getDay()]+', '+d+' '+meses[m-1];
    const rel=diff===0?'Hoje!':diff===1?'Amanhã!':diff>1&&diff<=14?'Faltam '+diff+' dias:':diff<0?'Já foi:':'';
    el.textContent=(rel?rel+' ':'')+base;
    if(diff<0)el.closest('[data-evento]')?.classList.add('passado');
  });
})();

/* ---------- copiar o link da página ---------- */
document.querySelectorAll('[data-copy-url]').forEach(b=>b.addEventListener('click',async()=>{
  const lbl=b.lastChild.textContent;let ok=true;
  try{await navigator.clipboard.writeText(location.href)}catch(e){ok=false}
  b.lastChild.textContent=ok?'Link copiado':location.href;setTimeout(()=>{b.lastChild.textContent=lbl},2400);
}));
