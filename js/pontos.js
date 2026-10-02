/* Pontos de recolha: fonte única para a home (tabela) e para mapa.html.
   Para acrescentar um ponto, copia uma linha. aprox:true = localização aproximada, a confirmar. */
/* cores dos tipos: sem vermelho, verde nem amarelo (não parecer um semáforo de aberto/fechado) */
window.TIPOS={
  escola:{pt:'Escola',en:'School',c:'#2B6FC8'},
  comunidade:{pt:'Comunidade',en:'Community',c:'#7A4FB0'},
  saude:{pt:'Saúde',en:'Health',c:'#0B7A93'},
  desporto:{pt:'Desporto',en:'Sport',c:'#C2407A'},
  comercio:{pt:'Comércio',en:'Business',c:'#8A5A2B'}
};
window.PONTOS=[
  {n:'CD Boliqueime',t:'desporto',l:'Boliqueime',lat:37.13218,lng:-8.14671},
  {n:'EB1 Benfarras',t:'escola',l:'Boliqueime',lat:37.11978,lng:-8.13030},
  {n:'Junta de Freguesia de Boliqueime',t:'comunidade',l:'Boliqueime',lat:37.13292,lng:-8.15907},
  {n:'Centro Comunitário de Vale Silves',t:'comunidade',l:'Boliqueime',lat:37.15827,lng:-8.13839,aprox:true},
  {n:'EB1 de Vale Silves',t:'escola',l:'Boliqueime',lat:37.15853,lng:-8.14236},
  {n:'EB1 de Vale Judeu',t:'escola',l:'Boliqueime',lat:37.11866,lng:-8.09470},
  {n:'EB 2,3 Prof. Dr. Aníbal Cavaco Silva',t:'escola',l:'Boliqueime',lat:37.12998,lng:-8.14968},
  {n:'Lar da Santa Casa da Misericórdia',t:'comunidade',l:'Boliqueime',lat:37.13385,lng:-8.15690,aprox:true},
  {n:'Centro de Saúde de Boliqueime',t:'saude',l:'Boliqueime',lat:37.13214,lng:-8.15445},
  {n:'Agrupamento de Escuteiros 1174',t:'comunidade',l:'Boliqueime',lat:37.13455,lng:-8.15800,aprox:true},
  {n:'EB 2,3 Eng. Duarte Pacheco',t:'escola',l:'Loulé',lat:37.14209,lng:-8.02717},
  {n:'Conservatório de Música de Loulé - Francisco Rosado',t:'escola',l:'Loulé',lat:37.14135,lng:-8.02380},
  {n:'EB1 Hortas de Santo António',t:'escola',l:'Loulé',lat:37.14001,lng:-8.02971},
  {n:'EB1 Mãe Soberana',t:'escola',l:'Loulé',lat:37.14151,lng:-8.02520},
  {n:'Pavilhão da Escola Secundária de Quarteira',t:'escola',l:'Quarteira',lat:37.06825,lng:-8.09175},
  {n:'EB1/JI de Vale Pedras',t:'escola',l:'Albufeira',lat:37.10544,lng:-8.24357},
  {n:'EB1 de Vale Carro',t:'escola',l:'Albufeira',lat:37.10889,lng:-8.18257},
  {n:'Zeze Bistro Bar',t:'comercio',l:'Olhos de Água',lat:37.09150,lng:-8.18950,aprox:true},
  {n:'EB1 de Olhos de Água',t:'escola',l:'Olhos de Água',lat:37.09239,lng:-8.18938},
  {n:'Centro Paroquial de Paderne',t:'comunidade',l:'Paderne',lat:37.17620,lng:-8.20080,aprox:true},
  {n:'Centro de Saúde de Paderne',t:'saude',l:'Paderne',lat:37.17500,lng:-8.20420,aprox:true}
];
