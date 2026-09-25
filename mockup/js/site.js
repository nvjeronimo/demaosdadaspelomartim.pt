/* Língua da página: "pt" (por defeito) ou "en" */
const EN=document.documentElement.lang==="en";
/* De mãos dadas pelo Martim: comportamento partilhado por todas as páginas */
/* ---------- copiar (IBAN, link) ---------- */
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
  const lbl=b.dataset.label||(b.dataset.label=b.textContent);
  try{await navigator.clipboard.writeText(b.dataset.copy)}catch(e){}
  b.textContent=EN?'Copied':'Copiado';b.classList.add('done');setTimeout(()=>{b.textContent=lbl;b.classList.remove('done')},2200);
}));


/* ---------- cover picker (visitor feature, remembered per browser) ---------- */
const PALETTES={
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
 lavanda:{n:'Lavanda e lima',cover:'#D8CCF2',on:'#241A40',hl:'#D4EE6A',pen:'#34295E',act:'#5B3DA6',ai:'#fff',caps:['#FF8A3D','#F27BA5','#4FA8D8','#2FA36B']}
};
const NAMES_EN={menta:'Mint and tangerine',ceu:'Sky and navy',pessego:'Peach and blue',limao:'Lemon and graphite',rosa:'Pink and green',noite:'Midnight and caps',oceano:'Ocean and sand',alperce:'Apricot and plum',algodao:'Candyfloss',reciclado:'Recycled paper and orange',festa:'Bottle-cap party',lavanda:'Lavender and lime'};
function palName(id){return EN?(NAMES_EN[id]||PALETTES[id].n):PALETTES[id].n}
let PICKER=['menta','ceu','pessego','limao','rosa','noite','oceano','alperce','algodao','reciclado','festa','lavanda'];
const root=document.documentElement;
const FAV="<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 121.37 121.37\"><circle fill=\"{bg}\" cx=\"60.68\" cy=\"60.68\" r=\"60.68\"/><path fill=\"{b}\" d=\"M72.25,73.72c-.21,3.27-.42,6.44-.63,9.49-.11,1.31-.21,2.66-.31,4.05-.11,1.39-.22,2.75-.35,4.07-.13,1.32-.25,2.59-.35,3.8-.1,1.21-.21,2.28-.31,3.21l-17.17.86c.03-.25-1.53-1.53-1.53-1.53l1.72-.09c.33-2.94.61-5.55.83-7.85.26-2.71.46-5.04.59-6.99.13-1.95.22-3.58.27-4.89.05-1.31.06-2.36.04-3.15-.03-.79-.05-1.38-.08-1.76-.03-.38-.04-.63-.04-.74,0-1.53-.12-2.77-.35-3.72-.24-.95-.56-1.7-.98-2.25-.42-.54-.93-.91-1.53-1.1-.6-.19-1.27-.29-2-.29-.94,0-1.89.09-2.86.27-.97.18-1.83.53-2.59,1.06-.38.27-3.65.09-3.65.09,0,0,2.05,1.69,1.81,2.18-.47.98-.71,2.29-.71,3.93,0,3.11.01,6.14.04,9.1.03,2.96.09,5.62.2,8,.05,2.75.13,5.39.24,7.89l-18.66.9c.03-.2-1.53-1.53-1.53-1.53l1.75-.08c.3-2.33.5-4.61.6-6.85.13-2.75.2-5.23.2-7.44,0-4.14-.17-8.25-.51-12.33-.34-4.08-.93-8.31-1.76-12.7,3.34-.05,6.09-.12,8.23-.2,2.14-.08,3.84-.18,5.1-.29,1.46-.11,2.59-.23,3.37-.37l.16,4.95c1.1-.93,2.31-1.8,3.65-2.62,1.33-.82,2.73-1.52,4.19-2.11,1.46-.59,2.99-1.05,4.59-1.39,1.59-.34,3.23-.51,4.9-.51,1.88,0,3.54.08,4.98.22,1.44.15,2.69.44,3.76.86,1.07.42,1.97,1.01,2.7,1.76.73.75,1.36,1.71,1.88,2.88.94-.76,1.97-1.49,3.1-2.19,1.12-.7,2.35-1.31,3.68-1.84,1.33-.53,2.76-.95,4.27-1.25,1.51-.3,3.19-.45,5.02-.45,2.87,0,5.3.18,7.29.53,1.99.35,3.59,1.07,4.82,2.15,1.23,1.08,2.12,2.6,2.67,4.58.55,1.98.82,4.59.82,7.83,0,4.66-.21,9.33-.63,14.01-.42,4.68-.86,9.5-1.33,14.46l-17.17.86c.03-.21-1.53-1.53-1.53-1.53l1.73-.08c.52-4.31.89-7.99,1.09-11.04.24-3.42.38-6.18.43-8.28.05-2.1.05-3.62,0-4.56-.05-.94-.08-1.47-.08-1.57,0-1.5-.14-2.73-.43-3.68-.29-.95-.68-1.7-1.18-2.23-.5-.53-1.07-.89-1.72-1.08-.65-.19-1.37-.29-2.16-.29-.47,0-.99.02-1.57.06-.58.04-1.18.18-1.8.41-.63.23-1.24.59-1.84,1.08-.3.25-3.48.08-3.48.08,0,0,1.52,1.32,1.8,1.96.32.76.25,2.32.27,3.27.03.95.04,1.62.04,2Z\"/><path fill=\"{b}\" d=\"M101.26,34.37c0,1.29-.21,2.49-.63,3.6s-1.04,2.07-1.88,2.88-1.89,1.45-3.16,1.91-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91-1.4-1.77-1.75-2.88-.53-2.31-.53-3.6.19-2.43.56-3.54c.38-1.11.97-2.08,1.78-2.91s1.87-1.49,3.16-1.97,2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97,1.42,1.81,1.82,2.91.59,2.29.59,3.54Z\"/><path fill=\"{b}\" d=\"M67.84,34.37c0,1.29-.21,2.49-.63,3.6-.42,1.11-1.04,2.07-1.88,2.88s-1.89,1.45-3.16,1.91-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91-1.4-1.77-1.75-2.88-.53-2.31-.53-3.6.19-2.43.56-3.54c.38-1.11.97-2.08,1.78-2.91s1.87-1.49,3.16-1.97,2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97,1.42,1.81,1.82,2.91.59,2.29.59,3.54Z\"/><path fill=\"{c}\" d=\"M70.72,72.19c-.21,3.27-.42,6.44-.63,9.49-.11,1.31-.21,2.66-.31,4.05-.11,1.39-.22,2.75-.35,4.07-.13,1.32-.25,2.59-.35,3.8-.1,1.21-.21,2.28-.31,3.21l-15.45.77-1.72.09c.02-.17-1.53-1.53-1.53-1.53l1.73-.09c.34-2.97.6-5.53.83-7.85.26-2.71.46-5.04.59-6.99.13-1.95.22-3.58.27-4.89.05-1.31.06-2.36.04-3.15-.03-.79-.05-1.38-.08-1.76-.03-.38-.04-.63-.04-.74,0-1.53-.12-2.77-.35-3.72-.24-.95-.56-1.7-.98-2.25-.42-.54-.93-.91-1.53-1.1-.6-.19-1.27-.29-2-.29-.94,0-1.89.09-2.86.27-.97.18-1.83.53-2.59,1.06-.38.27-3.57.31-3.57.31,0,0,1.96,1.47,1.73,1.96-.47.98-.71,2.29-.71,3.93,0,3.11.01,6.14.04,9.1.03,2.96.09,5.62.2,8,.05,2.75.13,5.39.24,7.89l-16.91.82-.98.05-.77.04c.03-.24-1.53-1.53-1.53-1.53l1.75-.09c.3-2.33.5-4.61.6-6.84.13-2.75.2-5.23.2-7.44,0-4.14-.17-8.25-.51-12.33-.34-4.08-.93-8.31-1.76-12.7,3.34-.05,6.09-.12,8.23-.2,2.14-.08,3.84-.18,5.1-.29,1.46-.11,2.59-.23,3.37-.37l.16,4.95c1.1-.93,2.31-1.8,3.65-2.62,1.33-.82,2.73-1.52,4.19-2.11,1.46-.59,2.99-1.05,4.59-1.39,1.59-.34,3.23-.51,4.9-.51,1.88,0,3.54.08,4.98.22,1.44.15,2.69.44,3.76.86,1.07.42,1.97,1.01,2.7,1.76.73.75,1.36,1.71,1.88,2.88.94-.76,1.97-1.49,3.1-2.19,1.12-.7,2.35-1.31,3.68-1.84,1.33-.53,2.76-.95,4.27-1.25,1.51-.3,3.19-.45,5.02-.45,2.87,0,5.3.18,7.29.53,1.99.35,3.59,1.07,4.82,2.15,1.23,1.08,2.12,2.6,2.67,4.58.55,1.98.82,4.59.82,7.83,0,4.66-.21,9.33-.63,14.01-.42,4.68-.86,9.5-1.33,14.46l-15.45.77-1.71.09c.02-.17-1.53-1.53-1.53-1.53l1.75-.09c.53-4.35.86-7.97,1.07-11.04.24-3.42.38-6.18.43-8.28.05-2.1.05-3.62,0-4.56-.05-.94-.08-1.47-.08-1.57,0-1.5-.14-2.73-.43-3.68-.29-.95-.68-1.7-1.18-2.23-.5-.53-1.07-.89-1.72-1.08-.65-.19-1.37-.29-2.16-.29-.47,0-.99.02-1.57.06-.58.04-1.18.18-1.8.41-.63.23-1.24.59-1.84,1.08-.3.25-3.48.11-3.48.11,0,0,1.52,1.3,1.8,1.93.32.76.25,2.32.27,3.27.03.95.04,1.62.04,2Z\"/><path fill=\"{c}\" d=\"M99.73,32.84c0,1.29-.21,2.49-.63,3.6s-1.04,2.07-1.88,2.88-1.89,1.45-3.16,1.91-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91-1.4-1.77-1.75-2.88c-.35-1.11-.53-2.31-.53-3.6s.19-2.43.56-3.54.97-2.08,1.78-2.91c.81-.83,1.87-1.49,3.16-1.97s2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97,1.42,1.81,1.82,2.91.59,2.29.59,3.54Z\"/><path fill=\"{c}\" d=\"M66.31,32.84c0,1.29-.21,2.49-.63,3.6s-1.04,2.07-1.88,2.88-1.89,1.45-3.16,1.91-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91c-.81-.81-1.4-1.77-1.75-2.88s-.53-2.31-.53-3.6.19-2.43.56-3.54c.38-1.11.97-2.08,1.78-2.91s1.87-1.49,3.16-1.97,2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97,1.42,1.81,1.82,2.91.59,2.29.59,3.54Z\"/><path fill=\"{d}\" d=\"M69.19,70.66c-.21,3.27-.42,6.44-.63,9.49-.11,1.31-.21,2.66-.31,4.05-.11,1.39-.22,2.75-.35,4.07-.13,1.32-.25,2.59-.35,3.8-.1,1.21-.21,2.28-.31,3.21l-17.17.86c.42-3.6.76-6.75,1.02-9.47.26-2.71.46-5.04.59-6.99.13-1.95.22-3.58.27-4.89.05-1.31.06-2.36.04-3.15-.03-.79-.05-1.38-.08-1.76-.03-.38-.04-.63-.04-.74,0-1.53-.12-2.77-.35-3.72-.24-.95-.56-1.7-.98-2.25-.42-.54-.93-.91-1.53-1.1-.6-.19-1.27-.29-2-.29-.94,0-1.89.09-2.86.27-.97.18-1.83.53-2.59,1.06-.38.27-3.72.84-3.72.84,0,0,2.11.94,1.88,1.43-.47.98-.71,2.29-.71,3.93,0,3.11.01,6.14.04,9.1.03,2.96.09,5.62.2,8,.05,2.75.13,5.39.24,7.89l-18.66.9c.42-2.89.69-5.71.82-8.47.13-2.75.2-5.23.2-7.44,0-4.14-.17-8.25-.51-12.33-.34-4.08-.93-8.31-1.76-12.7,3.34-.05,6.09-.12,8.23-.2,2.14-.08,3.84-.18,5.1-.29,1.46-.11,2.59-.23,3.37-.37l.16,4.95c1.1-.93,2.31-1.8,3.65-2.62,1.33-.82,2.73-1.52,4.19-2.11,1.46-.59,2.99-1.05,4.59-1.39,1.59-.34,3.23-.51,4.9-.51,1.88,0,3.54.08,4.98.22,1.44.15,2.69.44,3.76.86,1.07.42,1.97,1.01,2.7,1.76.73.75,1.36,1.71,1.88,2.88.94-.76,1.97-1.49,3.1-2.19,1.12-.7,2.35-1.31,3.68-1.84,1.33-.53,2.76-.95,4.27-1.25,1.51-.3,3.19-.45,5.02-.45,2.87,0,5.3.18,7.29.53,1.99.35,3.59,1.07,4.82,2.15,1.23,1.08,2.12,2.6,2.67,4.58.55,1.98.82,4.59.82,7.83,0,4.66-.21,9.33-.63,14.01-.42,4.68-.86,9.5-1.33,14.46l-17.17.86c.63-5.02,1.06-9.24,1.29-12.66.24-3.42.38-6.18.43-8.28.05-2.1.05-3.62,0-4.56-.05-.94-.08-1.47-.08-1.57,0-1.5-.14-2.73-.43-3.68-.29-.95-.68-1.7-1.18-2.23-.5-.53-1.07-.89-1.72-1.08-.65-.19-1.37-.29-2.16-.29-.47,0-.99.02-1.57.06-.58.04-1.18.18-1.8.41-.63.23-1.24.59-1.84,1.08-.3.25-3.53.05-3.53.05,0,0,1.57,1.37,1.85,1.99.34.75.25,2.32.27,3.27.03.95.04,1.62.04,2Z\"/><path fill=\"{d}\" d=\"M98.2,31.31c0,1.29-.21,2.49-.63,3.6s-1.04,2.07-1.88,2.88c-.83.81-1.89,1.45-3.16,1.91s-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91-1.4-1.77-1.75-2.88c-.35-1.11-.53-2.31-.53-3.6s.19-2.43.56-3.54c.38-1.11.97-2.08,1.78-2.91s1.87-1.49,3.16-1.97,2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97,1.42,1.81,1.82,2.91.59,2.29.59,3.54Z\"/><path fill=\"{d}\" d=\"M64.78,31.31c0,1.29-.21,2.49-.63,3.6s-1.04,2.07-1.88,2.88c-.83.81-1.89,1.45-3.16,1.91s-2.77.69-4.48.69c-1.88,0-3.45-.23-4.73-.69s-2.32-1.1-3.13-1.91-1.4-1.77-1.75-2.88c-.35-1.11-.53-2.31-.53-3.6s.19-2.43.56-3.54.97-2.08,1.78-2.91,1.87-1.49,3.16-1.97,2.84-.72,4.63-.72,3.33.24,4.6.72,2.32,1.14,3.13,1.97c.81.83,1.42,1.81,1.82,2.91.4,1.11.59,2.29.59,3.54Z\"/><path fill=\"#fff\" d=\"M48.51,31.96s.07.11.16.24c.63.97,1.53,1.75,2.52,2.3,2.62,1.47,6.25,1.39,8.43-.84.44-.44.71-.82.99-1.37.05-.1.15-.3.15-.3,0,0-.09.52-.15.69-.24.74-.94,1.91-1.8,2.54-2.75,2.04-6.94,1.45-9.17-1.12-.47-.54-.82-1.15-1.05-1.84-.05-.16-.08-.29-.08-.29Z\"/><path fill=\"#fff\" d=\"M51.22,26.12c-.79,0-1.42.96-1.42,2.15s.64,2.15,1.42,2.15,1.42-.96,1.42-2.15-.64-2.15-1.42-2.15ZM51.22,30.07c-.61,0-1.11-.75-1.11-1.67s.5-1.67,1.11-1.67,1.11.75,1.11,1.67-.5,1.67-1.11,1.67Z\"/><ellipse fill=\"#fff\" cx=\"51.38\" cy=\"27.9\" rx=\".53\" ry=\".79\" transform=\"translate(-3.97 9.08) rotate(-9.72)\"/><path fill=\"#fff\" d=\"M58.12,26.12c-.79,0-1.42.96-1.42,2.15s.64,2.15,1.42,2.15,1.42-.96,1.42-2.15-.64-2.15-1.42-2.15ZM58.12,30.07c-.61,0-1.11-.75-1.11-1.67s.5-1.67,1.11-1.67,1.11.75,1.11,1.67-.5,1.67-1.11,1.67Z\"/><ellipse fill=\"#fff\" cx=\"58.29\" cy=\"27.81\" rx=\".53\" ry=\".79\" transform=\"translate(-3.86 10.24) rotate(-9.72)\"/><path fill=\"#fff\" d=\"M81.93,31.96s.07.11.16.24c.63.97,1.53,1.75,2.52,2.3,2.62,1.47,6.25,1.39,8.43-.84.44-.44.71-.82.99-1.37.05-.1.15-.3.15-.3,0,0-.09.52-.15.69-.24.74-.94,1.91-1.8,2.54-2.75,2.04-6.94,1.45-9.17-1.12-.47-.54-.82-1.15-1.05-1.84-.05-.16-.08-.29-.08-.29Z\"/><path fill=\"#fff\" d=\"M90.04,28.26c0,1.18.64,2.15,1.42,2.15s1.42-.96,1.42-2.15c0-1.18-.64-2.15-1.42-2.15s-1.42.96-1.42,2.15ZM90.36,28.4c0-.92.5-1.67,1.11-1.67s1.11.75,1.11,1.67c0,.92-.5,1.67-1.11,1.67s-1.11-.75-1.11-1.67Z\"/><ellipse fill=\"#fff\" cx=\"91.31\" cy=\"27.9\" rx=\".79\" ry=\".53\" transform=\"translate(48.39 113.19) rotate(-80.28)\"/><path fill=\"#fff\" d=\"M83.15,28.26c0,1.18.64,2.15,1.42,2.15s1.42-.96,1.42-2.15c0-1.18-.64-2.15-1.42-2.15s-1.42.96-1.42,2.15ZM83.46,28.4c0-.92.5-1.67,1.11-1.67s1.11.75,1.11,1.67-.5,1.67-1.11,1.67-1.11-.75-1.11-1.67Z\"/><ellipse fill=\"#fff\" cx=\"84.4\" cy=\"27.81\" rx=\".79\" ry=\".53\" transform=\"translate(42.74 106.3) rotate(-80.28)\"/></svg>";
/* escurece a cor até ter contraste mínimo sobre o papel (letras do logótipo) */
function lum(h){return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(c=>c<=.03928?c/12.92:((c+.055)/1.055)**2.4).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0)}
function readable(c,bg,min){let x=c;for(let i=0;i<20;i++){const a=lum(x),b=lum(bg);if((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=min)break;x=hexMix(x,'#000000',92)}return x}
function hexMix(a,b,w){const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16));const A=h(a),B=h(b);return '#'+A.map((v,i)=>Math.round(v*w/100+B[i]*(100-w)/100).toString(16).padStart(2,'0')).join('')}
function setFavicon(P,dark){
  try{
    const act=readable(P.act.length===4?'#'+[...P.act.slice(1)].map(c=>c+c).join(''):P.act,'#fbfcff',3);
    const svg=FAV.replaceAll('{bg}',hexMix(P.hl,'#ffffff',30)).replaceAll('{d}',act).replaceAll('{c}',hexMix(act,'#000000',72)).replaceAll('{b}',dark?hexMix(act,'#000000',40):P.pen);
    let l=document.querySelector('link[rel="icon"]');if(!l){l=document.createElement('link');l.rel='icon';document.head.appendChild(l)}
    l.type='image/svg+xml';l.href='data:image/svg+xml,'+encodeURIComponent(svg);
  }catch(e){}
}
function applyPal(id){
  const P=PALETTES[id]||PALETTES.noite,st=root.style,mix=(a,b,w)=>`color-mix(in srgb, ${a} ${w}%, ${b})`;
  const dark=!!P.hoc;
  const LOGO=readable(P.act.length===4?'#'+[...P.act.slice(1)].map(c=>c+c).join(''):P.act,'#fbfcff',3);
  const vars={'--cover':P.cover,'--cover-deep':mix(P.cover,'#000',dark?70:80),'--on-cover':P.on,'--on-cover-soft':mix(P.on,P.cover,86),'--cover-ink':mix(P.on,P.cover,86),
   '--hl':P.hl,'--hl-soft':mix(P.hl,'#fff',26),'--hl-on-cover':P.hoc||mix(P.on,'#7A3412',55),'--pen':P.pen,'--grid':mix(P.pen,'transparent',7),'--rule':mix(P.pen,'#fff',13),
   '--ring':mix(P.pen,'transparent',26),'--tape':'rgba(255,255,255,.6)','--action':P.act,'--action-ink':P.ai,'--logo-1':LOGO,'--logo-2':mix(LOGO,'#000',72),'--logo-3':dark?mix(LOGO,'#000',40):P.pen,'--cap1':P.caps[0],'--cap2':P.caps[1],'--cap3':P.caps[2],'--cap4':P.caps[3]};
  for(const k in vars)st.setProperty(k,vars[k]);
  setFavicon(P,dark);
  root.dataset.paleta=id;if(dark)root.dataset.dark='';else delete root.dataset.dark;
  document.querySelectorAll('.paleta [data-p]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.p===id));
  const t=document.querySelector('.paleta-toggle');if(t)t.setAttribute('aria-label',EN?'Choose the cover (current: '+palName(id)+')':'Escolhe a capa (atual: '+P.n+')');
}
function buildPicker(){
  const panel=document.getElementById('paleta-panel'),tog=document.querySelector('.paleta-toggle');
  panel.querySelectorAll('button').forEach(b=>b.remove());
  PICKER.forEach(id=>{const P=PALETTES[id],nm=palName(id),b=document.createElement('button');b.type='button';b.dataset.p=id;b.setAttribute('aria-pressed','false');
    b.style.setProperty('--a',P.cover);b.style.setProperty('--b',P.hl);b.style.setProperty('--c1',P.caps[0]);b.style.setProperty('--c2',P.caps[2]);
    b.innerHTML='<span class="sw" aria-hidden="true"></span>'+nm;
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
  const dias=EN?['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']:['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],meses=EN?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const t=new Date();t.setHours(0,0,0,0);
  document.querySelectorAll('[data-quando]').forEach(el=>{
    const [y,m,d]=el.dataset.quando.split('-').map(Number),dt=new Date(y,m-1,d),diff=Math.round((dt-t)/864e5);
    const base=EN?dias[dt.getDay()]+', '+d+' '+meses[m-1]:dias[dt.getDay()]+', '+d+' '+meses[m-1];
    const rel=EN?(diff===0?'Today!':diff===1?'Tomorrow!':diff>1&&diff<=14?'In '+diff+' days:':diff<0?'Past:':''):(diff===0?'Hoje!':diff===1?'Amanhã!':diff>1&&diff<=14?'Faltam '+diff+' dias:':diff<0?'Já foi:':'');
    el.textContent=(rel?rel+' ':'')+base;
    if(diff<0)el.closest('[data-evento]')?.classList.add('passado');
  });
})();

/* ---------- copiar o link da página ---------- */
document.querySelectorAll('[data-copy-url]').forEach(b=>b.addEventListener('click',async()=>{
  const lbl=b.lastChild.textContent;let ok=true;
  try{await navigator.clipboard.writeText(location.href)}catch(e){ok=false}
  b.lastChild.textContent=ok?(EN?'Link copied':'Link copiado'):location.href;setTimeout(()=>{b.lastChild.textContent=lbl},2400);
}));

/* ---------- partilhar (jogo e eventos): nativo no telemóvel, WhatsApp, Facebook, X, TikTok, copiar ---------- */
document.querySelectorAll('.share').forEach(box=>{
  const nat=box.querySelector('[data-share="native"]');
  if(nat&&navigator.share)nat.hidden=false;
  const url=()=>{const u=new URL(box.dataset.shareUrl||'',location.href);u.search='';return u.href};
  const text=()=>box.dataset.shareText||document.title;
  box.addEventListener('click',async e=>{
    const b=e.target.closest('[data-share]');if(!b)return;
    const k=b.dataset.share,u=url(),t=text();
    if(k==='native'){try{await navigator.share({title:document.title,text:t,url:u})}catch(err){}return}
    if(k==='copy'){let ok=true;try{await navigator.clipboard.writeText(t+' '+u)}catch(err){ok=false}
      const s=b.querySelector('span');const old=s.textContent;s.textContent=ok?(EN?'Copied':'Copiado'):u;b.classList.add('done');setTimeout(()=>{s.textContent=old;b.classList.remove('done')},2200);return}
    if(k==='tiktok'){
      /* o TikTok não tem link de partilha para a web: copia texto e link e abre o TikTok.
         No desafio, a página trata primeiro da imagem do diploma (evento share-tiktok). */
      const s=b.querySelector('span'),old=s.textContent;
      if(box.id==='game-share'){box.dispatchEvent(new CustomEvent('share-tiktok',{detail:{btn:b}}));return}
      let ok=true;try{await navigator.clipboard.writeText(t+' '+u)}catch(err){ok=false}
      s.textContent=ok?(EN?'Text copied, paste it on TikTok':'Texto copiado, cola no TikTok'):u;b.classList.add('done');setTimeout(()=>{s.textContent=old;b.classList.remove('done')},3200);
      window.open('https://www.tiktok.com/upload','_blank','noopener');return}
    const links={whatsapp:'https://wa.me/?text='+encodeURIComponent(t+' '+u),facebook:'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(u),
      x:'https://twitter.com/intent/tweet?text='+encodeURIComponent(t)+'&url='+encodeURIComponent(u)};
    window.open(links[k],'_blank','noopener,width=640,height=560');
  });
});

/* ---------- imagens: depois de abrir, carrega em segundo plano as que ainda esperam (Safari iOS) ---------- */
addEventListener('load',()=>{
  const go=()=>document.querySelectorAll('img[loading="lazy"]').forEach(i=>{i.loading='eager'});
  ('requestIdleCallback' in window)?requestIdleCallback(go,{timeout:2500}):setTimeout(go,1500);
});

/* ano do rodapé sempre atual */
document.querySelectorAll('[data-year]').forEach(e=>{e.textContent=new Date().getFullYear()});
