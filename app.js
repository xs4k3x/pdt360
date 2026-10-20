
/* ---------- Utilidades ---------- */
const pad=n=>String(n).padStart(2,'0');
const fmt=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parse=s=>{const[a,b,c]=s.split('-').map(Number);return new Date(a,b-1,c)};
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const monday=d=>{const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());return addDays(x,-((x.getDay()+6)%7))};
function isoWeek(d){const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y0=new Date(Date.UTC(t.getUTCFullYear(),0,1));return t.getUTCFullYear()+'-W'+pad(Math.ceil(((t-y0)/864e5+1)/7))}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const round=(x,st)=>Math.round(x/st)*st;
const tsec=s=>{const m=String(s||'').trim().match(/^(\d{1,2})[:'.](\d{1,2})$/);return m?+m[1]*60+ +m[2]:null};
const mmss=x=>{x=Math.round(x);return Math.floor(x/60)+':'+pad(x%60)};
const DAYN=['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'];
const MON=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];

/* ---------- Biblioteca (sin bisagra de cadera) ---------- */
const EX={
 plio_box:{n:'Saltos al cajón',t:'bw'}, broad:{n:'Saltos horizontales',t:'bw'},
 hack:{n:'Sentadilla hack',t:'main',inc:5}, prensa:{n:'Prensa de piernas',t:'main',inc:10},
 bulg:{n:'Búlgara con mancuernas',t:'hiper',inc:2}, hipthrust:{n:'Hip thrust (sin hiperextender la zona lumbar)',t:'hiper'},
 curl_fem:{n:'Curl femoral tumbado o sentado',t:'hiper'}, leg_ext:{n:'Extensión de cuádriceps',t:'hiper'},
 gemelo:{n:'Gemelo en máquina',t:'hiper'}, walk_lunge:{n:'Zancada caminando con mancuernas',t:'hiper',inc:2},
 nordic:{n:'Nórdicos (excéntricos)',t:'bw'},
 bench:{n:'Press banca',t:'main',inc:2.5}, incl_bar:{n:'Press inclinado con barra',t:'fuerza'}, incl_db:{n:'Press inclinado con mancuernas',t:'hiper',inc:2,unit:'kg por mancuerna'},
 dips:{n:'Fondos lastrados',t:'hiper',unit:'kg de lastre'},
 ohp_bar:{n:'Press de hombro con barra (sentado, con respaldo)',t:'main',inc:2.5},
 ohp_db:{n:'Press de hombro con mancuernas (sentado)',t:'main',inc:2.5,unit:'kg por mancuerna'},
 lateral:{n:'Elevaciones laterales',t:'hiper',inc:1,unit:'kg por mancuerna'}, facepull:{n:'Face pull',t:'hiper'},
 pullup:{n:'Dominada lastrada',t:'main',inc:2.5,unit:'kg de lastre'}, pullup_bw:{n:'Dominadas',t:'bw'},
 chest_row:{n:'Remo con pecho apoyado',t:'fuerza'}, lat_neutral:{n:'Jalón agarre neutro',t:'hiper'},
 db_row:{n:'Remo con mancuerna apoyado en banco',t:'hiper',inc:2},
 triceps:{n:'Tríceps en polea',t:'hiper'}, biceps:{n:'Curl de bíceps',t:'hiper',inc:1},
 pushup:{n:'Flexiones',t:'bw'}, deadbug:{n:'Dead bug',t:'bw'}, pallof:{n:'Pallof press',t:'bw'},
 copen:{n:'Copenhagen plank',t:'bw'}, side_plank:{n:'Plancha lateral',t:'bw'},
 kb_goblet:{n:'Goblet squat con pausa (KB)',t:'func'}, kb_revlunge:{n:'Zancada inversa con KB',t:'func'},
 kb_bulg:{n:'Búlgara con KB',t:'func'}, kb_stepup:{n:'Subida al cajón alto con KB',t:'func'},
 kb_press:{n:'Press de hombro con KB',t:'func'}, wallball:{n:'Wall balls',t:'func'},
 carry:{n:'Farmer / rack carry',t:'func'}, tgu:{n:'Turkish get-up',t:'func'},
 hyrox_round:{n:'Ronda: 200 m + 20 zancadas con KB + 15 thrusters KB + 8 burpees broad jump',t:'func'},
 bench_db:{n:'Press banca con mancuernas',t:'hiper',inc:2,unit:'kg por mancuerna'}, chest_press_m:{n:'Press de pecho en máquina',t:'hiper',inc:5},
 pushup_w:{n:'Flexiones lastradas',t:'hiper',inc:5,unit:'kg de lastre'}, lat_heavy:{n:'Jalón al pecho pesado',t:'fuerza',inc:5},
 row_cable:{n:'Remo en polea sentado (tronco erguido)',t:'hiper',inc:5}, row_machine:{n:'Remo en máquina con apoyo de pecho',t:'fuerza',inc:5},
 shoulder_m:{n:'Press de hombro en máquina',t:'hiper',inc:5}, landmine:{n:'Landmine press de rodillas',t:'hiper',inc:2.5},
 incl_m:{n:'Press inclinado en máquina',t:'hiper',inc:5}, lateral_cable:{n:'Elevación lateral en polea',t:'hiper',inc:1},
 rear_db:{n:'Pájaros con mancuernas',t:'hiper',inc:1}, skull_db:{n:'Press francés con mancuernas',t:'hiper',inc:1},
 curl_cable:{n:'Curl de bíceps en polea',t:'hiper',inc:2.5}, leg_curl_ball:{n:'Curl femoral con fitball',t:'bw'},
 glute_bridge:{n:'Puente de glúteo con carga',t:'hiper',inc:5}, calf_db:{n:'Gemelo de pie con mancuerna',t:'hiper',inc:2},
 rev_lunge_db:{n:'Zancada inversa con mancuernas',t:'hiper',inc:2}, stepup_db:{n:'Subida al cajón con mancuernas',t:'hiper',inc:2},
 goblet_db:{n:'Sentadilla goblet con mancuerna',t:'hiper',inc:2}, db_thruster:{n:'Thruster con mancuernas',t:'func',inc:2}
};
// Alternativas si falta la máquina o el material (todas sin bisagra de cadera)
const ALT={bench:['bench_db','chest_press_m','pushup_w'],pullup:['lat_heavy','lat_neutral'],
 ohp_bar:['ohp_db','shoulder_m','landmine'],ohp_db:['ohp_bar','shoulder_m','landmine'],
 hack:['prensa','goblet_db','bulg'],prensa:['hack','goblet_db','bulg'],
 chest_row:['row_machine','db_row','row_cable'],lat_neutral:['pullup_bw','row_cable'],db_row:['row_cable','row_machine'],
 incl_db:['incl_m','incl_bar','bench_db'],incl_bar:['incl_db','incl_m'],dips:['pushup_w','chest_press_m'],
 lateral:['lateral_cable'],facepull:['rear_db'],triceps:['skull_db','pushup'],biceps:['curl_cable'],
 curl_fem:['nordic','leg_curl_ball'],leg_ext:['goblet_db','rev_lunge_db'],gemelo:['calf_db'],hipthrust:['glute_bridge'],
 bulg:['rev_lunge_db','stepup_db'],walk_lunge:['rev_lunge_db','stepup_db'],nordic:['curl_fem','leg_curl_ball'],
 kb_goblet:['goblet_db'],kb_revlunge:['rev_lunge_db'],kb_bulg:['bulg'],kb_stepup:['stepup_db'],kb_press:['ohp_db'],wallball:['db_thruster'],
 plio_box:['broad'],broad:['plio_box'],pushup:['pushup_w'],pullup_bw:['lat_neutral'],
 deadbug:['side_plank'],pallof:['side_plank'],copen:['side_plank'],side_plank:['deadbug']};
const MAINS=['bench','pullup','ohp_bar','ohp_db','hack','prensa'];
const VARS={LEG:['hack','prensa'],OHP:['ohp_bar','ohp_db']};

/* ---------- Carrera: ritmos y progresión ---------- */
function runCfg(){
 const c=S.config.run||{};
 const tests=S.logs.filter(l=>l.kind==='test2k'&&l.time).sort((a,b)=>a.date<b.date?1:-1);
 return{T:tests.length?tests[0].time:(tsec(c.t2k)||480),G:tsec(c.goal)||450,start:c.blockStart||'2026-10-19',test:tests[0]||null};
}
function paces(){const{T,G}=runCfg(),p=T/2;return{p,goal:G/2,z2:[p/0.70,p/0.60],thr:[p/0.88,p/0.83]}}
function blockWeek(){const w=Math.round((S.weekStart-monday(parse(runCfg().start)))/(7*864e5));return((w%12)+12)%12+1}
const rng2=a=>mmss(a[0])+'–'+mmss(a[1]);
// Punto de partida: sesión de la unidad 2×(4×500 m) a VAM (4.000 m de calidad); rodajes VT1 de 50-65′.
// Las propuestas arrancan con ese volumen algo más suave (+5 s/km) y progresan en ritmo, no en metros.
function runBlocks(key){
 const P=paces(),bw=blockWeek(),dl=S.deload,f=x=>mmss(x);
 const wu='15′ suave a '+rng2(P.z2)+'/km + 4 progresivos de 15″',cd='10′ suave';
 if(key==='RUN_VAM'){
  if(bw===12)return[wu+' + movilidad','TEST 2 km a tope: sal a '+f(P.p)+'/km y busca acabar más rápido','10′ suave. Registra el tiempo en Registro → Test 2 km: los ritmos se recalculan solos'];
  const easy=P.p*1.021,mid=(P.p+P.goal)/2;
  // [bloques, reps, metros, ritmo, etiqueta, recuperación]
  const tab={
   1:[2,4,500,easy,'VAM +5 s','90″ · 4′ entre bloques'],2:[2,4,500,P.p,'VAM (2 km actual)','90″ · 4′ entre bloques'],
   3:[1,5,800,easy,'VAM +5 s','2′'],4:[1,5,800,P.p,'VAM (2 km actual)','2′'],
   5:[2,5,400,mid,'entre VAM y objetivo','75″ · 3′ entre bloques'],6:[2,5,400,mid,'entre VAM y objetivo','75″ · 3′ entre bloques'],
   7:[1,4,1000,P.p,'VAM (2 km actual)','2′30″'],8:[1,4,1000,P.p,'VAM (2 km actual)','2′'],
   9:[1,10,400,P.goal,'ritmo objetivo','75″'],10:[1,10,400,P.goal,'ritmo objetivo','60″'],
   11:[1,3,1000,mid,'entre VAM y objetivo','3′']};
  let[b,n,m,pace,lab,rec]=tab[bw];if(dl){if(b>1)b=1;else n=Math.max(2,Math.round(n*0.6))}
  const reps=(b>1?b+'×('+n+'×'+m+' m)':n+'×'+m+' m');
  return[wu,reps+' a '+f(pace)+'/km ('+f(pace*m/1000)+' cada una, '+lab+') · rec. '+rec+' trotando · '+(b*n*m)+' m de calidad',cd];
 }
 if(key==='RUN_TEMPO'){
  const reps=bw<=3?'3×10′':bw<=6?'3×12′':bw<=9?'2×18′':bw<=11?'2×20′':'1×15′';
  return['15′ suave a '+rng2(P.z2)+'/km',(dl?'Solo la mitad: ':'')+reps+' a '+rng2(P.thr)+'/km (RPE 7, frases cortas) · rec. 2′ trotando',cd];
 }
 if(key==='RUN_Z2'){let min=[45,45,50,50,50,55,55,55,60,60,60,40][bw-1];if(dl)min=Math.round(min*0.7);
  return[min+'′ continuos a '+rng2(P.z2)+'/km (VT1: puedes hablar en frases completas)','6-8 progresivos de 20″ al final, recuperación completa'];}
 return[];
}

/* ---------- Sesiones ---------- */
const SESS={
 PIERNA:{label:'Pierna',focus:'Fuerza de tren inferior sin bisagra de cadera. Ideal la tarde del día de carrera dura.',ex:[['plio_box',4,3,3],['LEG',4,4,6],['bulg',3,8,10,'por pierna'],['hipthrust',3,8,10],['curl_fem',3,10,12],['gemelo',3,12,15]]},
 PIERNA_B:{label:'Pierna B',focus:'Segundo estímulo de pierna cuando no hay hueco SC para un HIT de pierna.',ex:[['walk_lunge',3,8,8,'por pierna'],['LEG',3,8,10],['nordic',3,4,6],['curl_fem',3,10,12],['leg_ext',3,12,15],['deadbug',3,10,10]]},
 PUSH:{label:'Push',focus:'Empuje: 2 de fuerza (4-6) + hipertrofia (8-12).',ex:[['bench',4,4,6],['OHP',3,4,6],['incl_db',3,8,12],['dips',3,8,10],['lateral',3,12,15],['triceps',3,10,12]]},
 PULL:{label:'Pull',focus:'Tracción: 2 de fuerza (4-6) + hipertrofia (8-12). Remos con apoyo para no cargar la zona lumbar.',ex:[['pullup',4,4,6],['chest_row',4,5,6],['lat_neutral',3,10,12],['db_row',3,8,12],['facepull',3,15,15],['biceps',3,10,12]]},
 TORSO:{label:'Torso',focus:'Empuje y tracción en una sesión. Sustituye a Push + Pull cuando solo cabe una de tren superior.',ex:[['bench',4,4,6],['pullup',4,4,6],['OHP',3,8,10],['chest_row',3,8,10],['lateral',3,12,15],['facepull',3,15,15]]},
 TORSO_V:{label:'Torso',focus:'Semana con Push y Pull: mismos patrones con otro ejercicio (press inclinado en vez de banca, jalón y remo en vez de dominada) para variar el estímulo sin repetir los básicos.',ex:[['incl_bar',4,5,6],['lat_neutral',4,6,8],['db_row',3,8,10,'por brazo'],['incl_db',3,10,12],['lateral',3,12,15],['facepull',3,15,15]]},
 FULL_A:{label:'Full body A',focus:'Plan mínimo (3 sesiones propias o menos).',ex:[['LEG',3,5,5],['bench',3,5,5],['pullup',3,5,5],['pallof',3,10,10,'por lado']]},
 FULL_B:{label:'Full body B',focus:'Plan mínimo (3 sesiones propias o menos).',ex:[['LEG',3,8,10],['OHP',3,5,5],['chest_row',3,8,10],['deadbug',3,10,10]]},
 ACT_LEG:{label:'Actividad · pierna',act:1,focus:'Actividad registrada que trabajó pierna.'},
 ACT_UP:{label:'Actividad · tren superior',act:1,focus:'Actividad registrada que trabajó tren superior.'},
 ACT_HARD:{label:'Actividad intensa',act:1,focus:'Carrera dura, series o HIIT registrado.'},
 ACT_EASY:{label:'Carrera suave',act:1,focus:'Carrera suave registrada.'},
 ACT_MARCH:{label:'Marcha / maniobras',act:1,focus:'Marcha o maniobras: carga las piernas.'},
 ACT_OTHER:{label:'Otra actividad',act:1,focus:'Actividad registrada.'},
 CUSTOM:{label:'Sesión libre',focus:'Ejercicios elegidos por ti. Cada uno cuenta para su propia progresión.',ex:[]},
 CROSSFIT:{label:'Crossfit (clase)',focus:'Clase del gimnasio, contenido desconocido. Cuenta como estímulo intenso de la semana.'},
 HIT_LEG:{label:'HIT · pierna',sc:1,focus:'Fuerza-resistencia de pierna con KB y saltos, RPE 8. Sin bisagra.',ex:[['plio_box',5,3,3],['broad',4,3,3],['kb_bulg',4,8,8,'por pierna'],['kb_stepup',4,8,8,'por pierna'],['hyrox_round',4,1,1,'4-5 rondas · 90″ desc. · mismo ritmo'],['deadbug',3,10,10],['pallof',3,10,10,'por lado']]},
 HIT_STR:{label:'HIT · fuerza-resistencia',sc:1,focus:'Cargas y peso corporal a RPE 7, densidad moderada. Poco glucolítico.',ex:[['pullup_bw',4,6,8],['pushup',4,15,15],['kb_press',3,8,8,'por brazo'],['kb_revlunge',3,8,8,'por pierna, ligera'],['carry',4,1,1,'40 m'],['tgu',3,3,3,'por lado'],['copen',3,1,1,'20″ por lado']]},
 HIT_SOFT:{label:'HIT suave · core y cargas',sc:1,focus:'RPE 6. Para la víspera de una sesión intensa.',ex:[['tgu',3,3,3,'por lado'],['carry',4,1,1,'40 m'],['pallof',3,10,10,'por lado'],['copen',3,1,1,'20″ por lado'],['deadbug',3,10,10],['pushup',3,12,12]]},
 HIIT_VO2:{label:'HIIT · VO2',sc:1,focus:'Intervalos largos cerca del VO2max: el estímulo más transferible al 2 km.',blocks:()=>{const P=paces();return['10′ calentamiento: trote suave + movilidad + 3 progresivos','5×3′ a RPE 9 · rec. 2′ al paso. Circuito continuo: 200 m carrera + 10 burpees + 15 wall balls, repetir hasta el pitido','Si hay pista: 5×3′ corriendo a '+mmss(P.p)+'/km sustituye al circuito','5′ suave + movilidad']}},
 HIIT_SHORT:{label:'HIIT · intervalos cortos',sc:1,focus:'30″/30″ de alta intensidad. Complementa al HIIT largo.',blocks:()=>['10′ calentamiento','3 bloques de 6′: 30″ fuerte / 30″ suave rotando burpees · saltos al cajón · wall balls · sprint 100 m o ergómetro · 3′ entre bloques','Core: plancha lateral 3×30″ por lado']},
 RUN_VAM:{label:'Series VAM',focus:'Sesión específica de 2 km. Progresa a lo largo del bloque de 12 semanas.',blocks:()=>runBlocks('RUN_VAM')},
 RUN_TEMPO:{label:'Carrera umbral',focus:'Umbral controlado: sube el ritmo que puedes sostener sin acumular fatiga.',blocks:()=>runBlocks('RUN_TEMPO')},
 RUN_Z2:{label:'Carrera Z2',focus:'Volumen aeróbico suave: base del 2 km sin fatiga.',blocks:()=>runBlocks('RUN_Z2')},
 ENGINE:{label:'Motor sin impacto',cmp:1,focus:'Aeróbico sin cargar la pierna.',blocks:()=>['30-40′ continuos en bici, remo o SkiErg a RPE 4-5 (puedes hablar)']},
 MOBIL:{label:'Movilidad y core',cmp:1,focus:'Recuperación activa, 25-30′.',blocks:()=>['15′ de movilidad de cadera, tobillo y columna torácica'],ex:[['deadbug',3,10,10],['pallof',3,10,10,'por lado'],['side_plank',3,1,1,'30″ por lado']]},
 METCON:{label:'Circuito funcional suave',cmp:1,focus:'30′ a RPE 6. Cubre el trabajo funcional cuando no hubo hueco SC.',ex:[['wallball',4,15,15],['kb_goblet',3,10,10],['carry',4,1,1,'40 m'],['pushup',3,15,15],['pallof',3,10,10,'por lado']]}
};

/* ---------- Opciones de día ---------- */
const OPT_WORK_AM=[['none','Nada / no puedo'],['easy','Carrera suave (impuesta)'],['hard','Carrera dura (impuesta)'],['other','Otra impuesta'],['sc','Hueco SC: HIT / HIIT a mi criterio']];
const OPT_WORK_PM=[['gym','Gimnasio'],['cf','Crossfit (clase)'],['none','No puedo']];
const OPT_FREE=[['none','No entreno'],['auto','Propuesta del plan'],['gym','Solo gimnasio (fuerza)'],['cf','Crossfit (clase)'],['easy','Carrera suave (mía)'],['hard','Carrera dura (mía)']];
const optsFor=(d,slot)=>d.work?(slot==='am'?OPT_WORK_AM:OPT_WORK_PM):OPT_FREE;
const optLabel=(d,slot)=>{const o=optsFor(d,slot).find(x=>x[0]===d[slot]);return o?o[1]:d[slot]};
const RUN=v=>v==='easy'||v==='hard'||v==='other';
function normDay(d){d=d||{};let am=d.am||'none',pm=d.pm;if(am==='free')am='sc';if(pm===true)pm='gym';else if(pm===false||pm==null)pm='none';
 return{work:d.work!==undefined?!!d.work:true,off:!!d.off,am,pm,desc:d.desc||'',descPm:d.descPm||''}}
function coerce(d){const ok=sl=>optsFor(d,sl).some(o=>o[0]===d[sl]);
 if(!ok('am'))d.am='none';if(!ok('pm'))d.pm=d.work?'gym':'none';if(!RUN(d.am))d.desc='';if(!RUN(d.pm))d.descPm='';return d}

/* ---------- Estado ---------- */
const S={ready:false,sheet:null,reports:[],fs:null,uid:null,email:'',weeksMap:{},calMonth:new Date(new Date().getFullYear(),new Date().getMonth(),1),weekStart:monday(new Date()),tab:'semana',days:null,prevDays:null,deload:false,logs:[],config:{absences:[]},sel:null,
 logDate:fmt(new Date()),var:{LEG:null,OHP:null},review:'',reviewing:false,delArm:null,db:null,dbState:'loading',sample:null};
const wid=()=>isoWeek(S.weekStart);
const baseDays=()=>Array.from({length:7},(_,i)=>({work:i<5,off:false,am:'none',pm:i<5?'gym':'none',desc:'',descPm:''}));
const inAbs=ds=>(S.config.absences||[]).some(a=>a.from&&a.to&&ds>=a.from&&ds<=a.to);
const effDaysFor=(arr,ws)=>arr.map((d,i)=>({...normDay(d),off:!!(d&&d.off)||inAbs(fmt(addDays(ws,i)))}));
const effDays=()=>effDaysFor(S.days||baseDays(),S.weekStart);
function actKey(l){const g=l.gtype||'',gr=l.groups||[];
 if(g==='Crossfit')return'CROSSFIT';if(g==='Carrera dura / series'||g==='HIIT')return'ACT_HARD';if(g==='Carrera suave')return'ACT_EASY';
 if(gr.includes('Pierna'))return'ACT_LEG';if(gr.length)return'ACT_UP';if(g==='Marcha / maniobras')return'ACT_MARCH';return'ACT_OTHER'}
// Lo realmente hecho en la semana: días pasados bloqueados y huecos con registro
function buildAct(ws){
 const id=isoWeek(ws),today=fmt(new Date()),am=Array(7).fill(null),pm=Array(7).fill(null),lab={},locked=[],lockDay=[];let any=false;
 for(let i=0;i<7;i++)lockDay.push(fmt(addDays(ws,i))<today);
 S.logs.filter(l=>l.kind==='session'&&l.week===id).slice().reverse().forEach(l=>{
  const i=Math.round((parse(l.date)-ws)/864e5);if(i<0||i>6)return;
  const sl=l.slot||(l.replaces&&l.replaces.slot)||'pm',k=l.session==='GENERAL'?actKey(l):(SESS[l.session]?l.session:null);if(!k)return;
  (sl==='am'?am:pm)[i]=k;if(!locked.includes(i+sl))locked.push(i+sl);any=true;
  lab[i+sl]=(l.session==='GENERAL'?(l.gtype||'Actividad'):SESS[k].label)+(l.replaces&&l.replaces.key!==k?' ↺':'')});
 if(!any&&!lockDay.some(Boolean))return null;
 return{am,pm,lab,locked,lockDay};
}
function prevPlan(){if(!S.prevDays)return null;const pws=addDays(S.weekStart,-7);const p=computePlan(effDaysFor(S.prevDays,pws),null,buildAct(pws));return{am:p.am,pm:p.pm,hard:p.hard}}
const curPlan=()=>computePlan(effDays(),prevPlan(),buildAct(S.weekStart));

/* ---------- Planificador ---------- */
const RUNK=['RUN_VAM','RUN_TEMPO','RUN_Z2'];
const ISRUN=k=>RUNK.includes(k);
const SCK=k=>!!k&&(/^SC\d$/.test(k)||!!(SESS[k]&&SESS[k].sc));
const TYPE=k=>SCK(k)?'func':ISRUN(k)?'run':'gym';
const GYM=k=>!!k&&TYPE(k)==='gym'&&k!=='CROSSFIT'&&!(SESS[k]&&(SESS[k].cmp||SESS[k].act));
const UP=['UP1','UP2','UP3'];
const CAT={Pierna:['PIERNA','PIERNA_B','FULL_A','FULL_B','HIT_LEG','ACT_LEG'],Empuje:['PUSH','TORSO','TORSO_V','FULL_A','FULL_B','ACT_UP','CUSTOM'],Tracción:['PULL','TORSO','TORSO_V','FULL_A','FULL_B','ACT_UP','CUSTOM']};
function score(am,pm,hard,prev){
 let s=0;
 const at0=(j,sl)=>j<0?(prev?prev[sl][j+7]:null):j>6?null:(sl==='am'?am:pm)[j];
 const at=(j,sl)=>{const k=at0(j,sl);return k==='TORSO_V'?'TORSO':k};
 const has=(j,k)=>at(j,'am')===k||at(j,'pm')===k;
 const any=(j,ks)=>ks.some(k=>has(j,k));
 const legDay=j=>any(j,['PIERNA','PIERNA_B','HIT_LEG','ACT_LEG','ACT_MARCH']);
 const cf=j=>has(j,'CROSSFIT');
 const sc=j=>SCK(at(j,'am'))||SCK(at(j,'pm'));
 for(let i=0;i<7;i++){
  const a=am[i],p=pm[i];
  if(any(i,['PIERNA','PIERNA_B'])){if(hard(i+1))s-=100;if(hard(i))s+=30;if(hard(i-1))s-=10;if(legDay(i-1))s-=20}
  if(any(i,['FULL_A','FULL_B'])){if(hard(i+1))s-=40;if(hard(i))s+=10}
  if(sc(i)&&hard(i+1))s-=10;
  if(cf(i+1)){if(legDay(i))s-=40;if(has(i,'RUN_VAM'))s-=15}
  if(cf(i)){if(legDay(i))s-=30;if(has(i,'RUN_VAM'))s-=30}
  if(cf(i-1)){if(legDay(i))s-=15;if(has(i,'RUN_VAM'))s-=20}
  if(has(i,'RUN_VAM')){if(hard(i-1)||hard(i+1))s-=30;if(a==='PIERNA'&&p==='RUN_VAM')s-=70}
  if(has(i,'RUN_TEMPO')){if(hard(i+1))s-=30;if(legDay(i-1))s-=20;if(hard(i-1))s-=15;if(legDay(i))s-=10}
  if(has(i,'RUN_Z2')&&legDay(i-1))s-=3;
  if(a&&p){if(a==='CROSSFIT'||p==='CROSSFIT')s-=10;else if(GYM(a)&&GYM(p))s-=60;else if(ISRUN(a)&&ISRUN(p))s-=40;else s-=2}
 }
 for(let j=-1;j<6;j++){
  const x=[at(j,'am'),at(j,'pm')],y=[at(j+1,'am'),at(j+1,'pm')],pair=(u,v)=>(x.includes(u)&&y.includes(v))||(x.includes(v)&&y.includes(u));
  if(pair('PUSH','TORSO'))s-=15;if(pair('PULL','TORSO'))s-=10;if(pair('FULL_A','FULL_B'))s-=30;if(pair('PIERNA','PIERNA_B'))s-=30;
  if(pair('PUSH','PUSH')||pair('PULL','PULL')||pair('TORSO','TORSO'))s-=30;
  if(pair('RUN_VAM','RUN_TEMPO'))s-=25;
  const hv=k=>hard(k)||cf(k)||legDay(k);if(hv(j)&&hv(j+1))s-=8;
 }
 if(prev)for(const ks of Object.values(CAT)){const occ=[];for(let j=-7;j<7;j++)if(any(j,ks))occ.push(j);
  for(let q=1;q<occ.length;q++){if(occ[q]<0)continue;const g=occ[q]-occ[q-1];if(g>6)s-=(g-6)*15;break}}
 return s;
}
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const planCache=new Map();
function computePlan(days,prev,act){
 const key=JSON.stringify([days.map(d=>[d.off,d.work,d.am,d.pm]),prev?[prev.am,prev.pm,prev.hard]:0,act||0]);
 if(planCache.has(key))return planCache.get(key);
 const res=computePlan_(days,prev,act||null);if(planCache.size>300)planCache.clear();planCache.set(key,res);return res;
}
function computePlan_(days,prev,act){
 const baseHard=i=>i<0?!!(prev&&prev.hard[i+7]):i<7&&!days[i].off&&(days[i].am==='hard'||days[i].pm==='hard');
 const notes=[],fixAm=Array(7).fill(null),fixPm=Array(7).fill(null),slots=[];let fixed=0,ncf=0,hardRuns=0,easyRuns=0;
 const locked=(i,sl)=>!!act&&(act.lockDay[i]||act.locked.includes(i+sl)),done=[];
 days.forEach((d,i)=>{['am','pm'].forEach(sl=>{const v=d[sl];
  if(locked(i,sl)){const k=act[sl][i];
   if(k){(sl==='am'?fixAm:fixPm)[i]=k;if(k==='CROSSFIT')ncf++;else done.push(k)}
   else if(!d.off&&v==='cf'){(sl==='am'?fixAm:fixPm)[i]='CROSSFIT';ncf++}
   if(!d.off&&RUN(v)){fixed++;if(v==='hard')hardRuns++;else if(v==='easy')easyRuns++}
   return}
  if(d.off)return;
  if(v==='sc')slots.push({d:i,sl,v,allow:['func']});
  else if(v==='gym')slots.push({d:i,sl,v,allow:['gym'],explicit:!d.work});
  else if(v==='auto')slots.push({d:i,sl,v,allow:['gym','run']});
  else if(v==='cf'){(sl==='am'?fixAm:fixPm)[i]='CROSSFIT';ncf++}
  else if(RUN(v)){fixed++;if(v==='hard')hardRuns++;else if(v==='easy')easyRuns++}})});
 const noRun=hardRuns+easyRuns===0;
 // lo ya hecho cubre parte del plan
 const cnt=ks=>done.filter(k=>ks.includes(k)).length;
 const legDone=cnt(['PIERNA','PIERNA_B','ACT_LEG','FULL_A','FULL_B','HIT_LEG']),upDoneK=done.filter(k=>['PUSH','PULL','TORSO','TORSO_V','FULL_A','FULL_B','ACT_UP','CUSTOM'].includes(k));
 const scDone=done.filter(k=>SCK(k)).length,hDone=cnt(['RUN_VAM','ACT_HARD','RUN_TEMPO']),eDone=cnt(['RUN_Z2','ACT_EASY']);
 hardRuns+=hDone;easyRuns+=eDone;
 const doneOwn=done.filter(k=>!(SESS[k]&&SESS[k].cmp)).length;
 const T=slots.length,cap=Math.max(0,Math.min(7-ncf,9-fixed-ncf)-doneOwn);
 const needQ=hardRuns<1,needE=easyRuns<1;
 const upLeft=Math.max(0,3-upDoneK.length),scLeft=Math.max(0,3-scDone);
 const order=(cap<=3?(noRun?['FULL_A',hDone?null:'RUN_VAM','FULL_B',eDone?null:'RUN_Z2','SC1']:['FULL_A','FULL_B','SC1',needQ&&'RUN_VAM'])
  :noRun?['PIERNA',hDone?null:'RUN_VAM','SC1','UP1',eDone?null:'RUN_Z2','UP2','SC2',hDone>=2?null:'RUN_TEMPO','UP3','SC3','PIERNA_B']
  :['PIERNA','SC1','UP1',needQ&&'RUN_VAM','UP2','SC2','UP3',needE&&'RUN_Z2','SC3','PIERNA_B'])
  .filter(Boolean).filter(k=>!(k==='PIERNA'&&legDone>=1)&&!(k==='PIERNA_B'&&legDone>=2)&&!(/^UP\d$/.test(k)&&+k[2]>upLeft)&&!(/^SC\d$/.test(k)&&+k[2]>scLeft)&&!(k==='FULL_A'&&legDone&&upDoneK.length));
 const fits=list=>{const match=Array(T).fill(-1);
  const tryS=(k,seen)=>{for(let x=0;x<T;x++){if(seen[x]||!slots[x].allow.includes(TYPE(list[k])))continue;seen[x]=1;if(match[x]===-1||tryS(match[x],seen)){match[x]=k;return true}}return false};
  for(let k=0;k<list.length;k++)if(!tryS(k,[]))return null;
  const asg=Array(list.length);match.forEach((k,x)=>{if(k>=0)asg[k]=x});return asg};
 const list=[];
 for(const k of order){if(list.length>=cap)break;if(k==='PIERNA_B'&&list.some(SCK))continue;if(fits([...list,k]))list.push(k)}
 const nUp=list.filter(k=>UP.includes(k)).length;
 let upMap=[[],['TORSO'],['PULL','PUSH'],['PULL','PUSH','TORSO_V']][Math.min(3,nUp+upDoneK.length)].slice();
 upDoneK.forEach(k=>{let j=upMap.indexOf(k==='TORSO'?'TORSO_V':k);if(j<0&&(k==='TORSO'||k==='TORSO_V'))j=upMap.indexOf('TORSO');if(j<0)j=0;if(upMap.length)upMap.splice(j,1)});
 if(upMap.length<nUp)upMap=[[],['TORSO'],['PULL','PUSH'],['PULL','PUSH','TORSO_V']][nUp];
 let ui=0;for(let k=0;k<list.length;k++)if(UP.includes(list[k]))list[k]=upMap[ui++];
 const hardOf=(am,pm)=>i=>baseHard(i)||(i>=0&&i<7&&['RUN_VAM','ACT_HARD','HIIT_VO2','HIIT_SHORT'].some(k=>am[i]===k||pm[i]===k));
 const ev=asg=>{const am=fixAm.slice(),pm=fixPm.slice();
  asg.forEach((x,k)=>{const sl=slots[x];(sl.sl==='am'?am:pm)[sl.d]=list[k]});
  let sc0=score(am,pm,hardOf(am,pm),prev);slots.forEach((sl,x)=>{if(sl.explicit&&!asg.includes(x))sc0-=25});
  return{am,pm,asg,score:sc0}};
 const comp=k=>slots.map((sl,x)=>sl.allow.includes(TYPE(list[k]))?x:-1).filter(x=>x>=0);
 let est=1;list.forEach((_,k)=>est*=Math.max(1,comp(k).length));
 let best=null;
 if(est<=40000){
  const cur=[],used=new Set();
  const rec=k=>{if(k===list.length){const r=ev(cur);if(!best||r.score>best.score)best=r;return}for(const x of comp(k)){if(used.has(x))continue;used.add(x);cur[k]=x;rec(k+1);used.delete(x)}};
  rec(0);
 }else{
  const rand=rng(T*31+list.length),base=fits(list);
  for(let r=0;r<20&&base;r++){
   let asg=base.slice();
   for(let z=0;z<list.length*3;z++){const a=Math.floor(rand()*list.length),b=Math.floor(rand()*list.length);
    if(slots[asg[a]].allow.includes(TYPE(list[b]))&&slots[asg[b]].allow.includes(TYPE(list[a]))){const t=asg[a];asg[a]=asg[b];asg[b]=t}}
   let cur=ev(asg),imp=true;
   while(imp){imp=false;
    for(let k=0;k<list.length;k++)for(const x of comp(k)){const at=cur.asg.indexOf(x);if(at===k)continue;const c=cur.asg.slice();
     if(at===-1)c[k]=x;else{if(!slots[cur.asg[k]].allow.includes(TYPE(list[at])))continue;c[at]=cur.asg[k];c[k]=x}
     const e=ev(c);if(e.score>cur.score){cur=e;imp=true}}}
   if(!best||cur.score>best.score)best=cur;
  }
 }
 if(!best)best={am:fixAm,pm:fixPm};
 const A=best.am.slice(),Pm=best.pm.slice(),H=hardOf(A,Pm),why={};
 const at=(j,sl)=>j<0?(prev?prev[sl][j+7]:null):j>6?null:(sl==='am'?A:Pm)[j];
 const hasAny=(j,ks)=>ks.some(k=>at(j,'am')===k||at(j,'pm')===k);
 const cfOn=j=>hasAny(j,['CROSSFIT']);
 // HIT o HIIT en los huecos SC, en orden cronológico
 let Q=0;for(let i=0;i<7;i++){if(H(i))Q++;if(cfOn(i))Q++;if(hasAny(i,['RUN_TEMPO']))Q++}
 let legCount0=0;
 let legCount=0;for(let i=0;i<7;i++)if(hasAny(i,['PIERNA','PIERNA_B','FULL_A','FULL_B','ACT_LEG','HIT_LEG']))legCount++;
 let hiitN=0;
 for(let i=0;i<7;i++)for(const sl of['am','pm']){const arr=sl==='am'?A:Pm;if(!/^SC\d$/.test(arr[i]||''))continue;
  const nextInt=H(i+1)||cfOn(i+1),prevInt=H(i-1)||cfOn(i-1),legSame=hasAny(i,['PIERNA','PIERNA_B']),legPrev=hasAny(i-1,['PIERNA','PIERNA_B','HIT_LEG','FULL_A','FULL_B']);
  let k,w;
  if(nextInt){k='HIT_SOFT';w='Mañana hay '+(H(i+1)?'carrera dura':'crossfit')+': sesión suave para llegar fresco. Ni HIIT ni pierna pesada hoy.'}
  else if(Q<2&&!prevInt&&!legSame){k=hiitN?'HIIT_SHORT':'HIIT_VO2';hiitN++;w='La semana solo tiene '+Q+' estímulo(s) de alta intensidad: HIIT, porque el trabajo cerca del VO2max es lo que más mueve el 2 km.';Q++}
  else if(legCount<2&&!legPrev&&!legSame&&!prevInt){k='HIT_LEG';w='La pierna solo tiene '+legCount+' sesión de fuerza esta semana: HIT con prioridad de pierna.';legCount++}
  else if(Q<3&&!prevInt&&!legSame){k=hiitN?'HIIT_SHORT':'HIIT_VO2';hiitN++;w='Hay '+Q+' estímulos intensos y cabe un tercero sin pasar de 3 por semana: HIIT.';Q++}
  else{k='HIT_STR';w=prevInt?'Ayer hubo carrera dura o crossfit: HIT de fuerza-resistencia, menos glucolítico, en lugar de HIIT.':legSame?'Hoy hay pierna en el gimnasio: HIT de tren superior y core, sin HIIT.':'La semana ya tiene '+Q+' estímulos intensos y la pierna está cubierta: HIT de fuerza-resistencia para no acumular fatiga.'}
  arr[i]=k;why[i+sl]=w}
 // notas
 const pq=[...A,...Pm].filter(k=>k==='RUN_VAM'||k==='RUN_TEMPO').length,pe=[...A,...Pm].filter(k=>k==='RUN_Z2').length;
 const q=hardRuns+pq,e=easyRuns+pe;
 notes.push([noRun&&!(pq+pe)?'warn':'info',(noRun?'Esta semana tu unidad no pone carrera: el plan la mete en los huecos libres de días dobles. ':'Carrera impuesta: el plan solo añade la que falte. ')+'Total: '+q+' de calidad + '+e+' suave(s)'+(pq+pe?' ('+(pq+pe)+' propuesta(s) por el plan)':'')+'. Alta intensidad: '+Q+' (tope 3).'+(noRun&&!(pq+pe)?' No hay huecos libres en “Propuesta del plan” donde meterla.':'')]);
 if(prev){const parts=[];let warn=false;
  for(const[name,ks]of Object.entries(CAT)){let last=null,first=null;for(let j=-7;j<0;j++)if(hasAny(j,ks))last=j;for(let j=6;j>=0;j--)if(hasAny(j,ks))first=j;
   if(last!=null&&first!=null){const g=first-last;parts.push(name+' '+g+' d');if(g>7)warn=true}}
  if(parts.length)notes.push([warn?'warn':'info','Días entre el último estímulo de la semana anterior y el primero de esta: '+parts.join(' · ')+'.'+(warn?' Más de 7 días: no había hueco antes con lo marcado.':'')]);}
 if(done.length)notes.push(['info','Ya hecho esta semana: '+done.length+' sesión(es) registradas. El resto del plan se recoloca en los días que quedan.']);
 if(ncf)notes.push(['info','Crossfit cuenta como estímulo intenso: sin Pierna ni series la víspera.']);
 if(cap<=3&&list.length)notes.push(['warn','Solo '+list.length+' sesión(es) propias esta semana: plan mínimo.']);
 if(T>list.length&&list.length)notes.push(['info','Tienes '+T+' huecos y se usan '+list.length+' (máximo 9 sesiones semanales contando '+(fixed+ncf)+' fijas). El resto, descanso.']);
 const lab=k=>/^SC/.test(k)?'HIT/HIIT':SESS[k]?SESS[k].label:k;
 const nScSlots=slots.filter(s=>s.v==='sc').length,nScUsed=list.filter(k=>/^SC/.test(k)).length;
 const dropped=order.filter(k=>!UP.includes(k)&&!list.includes(k)&&k!=='PIERNA_B'&&!(/^SC/.test(k)&&nScUsed>=nScSlots)).map(lab);
 if(nUp===1)notes.push(['info','Solo cabe una sesión de tren superior: Torso completo en lugar de Push y Pull.']);
 if(list.length>3&&dropped.length)notes.push(['info','Caen esta semana: '+[...new Set(dropped)].join(', ')+'.']);
 if(list.includes('PIERNA_B'))notes.push(['info','Sin huecos SC: Pierna B en el gimnasio da el segundo estímulo de pierna.']);
 for(let i=0;i<7;i++){
  if(hasAny(i,['PIERNA','PIERNA_B'])&&H(i+1))notes.push(['warn',DAYN[i]+': Pierna queda la víspera de una carrera dura. No había hueco mejor; baja el volumen un 30 %.']);
  if(hasAny(i,['PIERNA','HIT_LEG'])&&cfOn(i+1))notes.push(['warn',DAYN[i]+': pierna la víspera del crossfit. En la clase, baja carga en los ejercicios de pierna.']);
  if(GYM(A[i])&&GYM(Pm[i]))notes.push(['warn',DAYN[i]+': dos sesiones de gimnasio el mismo día; no había otra opción con los huecos marcados.']);
 }
 // complementarias en días libres
 const compArr=Array(7).fill(null),hasFunc=[...A,...Pm].some(SCK);
 let z2Used=e,tempoUsed=pq>0;
 for(let i=0;i<7;i++){const d=days[i];if(d.off||d.work||compArr.filter(Boolean).length>=2)continue;
  for(const[sl,ot]of[['am','pm'],['pm','am']]){
   const ov=d[ot],mine=(sl==='am'?A:Pm)[i];
   const main=(ot==='am'?A:Pm)[i]||(ov==='hard'?'RUN_HARD':ov==='easy'?'RUN_EASY':null);
   if(locked(i,sl)||locked(i,ot)||mine||!(d[sl]==='gym'||d[sl]==='auto')||!main)continue;
   const nextHard=H(i+1)||cfOn(i+1),legMain=['PIERNA','PIERNA_B'].includes(main),legNext=hasAny(i+1,['PIERNA','PIERNA_B','HIT_LEG']);
   let k,w;
   if(main==='RUN_HARD'||main==='RUN_VAM'){k='MOBIL';w='Ese día ya hay carrera de calidad: movilidad y core para recuperar.'}
   else if(main==='RUN_EASY'||main==='RUN_Z2'){if(!hasFunc&&!nextHard){k='METCON';w='Ya hay carrera suave y esta semana no hay HIT: circuito suave para cubrirlo.'}else{k='MOBIL';w='Ya hay carrera suave ese día: completa con movilidad y core.'}}
   else if(legMain&&nextHard){k='MOBIL';w='La sesión principal es de pierna y mañana toca algo intenso: solo recuperación activa.'}
   else if(legMain||main==='CROSSFIT'){k='ENGINE';w=(main==='CROSSFIT'?'El crossfit ya carga el día':'La sesión principal es de pierna')+': aeróbico sin impacto para no sumar daño muscular.'}
   else if(nextHard){k='MOBIL';w='Mañana hay carrera dura o crossfit: llega fresco.'}
   else if(noRun&&!tempoUsed&&q<2&&Q<3&&!legNext&&!H(i-1)){k='RUN_TEMPO';tempoUsed=true;w='Semana sin carrera impuesta: un umbral controlado completa el trabajo para el 2 km.'}
   else if(z2Used<(noRun?2:1)&&!legNext){k='RUN_Z2';z2Used++;w='Volumen aeróbico en Z2 para la base del 2 km, sin fatiga.'}
   else if(!hasFunc){k='METCON';w='Sin HIT esta semana: circuito suave para no perder ese trabajo.'}
   else{k='ENGINE';w='La carrera de la semana ya está cubierta: aeróbico sin impacto para sumar motor sin cargar la pierna.'}
   compArr[i]={slot:sl,key:k,why:w};break;
  }}
 if(compArr.some(Boolean))notes.push(['info','Días dobles: el hueco sobrante lleva una complementaria ligera (máximo 2 por semana). Es opcional y no cuenta en el tope de 9.']);
 return{am:A,pm:Pm,comp:compArr,why,notes,hard:[0,1,2,3,4,5,6].map(H),lab:act?act.lab:{},locked:act?[0,1,2,3,4,5,6].flatMap(i=>['am','pm'].filter(sl=>locked(i,sl)).map(sl=>i+sl)):[]};
}

/* ---------- Progresión de fuerza (solo básicos registrados) ---------- */
const bwKg=()=>+S.config.bw||92;
const lastLog=id=>S.logs.find(l=>l.entries&&Array.isArray(l.entries[id])&&l.entries[id].length);
const markOf=id=>{const m=(S.config.marks||{})[id];if(!(m&&+m.kg>=0&&+m.reps>0))return null;const n=Math.max(1,+m.sets||1),rir=m.rir!=null&&m.rir!==''?+m.rir:(m.sets?1:0);
 return{date:m.date||'',sets:Array.from({length:n},()=>({kg:+m.kg,reps:+m.reps,rir})),mark:true,work:!!m.sets}};
function latestSource(id){const l=lastLog(id),m=markOf(id);if(l&&(!m||l.date>=m.date))return{date:l.date,sets:l.entries[id],mark:false};return m}
const lastVariant=g=>{let best=null,bd='';VARS[g].forEach(v=>{const s=latestSource(v);if(s&&s.date>=bd){best=v;bd=s.date}});return best};
const resolve=id=>VARS[id]?(S.var[id]||lastVariant(id)||VARS[id][0]):id;
function e1rm(id,sets){const add=id==='pullup'?bwKg():0;return Math.max(0,...sets.map(s=>{const kg=(+s.kg||0)+add,r=+s.reps||0,rir=s.rir===''||s.rir==null?1:+s.rir||0;return r>0&&r<=15?kg*(1+(r+rir)/30):0}))}
function suggest(id,lo,hi){
 const e=EX[id],inc=e.inc||(e.t==='func'?4:2.5),isMain=MAINS.includes(id);
 if(e.t==='bw')return{kg:null,tag:'',note:'Peso corporal'};
 const src=isMain?latestSource(id):(()=>{const l=lastLog(id);return l?{date:l.date,sets:l.entries[id],mark:false}:null})();
 if(!src)return{kg:null,tag:'',note:isMain?'Sin marca: añádela en Registro':'Primera vez: elige carga a RIR 2'};
 const sets=src.sets,add=id==='pullup'?bwKg():0;
 if(isMain&&(lo>=7||(src.mark&&!src.work))){const E=e1rm(id,sets);if(!E)return{kg:null,tag:'',note:''};const t=Math.round((lo+hi)/2);
  return{kg:Math.max(0,round(E/(1+(t+2)/30)-add,inc)),tag:'',note:(src.mark?'Desde tu marca':'Desde 1RM estimado')+': '+t+' reps a RIR 2'}}
 const kg=Math.max(...sets.map(s=>+s.kg||0));
 const allTop=sets.every(s=>+s.reps>=hi),anyLow=sets.some(s=>+s.reps<lo);
 const rir=sets.reduce((a,s)=>a+(s.rir===''||s.rir==null?1:+s.rir||0),0)/sets.length;
 if(e.t==='func')return(allTop&&rir>=3)?{kg:kg+inc,tag:'up',note:'KB +'+inc+' kg'}:{kg,tag:'',note:'Misma KB'};
 if(allTop&&rir>=1)return{kg:kg+inc,tag:'up',note:'+'+inc+' kg'};
 if(!anyLow&&rir>=3)return{kg:kg+inc,tag:'up',note:'+'+inc+' kg (te sobraban '+Math.round(rir)+' reps)'};
 if(anyLow&&(e.t==='main'||e.t==='fuerza')){const prev=S.logs.filter(x=>x.entries&&x.entries[id]&&x.entries[id].length)[1];
  if(prev&&prev.entries[id].some(s=>+s.reps<lo))return{kg:round(kg*0.95,inc),tag:'down',note:'−5 % (2 sesiones por debajo)'};return{kg,tag:'',note:'Repite carga'}}
 return{kg,tag:'',note:e.t==='hiper'?'Misma carga, +1 rep':'Misma carga, +1 rep'};
}
function multiplier(){
 if(S.deload)return{m:.6,why:'Semana de descarga: series ×0,6 (misma carga) y carreras recortadas.'};
 const ws=fmt(S.weekStart),prior=S.logs.filter(l=>l.date<ws);
 if(prior.length){const gap=(S.weekStart-parse(prior[0].date))/864e5;if(gap>=8)return{m:.8,why:'Vuelta tras '+Math.round(gap)+' días sin registro: series ×0,8 esta semana, sin compensar.'}}
 return{m:1,why:''};
}
const nsets=n=>Math.max(1,Math.round(n*multiplier().m));
const repTxt=(lo,hi,t)=>t?(lo===1&&hi===1?t:(lo===hi?lo:lo+'-'+hi)+' · '+t):(lo===hi?String(lo):lo+'-'+hi);

/* ---------- Persistencia ---------- */
let weekUnsub=null,saveChain=Promise.resolve(),saveT=null;
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2600)}
function saveWeek(){
 if(!S.db)return;clearTimeout(saveT);const id=wid();
 saveT=setTimeout(()=>{const days=S.days,plan=curPlan();
  saveChain=saveChain.then(()=>S.db.doc('weeks/'+id).set({days,deload:S.deload,plan:{am:plan.am,pm:plan.pm},updatedAt:new Date().toISOString()})).catch(e=>toast('No se pudo guardar la semana ('+(e&&e.code||'error')+')'))},500);
}
async function saveConfig(patch){S.config={...S.config,...patch};render();if(!S.db)return;try{await S.db.doc('config/main').set(S.config)}catch(e){toast('No se pudo guardar la configuración')}}
async function loadWeek(){
 if(weekUnsub){weekUnsub();weekUnsub=null}
 S.days=null;S.prevDays=null;S.deload=false;S.sel=null;S.review='';render();
 if(!S.db){S.days=baseDays();render();return}
 const id=wid(),prevId=isoWeek(addDays(S.weekStart,-7));
 S.db.doc('weeks/'+prevId).get().then(p=>{if(id!==wid())return;S.prevDays=p.exists?(p.data().days||[]).map(normDay):null;render()}).catch(()=>{});
 weekUnsub=S.db.doc('weeks/'+id).onSnapshot(async snap=>{
  if(id!==wid())return;
  if(snap.exists){const d=snap.data();const inc=(d.days||baseDays()).map(normDay);
   if(JSON.stringify(inc)!==JSON.stringify(S.days)||!!d.deload!==S.deload){S.days=inc;S.deload=!!d.deload;render()}}
  else if(!S.days){
   let prev=null;try{const p=await S.db.doc('weeks/'+prevId).get();if(p.exists)prev=p.data().days}catch(e){}
   if(id!==wid()||S.days)return;
   S.days=prev?prev.map(d=>({...normDay(d),off:false,desc:'',descPm:''})):baseDays();render();
  }
 },()=>toast('Sin conexión con los datos de la semana'));
}

/* ---------- Render ---------- */
const APP_VERSION='1.0.0';
const DAYF=['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
const IC={
 chev:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
 x:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg>',
 back:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>'};
const view=document.getElementById('view');
function render(){
 if(!S.ready)return;
 const ae=document.activeElement,fid=ae&&ae.id,ss=ae&&ae.selectionStart,se=ae&&ae.selectionEnd;
 const ws=S.weekStart,we=addDays(ws,6);
 document.getElementById('wlbl').textContent='Sem. '+wid().slice(6)+' · '+ws.getDate()+(ws.getMonth()!==we.getMonth()?' '+MON[ws.getMonth()]:'')+'–'+we.getDate()+' '+MON[we.getMonth()];
 document.getElementById('weeknav').hidden=S.tab==='progreso'||S.tab==='calendario';
 document.getElementById('ptitle').textContent={semana:'Semana',entrenar:'Entrenar',calendario:'Calendario',progreso:'Progreso'}[S.tab];
 document.querySelectorAll('.bnav button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===S.tab)));
 view.innerHTML=S.tab==='semana'?vWeek():S.tab==='entrenar'?vTrain():S.tab==='calendario'?vCal():vProgAll();
 renderSheet();
 if(fid){const el=document.getElementById(fid);if(el){el.focus({preventScroll:true});try{if(ss!=null)el.setSelectionRange(ss,se)}catch(e){}}}
}
function renderSheet(){
 const box=document.getElementById('sheet');
 if(!S.sheet){box.innerHTML='';document.body.classList.remove('locked');return}
 let c='';
 if(S.sheet.kind==='day')c=vDaySheet(S.sheet.i);
 else if(S.sheet.kind==='sess')c=S.sel?vDetail(curPlan()):'';
 else if(S.sheet.kind==='report')c=vReportSheet();
 else if(S.sheet.kind==='text')c=`<h2>${esc(S.sheet.title)}</h2><p class="meta">${esc(S.sheet.hint||'')}</p><textarea id="sheetText" rows="12" readonly>${esc(S.sheet.text)}</textarea><button class="primary big" data-act="copytext">Copiar</button>`;
 if(!c){S.sheet=null;box.innerHTML='';document.body.classList.remove('locked');return}
 const prev=box.querySelector('.sheet'),st=prev?prev.scrollTop:0;
 box.innerHTML=`<button class="sheet-bg" data-act="sheetclose" aria-label="Cerrar"></button><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div><button class="sheet-x" data-act="sheetclose" aria-label="Cerrar">${IC.x}</button>${c}</div>`;
 const nw=box.querySelector('.sheet');if(nw&&prev)nw.scrollTop=st;
 document.body.classList.add('locked');
}
function paceNote(){const P=paces(),c=runCfg();
 return 'Ritmos (2 km en '+mmss(c.T)+(c.test?', test del '+c.test.date:', estimado')+'): Z2 '+rng2(P.z2)+' · Umbral '+rng2(P.thr)+' · 2 km '+mmss(P.p)+' · Objetivo '+mmss(P.goal)+' /km. Semana '+blockWeek()+' de 12 del bloque.'}
function slotItems(d,plan,i){
 const out=[];if(d.off)return out;const ds=fmt(addDays(S.weekStart,i));
 for(const sl of['am','pm']){const k=plan[sl][i],c=plan.comp[i],v=d[sl],dsc=sl==='am'?d.desc:d.descPm,M=sl==='am'?'M':'T';
  if(k){const L=plan.lab[i+sl];out.push({M,label:L||SESS[k].label,cat:catOf(k),mk:L?'✓':doneMark(k,ds)})}
  else if(c&&c.slot===sl)out.push({M,label:'+ '+SESS[c.key].label,cat:'cmp',mk:doneMark(c.key,ds)});
  else if(RUN(v))out.push({M,label:dsc||optLabel(d,sl),cat:'imp',mk:''})}
 return out}
function vWeek(){
 if(!S.days)return '<p class="empty-state">Cargando la semana…</p>';
 const days=effDays(),plan=curPlan(),mul=multiplier(),today=fmt(new Date());
 const notes=[...plan.notes];
 {const act=buildAct(S.weekStart);if(act){const base=computePlan(days,prevPlan(),null),miss=[];
  for(let i=0;i<7;i++)if(act.lockDay[i])['am','pm'].forEach(sl=>{const k=base[sl][i];if(k&&k!=='CROSSFIT'&&!act.locked.includes(i+sl))miss.push(SESS[k].label+' ('+DAYN[i]+')')});
  if(miss.length)notes.unshift(['warn','Sin registrar: '+miss.join(', ')+'. Se dan por no hechas y se recolocan. Toca el día para indicar lo que hiciste.'])}}
 if(mul.why)notes.unshift(['info',mul.why]);
 const nx=weekSessions().find(x=>x.date>=today&&!x.done);
 let hero='';
 if(nx){const ss=SESS[nx.key],d=parse(nx.date),bl=ss.blocks?ss.blocks():null;
  const sub=bl?(bl[1]||bl[0]||''):(ss.ex||[]).slice(0,2).map(e=>EX[resolve(e[0])].n).join(' · ');
  hero=`<button class="hero" data-act="train" data-k="${nx.key}" data-d="${nx.date}" data-s="${nx.slot}"><span class="eyebrow">Próxima sesión · ${DAYN[(d.getDay()+6)%7].toLowerCase()} ${d.getDate()} · ${nx.slot==='am'?'mañana':'tarde'}</span><span class="htitle">${esc(ss.label)}</span><span class="hsub">${esc(sub)}</span><span class="hgo">Entrenar ${IC.chev}</span></button>`}
 const lk=plan.locked||[];
 const rows=days.map((d,i)=>{const date=addDays(S.weekStart,i),its=slotItems(d,plan,i),raw=normDay(S.days[i]),ds=fmt(date);
  const empty=d.off?(inAbs(ds)&&!raw.off?'Ausencia':'No disponible'):its.length?'':(lk.includes(i+'am')&&lk.includes(i+'pm')?'Sin registro':'Descanso');
  return `<button class="drow${d.off?' off':''}${ds===today?' today':''}" data-act="dayopen" data-i="${i}" aria-label="${DAYF[i]} ${date.getDate()}"><span class="dl"><b>${DAYN[i]}</b><span>${date.getDate()}</span></span><span class="di">${empty?`<span class="muted">${empty}</span>`:its.map(x=>`<span class="it ${x.cat}"><i></i><em>${x.M}</em><span>${esc(x.label)}${x.mk?' '+x.mk:''}</span></span>`).join('')}</span>${IC.chev}</button>`}).join('');
 const abs=S.config.absences||[],shown=notes.slice(0,2),rest=notes.slice(2);
 const nh=n=>`<div class="note ${n[0]==='info'?'info':''}">${esc(n[1])}</div>`;
 return `<div class="stack">
 ${hero}
 <div class="notes">${shown.map(nh).join('')}${rest.length?`<details><summary class="meta">Ver ${rest.length} aviso(s) más</summary><div class="notes" style="margin-top:6px">${rest.map(nh).join('')}</div></details>`:''}</div>
 <div class="drows">${rows}</div>
 <div class="legend"><span><i style="background:var(--c-gym)"></i>Gimnasio</span><span><i style="background:var(--c-sc)"></i>HIT / HIIT</span><span><i style="background:var(--c-run)"></i>Carrera</span><span><i style="background:var(--c-cf)"></i>Crossfit</span></div>
 <div class="note info">${esc(paceNote())}</div>
 <div class="toolbar"><label class="check"><input type="checkbox" id="deload" data-act="deload"${S.deload?' checked':''}> Semana de descarga</label><button data-act="copyprev">Copiar semana anterior</button><button data-act="copysum">Resumen para Claude</button></div>
 <details class="panel"${abs.length?' open':''}><summary>Ausencias (maniobras, comisiones…)</summary>
  <div class="absrow"><div class="field"><label for="absF">Desde</label><input type="date" id="absF"></div><div class="field"><label for="absT">Hasta</label><input type="date" id="absT"></div><div class="field"><label for="absN">Motivo</label><input id="absN" placeholder="Maniobras"></div><button data-act="addabs">Añadir</button></div>
  ${abs.length?`<div class="hist">${abs.map((a,k)=>`<div class="hr"><span><span class="num">${esc(a.from)} → ${esc(a.to)}</span> · ${esc(a.note||'')}</span><button class="ghost" data-act="delabs" data-k="${k}">Quitar</button></div>`).join('')}</div>`:'<p class="meta">Los días dentro de una ausencia se marcan como no disponibles y el plan se reorganiza solo.</p>'}
 </details></div>`;
}
function vDaySheet(i){
 const days=effDays(),plan=curPlan(),d=days[i],raw=normDay(S.days[i]),date=addDays(S.weekStart,i),lk=plan.locked||[];
 const lockedDay=lk.includes(i+'am')&&lk.includes(i+'pm'),type=raw.off?'off':raw.work?'work':'free';
 const seg=[['work','Trabajo'],['free','Libre'],['off','No disponible']].map(([v,l])=>`<button data-act="settype" data-i="${i}" data-v="${v}" aria-pressed="${type===v}">${l}</button>`).join('');
 const opts=sl=>optsFor(d,sl).map(([v,l])=>`<button class="opt" data-act="setopt" data-i="${i}" data-s="${sl}" data-v="${v}" aria-pressed="${d[sl]===v}">${esc(l)}</button>`).join('');
 const descIn=sl=>RUN(d[sl])?`<input id="desc${sl}-${i}" data-act="desc" data-s="${sl}" data-i="${i}" placeholder="${d.work?'Qué te ponen':'Qué vas a hacer'}" value="${esc(sl==='am'?d.desc:d.descPm)}">`:'';
 const its=[];for(const sl of['am','pm']){const k=plan[sl][i]||(plan.comp[i]&&plan.comp[i].slot===sl?plan.comp[i].key:null);if(k)its.push({sl,k,label:plan.lab[i+sl]||SESS[k].label,cmp:!plan[sl][i]})}
 return `<h2>${DAYF[i]} ${date.getDate()} ${MON[date.getMonth()]}</h2>
 ${lockedDay?`<div class="note info">Día pasado: muestra lo registrado. Si hiciste otra cosa o no lo registraste, indícalo aquí.</div><button class="primary big" data-act="pastlog" data-i="${i}">Registrar lo que hice</button>`:''}
 <div class="seg" role="group" aria-label="Tipo de día">${seg}</div>
 ${d.off?'':`<div class="lbl">Mañana</div><div class="opts">${opts('am')}</div>${descIn('am')}<div class="lbl">Tarde</div><div class="opts">${opts('pm')}</div>${descIn('pm')}`}
 <div class="lbl">Plan del día</div>
 ${its.length?its.map(x=>`<button class="sessbtn ${catOf(x.k)}" data-act="sel" data-i="${i}" data-s="${x.sl}"><i></i><span><em>${x.sl==='am'?'Mañana':'Tarde'}${x.cmp?' · complementaria':''}</em>${esc(x.label)}</span>${IC.chev}</button>`).join(''):'<p class="meta">Sin sesiones propias este día.</p>'}`;
}
function vDetail(plan){
 const{i,s}=S.sel,c=plan.comp[i]&&plan.comp[i].slot===s?plan.comp[i]:null,key=(s==='am'?plan.am[i]:plan.pm[i])||(c&&c.key);
 if(!key){S.sel=null;return ''}
 const ss=SESS[key],date=addDays(S.weekStart,i),lk=plan.locked||[],why=lk.includes(i+s)?(plan.lab[i+s]?'Registrado: '+plan.lab[i+s]:'Día pasado sin registro.'):c?c.why:plan.why[i+s];
 const blocks=ss.blocks?ss.blocks():null,ex=ss.ex||[];
 const rows=ex.map(([id0,n,lo,hi,t])=>{const id=resolve(id0),sg=suggest(id,lo,hi),e=EX[id];
  return `<tr><td>${esc(e.n)}</td><td class="num">${nsets(n)} × ${esc(repTxt(lo,hi,t))}</td><td class="num">${sg.kg!=null?sg.kg+' kg':'—'}</td></tr>`}).join('');
 const canTrain=key!=='CROSSFIT'&&!SESS[key].act&&key!=='CUSTOM'&&!lk.includes(i+s),dm=doneMark(key,fmt(date));
 return `${S.sheet&&S.sheet.from!=null?`<button class="ghost backbtn" data-act="dayopen" data-i="${S.sheet.from}">${IC.back} ${DAYF[S.sheet.from]}</button>`:''}
 <h2>${esc((c?'Complementaria · ':'')+ss.label)}</h2><div class="meta">${DAYN[i]} ${date.getDate()} ${MON[date.getMonth()]} · ${s==='am'?'mañana':'tarde'} · ${esc(ss.focus)}</div>
 ${why?`<div class="note info">${esc(why)}</div>`:''}
 ${blocks&&blocks.length?`<ol class="blocks">${blocks.map(b=>`<li>${esc(b)}</li>`).join('')}</ol>`:''}
 ${rows?`<div class="tablewrap"><table><thead><tr><th>Ejercicio</th><th>Series × reps</th><th>Carga</th></tr></thead><tbody>${rows}</tbody></table></div>`:''}
 ${key==='CROSSFIT'?'<p class="meta">Sin plantilla: el contenido lo marca la clase.</p>':''}
 ${canTrain?`<button class="primary big" data-act="train" data-k="${key}" data-d="${fmt(date)}" data-s="${s}">${dm?'Hecha '+dm+' · abrir':'Entrenar esta sesión'}</button>`:''}`;
}
/* ---------- Entrenar ---------- */
const REST={main:180,fuerza:180,hiper:120,func:75,bw:60};
const restTxt=r=>r<60?r+'″':(r%60?Math.floor(r/60)+'′'+(r%60)+'″':r/60+'′');
const hms=x=>{x=Math.max(0,x|0);return pad(Math.floor(x/3600))+':'+pad(Math.floor(x/60)%60)+':'+pad(x%60)};
const doneMark=(k,ds)=>S.logs.some(l=>l.kind==='session'&&l.session===k&&l.date===ds&&!l.replaces)?'✓':S.logs.some(l=>l.replaces&&l.replaces.key===k&&l.replaces.date===ds)?'↺':'';
const isDone=(k,ds)=>!!doneMark(k,ds);
const GTYPES=['Gimnasio (fuerza)','HIT','HIIT','Carrera suave','Carrera dura / series','Crossfit','Marcha / maniobras','Deporte','Otro'];
function saveDraft(){try{localStorage.setItem('ifm-train',JSON.stringify(S.train))}catch(e){}}
function loadDraft(){try{const v=JSON.parse(localStorage.getItem('ifm-train')||'null');if(v&&v.key&&SESS[v.key])S.train=v}catch(e){}}
function weekSessions(){const days=effDays(),plan=curPlan(),out=[];
 days.forEach((d,i)=>{if(d.off)return;['am','pm'].forEach(sl=>{const k=plan[sl][i]||(plan.comp[i]&&plan.comp[i].slot===sl?plan.comp[i].key:null);
  if(!k||k==='CROSSFIT'||SESS[k].act||k==='CUSTOM')return;const dt=addDays(S.weekStart,i),ds=fmt(dt);
  out.push({key:k,date:ds,slot:sl,label:DAYN[i]+' '+dt.getDate()+' '+(sl==='am'?'M':'T')+' · '+SESS[k].label,done:isDone(k,ds),mk:doneMark(k,ds)})})});
 return out}
function startTrain(key,date,slot,replaces){S.train={key,date,slot,start:null,sets:{},swap:{},custom:[],restEnd:0,replaces:replaces||null};S.trArm=null;S.other=null;saveDraft()}
function trainRows(tr){tr.swap=tr.swap||{};const list=tr.key==='CUSTOM'?(tr.custom||[]):(SESS[tr.key].ex||[]);
 return list.map(([id0,n,lo,hi,txt],x)=>{
 const base=VARS[id0]?resolve(id0):id0,pref=(S.config.altPref||{})[base];
 const id=tr.swap[x]||(pref&&EX[pref]?pref:base),sg=suggest(id,lo,hi),k=tr.key==='CUSTOM'?n:nsets(n);
 if(!tr.sets[x]||tr.sets[x].id!==id)tr.sets[x]={id,rows:Array.from({length:k},()=>({kg:sg.kg!=null?String(sg.kg):'',reps:'',rir:'',done:false}))};
 return{x,id0,base,id,n:tr.sets[x].rows.length,lo,hi,txt,sg,e:EX[id]}})}
function vOther(tr){const o=S.other,refK=(o.replaces||tr.replaces||tr).key,orig=SESS[refK].label;
 const when=`<div class="absrow"><div class="field"><label for="othD">Fecha</label><input type="date" id="othD" value="${esc(o.date||tr.date)}"></div><div class="field"><label for="othS">Momento</label><select id="othS"><option value="am"${(o.slot||tr.slot)==='am'?' selected':''}>Mañana</option><option value="pm"${(o.slot||tr.slot)==='pm'?' selected':''}>Tarde</option></select></div></div>`;
 const tpls=Object.entries(SESS).filter(([k,v])=>(v.ex&&v.ex.length)&&!v.cmp&&k!=='CUSTOM').map(([k,v])=>`<option value="${k}">${esc(v.label)}</option>`).join('');
 return `<div class="panel"><div class="ph"><h3>${o.replaces?(()=>{const d=parse(o.replaces.date);return DAYN[(d.getDay()+6)%7]+' '+d.getDate()+' · estaba previsto '+esc(orig)})():'¿Qué has hecho en lugar de '+esc(orig)+'?'}</h3><button class="ghost" data-act="otherclose">Cerrar</button></div>
  ${o.replaces?`<div class="trfoot"><button class="primary" data-act="othsamequick"${S.db?'':' disabled'}>Hice lo previsto (${esc(orig)})</button><button data-act="othsame">Lo previsto, con series y pesos</button><button data-act="othnone">No entrené</button></div><p class="meta">O registra lo que hiciste en su lugar:</p>`:''}
  <div class="trchips"><button class="trchip${o.mode==='detalle'?' on':''}" data-act="othermode" data-m="detalle">Con series y cargas</button><button class="trchip${o.mode==='general'?' on':''}" data-act="othermode" data-m="general">Resumen general</button></div>
  ${when}
  ${o.mode==='detalle'?`<div class="absrow"><div class="field"><label for="othTpl">Sesión</label><select id="othTpl">${tpls}<option value="CUSTOM">Ejercicios sueltos (elijo yo)</option></select></div><button class="primary" data-act="othquick"${S.db?'':' disabled'}>Guardar sin series</button><button data-act="othload">Registrar series y pesos</button></div>
   <p class="meta">Basta con indicar la sesión: el resto de la semana se recoloca igual. Si además registras series y pesos, se abre como una sesión normal y cada ejercicio alimenta su progresión. Si es el mismo día y momento que la sesión planificada, esta queda como sustituida (↺). También sirve para registrar una sesión de un día pasado.</p>`
  :`<div class="absrow"><div class="field"><label for="ogT">Tipo</label><select id="ogT">${GTYPES.map(g=>`<option>${g}</option>`).join('')}</select></div>
   <div class="field"><label for="ogD">Duración (min)</label><input id="ogD" inputmode="numeric" placeholder="60"></div>
   <div class="field"><label for="ogR">RPE (1-10)</label><input id="ogR" inputmode="numeric" placeholder="7"></div></div>
   <div class="toolbar"><span class="meta">Grupos trabajados:</span><label class="check"><input type="checkbox" id="ogP"> Pierna</label><label class="check"><input type="checkbox" id="ogE"> Empuje</label><label class="check"><input type="checkbox" id="ogTr"> Tracción</label></div>
   <div class="field"><label for="ogN">Notas</label><input id="ogN" placeholder="Ej.: marcha de 15 km con 20 kg"></div>
   <button class="primary" data-act="ogsave"${S.db?'':' disabled'}>Guardar</button>`}
 </div>`}
function vTrain(){
 const list=weekSessions();
 if(!S.train){const today=fmt(new Date());const c=list.find(x=>x.date>=today&&!x.done)||list.find(x=>!x.done)||list[0];const keep=S.other;if(c)startTrain(c.key,c.date,c.slot);S.other=keep}
 const tr=S.train;
 const chips=list.length?`<div class="trchips" role="group" aria-label="Sesiones de la semana">${list.map(x=>{const ref=tr&&(tr.replaces||tr),on=ref&&x.key===ref.key&&x.date===ref.date&&x.slot===ref.slot,arm=S.trArm===x.key+x.date+x.slot;
  return `<button class="trchip${on?' on':''}" data-act="trpick" data-k="${x.key}" data-d="${x.date}" data-s="${x.slot}" aria-pressed="${!!on}">${arm?'Toca otra vez: se pierde lo marcado':esc(x.label)+(x.mk?' '+x.mk:'')}</button>`}).join('')}</div>`:'';
 if(!tr)return chips+'<p class="empty-state">Esta semana no hay sesiones propias planificadas. Marca tus huecos en la pestaña Semana.</p>';
 const ss=SESS[tr.key],rows=trainRows(tr),blocks=ss.blocks?ss.blocks():null,dt=parse(tr.date);
 const done=rows.reduce((a,r)=>a+tr.sets[r.x].rows.filter(z=>z.done).length,0),tot=rows.reduce((a,r)=>a+r.n,0);
 const left=Math.ceil(((tr.restEnd||0)-Date.now())/1000);
 const exHtml=rows.map(r=>{const st=tr.sets[r.x],nd=st.rows.filter(z=>z.done).length,rest=REST[r.e.t]||90;
  const opts=[r.base,...(ALT[r.base]||[])];if(!opts.includes(r.id))opts.push(r.id);
  const vsel=opts.length>1?`<select id="trv-${r.x}" data-act="trswap" data-x="${r.x}" data-b="${r.base}" style="width:auto;max-width:100%" aria-label="Cambiar ejercicio">${opts.map(v=>`<option value="${v}"${v===r.id?' selected':''}>${v===r.base?'':'↔ '}${esc(EX[v].n)}</option>`).join('')}</select>`:'';
  const tgt=repTxt(r.lo,r.hi,r.txt);
  return `<div class="trex${nd===r.n?' full':''}"><div class="eh"><b>${esc(r.e.n)}</b><span class="meta num">${nd}/${r.n}</span></div>${vsel?`<div>${vsel}</div>`:''}
   <div class="meta">${r.n} × ${esc(tgt)} · descanso ${restTxt(rest)}${r.e.unit?' · '+esc(r.e.unit):''}${r.sg.note?` · <span class="tag ${r.sg.tag}">${esc(r.sg.note)}</span>`:''}</div>
   <div class="trgrid"><span class="h">#</span><span class="h">Kg</span><span class="h">Reps</span><span class="h">RIR</span><span></span>
   ${st.rows.map((z,j)=>`<span class="n">${j+1}</span>
    <input id="trk-${r.x}-${j}" data-act="trin" data-x="${r.x}" data-j="${j}" data-f="kg" inputmode="decimal" value="${esc(z.kg)}" placeholder="${r.e.t==='bw'?'pc':'kg'}" aria-label="Kg serie ${j+1}" class="${z.done?'done':''}">
    <input id="trr-${r.x}-${j}" data-act="trin" data-x="${r.x}" data-j="${j}" data-f="reps" inputmode="numeric" value="${esc(z.reps)}" placeholder="${esc(r.lo===r.hi?String(r.lo):r.lo+'-'+r.hi)}" aria-label="Repeticiones serie ${j+1}">
    <input id="tri-${r.x}-${j}" data-act="trin" data-x="${r.x}" data-j="${j}" data-f="rir" inputmode="numeric" value="${esc(z.rir)}" placeholder="RIR" aria-label="RIR serie ${j+1}">
    <button class="ok" data-act="trset" data-x="${r.x}" data-j="${j}" data-lo="${r.lo}" data-rest="${rest}" aria-pressed="${z.done}" aria-label="${z.done?'Desmarcar':'Marcar'} serie ${j+1}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg></button>`).join('')}
   </div></div>`}).join('');
 const already=isDone(tr.key,tr.date);
 return `<div style="display:flex;flex-direction:column;gap:12px">
 ${chips}
 ${S.other?vOther(tr):`<div class="toolbar"><button data-act="otheropen">He hecho otra cosa</button>${tr.replaces?`<span class="meta">Registrando en lugar de ${esc(SESS[tr.replaces.key].label)} ↺</span>`:''}</div>`}
 <div class="trhead"><div><div class="meta">${DAYN[(dt.getDay()+6)%7]} ${dt.getDate()} ${MON[dt.getMonth()]} · ${tr.slot==='am'?'mañana':'tarde'}${already?' · ya registrada ✓':''}</div><h2 style="font-size:1.8rem">${esc(ss.label)}</h2><div class="meta">${esc(ss.focus)}</div></div>
  <div style="text-align:right"><div class="trclock" id="trElapsed">${tr.start?hms((Date.now()-tr.start)/1000):'00:00:00'}</div>${tr.start?'':'<button class="primary" data-act="trstart" style="margin-top:6px">Empezar</button>'}</div></div>
 ${tot?`<div style="display:flex;flex-direction:column;gap:4px"><div class="trbar"><i style="width:${Math.round(done/tot*100)}%"></i></div><span class="meta">${done} de ${tot} series</span></div>`:''}
 <div class="trrest" id="trRestBox"${left>0?'':' hidden'}><span>Descanso</span><b id="trRest">${mmss(Math.max(0,left))}</b><button data-act="tradd">+15″</button><button data-act="trskip">Saltar</button></div>
 ${blocks&&blocks.length?`<div class="panel"><ol class="blocks">${blocks.map(b=>`<li>${esc(b)}</li>`).join('')}</ol></div>`:''}
 ${exHtml}
 ${tr.key==='CUSTOM'?`<div class="absrow"><div class="field"><label for="cuEx">Añadir ejercicio</label><select id="cuEx">${Object.entries(EX).sort((a,b)=>a[1].n.localeCompare(b[1].n)).map(([k,v])=>`<option value="${k}">${esc(v.n)}</option>`).join('')}</select></div><div class="field"><label for="cuN">Series</label><input id="cuN" inputmode="numeric" value="3"></div><button data-act="cuadd">Añadir</button></div>`:''}
 <div class="trfoot"><button class="ghost" data-act="trreset">Reiniciar</button><button class="primary" data-act="trfinish"${S.db?'':' disabled'}>Terminar y guardar</button></div>
 <p class="meta">Las cargas salen de tus marcas y de tus sesiones anteriores. Lo que guardes aquí (peso, repeticiones y RIR de cada serie) ajusta la carga de la próxima vez: sube si completas el rango con margen y baja si fallas dos sesiones seguidas.</p>
 </div>`;
}
setInterval(()=>{if(S.tab!=='entrenar'||!S.train)return;const now=Date.now(),tr=S.train;
 const el=document.getElementById('trElapsed');if(el&&tr.start)el.textContent=hms((now-tr.start)/1000);
 const rb=document.getElementById('trRestBox');if(!rb)return;const left=Math.ceil(((tr.restEnd||0)-now)/1000);
 if(left>0){rb.hidden=false;document.getElementById('trRest').textContent=mmss(left)}
 else if(!rb.hidden){rb.hidden=true;tr.restEnd=0;saveDraft();try{navigator.vibrate&&navigator.vibrate([250,120,250])}catch(e){}}},1000);

/* ---------- Calendario y gráfica ---------- */
const CATS=[['gym','Gimnasio'],['cf','Crossfit'],['sc','HIT / HIIT'],['run','Carrera']];
const catOf=k=>k==='CROSSFIT'?'cf':SCK(k)?'sc':ISRUN(k)||k==='ACT_HARD'||k==='ACT_EASY'?'run':'gym';
function weekPlan(ws){
 const id=isoWeek(ws),raw=(id===wid()&&S.days)?S.days:S.weeksMap[id];if(!raw)return null;
 const pws=addDays(ws,-7),praw=S.weeksMap[isoWeek(pws)];
 let prev=null;if(praw){const pp=computePlan(effDaysFor(praw,pws),null,buildAct(pws));prev={am:pp.am,pm:pp.pm,hard:pp.hard}}
 const days=effDaysFor(raw,ws);return{days,plan:computePlan(days,prev,buildAct(ws))};
}
function dayItems(d,plan,i){
 const out=[];if(d.off)return out;
 for(const sl of['am','pm']){const k=plan[sl][i],v=d[sl],c=plan.comp[i];
  if(k)out.push({cat:catOf(k),label:plan.lab&&plan.lab[i+sl]||SESS[k].label,sl});
  else if(c&&c.slot===sl)out.push({cat:ISRUN(c.key)?'run':'gym',label:'+ '+SESS[c.key].label,sl,cmp:1});
  else if(v==='easy'||v==='hard')out.push({cat:'run',label:(v==='hard'?'Carrera dura':'Carrera suave')+(d.work?'':' (mía)'),sl,imp:d.work});
  else if(v==='other')out.push({cat:'run',label:d.desc||'Impuesta',sl,imp:1,other:1});}
 return out;
}
function weekStats(wp){
 const st={gym:0,cf:0,sc:0,run:0,Pierna:0,Empuje:0,Tracción:0,int:0};if(!wp)return null;
 wp.days.forEach((d,i)=>{dayItems(d,wp.plan,i).forEach(it=>{if(!it.cmp&&!it.other)st[it.cat]++});
  const ks=[wp.plan.am[i],wp.plan.pm[i]];for(const[n,list]of Object.entries(CAT))if(ks.some(k=>list.includes(k)))st[n]++;
  if(wp.plan.hard[i])st.int++;if(ks.includes('CROSSFIT'))st.int++;ks.forEach(k=>{if(k==='HIIT_VO2'||k==='HIIT_SHORT'||k==='RUN_TEMPO')st.int++})});
 return st;
}
function vCal(){
 const m=S.calMonth,first=monday(m),last=new Date(m.getFullYear(),m.getMonth()+1,0),end=addDays(monday(last),6),today=fmt(new Date());
 const weeks=[];for(let w=new Date(first);w<=end;w=addDays(w,7))weeks.push({ws:new Date(w),wp:weekPlan(w)});
 let cells=['L','M','X','J','V','S','D'].map(x=>`<div class="dow">${x}</div>`).join('');
 weeks.forEach(({ws,wp})=>{for(let i=0;i<7;i++){const dt=addDays(ws,i),ds=fmt(dt),d=wp&&wp.days[i];
  const items=wp?dayItems(d,wp.plan,i):[];
  const cls=['cell',dt.getMonth()!==m.getMonth()?'out':'',ds===today?'today':'',d&&d.off?'off':''].join(' ');
  const lbl=DAYN[i]+' '+dt.getDate()+': '+(items.length?items.map(x=>x.label).join(', '):d&&d.off?'no disponible':wp?'descanso':'sin planificar');
  cells+=`<button class="${cls}" data-act="goweek" data-d="${ds}" aria-label="${esc(lbl)}" title="${esc(lbl)}"><span class="dnum">${dt.getDate()}</span>${items.map(x=>`<span class="ci ${x.imp?'imp':''} ${x.cmp?'cmp':''}" style="--c:var(--c-${x.cat})"><i></i><span>${esc(x.label)}</span></span>`).join('')}</button>`}});
 const stats=weeks.map(w=>({ws:w.ws,st:weekStats(w.wp)}));
 // gráfica de barras apiladas: sesiones por semana y tipo
 const W=Math.round(Math.min(1060,Math.max(300,(window.innerWidth||800)-(window.innerWidth<700?70:110)))),H=230,ml=30,mr=10,mt=24,mb=34,cw=(W-ml-mr)/stats.length,bw=Math.min(56,cw*0.56);
 const tots=stats.map(x=>x.st?CATS.reduce((a,[c])=>a+x.st[c],0):0),ymax=Math.max(8,Math.ceil(Math.max(...tots)/2)*2);
 const y=v=>mt+(H-mt-mb)*(1-v/ymax);
 let g='';for(let v=0;v<=ymax;v+=2)g+=`<line class="grid" x1="${ml}" x2="${W-mr}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${ml-6}" y="${y(v)+4}" text-anchor="end">${v}</text>`;
 stats.forEach((x,k)=>{const cx=ml+cw*k+cw/2,x0=cx-bw/2;
  g+=`<text class="ax" x="${cx}" y="${H-mb+16}" text-anchor="middle">S${isoWeek(x.ws).slice(6)}</text><text class="ax" x="${cx}" y="${H-mb+29}" text-anchor="middle">${x.ws.getDate()} ${MON[x.ws.getMonth()]}</text>`;
  if(!x.st){g+=`<text class="ax" x="${cx}" y="${y(0)-6}" text-anchor="middle">—</text>`;return}
  let acc=0;const segs=CATS.filter(([c])=>x.st[c]>0);
  segs.forEach(([c],si)=>{const v=x.st[c],y1=y(acc+v),y0=y(acc),h=Math.max(1,y0-y1-(si<segs.length-1?2:0)),top=si===segs.length-1;
   const yy=y1+(si<segs.length-1?2:0)-(si<segs.length-1?2:0);
   g+=top?`<path d="M${x0},${y0} V${y1+4} Q${x0},${y1} ${x0+4},${y1} H${x0+bw-4} Q${x0+bw},${y1} ${x0+bw},${y1+4} V${y0} Z" fill="var(--c-${c})"/>`
    :`<rect x="${x0}" y="${y1+2}" width="${bw}" height="${Math.max(1,y0-y1-2)}" fill="var(--c-${c})"/>`;acc+=v});
  g+=`<text class="tot" x="${cx}" y="${y(acc)-6}" text-anchor="middle">${acc}</text>`;
  g+=`<rect class="hit" x="${ml+cw*k}" y="${mt}" width="${cw}" height="${H-mt-mb}" data-tip="${esc('Semana '+isoWeek(x.ws).slice(6)+' · '+CATS.map(([c,n])=>n+': '+x.st[c]).join(' · ')+' · Alta intensidad: '+x.st.int)}"/>`});
 const rows=stats.map(x=>`<tr><td class="num">S${isoWeek(x.ws).slice(6)} · ${x.ws.getDate()} ${MON[x.ws.getMonth()]}</td>${x.st?[...CATS.map(([c])=>x.st[c]),x.st.Pierna,x.st.Empuje,x.st.Tracción,x.st.int].map((v,j)=>`<td class="num"${j===7&&v>3?' style="color:var(--cia)"':''}>${v}</td>`).join(''):'<td colspan="8" class="meta">Sin planificar</td>'}</tr>`).join('');
 return `<div style="display:flex;flex-direction:column;gap:14px">
 <div class="calhead"><div style="display:flex;align-items:center;gap:6px"><button data-act="calprev" aria-label="Mes anterior">‹</button><span class="mlbl">${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][m.getMonth()]} ${m.getFullYear()}</span><button data-act="calnext" aria-label="Mes siguiente">›</button></div>
  <div class="lg">${CATS.map(([c,n])=>`<span><i style="--c:var(--c-${c})"></i>${n}</span>`).join('')}<span><i style="background:transparent;border:1.5px solid var(--muted)"></i>Complementaria</span><span style="font-style:italic">Cursiva: impuesta</span></div></div>
 <div class="calwrap"><div class="cal">${cells}</div></div>
 <p class="meta" style="margin:0">Toca un día para abrir su semana. Las semanas que aún no has planificado aparecen vacías: se rellenan al abrirlas en Semana.</p>
 <div class="panel"><div class="ph"><h3>Sesiones por semana</h3><span class="meta">Sin contar complementarias</span></div>
  <div class="lg">${CATS.map(([c,n])=>`<span><i style="--c:var(--c-${c})"></i>${n}</span>`).join('')}</div>
  <div class="chartbox" id="chartbox"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Sesiones por semana y tipo">${g}</svg><div class="tip" id="tip" hidden></div></div>
  <div class="tablewrap"><table><thead><tr><th>Semana</th>${CATS.map(([,n])=>`<th>${n}</th>`).join('')}<th>Pierna</th><th>Empuje</th><th>Tracción</th><th>Alta intens.</th></tr></thead><tbody>${rows}</tbody></table></div>
  <p class="meta">Pierna, Empuje y Tracción cuentan los días con sesión de fuerza de ese grupo. Alta intensidad suma carreras duras, series, umbral, crossfit y HIIT (tope recomendado: 3).</p>
 </div></div>`;
}
document.addEventListener('pointerover',e=>{const t=e.target.closest&&e.target.closest('.hit');const tip=document.getElementById('tip');if(!tip)return;
 if(!t){tip.hidden=true;return}const box=document.getElementById('chartbox').getBoundingClientRect(),r=t.getBoundingClientRect();
 tip.textContent=t.dataset.tip;tip.hidden=false;const tw=tip.offsetWidth;let left=r.left-box.left+r.width/2-tw/2;left=Math.max(0,Math.min(left,box.width-tw));tip.style.left=left+'px';tip.style.top='0px'});
const LIFTS=[{g:'bench',n:'Press banca'},{g:'pullup',n:'Dominada lastrada'},{g:'OHP',n:'Press de hombro'},{g:'LEG',n:'Pierna (hack o prensa)'}];
function vLog(){
 const marks=S.config.marks||{};
 const vsel=(L,id,pre)=>VARS[L.g]?`<select id="${pre}var-${L.g}" data-act="var" data-g="${L.g}" aria-label="Variante">${VARS[L.g].map(v=>`<option value="${v}"${v===id?' selected':''}>${esc(EX[v].n.replace(/ \(.*\)/,''))}</option>`).join('')}</select>`:'';
 const mk=LIFTS.map(L=>{const id=resolve(L.g),e=EX[id],m=marks[id]||{};
  const mo=markOf(id),E=mo?Math.round(e1rm(id,mo.sets)-(id==='pullup'?bwKg():0)):null;
  return `<div class="liftlog"><div class="eh"><b>${esc(L.n)}</b>${vsel(L,id,'m')}</div>
   <div class="setrow" style="grid-template-columns:repeat(4,minmax(0,1fr))"><input id="mk-st-${id}" inputmode="numeric" placeholder="series" value="${esc(m.sets??'')}" aria-label="Series ${esc(L.n)}"><input id="mk-rp-${id}" inputmode="numeric" placeholder="reps" value="${esc(m.reps??'')}" aria-label="Repeticiones ${esc(L.n)}"><input id="mk-kg-${id}" inputmode="decimal" placeholder="${e.unit?'kg':'kg'}" value="${esc(m.kg??'')}" aria-label="Peso ${esc(L.n)}"><input id="mk-ri-${id}" inputmode="numeric" placeholder="RIR" value="${esc(m.rir??'')}" aria-label="Repeticiones en reserva ${esc(L.n)}"></div>
   <span class="meta">${E!=null?'1RM est. '+E+' kg'+(m.maxReps?' · máx. '+esc(m.maxReps)+' reps con ese peso':'')+(m.date?' · '+esc(m.date):''):''}</span></div>`}).join('');
 const cards=LIFTS.map(L=>{const id=resolve(L.g),e=EX[id],sg=suggest(id,4,6),k=nsets(4);
  let rows='';for(let j=0;j<k;j++)rows+=`<div class="setrow"><span>${j+1}</span><input id="kg-${id}-${j}" inputmode="decimal" placeholder="kg" value="${sg.kg!=null?sg.kg:''}" aria-label="kg serie ${j+1}"><input id="rp-${id}-${j}" inputmode="numeric" placeholder="4-6 reps" aria-label="reps serie ${j+1}"><input id="rir-${id}-${j}" inputmode="numeric" placeholder="RIR" aria-label="RIR serie ${j+1}"></div>`;
  return `<div class="liftlog" data-ex="${id}" data-n="${k}"><div class="eh"><b>${esc(L.n)}</b>${vsel(L,id,'d')}<span class="meta">${e.unit?esc(e.unit)+' · ':''}${sg.note?`<span class="tag ${sg.tag}">${esc(sg.note)}</span>`:''}</span></div>${rows}</div>`}).join('');
 const recent=S.logs.slice(0,15);
 const desc=l=>{if(l.kind==='test2k')return '<b>Test 2 km</b> · <span class="num">'+mmss(l.time)+'</span>';
  const ids=Object.keys(l.entries||{}),n=ids.reduce((a,k)=>a+l.entries[k].length,0);
  const rep=l.replaces&&SESS[l.replaces.key]?' <span class="meta">(en lugar de '+esc(SESS[l.replaces.key].label)+')</span>':'';
  if(l.session==='GENERAL')return '<b>'+esc(l.gtype||'Actividad')+'</b>'+(l.durationMin?' · '+l.durationMin+'′':'')+(l.rpe?' · RPE '+esc(l.rpe):'')+(l.groups&&l.groups.length?' · '+esc(l.groups.join(', ')):'')+rep;
  return '<b>'+esc(l.session&&SESS[l.session]?SESS[l.session].label:'Sesión')+'</b> · '+(n?n+' series':'hecha')+(l.durationMin?' · '+l.durationMin+'′':'')+rep};
 return `<div style="display:flex;flex-direction:column;gap:12px">
 <p class="meta" style="margin:0">Tus <b>marcas</b> son el punto de partida: con ellas se calculan las cargas de cada sesión. Las sesiones se registran solas desde la pestaña <b>Entrenar</b>, y cada serie ajusta la carga de la siguiente. En los básicos cuenta siempre el dato más reciente, sea marca o sesión.</p>
 <div class="grid2">
 <div class="panel"><h3>Mis marcas actuales</h3>
  <p class="meta">Tus series de trabajo actuales: series × reps × kg y, si lo sabes, el RIR (repeticiones que te sobran). Ejemplo: 4 × 5 × 90. En la dominada, el peso es el lastre; en mancuernas, kg por mancuerna.</p>
  ${mk}
  <button class="primary" data-act="savemarks"${S.db?'':' disabled'}>Guardar marcas</button>
 </div>
 <div style="display:flex;flex-direction:column;gap:12px">
  <div class="panel"><h3>Test 2 km</h3>
   <div class="absrow"><div class="field"><label for="tDate">Fecha</label><input type="date" id="tDate" value="${S.logDate}"></div><div class="field"><label for="tTime">Tiempo (m:ss)</label><input id="tTime" inputmode="numeric" placeholder="7:52"></div><button class="primary" data-act="savetest"${S.db?'':' disabled'}>Guardar test</button></div>
   <p class="meta">El último test recalcula todos los ritmos de carrera. Mientras no haya test se usa tu estimado (Progreso).</p></div>
  <div class="panel"><h3>Historial</h3>
  ${recent.length?`<div class="hist">${recent.map(l=>`<div class="hr"><span><span class="num">${esc(l.date)}</span> · ${desc(l)}</span>
   <button class="${S.delArm===l.id?'danger':'ghost'}" data-act="dellog" data-id="${esc(l.id)}">${S.delArm===l.id?'Confirmar borrado':'Borrar'}</button></div>`).join('')}</div>`
   :'<p class="empty-state">Aún no hay sesiones ni tests registrados.</p>'}</div>
 </div></div></div>`;
}
function spark(vals,invert){if(vals.length<2)return '';const mn=Math.min(...vals),mx=Math.max(...vals),sp=(mx-mn)||1;
 const xy=vals.map((v,k)=>[4+k*(232/(vals.length-1)),invert?6+((v-mn)/sp)*44:50-((v-mn)/sp)*44]);
 return `<svg viewBox="0 0 240 56" preserveAspectRatio="none" aria-hidden="true"><path d="M${xy.map(p=>p.join(',')).join(' L')} L${xy[xy.length-1][0]},56 L4,56 Z" fill="currentColor" opacity=".12"/><polyline points="${xy.map(p=>p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="${xy[xy.length-1][0]}" cy="${xy[xy.length-1][1]}" r="3.5" fill="currentColor"/></svg>`}
function vProg(){
 const asc=[...S.logs].reverse(),c=runCfg(),P=paces(),cfg=S.config.run||{};
 const tests=asc.filter(l=>l.kind==='test2k'&&l.time);
 const gapPct=((c.T/c.G-1)*100).toFixed(1);
 const runCard=`<div class="lift runc"><span class="meta">2 km · actual / objetivo</span><span class="big">${mmss(c.T)} <span class="meta">→ ${mmss(c.G)}</span></span>
  <span class="tag">${c.T>c.G?'Faltan '+(c.T-c.G)+' s ('+gapPct+' % de velocidad)':'Objetivo alcanzado'}</span>${spark(tests.map(t=>t.time),true)}${tests.length<2?'<span class="meta">La curva aparece con 2 tests</span>':''}</div>`;
 const liftCards=LIFTS.map(L=>{const id=resolve(L.g),pts=[];
  const src=asc.filter(l=>(l.entries||{})[id]&&l.entries[id].length).map(l=>({date:l.date,sets:l.entries[id]}));const mm=markOf(id);if(mm)src.push(mm);src.sort((a,b)=>a.date<b.date?-1:1);
  src.forEach(x=>{const E=e1rm(id,x.sets)-(id==='pullup'?bwKg():0);if(E>0)pts.push(E)});
  const last=pts.length?pts[pts.length-1]:null,d=pts.length>1?last-pts[0]:0;
  return `<div class="lift"><span class="meta">${esc(EX[id].n.replace(/ \(.*\)/,''))} · 1RM est.${id==='pullup'?' (lastre)':''}</span><span class="big">${last!=null?Math.round(last)+' kg':'—'}</span>
   ${pts.length>1?`<span class="tag ${d>0?'up':d<0?'down':''}">${d>=0?'+':''}${Math.round(d)} kg en ${pts.length} sesiones</span>`:'<span class="meta">'+(last!=null?'La curva aparece con 2 datos':'Añade tu marca en Registro')+'</span>'}${spark(pts)}</div>`}).join('');
 return `<div style="display:flex;flex-direction:column;gap:16px">
 <div class="lifts">${runCard}${liftCards}</div>
 <div class="panel"><div class="ph"><h3>Carrera y datos base</h3><span class="meta">Semana ${blockWeek()} de 12 del bloque</span></div>
  <div class="absrow">
   <div class="field"><label for="cfgT">2 km estimado (m:ss)</label><input id="cfgT" value="${esc(cfg.t2k||'8:00')}"></div>
   <div class="field"><label for="cfgG">Objetivo 2 km</label><input id="cfgG" value="${esc(cfg.goal||'7:30')}"></div>
   <div class="field"><label for="cfgS">Inicio del bloque</label><input type="date" id="cfgS" value="${esc(c.start)}"></div>
   <div class="field"><label for="cfgBw">Peso corporal (kg)</label><input id="cfgBw" inputmode="decimal" value="${esc(S.config.bw||92)}"></div>
   <button class="primary" data-act="savecfg"${S.db?'':' disabled'}>Guardar</button></div>
  <p class="meta">El estimado solo se usa hasta que registres un test. El peso corporal sirve para estimar el 1RM de la dominada lastrada.</p>
  <div class="tablewrap"><table><thead><tr><th>Zona</th><th>Ritmo /km</th><th>Uso</th></tr></thead><tbody>
   <tr><td>Z2</td><td class="num">${rng2(P.z2)}</td><td>Carrera suave, calentamientos</td></tr>
   <tr><td>Umbral</td><td class="num">${rng2(P.thr)}</td><td>Carrera umbral (RPE 7)</td></tr>
   <tr><td>2 km actual</td><td class="num">${mmss(P.p)}</td><td>Series de 500-1000 m</td></tr>
   <tr><td>Objetivo</td><td class="num">${mmss(P.goal)}</td><td>Series de 400 m</td></tr></tbody></table></div>
 </div>
 <p class="meta">1RM estimado con la fórmula de Epley sobre la mejor serie de cada sesión (reps + RIR). Es una estimación, no un test.</p></div>`;
}

/* ---------- Resumen, reportes y datos ---------- */
function vProgAll(){return `<div class="stack">${vProg()}${vLog()}${vReports()}${vSettings()}</div>`}
function summaryText(){
 const days=effDays(),plan=curPlan();
 const sl=(d,i,k)=>{const own=plan[k][i]||(plan.comp[i]&&plan.comp[i].slot===k?'+'+plan.comp[i].key:null);
  if(own)return own[0]==='+'?'complementaria: '+SESS[own.slice(1)].label:(plan.lab[i+k]||SESS[own].label);const dsc=k==='am'?d.desc:d.descPm;return optLabel(d,k)+(dsc?' ('+dsc+')':'')};
 const week=days.map((d,i)=>`${DAYN[i]} [${d.off?'NO DISPONIBLE':d.work?'trabajo':'libre'}]: mañana=${d.off?'-':sl(d,i,'am')}; tarde=${d.off?'-':sl(d,i,'pm')}`).join('\n');
 const logs=S.logs.slice(0,10).map(l=>l.kind==='test2k'?l.date+' Test 2 km '+mmss(l.time):l.date+' '+(l.session==='GENERAL'?(l.gtype||'Actividad'):(SESS[l.session]||{label:l.session||'Sesión'}).label)+': '+Object.entries(l.entries||{}).map(([id,st])=>(EX[id]||{n:id}).n+' '+st.map(s=>(s.kg||0)+'×'+s.reps+(s.rir!==''&&s.rir!=null?'@'+s.rir:'')).join(',')).join('; ')).join('\n')||'(sin registros)';
 return `PDT 360 · Physical Duty Training 360 (v${APP_VERSION}) · semana ${wid()}
Objetivo: 2 km lo más rápido posible manteniendo fuerza. Zona lumbar delicada: sin bisagra de cadera.
${paceNote()}
${S.deload?'Semana de DESCARGA.\n':''}Semana y plan:
${week}
Avisos del plan:
${plan.notes.map(n=>'- '+n[1]).join('\n')}
Últimos registros (kg×reps@RIR):
${logs}

Pregunta: ¿cambiarías algo del reparto, de las cargas o de los ritmos? Responde en viñetas cortas.`;
}
function vReports(){
 const rs=S.reports||[],pend=rs.filter(r=>r.status!=='resuelto');
 return `<div class="panel"><div class="ph"><h3>Fallos y sugerencias</h3><span class="meta">${pend.length} pendiente(s)</span></div>
 <div class="toolbar"><button class="primary" data-act="repnew">Nuevo reporte</button><button data-act="repcopy"${pend.length?'':' disabled'}>Copiar pendientes para Claude</button></div>
 ${rs.length?`<div class="hist">${rs.slice(0,40).map(r=>`<div class="hr"><span><span class="tag ${r.status==='resuelto'?'up':''}">${r.status==='resuelto'?'Resuelto':(r.type==='mejora'?'Mejora':'Fallo')}</span> <span class="num">${esc((r.createdAt||'').slice(0,10))}</span> · ${esc(r.text)}</span><span class="toolbar"><button class="ghost" data-act="repstatus" data-id="${esc(r.id)}">${r.status==='resuelto'?'Reabrir':'Marcar resuelto'}</button><button class="${S.delArm==='r'+r.id?'danger':'ghost'}" data-act="repdel" data-id="${esc(r.id)}">${S.delArm==='r'+r.id?'Confirmar':'Borrar'}</button></span></div>`).join('')}</div>`
 :'<p class="meta">Cuando algo falle o se te ocurra una mejora, pulsa ⚑ arriba a la derecha en cualquier pantalla. Se guarda con la pantalla, la semana y el plan para poder reproducirlo.</p>'}</div>`;
}
function vReportSheet(){
 const sh=S.sheet;
 return `<h2>Reportar</h2><p class="meta">Se guarda con el contexto: pantalla “${esc(sh.tab)}”, semana ${wid().slice(6)} y plan actual.</p>
 <div class="seg" role="group" aria-label="Tipo"><button data-act="reptype" data-v="fallo" aria-pressed="${sh.type!=='mejora'}">Fallo</button><button data-act="reptype" data-v="mejora" aria-pressed="${sh.type==='mejora'}">Mejora</button></div>
 <textarea id="repText" rows="6" placeholder="${sh.type==='mejora'?'Qué te gustaría que hiciera la app…':'Qué ha pasado y qué esperabas…'}">${esc(sh.draft||'')}</textarea>
 <button class="primary big" data-act="repsave">Guardar</button>`;
}
function vSettings(){
 const light=document.documentElement.dataset.theme==='light';
 return `<div class="panel"><h3>Ajustes y datos</h3>
 <div class="toolbar"><button data-act="theme">Tema: ${light?'claro':'oscuro'}</button><button data-act="export">Exportar mis datos</button><label class="btnlike" for="importFile">Importar datos</label><input type="file" id="importFile" accept="application/json,.json" data-act="import" hidden><button class="ghost" data-act="logout">Cerrar sesión</button></div>
 <p class="meta">Exporta una copia de vez en cuando. Importar añade o sustituye semanas, registros y configuración con los del archivo.</p>
 <p class="meta">PDT 360 · Physical Duty Training 360 · versión ${APP_VERSION}${S.email?' · '+esc(S.email):''}</p></div>`;
}
function showText(title,hint,text){S.sheet={kind:'text',title,hint,text};render();try{navigator.clipboard.writeText(text).then(()=>toast('Copiado al portapapeles'),()=>{})}catch(e){}}
async function exportData(){
 try{const w=await S.db.collection('weeks').get(),weeks={};w.docs.forEach(d=>weeks[d.id]=d.data());
  const data={app:'pdt360',version:APP_VERSION,exportedAt:new Date().toISOString(),weeks,logs:S.logs,config:S.config,reports:S.reports};
  const blob=new Blob([JSON.stringify(data,null,1)],{type:'application/json'}),a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download='pdt360-copia-'+fmt(new Date())+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000);toast('Copia descargada')}
 catch(e){toast('No se pudo exportar')}
}
async function importData(file){
 try{const data=JSON.parse(await file.text());if(!data||typeof data.weeks!=='object')throw new Error('formato');
  const fs=S.fs,b='users/'+S.uid+'/';let batch=fs.batch(),n=0;const flush=async()=>{if(n){await batch.commit();batch=fs.batch();n=0}};
  const put=async(path,v)=>{batch.set(fs.doc(b+path),v);if(++n>=400)await flush()};
  for(const[id,v]of Object.entries(data.weeks))await put('weeks/'+id,v);
  for(const l of data.logs||[]){const{id,...r}=l;await put('logs/'+(id||fs.collection('x').doc().id),r)}
  if(data.config)await put('config/main',data.config);
  for(const r of data.reports||[]){const{id,...x}=r;if(id)await put('reports/'+id,x)}
  await flush();toast('Datos importados');loadWeek()}
 catch(e){toast('El archivo no es una copia válida')}
}
/* ---------- Eventos ---------- */
function setDay(i,patch){S.days=S.days.map((d,k)=>k===i?{...normDay(d),...patch}:normDay(d));saveWeek()}
document.addEventListener('change',e=>{
 const t=e.target,a=t.dataset.act,i=+t.dataset.i;
 if(a==='import'&&t.files&&t.files[0]){importData(t.files[0]);t.value='';return}
 if(a==='slot'){const d=coerce({...normDay(S.days[i]),[t.dataset.s]:t.value}),ot=t.dataset.s==='am'?'pm':'am';
  if(!d.work&&['gym','cf','easy','hard'].includes(t.value)&&d[ot]==='none')d[ot]='auto';setDay(i,d);render()}
 else if(a==='dtype'){const d=normDay(S.days[i]);if(t.value==='off')d.off=true;else{d.off=false;const w=t.value==='work';if(w!==d.work){d.work=w;d.am='none';d.pm=w?'gym':'none'}}setDay(i,coerce(d));render()}
 else if(a==='deload'){S.deload=t.checked;saveWeek();render()}
 else if(a==='logdate'){S.logDate=t.value}
 else if(a==='var'){S.var[t.dataset.g]=t.value;render()}
 else if(a==='trswap'){const x=+t.dataset.x,b0=t.dataset.b;S.train.swap[x]=t.value;saveDraft();const ap={...(S.config.altPref||{})};if(t.value===b0)delete ap[b0];else ap[b0]=t.value;saveConfig({altPref:ap})}
});
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.act==='trin'&&S.train){const r=S.train.sets[+t.dataset.x].rows[+t.dataset.j];r[t.dataset.f]=t.value;saveDraft();return}
 if(t.dataset.act==='desc'){const i=+t.dataset.i;S.days[i]={...normDay(S.days[i]),[t.dataset.s==='am'?'desc':'descPm']:t.value};saveWeek()}});
document.addEventListener('click',async e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tab){S.tab=b.dataset.tab;S.sheet=null;render();window.scrollTo({top:0});return}
 const a=b.dataset.act,val=id=>document.getElementById(id).value.trim();
 if(a==='trpick'){const k=b.dataset.k,d=b.dataset.d,sl=b.dataset.s,id=k+d+sl,tr=S.train;
  const ref=tr&&(tr.replaces||tr);if(ref&&ref.key===k&&ref.date===d&&ref.slot===sl)return;
  const dirty=tr&&Object.values(tr.sets).some(x=>x.rows.some(z=>z.done));
  if(dirty&&S.trArm!==id){S.trArm=id;render();return}
  startTrain(k,d,sl);render()}
 else if(a==='train'){startTrain(b.dataset.k,b.dataset.d,b.dataset.s);S.tab='entrenar';S.sheet=null;S.sel=null;render();window.scrollTo({top:0})}
 else if(a==='trstart'){S.train.start=Date.now();saveDraft();render()}
 else if(a==='trset'){const r=S.train.sets[+b.dataset.x].rows[+b.dataset.j];r.done=!r.done;
  if(r.done){if(!r.reps)r.reps=b.dataset.lo;if(!S.train.start)S.train.start=Date.now();S.train.restEnd=Date.now()+(+b.dataset.rest)*1000}
  saveDraft();render()}
 else if(a==='tradd'){S.train.restEnd=Math.max(S.train.restEnd||0,Date.now())+15000;saveDraft();const t=document.getElementById('trRest');if(t)t.textContent=mmss(Math.ceil((S.train.restEnd-Date.now())/1000))}
 else if(a==='trskip'){S.train.restEnd=0;saveDraft();document.getElementById('trRestBox').hidden=true}
 else if(a==='pastlog'){const i=+b.dataset.i,ds=fmt(addDays(S.weekStart,i)),base=computePlan(effDays(),prevPlan(),null);
  const sl=base.am[i]&&base.am[i]!=='CROSSFIT'?'am':'pm',k=base[sl][i]&&base[sl][i]!=='CROSSFIT'?base[sl][i]:null;
  S.tab='entrenar';S.sheet=null;S.other={mode:'detalle',date:ds,slot:sl,replaces:k?{key:k,date:ds,slot:sl}:null};render();window.scrollTo({top:0})}
 else if(a==='otheropen'){S.other={mode:'detalle'};render()}
 else if(a==='otherclose'){S.other=null;render()}
 else if(a==='othermode'){S.other={...S.other,mode:b.dataset.m,date:val('othD'),slot:val('othS')};render()}
 else if(a==='othquick'){const tr=S.train,k=val('othTpl'),d=val('othD')||tr.date,sl=val('othS')||tr.slot,ref=(S.other&&S.other.replaces)||tr.replaces||{key:tr.key,date:tr.date,slot:tr.slot};
  try{await S.db.collection('logs').add({kind:'session',session:k,slot:sl,date:d,week:isoWeek(parse(d)),entries:{},nosets:true,replaces:(d===ref.date&&sl===ref.slot&&k!==ref.key)?ref:null,createdAt:new Date().toISOString()});
   toast(SESS[k].label+' anotada · semana recolocada');S.other=null;render()}catch(err){toast('No se pudo guardar')}}
 else if(a==='othsamequick'){const r=S.other.replaces;
  try{await S.db.collection('logs').add({kind:'session',session:r.key,slot:r.slot,date:r.date,week:isoWeek(parse(r.date)),entries:{},nosets:true,replaces:null,createdAt:new Date().toISOString()});
   toast(SESS[r.key].label+' marcada como hecha');S.other=null;render()}catch(err){toast('No se pudo guardar')}}
 else if(a==='othsame'){const r=S.other.replaces;startTrain(r.key,r.date,r.slot,null);render()}
 else if(a==='othnone'){S.other=null;toast('Anotado: el plan la da por no hecha y la recoloca');render()}
 else if(a==='othload'){const tr=S.train,k=val('othTpl'),d=val('othD')||tr.date,sl=val('othS')||tr.slot,ref=(S.other&&S.other.replaces)||tr.replaces||{key:tr.key,date:tr.date,slot:tr.slot};startTrain(k,d,sl,(d===ref.date&&sl===ref.slot&&k!==ref.key)?ref:null);render()}
 else if(a==='cuadd'){const id=val('cuEx'),n=Math.min(10,Math.max(1,parseInt(val('cuN'))||3)),e=EX[id];S.train.custom.push([id,n,e.t==='main'||e.t==='fuerza'?4:8,e.t==='main'||e.t==='fuerza'?6:12]);saveDraft();render()}
 else if(a==='ogsave'){const tr=S.train,d=parseInt(val('ogD'))||null,rpe=val('ogR');const groups=[['ogP','Pierna'],['ogE','Empuje'],['ogTr','Tracción']].filter(([id])=>document.getElementById(id).checked).map(x=>x[1]);
  const od=val('othD')||tr.date,os=val('othS')||tr.slot,ref=(S.other&&S.other.replaces)||tr.replaces||{key:tr.key,date:tr.date,slot:tr.slot};
  try{await S.db.collection('logs').add({kind:'session',session:'GENERAL',gtype:val('ogT'),durationMin:d,rpe,groups,notes:val('ogN'),date:od,slot:os,week:isoWeek(parse(od)),replaces:(od===ref.date&&os===ref.slot)?ref:null,createdAt:new Date().toISOString()});
   toast('Actividad guardada');S.other=null;S.train=null;try{localStorage.removeItem('ifm-train')}catch(e){}render()}catch(err){toast('No se pudo guardar')}}
 else if(a==='trreset'){const tr=S.train;startTrain(tr.key,tr.date,tr.slot,tr.replaces);render()}
 else if(a==='trfinish'){const tr=S.train,entries={};let n=0;
  Object.values(tr.sets).forEach(x=>{const rows=x.rows.filter(z=>z.done).map(z=>({kg:parseFloat(String(z.kg).replace(',','.'))||0,reps:parseInt(z.reps)||0,rir:z.rir}));if(rows.length){entries[x.id]=(entries[x.id]||[]).concat(rows);n+=rows.length}});
  const hasEx=(SESS[tr.key].ex||[]).length>0||tr.key==='CUSTOM';
  if(hasEx&&!n){toast('Marca al menos una serie hecha');return}
  b.disabled=true;
  try{await S.db.collection('logs').add({kind:'session',session:tr.key,slot:tr.slot,replaces:tr.replaces||null,date:tr.date,week:isoWeek(parse(tr.date)),entries,durationMin:tr.start?Math.round((Date.now()-tr.start)/60000):null,createdAt:new Date().toISOString()});
   toast(hasEx?'Sesión guardada · '+n+' series':'Sesión marcada como hecha');S.train=null;try{localStorage.removeItem('ifm-train')}catch(e){}render()}
  catch(err){b.disabled=false;toast(err&&err.code==='quota_exceeded'?'Almacenamiento lleno: borra registros antiguos':'No se pudo guardar la sesión')}}
 else if(a==='calprev'||a==='calnext'){S.calMonth=new Date(S.calMonth.getFullYear(),S.calMonth.getMonth()+(a==='calnext'?1:-1),1);render()}
 else if(a==='goweek'){const d=parse(b.dataset.d);S.weekStart=monday(d);S.tab='semana';loadWeek();window.scrollTo({top:0})}
 else if(a==='sel'){S.sel={i:+b.dataset.i,s:b.dataset.s};S.sheet={kind:'sess',from:S.sheet&&S.sheet.kind==='day'?S.sheet.i:null};render()}
 else if(a==='dayopen'){S.sheet={kind:'day',i:+b.dataset.i};render()}
 else if(a==='sheetclose'){S.sheet=null;S.sel=null;render()}
 else if(a==='setopt'){const i=+b.dataset.i,sl=b.dataset.s,v=b.dataset.v,d=coerce({...normDay(S.days[i]),[sl]:v}),ot=sl==='am'?'pm':'am';
  if(!d.work&&['gym','cf','easy','hard'].includes(v)&&d[ot]==='none')d[ot]='auto';setDay(i,d);render()}
 else if(a==='settype'){const i=+b.dataset.i,v=b.dataset.v,d=normDay(S.days[i]);if(v==='off')d.off=true;else{d.off=false;const w=v==='work';if(w!==d.work){d.work=w;d.am='none';d.pm=w?'gym':'none'}}setDay(i,coerce(d));render()}
 else if(a==='copysum')showText('Resumen para Claude','Pega este texto en un chat del proyecto para pedir una segunda opinión.',summaryText())
 else if(a==='copytext'){const ta=document.getElementById('sheetText');try{await navigator.clipboard.writeText(ta.value);toast('Copiado')}catch(err){ta.removeAttribute('readonly');ta.select();toast('Selecciona y copia el texto')}}
 else if(a==='repnew'){S.sheet={kind:'report',tab:S.tab,type:'fallo',draft:''};render()}
 else if(a==='reptype'){S.sheet.draft=document.getElementById('repText').value;S.sheet.type=b.dataset.v;render()}
 else if(a==='repsave'){const text=document.getElementById('repText').value.trim();if(!text){toast('Escribe qué ha pasado');return}
  const plan=curPlan();b.disabled=true;
  try{await S.db.collection('reports').add({type:S.sheet.type||'fallo',text,tab:S.sheet.tab,week:wid(),days:S.days||null,plan:{am:plan.am,pm:plan.pm},notes:plan.notes.map(n=>n[1]),train:S.train?{key:S.train.key,date:S.train.date,slot:S.train.slot}:null,status:'pendiente',version:APP_VERSION,createdAt:new Date().toISOString()});
   S.sheet=null;toast('Reporte guardado');render()}catch(err){b.disabled=false;toast('No se pudo guardar el reporte')}}
 else if(a==='repcopy'){const pend=(S.reports||[]).filter(r=>r.status!=='resuelto');
  const txt='Reportes pendientes · PDT 360 v'+APP_VERSION+'\n\n'+pend.map((r,k)=>`#${k+1} [${r.type||'fallo'}] ${(r.createdAt||'').slice(0,16).replace('T',' ')} · pantalla ${r.tab} · semana ${r.week} · app v${r.version}
${r.text}
Contexto: ${JSON.stringify({days:r.days,plan:r.plan,train:r.train,notes:r.notes})}`).join('\n\n');
  showText('Reportes para Claude','Pega este texto en un chat del proyecto. Incluye el contexto de cada reporte.',txt)}
 else if(a==='repstatus'){const r=(S.reports||[]).find(x=>x.id===b.dataset.id);if(r)try{await S.db.doc('reports/'+r.id).update({status:r.status==='resuelto'?'pendiente':'resuelto'})}catch(err){toast('No se pudo actualizar')}}
 else if(a==='repdel'){const id=b.dataset.id;if(S.delArm!=='r'+id){S.delArm='r'+id;render();return}S.delArm=null;try{await S.db.doc('reports/'+id).delete()}catch(err){toast('No se pudo borrar')}}
 else if(a==='theme'){const t=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=t;try{localStorage.setItem('ifm-theme',t)}catch(err){}document.querySelector('meta[name=theme-color]').content=t==='light'?'#eceee7':'#141913';render()}
 else if(a==='export')exportData()
 else if(a==='logout'){try{localStorage.removeItem('ifm-train')}catch(err){}firebase.auth().signOut()}
 else if(a==='tolog'){S.logDate=b.dataset.d;S.tab='progreso';render();window.scrollTo({top:0})}
 else if(a==='copyprev'){
  if(!S.db){toast('Sin datos guardados');return}
  try{const p=await S.db.doc('weeks/'+isoWeek(addDays(S.weekStart,-7))).get();
   if(!p.exists){toast('La semana anterior está vacía');return}
   S.days=p.data().days.map(d=>({...normDay(d),off:false,desc:'',descPm:''}));saveWeek();render();toast('Estructura copiada')}catch(err){toast('No se pudo leer la semana anterior')}}
 else if(a==='review')review();
 else if(a==='closereview'){S.review='';render()}
 else if(a==='addabs'){const f=val('absF'),t=val('absT'),n=val('absN');
  if(!f||!t||t<f){toast('Indica un rango de fechas válido');return}
  await saveConfig({absences:[...(S.config.absences||[]),{from:f,to:t,note:n}].sort((x,y)=>x.from<y.from?-1:1)});toast('Ausencia añadida')}
 else if(a==='delabs'){const k=+b.dataset.k;await saveConfig({absences:(S.config.absences||[]).filter((_,j)=>j!==k)})}
 else if(a==='savecfg'){const t=val('cfgT'),g=val('cfgG'),st=val('cfgS'),bw=parseFloat(val('cfgBw').replace(',','.'));
  if(!tsec(t)||!tsec(g)){toast('Escribe los tiempos como m:ss, por ejemplo 8:00');return}
  await saveConfig({run:{t2k:t,goal:g,blockStart:st||runCfg().start},bw:bw>30?bw:92});toast('Guardado')}
 else if(a==='savelog'){
  const entries={};let n=0;
  document.querySelectorAll('.liftlog').forEach(el=>{const id=el.dataset.ex,k=+el.dataset.n,arr=[];
   for(let j=0;j<k;j++){const r=document.getElementById(`rp-${id}-${j}`).value.trim();if(!r)continue;
    arr.push({kg:parseFloat(document.getElementById(`kg-${id}-${j}`).value.replace(',','.'))||0,reps:parseInt(r)||0,rir:document.getElementById(`rir-${id}-${j}`).value.trim()})}
   if(arr.length){entries[id]=arr;n+=arr.length}});
  if(!n){toast('Rellena las repeticiones de al menos una serie');return}
  const date=val('logDate')||fmt(new Date());b.disabled=true;
  try{await S.db.collection('logs').add({kind:'strength',date,week:isoWeek(parse(date)),entries,createdAt:new Date().toISOString()});toast('Guardado · '+n+' series');render()}
  catch(err){b.disabled=false;toast(err&&err.code==='quota_exceeded'?'Almacenamiento lleno: borra registros antiguos':'No se pudo guardar')}}
 else if(a==='savemarks'){const marks={...(S.config.marks||{})},today=fmt(new Date());let n=0,bad=false;
  LIFTS.forEach(L=>{const id=resolve(L.g),kg=document.getElementById('mk-kg-'+id).value.trim().replace(',','.'),rp=document.getElementById('mk-rp-'+id).value.trim();
   if(!kg&&!rp){return}
   const k=parseFloat(kg),r=parseInt(rp),st=parseInt(document.getElementById('mk-st-'+id).value)||'',ri=document.getElementById('mk-ri-'+id).value.trim();if(!(k>=0)||!(r>=1&&r<=20)){bad=true;return}
   const old=marks[id]||{};if(+old.kg!==k||+old.reps!==r||String(old.sets??'')!==String(st)||String(old.rir??'')!==ri){marks[id]={...old,kg:k,reps:r,sets:st,rir:ri,date:today};n++}});
  if(bad){toast('Revisa los datos: peso en kg y entre 1 y 15 repeticiones');return}
  await saveConfig({marks});toast(n?'Marcas guardadas: cargas recalculadas':'Sin cambios')}
 else if(a==='savetest'){const t=tsec(val('tTime')),date=val('tDate')||fmt(new Date());
  if(!t||t<300||t>900){toast('Escribe el tiempo como m:ss, por ejemplo 7:52');return}
  try{await S.db.collection('logs').add({kind:'test2k',date,week:isoWeek(parse(date)),time:t,createdAt:new Date().toISOString()});toast('Test guardado: ritmos recalculados')}catch(err){toast('No se pudo guardar el test')}}
 else if(a==='dellog'){const id=b.dataset.id;
  if(S.delArm!==id){S.delArm=id;render();return}
  S.delArm=null;try{await S.db.doc('logs/'+id).delete();toast('Registro borrado')}catch(err){toast('No se pudo borrar')}}
});
document.getElementById('prevW').onclick=()=>{S.weekStart=addDays(S.weekStart,-7);loadWeek()};
document.getElementById('nextW').onclick=()=>{S.weekStart=addDays(S.weekStart,7);loadWeek()};
document.getElementById('todayW').onclick=()=>{S.weekStart=monday(new Date());loadWeek()};

/* ---------- Arranque ---------- */
try{document.documentElement.dataset.theme=localStorage.getItem('ifm-theme')||'dark'}catch(e){document.documentElement.dataset.theme='dark'}
document.querySelector('meta[name=theme-color]').content=document.documentElement.dataset.theme==='light'?'#eceee7':'#141913';
loadDraft();
function showAuth(msg,fatal){
 S.ready=false;document.getElementById('app').hidden=true;document.querySelector('.bnav').hidden=true;
 const a=document.getElementById('auth');a.hidden=false;document.getElementById('authMsg').textContent=msg||'';document.getElementById('authForm').hidden=!!fatal;
}
function subscribe(){
 const db=S.db;
 db.collection('logs').orderBy('date','desc').limit(500).onSnapshot(s=>{S.logs=s.docs.map(d=>({id:d.id,...d.data()}));render()},()=>toast('Sin conexión con el registro'));
 db.collection('weeks').limit(400).onSnapshot(s=>{const m={};s.docs.forEach(d=>{const x=d.data();if(x.days)m[d.id]=x.days.map(normDay)});S.weeksMap=m;if(S.tab==='calendario')render()},()=>{});
 db.doc('config/main').onSnapshot(s=>{S.config=s.exists?{absences:[],...s.data()}:{absences:[]};render()},()=>{});
 db.collection('reports').orderBy('createdAt','desc').limit(100).onSnapshot(s=>{S.reports=s.docs.map(d=>({id:d.id,...d.data()}));if(S.tab==='progreso')render()},()=>{});
}
(function boot(){
 const cfg=window.FIREBASE_CONFIG;
 if(typeof firebase==='undefined'){showAuth('No se pudo cargar Firebase. Comprueba la conexión y vuelve a abrir la app.',true);return}
 if(!cfg||!cfg.apiKey||/PEGA/.test(cfg.apiKey)){showAuth('Falta la configuración de Firebase: rellena firebase-config.js siguiendo el README.',true);return}
 firebase.initializeApp(cfg);
 const fs=firebase.firestore();
 try{fs.settings({ignoreUndefinedProperties:true,merge:true})}catch(e){}
 fs.enablePersistence({synchronizeTabs:true}).catch(()=>{});
 S.fs=fs;
 firebase.auth().onAuthStateChanged(u=>{
  if(!u){showAuth('');return}
  S.uid=u.uid;S.email=u.email||'';
  S.db={doc:p=>fs.doc('users/'+u.uid+'/'+p),collection:p=>fs.collection('users/'+u.uid+'/'+p)};S.dbState='ok';
  document.getElementById('auth').hidden=true;document.getElementById('app').hidden=false;document.querySelector('.bnav').hidden=false;
  S.ready=true;subscribe();loadWeek();render();
 });
})();
const AUTH_ERR={'auth/invalid-email':'Correo no válido.','auth/weak-password':'La contraseña debe tener al menos 6 caracteres.','auth/email-already-in-use':'Ese correo ya tiene cuenta: pulsa Entrar.','auth/invalid-credential':'Correo o contraseña incorrectos.','auth/wrong-password':'Correo o contraseña incorrectos.','auth/user-not-found':'No hay cuenta con ese correo: pulsa Crear cuenta.','auth/network-request-failed':'Sin conexión. Inténtalo de nuevo.','auth/too-many-requests':'Demasiados intentos. Espera unos minutos.','auth/operation-not-allowed':'Activa “Correo/contraseña” en Firebase → Authentication (ver README).'};
document.getElementById('authForm').addEventListener('submit',async e=>{
 e.preventDefault();const em=document.getElementById('authEmail').value.trim(),pw=document.getElementById('authPass').value,mode=e.submitter&&e.submitter.value,msg=document.getElementById('authMsg');
 msg.textContent='Un momento…';
 try{if(mode==='new')await firebase.auth().createUserWithEmailAndPassword(em,pw);else await firebase.auth().signInWithEmailAndPassword(em,pw);msg.textContent=''}
 catch(err){msg.textContent=AUTH_ERR[err.code]||('Error: '+(err.code||err.message))}
});
document.getElementById('authReset').addEventListener('click',async()=>{
 const em=document.getElementById('authEmail').value.trim(),msg=document.getElementById('authMsg');
 if(!em){msg.textContent='Escribe tu correo y vuelve a pulsar.';return}
 try{await firebase.auth().sendPasswordResetEmail(em);msg.textContent='Te he enviado un correo para cambiar la contraseña.'}catch(err){msg.textContent=AUTH_ERR[err.code]||'No se pudo enviar el correo.'}
});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
