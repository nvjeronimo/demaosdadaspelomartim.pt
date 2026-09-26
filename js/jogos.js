/* Jogos das tampinhas (jogos.html): calculadora, verdadeiro/falso, memória, adivinha o peso, rasteira da semana. */
(()=>{
const LNG=document.documentElement.lang==='en',T=(pt,en)=>LNG?en:pt;
const nf=(n,d=0)=>n.toLocaleString(LNG?'en-GB':'pt-PT',{maximumFractionDigits:d,minimumFractionDigits:d});
const eur=n=>LNG?'€'+nf(n,n<10?2:0):nf(n,n<10?2:0)+' €';
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
const conta=k=>{if(window.conta)window.conta(k)};
const BINS={plastico:T('Plástico','Plastic'),caricas:T('Caricas','Metal caps'),cortica:T('Cortiça','Cork'),nao:T('Não aceite','Not accepted')};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- 1. calculadora ---------- */
(()=>{const pl=document.getElementById('c-pl');if(!pl)return;const ca=document.getElementById('c-ca'),co=document.getElementById('c-co');
  const DIA=6740/30,R={pl:[2,.4116],ca:[2,.4656],co:[4,.5]};/* g por peça, € por kg */
  const run=()=>{const w={pl:+pl.value,ca:+ca.value,co:+co.value};['pl','ca','co'].forEach(k=>document.getElementById('o-'+k).textContent=w[k]);
    let n=0,kg=0,e=0;for(const k in w){const y=w[k]*52;n+=y;kg+=y*R[k][0]/1000;e+=y*R[k][0]/1000*R[k][1]}
    const put=(id,m)=>{const K=kg*m,E=e*m;document.getElementById(id).textContent=nf(n*m)+' '+T('tampas','caps');
      const bb=K/300,d=E/DIA;document.getElementById(id+'-t').textContent=`${nf(K,K<10?1:0)} kg · ${eur(E)}`+(bb>=.1?` · ${nf(bb,1)} BigBag${bb>=1.95?'s':''}`:'')+(d>=.1?` · ${nf(d,1)} ${T('dias de tratamento','days of treatment')}`:'')};
    put('r-tu',1);put('r-100',100);put('r-1000',1000);
    const s=document.getElementById('calc-share');if(s)s.dataset.shareText=T(`Num ano junto ${nf(n)} tampas para o Martim. Se 100 vizinhos fizerem o mesmo, são ${nf(kg*100,0)} kg e ${eur(e*100)} para os tratamentos dele. Faz as tuas contas:`,`In a year I collect ${nf(n)} caps for Martim. If 100 neighbours do the same, that is ${nf(kg*100,0)} kg and ${eur(e*100)} for his treatments. Do your own maths:`)};
  [pl,ca,co].forEach(i=>i.addEventListener('input',run));run();
  let used=false;[pl,ca,co].forEach(i=>i.addEventListener('change',()=>{if(!used){used=true;conta('jogo_calculadora')}}));
})();

/* ---------- 2. verdadeiro ou falso ---------- */
(()=>{const box=document.getElementById('tf');if(!box)return;
  const F=[
   [T('A tampa de uma garrafa de água vai para o plástico.','A water bottle cap goes in the plastic bag.'),1,T('Sim: tampas de garrafas de água e sumo são plástico.','Yes: water and juice bottle caps are plastic.')],
   [T('Uma rolha com topo de plástico vai para a cortiça.','A stopper with a plastic top goes in the cork bag.'),0,T('Não: só rolhas 100% cortiça. Com topo de plástico ou madeira fica de fora.','No: only 100% cork stoppers. With a plastic or wooden top it stays out.')],
   [T('As caricas de cerveja vão num saco só delas.','Beer caps go in a bag of their own.'),1,T('Sim: as caricas são metal e vão separadas.','Yes: metal caps are metal and go separately.')],
   [T('Posso misturar tampas e caricas no mesmo saco, o meu pai separa.','I can mix caps and metal caps in the same bag, my dad will sort them.'),0,T('Por favor não: um BigBag misturado pode ser recusado inteiro. Separar em casa é a maior ajuda.','Please don’t: a mixed BigBag can be rejected as a whole. Sorting at home is the biggest help.')],
   [T('A pega do garrafão de água é aceite.','The handle of a water jug is accepted.'),1,T('Sim: as pegas de garrafão vão com o plástico.','Yes: water-jug handles go with the plastic.')],
   [T('O garrafão inteiro também serve.','The whole water jug is also fine.'),0,T('Não: só a tampa e a pega. O garrafão vai para o ecoponto amarelo.','No: only the cap and the handle. The jug goes in the yellow recycling bin.')],
   [T('Tampas de spray são aceites.','Spray caps are accepted.'),0,T('Não: as tampas de spray ficam de fora.','No: spray caps stay out.')],
   [T('A tampa da pasta de dentes vai para o plástico.','A toothpaste cap goes in the plastic bag.'),1,T('Sim, é uma tampa de plástico.','Yes, it is a plastic cap.')],
   [T('Um BigBag tem de ter pelo menos 250 kg.','A BigBag must weigh at least 250 kg.'),1,T('Sim, e só um material. Por isso juntamos tanto antes de levar a Beja.','Yes, and only one material. That is why we collect so much before driving to Beja.')],
   [T('O dinheiro das tampas passa pela família do Martim.','The money from the caps goes through Martim’s family.'),0,T('Não: as empresas pagam diretamente à Clínica Kinésio.','No: the companies pay Clínica Kinésio directly.')],
   [T('Cápsulas de café contam como tampas.','Coffee capsules count as caps.'),0,T('Não: parecem tampas, mas não são. Ficam de fora.','No: they look like caps but aren’t. They stay out.')],
   [T('A tampa do pacote de leite é aceite.','A milk carton cap is accepted.'),1,T('Sim, vai com o plástico.','Yes, it goes with the plastic.')],
   [T('Doseadores de sabonete líquido são aceites.','Liquid-soap pumps are accepted.'),0,T('Não: os doseadores ficam de fora.','No: pumps stay out.')],
   [T('Na máquina VOLTA posso entregar a garrafa sem tampa e guardar a tampa.','At a VOLTA machine I can return the bottle without its cap and keep the cap.'),1,T('Sim: mais de 50 pessoas fizeram-no sem problemas. Confirma no ecrã que o depósito contou.','Yes: over 50 people have done it without problems. Check on screen that the deposit counted.')],
   [T('As caricas valem menos do que as tampas de plástico.','Metal caps are worth less than plastic caps.'),0,T('Pelo contrário: 465,60 €/t contra 411,60 €/t.','The opposite: €465.60/t against €411.60/t.')],
   [T('Tampas de tupperware vão para o plástico.','Food-container lids go in the plastic bag.'),0,T('Não: tampas de tupperware não são aceites.','No: food-container lids are not accepted.')]];
  let q=[],i=0,ok=0,err=[];
  const start=()=>{q=shuffle(F).slice(0,10);i=0;ok=0;err=[];show()};
  const show=()=>{if(i>=q.length)return end();const [f]=q[i];
    box.innerHTML=`<div class="tf-top"><span class="hand">${T('Pergunta','Question')} ${i+1} / ${q.length}</span><span class="hand">${T('Certas','Right')}: <b class="num">${ok}</b></span></div><p class="tf-q">${esc(f)}</p><div class="tf-btns"><button class="btn btn-red" type="button" data-v="1">${T('Verdade','True')}</button><button class="btn btn-line" type="button" data-v="0">${T('Mentira','False')}</button></div><p class="tf-fb hand" aria-live="polite"></p>`;
    box.querySelectorAll('[data-v]').forEach(b=>b.addEventListener('click',()=>{const g=+b.dataset.v===q[i][1];if(g)ok++;else err.push(q[i]);
      box.querySelectorAll('[data-v]').forEach(x=>x.disabled=true);const fb=box.querySelector('.tf-fb');fb.className='tf-fb hand '+(g?'ok':'no');fb.textContent=(g?T('Certo! ','Right! '):T('Ups! ','Oops! '))+q[i][2];i++;setTimeout(show,g?1400:2600)}));
    box.querySelector('[data-v]').focus({preventScroll:true})};
  const end=()=>{conta('jogo_verdade');box.innerHTML=`<p class="tf-end"><b class="num">${ok} / ${q.length}</b> ${ok===q.length?T('Perfeito! Já sabes as regras todas.','Perfect! You know all the rules.'):ok>=7?T('Muito bem!','Well done!'):T('Já sabes mais do que muita gente!','You already know more than most people!')}</p>`+(err.length?`<p class="hand">${T('As regras a lembrar:','Rules to remember:')}</p><ul class="regra-lista">${err.map(e=>`<li class="nao">${esc(e[2])}</li>`).join('')}</ul>`:'')+`<button class="btn btn-red" type="button" id="tf-again">${T('Jogar outra vez','Play again')}</button>`;
    document.getElementById('tf-again').addEventListener('click',start)};
  box.innerHTML=`<p class="tf-q">${T('Pronto para 10 frases?','Ready for 10 statements?')}</p><button class="btn btn-red" type="button" id="tf-go">${T('Começar','Start')}</button>`;
  document.getElementById('tf-go').addEventListener('click',start);
})();

/* ---------- 3. memória ---------- */
(()=>{const g=document.getElementById('memo');if(!g)return;
  const C=[['cap','#5AB8E6','plastico',T('Tampa de garrafa','Bottle cap')],['milk','','plastico',T('Tampa de pacote de leite','Milk carton cap')],['handle','','plastico',T('Pega de garrafão','Jug handle')],['carica','','caricas',T('Carica','Metal cap')],['cork','','cortica',T('Rolha de cortiça','Cork stopper')],['spray','','nao',T('Tampa de spray','Spray cap')],['pump','','nao',T('Doseador','Pump')],['lid','#9ED86B','nao',T('Tampa de tupperware','Food-container lid')]];
  let open=[],pairs=0,moves=0,lock=false;
  const M=document.getElementById('m-moves'),P=document.getElementById('m-pairs'),msg=document.getElementById('m-msg');
  const deal=()=>{pairs=0;moves=0;open=[];lock=false;M.textContent=0;P.textContent='0 / 8';msg.textContent='';
    g.innerHTML=shuffle([...C,...C].map((c,k)=>({c,k}))).map((x,i)=>`<button class="memo-card" type="button" data-p="${C.indexOf(x.c)}" aria-label="${T('Carta','Card')} ${i+1}"><span class="back" aria-hidden="true">?</span><span class="front"><svg aria-hidden="true" style="color:${x.c[1]||'currentColor'}"><use href="#${x.c[0]}"/></svg><small>${esc(x.c[3])}</small></span></button>`).join('')};
  g.addEventListener('click',e=>{const b=e.target.closest('.memo-card');if(!b||lock||b.classList.contains('up'))return;
    b.classList.add('up');b.setAttribute('aria-label',C[b.dataset.p][3]);open.push(b);
    if(open.length===2){moves++;M.textContent=moves;const[a,c]=open;
      if(a.dataset.p===c.dataset.p){pairs++;P.textContent=pairs+' / 8';a.classList.add('done');c.classList.add('done');const k=C[a.dataset.p];msg.textContent=`${k[3]} → ${BINS[k[2]]}`;open=[];
        if(pairs===8){msg.textContent=T(`Conseguiste em ${moves} jogadas! `,`Done in ${moves} moves! `)+(moves<=14?T('Memória de elefante!','Elephant memory!'):T('Muito bem!','Well done!'));conta('jogo_memoria')}}
      else{lock=true;setTimeout(()=>{a.classList.remove('up');c.classList.remove('up');a.setAttribute('aria-label',T('Carta virada','Face-down card'));c.setAttribute('aria-label',T('Carta virada','Face-down card'));open=[];lock=false},900)}}});
  document.getElementById('m-new').addEventListener('click',deal);deal();
})();

/* ---------- 4. adivinha o peso ---------- */
(()=>{const box=document.getElementById('peso-box');if(!box)return;
  const Q=[[T('Quantas tampas de plástico são precisas para fazer 1 kg?','How many plastic caps make 1 kg?'),500,50,5000,T('Cerca de 500: cada tampa pesa uns 2 gramas.','About 500: each cap weighs roughly 2 grams.')],
    [T('Quantas tampas cabem num BigBag de 300 kg?','How many caps fit in a 300 kg BigBag?'),150000,10000,1000000,T('Cerca de 150 000 tampas. É por isso que demoramos meses a encher um.','About 150,000 caps. That is why it takes months to fill one.')],
    [T('Quantas tampas pagam um mês inteiro de tratamento?','How many caps pay for a whole month of treatment?'),8250000,500000,20000000,T('Cerca de 8 milhões: 55 BigBags. Cada tampa é mesmo um passo!','About 8 million: 55 BigBags. Every single cap really is a step!')]];
  let i=0,score=0;const lg=(v,a,b)=>Math.round(Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*v/1000));
  const show=()=>{if(i>=Q.length){conta('jogo_peso');box.innerHTML=`<p class="tf-end"><b class="num">${'★'.repeat(score)}${'☆'.repeat(9-score)}</b></p><p>${score>=7?T('Tens olho para tampas!','You have an eye for caps!'):T('Agora já sabes porque é que cada tampa conta.','Now you know why every cap counts.')}</p><button class="btn btn-red" type="button" id="p-again">${T('Jogar outra vez','Play again')}</button>`;document.getElementById('p-again').addEventListener('click',()=>{i=0;score=0;show()});return}
    const [q,ans,a,b]=Q[i];box.innerHTML=`<p class="hand">${T('Pergunta','Question')} ${i+1} / ${Q.length}</p><p class="tf-q">${esc(q)}</p><label class="peso-range"><span class="visually-hidden">${T('O teu palpite','Your guess')}</span><input type="range" min="0" max="1000" value="500" id="p-r"></label><p class="peso-val"><b class="num" id="p-v"></b> ${T('tampas','caps')}</p><button class="btn btn-red" type="button" id="p-ok">${T('Ver a resposta','See the answer')}</button><p class="tf-fb hand" id="p-fb" aria-live="polite"></p>`;
    const r=document.getElementById('p-r'),v=document.getElementById('p-v');const upd=()=>{v.textContent=nf(lg(+r.value,a,b))};r.addEventListener('input',upd);upd();
    document.getElementById('p-ok').addEventListener('click',e=>{const g=lg(+r.value,a,b),ratio=Math.max(g,ans)/Math.min(g,ans),st=ratio<=1.35?3:ratio<=2?2:ratio<=4?1:0;score+=st;r.disabled=true;e.target.disabled=true;
      const fb=document.getElementById('p-fb');fb.className='tf-fb hand '+(st>=2?'ok':'no');fb.textContent=`${'★'.repeat(st)}${'☆'.repeat(3-st)} ${T('Resposta','Answer')}: ${nf(ans)}. ${Q[i][4]}`;i++;
      const n=document.createElement('button');n.className='btn btn-line';n.type='button';n.textContent=i<Q.length?T('Próxima pergunta','Next question'):T('Ver o resultado','See the result');n.addEventListener('click',show);fb.after(n);n.focus({preventScroll:true})})};
  show();
})();

/* ---------- 5. rasteira da semana ---------- */
(()=>{const box=document.getElementById('semana-box');if(!box||!window.PECAS)return;
  const d=new Date(),y=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));y.setUTCDate(y.getUTCDate()+4-(y.getUTCDay()||7));
  const wk=y.getUTCFullYear()*100+Math.ceil(((y-new Date(Date.UTC(y.getUTCFullYear(),0,1)))/864e5+1)/7);
  const L=window.PECAS.filter(p=>p.lv>=2).sort((a,b)=>a.id.localeCompare(b.id)),p=L[(wk*7)%L.length];
  let done=null;try{done=JSON.parse(localStorage.getItem('rasteira')||'null')}catch(e){}
  const render=ans=>{box.innerHTML=`<div class="card-item"><svg aria-hidden="true" style="color:${p.color||'#5AB8E6'}"><use href="#${p.icon}"/></svg><span>${esc(T(p.label[0],p.label[1]))}</span><small class="hand">${T('semana','week')} ${wk%100}</small></div>
    <p class="how hand">${T('Para onde vai?','Where does it go?')}</p><div class="bins">${Object.keys(BINS).map(k=>`<button class="bin${k==='nao'?' bin-no':''}${ans&&k===p.bin?' right':''}${ans&&ans===k&&k!==p.bin?' wrong':''}" type="button" data-b="${k}"${ans?' disabled':''}><b>${BINS[k]}</b></button>`).join('')}</div>
    <p class="tf-fb hand ${ans?(ans===p.bin?'ok':'no'):''}">${ans?(ans===p.bin?T(p.ok[0],p.ok[1]):T('Rasteira! ','Tricky! ')+T(p.hint[0],p.hint[1]))+' '+T('Volta na próxima semana para outra.','Come back next week for another.'):''}</p>`;
    if(!ans)box.querySelectorAll('[data-b]').forEach(b=>b.addEventListener('click',()=>{try{localStorage.setItem('rasteira',JSON.stringify({wk,a:b.dataset.b}))}catch(e){}conta('jogo_rasteira');render(b.dataset.b)}))};
  render(done&&done.wk===wk?done.a:null);
})();
})();
