/* Jogos das tampinhas (jogos.html): calculadora, verdadeiro/falso, memória, adivinha o peso, rasteira do dia. */
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
   [T('Tampas de tupperware vão para o plástico.','Food-container lids go in the plastic bag.'),0,T('Não: tampas de tupperware não são aceites.','No: food-container lids are not accepted.')],
   [T('A tampa do champô vai para o plástico.','A shampoo cap goes in the plastic bag.'),1,T('Sim: tampas de champô são plástico e são aceites.','Yes: shampoo caps are plastic and accepted.')],
   [T('A tampa do amaciador da roupa é aceite.','A fabric softener cap is accepted.'),1,T('Sim, vai com o plástico.','Yes, it goes with the plastic.')],
   [T('A tampa do detergente da loiça é aceite.','A washing-up liquid cap is accepted.'),1,T('Sim: é plástico e conta.','Yes: it is plastic and it counts.')],
   [T('A tampa do gel de banho vai para o plástico.','A shower gel cap goes in the plastic bag.'),1,T('Sim, é uma tampa de plástico.','Yes, it is a plastic cap.')],
   [T('A tampa do pacote de sumo é aceite.','A juice carton cap is accepted.'),1,T('Sim: é plástico de uma bebida.','Yes: it is plastic from a drink.')],
   [T('A tampa do iogurte líquido vai para o plástico.','A drinking-yoghurt cap goes in the plastic bag.'),1,T('Sim, é uma tampa de plástico.','Yes, it is a plastic cap.')],
   [T('A tampa de um garrafão de água de 5 litros é aceite.','The cap of a 5-litre water jug is accepted.'),1,T('Sim: a tampa e a pega vão para o plástico. O garrafão não.','Yes: the cap and the handle go in the plastic. The jug doesn’t.')],
   [T('A tampa da garrafa de lixívia vai para o plástico.','A bleach bottle cap goes in the plastic bag.'),1,T('Sim: a tampa da lixívia é plástico e é aceite.','Yes: the bleach cap is plastic and accepted.')],
   [T('A carica de uma garrafa de água com gás vai para as caricas.','The cap of a sparkling-water glass bottle goes with the metal caps.'),1,T('Sim: é metal, vai no saco das caricas.','Yes: it is metal, so it goes in the metal-cap bag.')],
   [T('A carica de um refrigerante em garrafa de vidro é aceite.','The metal cap of a soft drink in a glass bottle is accepted.'),1,T('Sim: as caricas das garrafas de vidro são metal e contam.','Yes: caps from glass bottles are metal and they count.')],
   [T('Uma rolha de vinho 100% cortiça é aceite.','A 100% cork wine stopper is accepted.'),1,T('Sim: vai para a cortiça, que a Amorim recicla.','Yes: it goes in the cork bag, which Amorim recycles.')],
   [T('As tampas de garrafas de sumo contam.','Juice bottle caps count.'),1,T('Sim: sumos e águas são das melhores tampas.','Yes: juice and water caps are among the best.')],
   [T('Tampas de cores diferentes podem ir no mesmo saco do plástico.','Plastic caps of different colours can go in the same bag.'),1,T('Sim: o que importa é o material, não a cor.','Yes: what matters is the material, not the colour.')],
   [T('Uma tampa pequenina conta tanto como uma grande.','A tiny cap counts just like a big one.'),1,T('Sim: tudo é pesado junto. Cada tampinha soma.','Yes: everything is weighed together. Every little cap adds up.')],
   [T('As pegas de garrafão vão juntas com as tampas de plástico.','Water-jug handles go together with the plastic caps.'),1,T('Sim: as pegas são plástico e vão no mesmo saco.','Yes: handles are plastic and go in the same bag.')],
   [T('Tampas de garrafas de leite de plástico são aceites.','Caps from plastic milk bottles are accepted.'),1,T('Sim, são tampas de plástico de uma bebida.','Yes, they are plastic caps from a drink.')],
   [T('A tampa de um jerrican é aceite.','A jerrycan cap is accepted.'),0,T('Não: as tampas de jerricans não são aceites.','No: jerrycan caps are not accepted.')],
   [T('A tampa de uma garrafa de azeite vai para o plástico.','An olive oil bottle cap goes in the plastic bag.'),0,T('Não: embalagens com gordura (azeite, óleo, manteiga) ficam de fora.','No: packaging that held fat (olive oil, cooking oil, butter) stays out.')],
   [T('A tampa de uma garrafa de óleo de cozinha é aceite.','A cooking oil bottle cap is accepted.'),0,T('Não: a gordura estraga o lote. Fica de fora.','No: grease spoils the batch. It stays out.')],
   [T('A tampa de uma embalagem de manteiga vai para o plástico.','A butter tub lid goes in the plastic bag.'),0,T('Não: tudo o que teve gordura fica de fora.','No: anything that held fat stays out.')],
   [T('A tampa de uma lata de tinta é aceite.','A paint tin lid is accepted.'),0,T('Não: tintas e vernizes não são aceites.','No: paint and varnish are not accepted.')],
   [T('A tampa de um frasco de verniz vai para o plástico.','A varnish jar lid goes in the plastic bag.'),0,T('Não: embalagens de vernizes ficam de fora.','No: varnish containers stay out.')],
   [T('A tampa de uma seringa vai para o plástico.','A syringe cap goes in the plastic bag.'),0,T('Não: resíduos hospitalares nunca.','No: never hospital waste.')],
   [T('O borrifador de um produto de limpeza é aceite.','A cleaning spray trigger is accepted.'),0,T('Não: tem uma mola de ferro lá dentro.','No: it has a metal spring inside.')],
   [T('O doseador de um frasco de creme é aceite.','The pump of a cream bottle is accepted.'),0,T('Não: os doseadores têm mola de ferro.','No: pumps have a metal spring.')],
   [T('Uma tampa de plástico com rosca de metal vai para o plástico.','A plastic cap with a metal thread goes in the plastic bag.'),0,T('Não: plástico misturado com metal não é aceite.','No: plastic mixed with metal is not accepted.')],
   [T('Uma rolha com topo de madeira vai para a cortiça.','A stopper with a wooden top goes in the cork bag.'),0,T('Não: só rolhas 100% cortiça.','No: only 100% cork stoppers.')],
   [T('Uma rolha com topo de metal é aceite.','A stopper with a metal top is accepted.'),0,T('Não: com topo de metal ou plástico fica de fora.','No: with a metal or plastic top it stays out.')],
   [T('Uma rolha de plástico vai para a cortiça.','A plastic stopper goes in the cork bag.'),0,T('Não: parece rolha, mas é plástico e não é aceite.','No: it looks like a cork but it is plastic, and it isn’t accepted.')],
   [T('As recargas do ambientador da sanita são aceites.','Toilet freshener refills are accepted.'),0,T('Não: as recargas de sanita ficam de fora.','No: toilet refills stay out.')],
   [T('A tampa de um produto perigoso vai para o plástico.','The cap of a hazardous product goes in the plastic bag.'),0,T('Não: tampas de produtos perigosos não são aceites.','No: hazardous-product caps are not accepted.')],
   [T('Uma cápsula de café de alumínio vai para as caricas.','An aluminium coffee capsule goes with the metal caps.'),0,T('Não: cápsulas de café não são tampas. Ficam de fora.','No: coffee capsules aren’t caps. They stay out.')],
   [T('Uma cápsula de café de plástico vai para o plástico.','A plastic coffee capsule goes in the plastic bag.'),0,T('Não: cápsulas de café ficam de fora, sejam de que material forem.','No: coffee capsules stay out, whatever they are made of.')],
   [T('A tampa de uma caixa de tupperware conta como tampa.','A Tupperware box lid counts as a cap.'),0,T('Não: tampas de tupperware não são aceites.','No: Tupperware lids are not accepted.')],
   [T('A garrafa de plástico inteira também serve.','The whole plastic bottle is fine too.'),0,T('Não: só a tampa. A garrafa vai para o ecoponto amarelo ou para a VOLTA.','No: only the cap. The bottle goes in the yellow bin or to VOLTA.')],
   [T('O pacote de leite inteiro é aceite.','The whole milk carton is accepted.'),0,T('Não: só a tampa de plástico. O pacote vai para o ecoponto amarelo.','No: only the plastic cap. The carton goes in the yellow bin.')],
   [T('Posso entregar a lata de refrigerante com as caricas.','I can hand in the soft-drink can with the metal caps.'),0,T('Não: só caricas. As latas vão para o ecoponto amarelo.','No: only metal caps. Cans go in the yellow bin.')],
   [T('Um brinquedo de plástico partido pode ir no saco das tampas.','A broken plastic toy can go in the cap bag.'),0,T('Não: só tampas e pegas de garrafão.','No: only caps and water-jug handles.')],
   [T('Palhinhas de plástico vão com as tampas.','Plastic straws go with the caps.'),0,T('Não: só tampas e pegas de garrafão.','No: only caps and water-jug handles.')],
   [T('As caricas vão no mesmo saco das tampas de plástico.','Metal caps go in the same bag as plastic caps.'),0,T('Não: as caricas vão num saco só delas.','No: metal caps get a bag of their own.')],
   [T('As rolhas de cortiça vão no saco do plástico.','Cork stoppers go in the plastic bag.'),0,T('Não: a cortiça tem saco próprio e vai para a Amorim.','No: cork has its own bag and goes to Amorim.')],
   [T('Há três sacos: plástico, caricas e cortiça.','There are three bags: plastic, metal caps and cork.'),1,T('Sim: cada material num saco.','Yes: one material per bag.')],
   [T('Um BigBag só pode ter um material.','A BigBag can hold only one material.'),1,T('Sim: plástico, caricas ou cortiça, nunca misturados.','Yes: plastic, metal caps or cork, never mixed.')],
   [T('Se o BigBag for misturado pode ser recusado inteiro.','A mixed BigBag can be rejected as a whole.'),1,T('Sim: e todo o trabalho da recolha perde-se.','Yes: and all the collecting work is lost.')],
   [T('Separar em casa é a maior ajuda que podes dar.','Sorting at home is the biggest help you can give.'),1,T('Sim: poupa horas de trabalho ao meu pai.','Yes: it saves my dad hours of work.')],
   [T('Uma única carica no saco do plástico não faz mal nenhum.','A single metal cap in the plastic bag does no harm at all.'),0,T('Faz: a mistura pode fazer recusar o BigBag. Cada carica no seu saco.','It does: mixing can get the BigBag rejected. Each cap in its own bag.')],
   [T('Na dúvida, é melhor deixar a tampa de fora.','When in doubt, it’s better to leave the cap out.'),1,T('Sim: uma tampa a menos não faz mal; uma tampa errada pode estragar o lote.','Yes: one cap fewer does no harm; one wrong cap can spoil the batch.')],
   [T('O meu pai separa tudo à mão antes de entregar.','My dad sorts everything by hand before handing it in.'),1,T('Sim, e é por isso que separar em casa ajuda tanto.','Yes, and that’s why sorting at home helps so much.')],
   [T('As caricas de cerveja são de metal.','Beer bottle caps are made of metal.'),1,T('Sim: por isso vão para as caricas.','Yes: that’s why they go with the metal caps.')],
   [T('O processo do Martim no Dê uma Tampa é o nº 167.','Martim’s case number in Dê uma Tampa is 167.'),1,T('Sim: é o número escrito nos BigBags.','Yes: it’s the number written on the BigBags.')],
   [T('As tampas de plástico vão para a Resialentejo, em Beja.','Plastic caps go to Resialentejo, in Beja.'),1,T('Sim: a Resialentejo pesa e paga à clínica.','Yes: Resialentejo weighs them and pays the clinic.')],
   [T('A cortiça vai para a Amorim, em Silves.','Cork goes to Amorim, in Silves.'),1,T('Sim: a Amorim paga 500 € por tonelada.','Yes: Amorim pays €500 per tonne.')],
   [T('A Resialentejo paga 411,60 € por tonelada de tampas de plástico.','Resialentejo pays €411.60 per tonne of plastic caps.'),1,T('Sim, é o valor atual.','Yes, that’s the current rate.')],
   [T('Uma tonelada de caricas vale 465,60 €.','A tonne of metal caps is worth €465.60.'),1,T('Sim: as caricas valem mais do que o plástico.','Yes: metal caps are worth more than plastic.')],
   [T('A cortiça é o material que vale mais por tonelada.','Cork is the material worth most per tonne.'),1,T('Sim: 500 € por tonelada.','Yes: €500 per tonne.')],
   [T('As tampas de plástico valem mais do que a cortiça.','Plastic caps are worth more than cork.'),0,T('Não: 411,60 €/t contra 500 €/t da cortiça.','No: €411.60/t against €500/t for cork.')],
   [T('Um BigBag cheio leva cerca de 300 kg de tampas.','A full BigBag holds about 300 kg of caps.'),1,T('Sim: entre 300 e 350 kg.','Yes: between 300 and 350 kg.')],
   [T('Um BigBag de tampas de plástico rende cerca de 123 €.','A BigBag of plastic caps is worth about €123.'),1,T('Sim: 300 kg × 0,41 € por kg.','Yes: 300 kg × €0.41 per kg.')],
   [T('Um BigBag de caricas rende menos do que um de plástico.','A BigBag of metal caps is worth less than a plastic one.'),0,T('Não: rende mais, cerca de 140 €.','No: it’s worth more, about €140.')],
   [T('Um mês de tratamento custa 6 740 €.','A month of treatment costs €6,740.'),1,T('Sim, na Clínica Kinésio.','Yes, at Clínica Kinésio.')],
   [T('São precisos cerca de 55 BigBags de plástico para um mês de tratamento.','About 55 BigBags of plastic are needed for one month of treatment.'),1,T('Sim: 6 740 € ÷ 123 € ≈ 55.','Yes: €6,740 ÷ €123 ≈ 55.')],
   [T('Com 5 BigBags de plástico pago um mês inteiro de tratamento.','5 BigBags of plastic pay for a whole month of treatment.'),0,T('Não: são precisos cerca de 55.','No: about 55 are needed.')],
   [T('O Martim faz tratamentos intensivos 3 a 4 vezes por ano.','Martim has intensive treatments 3 to 4 times a year.'),1,T('Sim, cada um dura um mês.','Yes, each one lasts a month.')],
   [T('Os tratamentos são feitos na Clínica Kinésio, em Espinho.','The treatments are at Clínica Kinésio, in Espinho.'),1,T('Sim, longe de casa, com a mãe.','Yes, far from home, with his mum.')],
   [T('Os tratamentos são no Algarve, perto de casa.','The treatments are in the Algarve, near home.'),0,T('Não: são na Kinésio, em Espinho.','No: they are at Kinésio, in Espinho.')],
   [T('A Resialentejo paga diretamente à clínica.','Resialentejo pays the clinic directly.'),1,T('Sim: o dinheiro das tampas nunca passa pela família.','Yes: the cap money never goes through the family.')],
   [T('Um dia de tratamento custa cerca de 225 €.','A day of treatment costs about €225.'),1,T('Sim: 6 740 € a dividir por 30 dias.','Yes: €6,740 divided by 30 days.')],
   [T('Uma tampa de plástico pesa cerca de 2 gramas.','A plastic cap weighs about 2 grams.'),1,T('Sim: por isso é preciso juntar muitas.','Yes: that’s why so many are needed.')],
   [T('Um quilo de tampas são umas 50 tampas.','A kilo of caps is about 50 caps.'),0,T('Não: são cerca de 500. Cada uma pesa uns 2 gramas.','No: about 500. Each weighs roughly 2 grams.')],
   [T('Um BigBag de 300 kg tem cerca de 150 mil tampas.','A 300 kg BigBag holds about 150,000 caps.'),1,T('Sim: 300 kg a 2 gramas cada.','Yes: 300 kg at 2 grams each.')],
   [T('Um BigBag pode ser entregue com 100 kg.','A BigBag can be handed in with 100 kg.'),0,T('Não: tem de ter pelo menos 250 kg.','No: it must have at least 250 kg.')],
   [T('Levar os BigBags até Beja é das coisas que mais custa.','Taking the BigBags to Beja is one of the hardest parts.'),1,T('Sim: se tens como transportar volumes grandes, fala connosco.','Yes: if you can carry large loads, get in touch.')],
   [T('Quem pesa as tampas é a própria família do Martim.','Martim’s family weighs the caps themselves.'),0,T('Não: quem pesa é a Resialentejo, em Beja.','No: Resialentejo, in Beja, weighs them.')],
   [T('Na VOLTA recebes 10 cêntimos por garrafa.','At VOLTA you get 10 cents per bottle.'),1,T('Sim: e podes entregar a garrafa sem tampa.','Yes: and you can hand in the bottle without its cap.')],
   [T('Para receber os 10 cêntimos da VOLTA a garrafa tem de levar a tampa.','To get the 10 cents at VOLTA the bottle must have its cap.'),0,T('Não: devolve a garrafa sem tampa e guarda a tampa para mim.','No: return the bottle without the cap and keep the cap for me.')],
   [T('As caricas também entram na máquina VOLTA.','Metal caps also go into the VOLTA machine.'),0,T('Não: continua a guardá-las para mim.','No: keep saving them for me.')],
   [T('Tampas de champô entram na VOLTA.','Shampoo caps go into VOLTA.'),0,T('Não: a VOLTA é só para garrafas de bebidas. Guarda as tampas para mim.','No: VOLTA is only for drink bottles. Keep the caps for me.')],
   [T('Rolhas de cortiça entram na VOLTA.','Cork stoppers go into VOLTA.'),0,T('Não: guarda-as para a cortiça.','No: keep them for the cork bag.')],
   [T('Depois de entregar na VOLTA confirmo no ecrã que o depósito contou.','After using VOLTA I check on screen that the deposit counted.'),1,T('Sim: é a melhor forma de ter a certeza.','Yes: it’s the best way to be sure.')],
   [T('Há 14 pontos de recolha.','There are 14 collection points.'),1,T('Sim: em Boliqueime, Albufeira, Paderne e Olhos de Água.','Yes: in Boliqueime, Albufeira, Paderne and Olhos de Água.')],
   [T('Os pontos de recolha estão todos em Boliqueime.','All the collection points are in Boliqueime.'),0,T('Não: também há em Albufeira, Paderne e Olhos de Água.','No: there are also some in Albufeira, Paderne and Olhos de Água.')],
   [T('Uma escola pode pedir para ser ponto de recolha.','A school can ask to become a collection point.'),1,T('Sim: e um café, um clube ou uma farmácia também. Pede no mapa.','Yes: and so can a café, a club or a pharmacy. Ask on the map page.')],
   [T('No site há um cartaz para imprimir e pôr no ponto de recolha.','The website has a poster to print for the collection point.'),1,T('Sim: e etiquetas para os três garrafões.','Yes: and labels for the three jugs.')],
   [T('Os pais do Martim levam os garrafões aos pontos de recolha.','Martim’s parents bring the jugs to the collection points.'),1,T('Sim: e o cartaz.','Yes: and the poster.')],
   [T('Só posso ajudar se tiver tampas.','I can only help if I have caps.'),0,T('Não: podes doar, ajudar no transporte ou organizar um evento.','No: you can donate, help with transport or organise an event.')],
   [T('Qualquer pessoa pode organizar um evento pelo Martim.','Anyone can organise an event for Martim.'),1,T('Sim: caminhadas, torneios, bailes, bolos… nós ajudamos.','Yes: walks, tournaments, dances, cakes… we help.')],
   [T('Posso doar diretamente à Clínica Kinésio.','I can donate directly to Clínica Kinésio.'),1,T('Sim: e recebes fatura com NIF.','Yes: and you get an invoice with your tax number.')],
   [T('Quem doa à Kinésio não recebe fatura.','Whoever donates to Kinésio gets no invoice.'),0,T('Recebe: na Kinésio há sempre fatura com NIF.','They do: Kinésio always issues an invoice with the tax number.')],
   [T('A conta solidária está em nome do Martim Silva Cruz.','The solidarity account is in Martim Silva Cruz’s name.'),1,T('Sim: qualquer valor ajuda.','Yes: any amount helps.')],
   [T('O dinheiro da conta solidária é só para tratamentos e necessidades do Martim.','The solidarity account money is only for Martim’s treatments and needs.'),1,T('Sim, com registos detalhados.','Yes, with detailed records.')],
   [T('Também posso ajudar a partilhar o site.','I can also help by sharing the website.'),1,T('Sim: quanto mais gente souber, mais tampas chegam.','Yes: the more people know, the more caps arrive.')],
   [T('No BFF Solidário juntaram-se cerca de 80 pessoas a separar.','About 80 people sorted caps together at BFF Solidário.'),1,T('Sim, numa só tarde.','Yes, in a single afternoon.')],
   [T('No BFF Solidário separaram-se 600 kg de caricas.','At BFF Solidário 600 kg of metal caps were sorted.'),1,T('Sim, e 600 kg de plástico e 100 kg de cortiça.','Yes, plus 600 kg of plastic and 100 kg of cork.')],
   [T('O BFF Solidário deu 576 € para os tratamentos.','BFF Solidário raised €576 for the treatments.'),1,T('Sim: pagos diretamente à Clínica Kinésio.','Yes: paid directly to Clínica Kinésio.')],
   [T('O BFF Solidário foi em Lisboa.','BFF Solidário was in Lisbon.'),0,T('Não: foi no Boliqueime Food Festival, em Boliqueime.','No: it was at the Boliqueime Food Festival, in Boliqueime.')],
   [T('Nos eventos há mesas para separar tampas.','At the events there are tables for sorting caps.'),1,T('Sim: e qualquer pessoa pode ajudar.','Yes: and anyone can help.')],
   [T('100 kg de cortiça pagam mais do que 100 kg de plástico.','100 kg of cork pays more than 100 kg of plastic.'),1,T('Sim: 50 € contra cerca de 41 €.','Yes: €50 against about €41.')],
   [T('O Martim vive em Boliqueime, no Algarve.','Martim lives in Boliqueime, in the Algarve.'),1,T('Sim!','Yes!')],
   [T('O Martim tem paralisia cerebral.','Martim has cerebral palsy.'),1,T('Sim: com tetraparésia distónica, que afeta o movimento.','Yes: with dystonic tetraparesis, which affects movement.')],
   [T('A tetraparésia afeta só as pernas.','Tetraparesis affects only the legs.'),0,T('Não: afeta os braços e as pernas.','No: it affects the arms and the legs.')],
   [T('Os tratamentos intensivos ajudam o Martim a ganhar autonomia.','The intensive treatments help Martim become more independent.'),1,T('Sim: cada mês de tratamento é um passo.','Yes: every month of treatment is a step.')],
   [T('Cada tampinha é um passo do Martim.','Every little cap is a step for Martim.'),1,T('Sim! É o que diz o site.','Yes! That’s what the website says.')],
   [T('As tampas pagam todos os tratamentos do Martim.','The caps pay for all of Martim’s treatments.'),0,T('Não: pagam parte deles. Por isso os donativos e os eventos também contam.','No: they pay for part of them. That’s why donations and events count too.')]];
  let q=[],i=0,ok=0,err=[];
  /* 10 frases: 5 verdadeiras e 5 falsas, primeiro as que este navegador ainda não viu (ou viu há mais tempo) */
  const K=f=>f[0].slice(0,40);let seen={};try{seen=JSON.parse(localStorage.getItem('vf-vistos')||'{}')}catch(e){}
  const pick=v=>shuffle(F.filter(f=>f[1]===v)).sort((x,y)=>(seen[K(x)]||0)-(seen[K(y)]||0)).slice(0,5);
  const start=()=>{q=shuffle([...pick(1),...pick(0)]);const now=Date.now();q.forEach(f=>seen[K(f)]=now);try{localStorage.setItem('vf-vistos',JSON.stringify(seen))}catch(e){}
    i=0;ok=0;err=[];show()};
  const show=()=>{if(i>=q.length)return end();const [f]=q[i];
    box.innerHTML=`<div class="tf-top"><span class="hand">${T('Pergunta','Question')} ${i+1} / ${q.length}</span><span class="hand">${T('Certas','Right')}: <b class="num">${ok}</b></span></div><p class="tf-q" tabindex="-1">${esc(f)}</p><div class="tf-btns"><button class="btn tf-btn" type="button" data-v="1">${T('Verdade','True')}</button><button class="btn tf-btn" type="button" data-v="0">${T('Mentira','False')}</button></div><p class="tf-fb hand" aria-live="polite"></p>`;
    box.querySelectorAll('[data-v]').forEach(b=>b.addEventListener('click',()=>{const g=+b.dataset.v===q[i][1];if(g)ok++;else err.push(q[i]);
      box.querySelectorAll('[data-v]').forEach(x=>x.disabled=true);b.classList.add(g?'ok':'no');const fb=box.querySelector('.tf-fb');fb.className='tf-fb hand '+(g?'ok':'no');fb.textContent=(g?T('Certo! ','Right! '):T('Ups! ','Oops! '))+q[i][2];i++;setTimeout(show,g?1400:2600)}));
    box.querySelector('.tf-q').focus({preventScroll:true})};
  const end=()=>{conta('jogo_verdade');box.innerHTML=`<p class="tf-end"><b class="num">${ok} / ${q.length}</b> ${ok===q.length?T('Perfeito! Já sabes as regras todas.','Perfect! You know all the rules.'):ok>=7?T('Muito bem!','Well done!'):T('Já sabes mais do que muita gente!','You already know more than most people!')}</p>`+(err.length?`<p class="hand">${T('As regras a lembrar:','Rules to remember:')}</p><ul class="regra-lista">${err.map(e=>`<li class="nao">${esc(e[2])}</li>`).join('')}</ul>`:'')+`<button class="btn btn-red" type="button" id="tf-again">${T('Jogar outra vez','Play again')}</button>`;
    document.getElementById('tf-again').addEventListener('click',start)};
  box.innerHTML=`<p class="tf-q">${T('Pronto para 10 frases?','Ready for 10 statements?')}</p><button class="btn btn-red" type="button" id="tf-go">${T('Começar','Start')}</button>`;
  document.getElementById('tf-go').addEventListener('click',start);
})();

/* ---------- 3. memória ---------- */
(()=>{const g=document.getElementById('memo');if(!g)return;
  /* 8 peças sorteadas em cada jogo, sem duas com o mesmo desenho e cor */
  let C=[];const sortear=()=>{const vis=new Set();C=shuffle(window.PECAS||[]).filter(p=>{const k=p.icon+(p.color||'');if(vis.has(k))return false;vis.add(k);return true}).slice(0,8).map(p=>[p.icon,p.color||'',p.bin,T(p.label[0],p.label[1])])};
  let open=[],pairs=0,moves=0,lock=false;
  const M=document.getElementById('m-moves'),P=document.getElementById('m-pairs'),msg=document.getElementById('m-msg');
  const deal=()=>{sortear();pairs=0;moves=0;open=[];lock=false;M.textContent=0;P.textContent='0 / 8';msg.textContent='';
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
  const TP=T('tampas','caps'),KG='kg',EU='€',BB='BigBags',PS=T('pessoas','people'),PT=T('pontos','points');
  const POOL=[[T('Quantas tampas de plástico são precisas para fazer 1 kg?','How many plastic caps make 1 kg?'),500,50,5000,T('Cerca de 500: cada tampa pesa uns 2 gramas.','About 500: each cap weighs roughly 2 grams.'),TP],
    [T('Quantas tampas cabem num BigBag de 300 kg?','How many caps fit in a 300 kg BigBag?'),150000,10000,1000000,T('Cerca de 150 000 tampas. É por isso que demoramos meses a encher um.','About 150,000 caps. That is why it takes months to fill one.'),TP],
    [T('Quantas tampas pagam um mês inteiro de tratamento?','How many caps pay for a whole month of treatment?'),8250000,500000,20000000,T('Cerca de 8 milhões: 55 BigBags. Cada tampa é mesmo um passo!','About 8 million: 55 BigBags. Every single cap really is a step!'),TP],
    [T('Quantos quilos leva um BigBag cheio?','How many kilos does a full BigBag hold?'),300,20,2000,T('Cerca de 300 kg (entre 300 e 350).','About 300 kg (between 300 and 350).'),KG],
    [T('Quantos BigBags de plástico pagam um mês de tratamento?','How many BigBags of plastic pay for a month of treatment?'),55,2,500,T('Cerca de 55: 6 740 € ÷ 123 € por BigBag.','About 55: €6,740 ÷ €123 per BigBag.'),BB],
    [T('Quanto rende um BigBag de tampas de plástico?','How much is a BigBag of plastic caps worth?'),123,5,2000,T('Cerca de 123 €: 300 kg × 0,41 € por kg.','About €123: 300 kg × €0.41 per kg.'),EU],
    [T('Quanto rende um BigBag de caricas?','How much is a BigBag of metal caps worth?'),140,5,2000,T('Cerca de 140 €: as caricas valem mais do que o plástico.','About €140: metal caps are worth more than plastic.'),EU],
    [T('Quanto paga a Amorim por uma tonelada de cortiça?','How much does Amorim pay for a tonne of cork?'),500,20,5000,T('500 € por tonelada: a cortiça é o material que vale mais.','€500 per tonne: cork is the most valuable material.'),EU],
    [T('Quantas tampas de plástico valem 1 €?','How many plastic caps are worth €1?'),1215,100,20000,T('Cerca de 1 200: são quase 2,5 kg de tampas.','About 1,200: almost 2.5 kg of caps.'),TP],
    [T('Quantos quilos de tampas de plástico pagam um dia de tratamento?','How many kilos of plastic caps pay for one day of treatment?'),546,20,5000,T('Cerca de 546 kg: um dia custa uns 225 €.','About 546 kg: one day costs about €225.'),KG],
    [T('Quantas tampas pagam um dia de tratamento?','How many caps pay for one day of treatment?'),273000,10000,3000000,T('Cerca de 273 000 tampas, quase dois BigBags.','About 273,000 caps, almost two BigBags.'),TP],
    [T('Quanto custa um mês de tratamento na Kinésio?','How much does a month of treatment at Kinésio cost?'),6740,500,50000,T('6 740 € por mês, 3 a 4 vezes por ano.','€6,740 a month, 3 to 4 times a year.'),EU],
    [T('Quantos quilos tem de ter um BigBag, no mínimo, para ser aceite?','What is the minimum weight for a BigBag to be accepted?'),250,10,2000,T('Pelo menos 250 kg, e só de um material.','At least 250 kg, and only one material.'),KG],
    [T('Quantas pessoas separaram tampas numa tarde no BFF Solidário?','How many people sorted caps in one afternoon at BFF Solidário?'),80,5,1000,T('Cerca de 80 pessoas!','About 80 people!'),PS],
    [T('Quantos quilos se separaram no BFF Solidário, somando tudo?','How many kilos were sorted at BFF Solidário, all together?'),1300,100,10000,T('1 300 kg: 600 de caricas, 600 de plástico e 100 de cortiça.','1,300 kg: 600 of metal caps, 600 of plastic and 100 of cork.'),KG],
    [T('Quantos pontos de recolha há?','How many collection points are there?'),14,2,200,T('14, em Boliqueime, Albufeira, Paderne e Olhos de Água.','14, in Boliqueime, Albufeira, Paderne and Olhos de Água.'),PT]];
  let Q=[];
  let i=0,score=0;const lg=(v,a,b)=>Math.round(Math.exp(Math.log(a)+(Math.log(b)-Math.log(a))*v/1000));
  const show=()=>{if(i===0&&!Q.length)Q=shuffle(POOL).slice(0,3);if(i>=Q.length){conta('jogo_peso');box.innerHTML=`<p class="tf-end"><b class="num">${'★'.repeat(score)}${'☆'.repeat(9-score)}</b></p><p>${score>=7?T('Tens olho para tampas!','You have an eye for caps!'):T('Agora já sabes porque é que cada tampa conta.','Now you know why every cap counts.')}</p><button class="btn btn-red" type="button" id="p-again">${T('Jogar outra vez','Play again')}</button>`;document.getElementById('p-again').addEventListener('click',()=>{i=0;score=0;Q=[];show()});return}
    const [q,ans,a,b]=Q[i];const va=1000*(Math.log(ans)-Math.log(a))/(Math.log(b)-Math.log(a));let start0;do{start0=Math.round(Math.random()*1000)}while(Math.abs(start0-va)<300);box.innerHTML=`<p class="hand">${T('Pergunta','Question')} ${i+1} / ${Q.length}</p><p class="tf-q">${esc(q)}</p><label class="peso-range"><span class="visually-hidden">${T('O teu palpite','Your guess')}</span><input type="range" min="0" max="1000" value="${start0}" id="p-r"></label><p class="peso-val"><b class="num" id="p-v"></b> ${Q[i][5]}</p><button class="btn btn-red" type="button" id="p-ok">${T('Ver a resposta','See the answer')}</button><p class="tf-fb hand" id="p-fb" aria-live="polite"></p>`;
    const r=document.getElementById('p-r'),v=document.getElementById('p-v');const upd=()=>{v.textContent=nf(lg(+r.value,a,b))};r.addEventListener('input',upd);upd();
    document.getElementById('p-ok').addEventListener('click',e=>{const g=lg(+r.value,a,b),ratio=Math.max(g,ans)/Math.min(g,ans),st=ratio<=1.35?3:ratio<=2?2:ratio<=4?1:0;score+=st;r.disabled=true;e.target.disabled=true;
      const fb=document.getElementById('p-fb');fb.className='tf-fb hand '+(st>=2?'ok':'no');fb.textContent=`${'★'.repeat(st)}${'☆'.repeat(3-st)} ${T('Resposta','Answer')}: ${nf(ans)}. ${Q[i][4]}`;i++;
      const n=document.createElement('button');n.className='btn btn-line';n.type='button';n.textContent=i<Q.length?T('Próxima pergunta','Next question'):T('Ver o resultado','See the result');n.addEventListener('click',show);fb.after(n);n.focus({preventScroll:true})})};
  show();
})();

/* ---------- 5. rasteira do dia: uma peça que engana por dia, igual para todos; dá para voltar aos dias anteriores ---------- */
(()=>{const box=document.getElementById('semana-box');if(!box||!window.PECAS)return;
  const INICIO=Date.UTC(2026,8,25)/864e5;                 /* 25 set 2026: o site novo entrou no ar */
  const d0=new Date(),HOJE=Math.floor(Date.UTC(d0.getFullYear(),d0.getMonth(),d0.getDate())/864e5);
  const L=window.PECAS.filter(p=>p.lv>=2).sort((a,b)=>a.id.localeCompare(b.id));
  const MES=LNG?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const SEM=LNG?['Sun','Mon','Tue','Wed','Thu','Fri','Sat']:['dom','seg','ter','qua','qui','sex','sáb'];
  /* respostas guardadas: {dia:{id,a}}; lê também o formato antigo {dia,a} */
  let R={};try{const x=JSON.parse(localStorage.getItem('rasteira')||'null');if(x&&typeof x==='object')R=('a' in x&&'dia' in x)?{[x.dia]:{a:x.a}}:x}catch(e){}
  const save=()=>{try{localStorage.setItem('rasteira',JSON.stringify(R))}catch(e){}};
  const peca=dia=>{const g=R[dia];return(g&&g.id&&window.PECAS.find(p=>p.id===g.id))||L[dia%L.length]};
  const nome=dia=>{const x=new Date(dia*864e5),t=`${x.getUTCDate()} ${MES[x.getUTCMonth()]}`;return dia===HOJE?T('hoje, ','today, ')+t:dia===HOJE-1?T('ontem, ','yesterday, ')+t:SEM[x.getUTCDay()]+', '+t};
  let dia=Math.max(INICIO,HOJE);
  const render=()=>{const p=peca(dia),g=R[dia],ans=g&&g.a,feitos=Object.keys(R).filter(k=>+k>=INICIO&&+k<=HOJE),certos=feitos.filter(k=>{const q=peca(+k);return R[k].a===q.bin}).length,total=HOJE-INICIO+1;
    box.innerHTML=`<div class="ras-nav"><button class="btn btn-line ras-prev" type="button"${dia<=INICIO?' disabled':''} aria-label="${T('Dia anterior','Previous day')}">‹ <span>${T('dia anterior','previous day')}</span></button>
      <span class="hand ras-dia">${nome(dia)}</span>
      <button class="btn btn-line ras-next" type="button"${dia>=HOJE?' disabled':''} aria-label="${T('Dia seguinte','Next day')}"><span>${T('dia seguinte','next day')}</span> ›</button></div>
    <div class="card-item"><svg aria-hidden="true" style="color:${p.color||'#5AB8E6'}"><use href="#${p.icon}"/></svg><span>${esc(T(p.label[0],p.label[1]))}</span><small class="hand">${T('rasteira de ','trick of ')+nome(dia).replace(/^[^,]+, /,'')}</small></div>
    <p class="how hand">${T('Para onde vai?','Where does it go?')}</p><div class="bins">${Object.keys(BINS).map(k=>`<button class="bin${k==='nao'?' bin-no':''}${ans&&k===p.bin?' right':''}${ans&&ans===k&&k!==p.bin?' wrong':''}" type="button" data-b="${k}"${ans?' disabled':''}><b>${BINS[k]}</b></button>`).join('')}</div>
    <p class="tf-fb hand ${ans?(ans===p.bin?'ok':'no'):''}">${ans?(ans===p.bin?T(p.ok[0],p.ok[1]):T('Rasteira! ','Tricky! ')+T(p.hint[0],p.hint[1]))+' '+(dia===HOJE?T('Volta amanhã para outra.','Come back tomorrow for another.'):''):''}</p>
    <p class="ras-conta">${feitos.length?T(`Acertaste <b>${certos}</b> de ${feitos.length} ${feitos.length===1?'rasteira':'rasteiras'}`,`You got <b>${certos}</b> of ${feitos.length} ${feitos.length===1?'trick':'tricks'}`)+' · ':''}${total-feitos.length>0?T(`${total-feitos.length} ${total-feitos.length===1?'dia por responder':'dias por responder'}`,`${total-feitos.length} ${total-feitos.length===1?'day':'days'} to answer`):T('Respondeste a todos os dias!','You answered every day!')}</p>`;
    const pv=box.querySelector('.ras-prev'),nx=box.querySelector('.ras-next');
    pv.addEventListener('click',()=>{dia--;render();box.querySelector('.ras-prev:not(:disabled),.ras-next').focus({preventScroll:true})});
    nx.addEventListener('click',()=>{dia++;render();box.querySelector('.ras-next:not(:disabled),.ras-prev').focus({preventScroll:true})});
    if(!ans)box.querySelectorAll('[data-b]').forEach(b=>b.addEventListener('click',()=>{R[dia]={id:p.id,a:b.dataset.b};save();conta('jogo_rasteira');render()}))};
  render();
})();
})();
