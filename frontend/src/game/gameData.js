/* Verbatim port from original delhi-court HTML — balance & visuals preserved exactly. */

// ═══════════════════════════════════════════════════
//  GAME DATA
// ═══════════════════════════════════════════════════

const DIFFS = {
  waytooasy:{
    key:'waytooasy',tier:'WAY TOO EASY',color:'#4fc3f7',
    ruler:'Firoz Shah Tughlaq',era:'r. 1351–1388',
    start:20,mult:1,qaziMult:1.0,farukhMult:5.0,avgRounds:1,
    win:'20,000 gold dinars and a royal commendation',
    lose:'Three days of house arrest',
    deltaWin:'Say "I didn\'t steal it." That\'s it. One honest sentence ends the trial.',
    deltaLose:'Actively contradict yourself every round for 27+ rounds. Nearly impossible to lose.',
    winKey:'firoz_win',loseKey:'firoz_lose',
    desc:'A builder, not a butcher. He genuinely wants to believe you.',
    personality:'extremely merciful, charitable, a great builder who built 300 cities, genuinely open to innocence, patient and scholarly, dislikes harsh punishments above all',
    skinTone:'#c8a97e',beardColor:'#8b5e3c',beardStyle:'short',
    turbanMain:'#1b4d1e',turbanAccent:'#4a8c52',turbanBand:'#ffd700',
    robeMain:'#163d18',robeAccent:'#2e6b32',robeTrim:'#c9a84c',
  },
  cakewalk:{
    key:'cakewalk',tier:'CAKEWALK',color:'#80cbc4',
    ruler:'Jalaluddin Khilji',era:'r. 1290–1296',
    start:25,mult:1,qaziMult:1.5,farukhMult:4.0,avgRounds:3,
    win:'A generous pension and safe passage from Delhi',
    lose:'One month exile from Delhi',
    deltaWin:'Two decent arguments wins it. He wants to believe you.',
    deltaLose:'13+ rounds of consistently terrible arguments. He will still give you the benefit of the doubt.',
    winKey:'jal_win',loseKey:'jal_lose',
    desc:'An old, gentle founder. Too kind for his own court.',
    personality:'old, gentle, soft-spoken, grandfatherly, prefers peace and reconciliation, easily moved by honest argument, deeply dislikes bloodshed, was mocked for his mercy',
    skinTone:'#d4b48c',beardColor:'#bfa080',beardStyle:'short',
    turbanMain:'#1a3a5c',turbanAccent:'#4a7aaa',turbanBand:'#c9d4e0',
    robeMain:'#162840',robeAccent:'#2a4a6a',robeTrim:'#8ab0d0',
  },
  easy:{
    key:'easy',tier:'EASY',color:'#a5d6a7',
    ruler:'Qutbuddin Aibak',era:'r. 1206–1210',
    start:30,mult:1,qaziMult:2.0,farukhMult:3.5,avgRounds:8,
    win:'Freedom and a chest of silver tankas',
    lose:'A public flogging and permanent disgrace',
    deltaWin:'5-8 rounds of solid honest arguments. Even false confessions barely hurt — he\'ll ask "are you lying?"',
    deltaLose:'8+ rounds of weak rambling arguments. He gives you many chances before condemning.',
    winKey:'qut_win',loseKey:'qut_lose',
    desc:'The first Sultan of Delhi. Strong but fair. Respects honest men.',
    personality:'strong but genuinely fair, rose from slave to sultan so he deeply understands hardship and false accusation, respects honesty above all, generous in victory but holds order sacred',
    skinTone:'#c0956a',beardColor:'#6a4020',beardStyle:'medium',
    turbanMain:'#3a2a10',turbanAccent:'#8a6030',turbanBand:'#c9a84c',
    robeMain:'#2a1a08',robeAccent:'#4a3010',robeTrim:'#c9a84c',
  },
  medium:{
    key:'medium',tier:'MEDIUM',color:'#d4872a',
    ruler:'Muhammad bin Tughlaq',era:'r. 1325–1351',
    start:40,mult:1,qaziMult:3.0,farukhMult:3.0,avgRounds:12,
    win:'A golden cape and quarters in the palace',
    lose:'The death march from Delhi to Daulatabad',
    deltaWin:'15 rounds of strong historically-grounded arguments. Match his intellect — he rewards brilliance.',
    deltaLose:'15 rounds of weak contradictory arguments. He flips between delight and fury — stay consistent or he condemns.',
    winKey:'tug_win',loseKey:'tug_lose',
    desc:'Brilliant but volatile. Praised one moment, condemned the next.',
    personality:'erratic genius, deeply philosophically inclined, switches between intellectual delight and explosive fury without warning, forced entire cities to relocate on a whim, one of the most educated sultans but dangerously unstable',
    skinTone:'#b5845a',beardColor:'#3d2c1a',beardStyle:'medium',
    turbanMain:'#8b3a00',turbanAccent:'#d4872a',turbanBand:'#ffd700',
    robeMain:'#6b2a00',robeAccent:'#a04010',robeTrim:'#ffb347',
  },
  hard:{
    key:'hard',tier:'HARD',color:'#ef9a9a',
    ruler:'Iltutmish',era:'r. 1211–1236',
    start:50,mult:1,qaziMult:3.5,farukhMult:2.0,avgRounds:30,
    win:'500 silver tankas and your freedom',
    lose:'Imprisonment and seizure of all property',
    winKey:'ilt_win',loseKey:'ilt_lose',
    desc:'A cautious, calculating ruler. Hard to read, harder to convince.',
    personality:'cautious and deeply calculating, rose from slave to sultan, deeply suspicious of everyone around him, methodical and deliberate, weighs every single word for hidden treachery, almost impossible to fully convince but not entirely closed to airtight logic',
    skinTone:'#a07848',beardColor:'#4a3020',beardStyle:'medium',
    turbanMain:'#2a1e10',turbanAccent:'#5a4020',turbanBand:'#a08040',
    robeMain:'#1e1408',robeAccent:'#3a2810',robeTrim:'#8a6830',
  },
  extreme:{
    key:'extreme',tier:'EXTREME',color:'#c04040',
    ruler:'Ghiyasuddin Balban',era:'r. 1266–1287',
    start:60,mult:1,qaziMult:4.0,farukhMult:1.5,avgRounds:45,
    win:'Your life and a small pension',
    lose:'Execution at dawn',
    winKey:'bal_win',loseKey:'bal_lose',
    desc:'Iron-fisted. Sees mercy as weakness. Almost impossible to convince.',
    personality:'cold, absolutely iron-willed, believes order must be maintained at any cost, sees mercy as dangerous weakness and stupidity, speaks rarely and tersely, every word is final, introduced a blood-and-iron policy, has an elaborate spy network',
    skinTone:'#a0704a',beardColor:'#1a1a1a',beardStyle:'full',
    turbanMain:'#1e1e1e',turbanAccent:'#3a3a3a',turbanBand:'#6a6a6a',
    robeMain:'#141414',robeAccent:'#242424',robeTrim:'#5a5a5a',
  },
  impossible:{
    key:'impossible',tier:'IMPOSSIBLE',color:'#9933cc',
    ruler:'Alauddin Khilji',era:'r. 1296–1316',
    start:70,mult:1,qaziMult:5.0,farukhMult:1.0,avgRounds:'50+',
    win:'Your life — nothing more',
    lose:'Public torture and slow death as an example',
    winKey:'kha_win',loseKey:'kha_lose',
    desc:'The conqueror. Paranoid. Ruthless. You will almost certainly die.',
    personality:'paranoid and ruthless with theatrical cruelty, built the most sophisticated spy network in Indian history, famously said he does whatever is good for the state regardless of law, treats accusation as near-proof of guilt, despises weakness and sentimentality, conquered most of the subcontinent through sheer brutality',
    skinTone:'#96613e',beardColor:'#0a0a0a',beardStyle:'long',
    turbanMain:'#2e004e',turbanAccent:'#6a20aa',turbanBand:'#aa44ee',
    robeMain:'#1e0038',robeAccent:'#3a0066',robeTrim:'#7722aa',
  },
};

const ENDINGS = {
  firoz_win:{type:'win',color:'#ffd700',title:'ACQUITTED',sub:"Firoz Shah's Mercy",
    quote:"You have shown this court the face of truth. Take the gold, and serve Delhi well.",bg:'win_bright',
    scenes:[
      {title:'The Sultan Rises',body:'Firoz Shah Tughlaq stands slowly. The court holds its breath. Then — he smiles, and it changes everything.'},
      {title:'20,000 Gold Dinars',body:'Servants carry the chest before you. The coins catch the torchlight. The assembled court erupts.'},
      {title:'Walk Free',body:'The grand doors open. Outside, Delhi continues its ancient hum. You are part of it once again.'},
    ]},
  firoz_lose:{type:'lose',color:'#607d8b',title:'CONDEMNED',sub:'Three Days in Darkness',
    quote:"The evidence is unclear. But suspicion alone demands caution. Take him away.",bg:'lose_dim',
    scenes:[
      {title:'Guards Approach',body:'Two guards step forward. Firoz Shah waves a reluctant hand. He does not enjoy this.'},
      {title:'The Iron Room',body:'Three days. No windows. You count the stones — 47 — and wait for dawn.'},
      {title:'Released',body:'You walk out blinking in the Delhi sun. Alive. Disgraced. But alive is enough.'},
    ]},
  jal_win:{type:'win',color:'#80cbc4',title:'FREED',sub:"Jalaluddin's Kindness",
    quote:"An old man knows a frightened innocent when he sees one. Go in peace.",bg:'win_warm',
    scenes:[
      {title:'The Old Sultan Nods',body:'Jalaluddin Khilji leans forward, studying your face for a long moment. Then nods, once, slowly.'},
      {title:'A Pension Granted',body:"A purse of coins is placed gently in your hands. 'For your trouble,' the Sultan says softly."},
      {title:'Safe Passage',body:'You leave Delhi with enough to start again somewhere quieter. The old Sultan watches you go.'},
    ]},
  jal_lose:{type:'lose',color:'#78909c',title:'EXILED',sub:"One Month Beyond the Gates",
    quote:"I cannot call you guilty. But I cannot call you innocent either. Leave Delhi for thirty days.",bg:'lose_dim',
    scenes:[
      {title:'The Gentle Verdict',body:"Jalaluddin looks almost apologetic as he speaks the words. 'It is not death,' he offers, as though this helps."},
      {title:'Beyond the Gates',body:'Delhi shrinks behind you. Thirty days feels like a lifetime when you know you are innocent.'},
      {title:'Return',body:'A month later, you return. The city has already forgotten you. Perhaps that is enough.'},
    ]},
  qut_win:{type:'win',color:'#a5d6a7',title:'VINDICATED',sub:"Qutbuddin's Honour",
    quote:"I was a slave once. I know what it means to be falsely judged. You are free.",bg:'win_warm',
    scenes:[
      {title:'The First Sultan Stands',body:'Qutbuddin Aibak rises to his full height and speaks. The court goes absolutely silent.'},
      {title:'Silver and Freedom',body:'A chest of silver is placed before you. More than the dinars that were stolen. Justice, complete.'},
      {title:'Head High',body:'You walk out with your name restored. In this court, that is worth more than any silver.'},
    ]},
  qut_lose:{type:'lose',color:'#e57373',title:'CONDEMNED',sub:"Public Disgrace",
    quote:"Honour demands consequence. You brought this court suspicion. You will bear its weight.",bg:'lose_dark',
    scenes:[
      {title:'The Verdict',body:'Qutbuddin speaks without pleasure. He dislikes this. But honour demands it.'},
      {title:'The Flogging',body:'In the courtyard, before the assembled court. Thirty strokes. You do not cry out.'},
      {title:'After',body:'Your back heals. Your name does not. Delhi has a very long memory.'},
    ]},
  tug_win:{type:'win',color:'#ffca28',title:'VINDICATED',sub:"Tughlaq's Whim",
    quote:"Magnificent! You argued better than my own viziers. Take the cape — you have earned something.",bg:'win_gold',
    scenes:[
      {title:'Tughlaq Laughs',body:'Muhammad bin Tughlaq lets out a sudden bark of laughter. The entire court flinches. Then he claps.'},
      {title:'The Golden Cape',body:'A servant drapes heavy gold silk across your shoulders. The Sultan seems genuinely, frighteningly delighted.'},
      {title:'Royal Favour — For Now',body:"You leave elevated. But you know better than to trust Tughlaq tomorrow. Run while you still can."},
    ]},
  tug_lose:{type:'lose',color:'#ff7043',title:'CONDEMNED',sub:"The Long March South",
    quote:"If the capital must move, so must all its traitors. Walk.",bg:'lose_desert',
    scenes:[
      {title:'The Casual Condemnation',body:'Tughlaq waves a hand as if swatting a fly. Your entire fate decided in a moment between thoughts.'},
      {title:'The March Begins',body:'Thousands walk south under a merciless sun. 1,500 kilometres to Daulatabad. You pray simply to arrive.'},
      {title:'The Desert',body:'Delhi disappears behind the horizon. The road ahead shimmers with heat. Half the marchers will not arrive.'},
    ]},
  ilt_win:{type:'win',color:'#ce93d8',title:'FREED',sub:"Iltutmish's Calculation",
    quote:"The arithmetic of your innocence is sound. I release you. Do not give me reason to recalculate.",bg:'win_cool',
    scenes:[
      {title:'Long Silence',body:'Iltutmish says nothing for a full minute. The court does not breathe. Then — two words.'},
      {title:'500 Tankas',body:"A pouch lands at your feet. 'Enough,' says the Sultan, and returns to his papers without another glance."},
      {title:'Careful Steps',body:'You back out of the Diwan-i-Am slowly, carefully, as though the floor might give way. It does not.'},
    ]},
  ilt_lose:{type:'lose',color:'#b0bec5',title:'IMPRISONED',sub:"Iltutmish's Caution",
    quote:"I am not convinced of your guilt. But I am not convinced of your innocence. You will wait.",bg:'lose_dark',
    scenes:[
      {title:'The Calculation',body:'Iltutmish has weighed your words against the evidence with the precision of an accountant. The scale tips.'},
      {title:'Property Seized',body:'Guards enter your home the same afternoon. Everything catalogued, removed, and stored. Methodically.'},
      {title:'The Wait',body:'Months in a stone room. Iltutmish does not rush. Neither, it seems, does time.'},
    ]},
  bal_win:{type:'win',color:'#b0bec5',title:'FREED',sub:"Balban's Grudging Justice",
    quote:"The law has spoken. I dislike it. But I am bound by truth as much as any man here.",bg:'win_cold',
    scenes:[
      {title:'Balban Rises',body:'Ghiyasuddin Balban stands slowly. His face has not changed. It never does.'},
      {title:'A Small Pouch',body:'Silver coins hit the stone floor at your feet. He does not look at you again.'},
      {title:'Walk Backwards',body:'You bow and walk backwards out of the Diwan-i-Am. You do not turn your back on Balban. Ever.'},
    ]},
  bal_lose:{type:'lose',color:'#b71c1c',title:'CONDEMNED',sub:"Balban's Justice",
    quote:"Guards.",bg:'lose_black',
    scenes:[
      {title:'One Word',body:"A single word from Balban. That is all your life amounts to in this court. 'Guards.'"},
      {title:'Before Dawn',body:'They come while the city sleeps. No ceremony. No final words. Just cold boots on cold stone.'},
      {title:'The Blade',body:'Ghiyasuddin Balban is already reading morning dispatches by the time it is done.'},
    ]},
  kha_win:{type:'win',color:'#ce93d8',title:'SPARED',sub:"Khilji's Indifference",
    quote:"You are not worth the blood on my floor today. Leave before I change my mind.",bg:'win_purple',
    scenes:[
      {title:'Khilji Stares',body:"Alauddin Khilji studies you the way a hawk studies a mouse it has decided, for now, not to eat."},
      {title:'"Leave."',body:"One word. No gold. No honour. Just your heartbeat still beating. It is, somehow, enough."},
      {title:'Alive',body:'You walk out of the most feared court in the subcontinent. Against all probability, you are alive.'},
    ]},
  kha_lose:{type:'lose',color:'#880e4f',title:'CONDEMNED',sub:"Khilji's Example",
    quote:"Let every thief and liar in Delhi see what becomes of those who steal from Alauddin Khilji.",bg:'lose_red',
    scenes:[
      {title:'The Sultan Rises',body:'Alauddin Khilji stands. The court goes deathly still. Even the torch flames seem to shrink.'},
      {title:'Made an Example',body:"They do this publicly in the open courtyard. Khilji's spy network ensures word spreads to every corner of the sultanate by nightfall."},
      {title:'Days Later',body:'Your name becomes a warning spoken in the markets, the mosques, in whispers. It will be spoken for years.'},
    ]},
};

const EVIDENCE_TYPES = [
  {type:'seal',     icon:'🔏',label:'SEAL',      weight:33,color:'#cc88ff',barColor:'#9933cc', quote:'"A seal proves nothing alone — but in the right hands, it changes everything."'},
  {type:'alibi',    icon:'🧭',label:'ALIBI',     weight:22,color:'#7fc98a',barColor:'#4a9e5c', quote:'"One person willing to speak for you is worth more than a hundred who stay silent."'},
  {type:'witness',  icon:'👁', label:'WITNESS',   weight:20,color:'#7ab4e8',barColor:'#3a7abd', quote:'"The shortest path to freedom is someone who was there."'},
  {type:'treasury', icon:'⚖', label:'TREASURY',  weight:14,color:'#ffb347',barColor:'#d4872a', quote:'"Numbers have no motive. The ledger does not lie."'},
  {type:'testimony',icon:'⚔', label:'TESTIMONY', weight:10,color:'#ff9999',barColor:'#c04040', quote:'"In a court of accusations, a single honest word cuts through everything."'},
  {type:'document', icon:'📜',label:'DOCUMENT',  weight:1, color:'#ffd97a',barColor:'#c9a84c', quote:'"Written proof is the rarest gift in court — and the most devastating when it arrives."'},
];

const CROWD = [
  ['Guilty! We all know it!','String him up, Sultan!','Thief! Shameless thief!','No mercy for thieves!'],
  ['Let him speak…','Perhaps he is innocent?','The Qazi moves too fast.','Hear him out, O Sultan!'],
  ['Allah alone knows the truth.','Only the Sultan can judge this.','Pray for justice today.','A grave matter indeed.'],
  ['Look at him tremble!','He sweats before the Sultan!','The truth always surfaces.','Justice will be done!'],
  ['I saw him near the vault!','He was always suspicious.','How does a clerk afford such robes?','Guilty — I say guilty!'],
  ['Poor soul, may Allah have mercy.','No man should face this alone.','Pray he speaks truly.','Innocent men have stood here before.'],
];

const INTRO_STEPS = [
  {title:'The Ordinary Life',body:'Delhi, 13th century. You are Farrukh — a treasury clerk. Today you maintain the vault as you have every morning for three years. The chest is sealed, heavy, full. A normal day.',kb:'kb1'},
  {title:'Midnight',body:'Someone broke into the vault. A hooded figure, a blade through the seal. By the time the torch catches the glint of their robes — they are gone. 10,000 gold dinars. Gone.',kb:'kb2'},
  {title:'The Morning Prayer',body:'You kneel for the first chant. Then the door crashes open. Qazi Ibrahim. Two guards seize you by the neck before a single word of prayer has left your lips.',kb:'kb3'},
  {title:'Thrown Outside',body:'You hit the cobblestones hard. Around you, morning worshippers freeze mid-prayer. Every face turns to look. Some you recognise. They do not look away.',kb:'kb1'},
  {title:'The Sword',body:'A guard presses the flat of his blade cold against your throat. He speaks one word. Just one. MOVE.',kb:'kb2'},
  {title:'The Walk',body:'They march you through the streets in silence. The crowd follows. They want to see. These are the faces that will fill the court today — witnesses to whatever comes next.',kb:'kb3'},
  {title:'The Palace',body:'You are thrown through the palace doors onto cold marble. The Sultan is finishing his morning prayer. He rises slowly, confused. He was not expecting this. Not today.',kb:'kb1'},
  {title:'The Innocence',body:'Alone in a holding chamber. Hands still bound. You look down at the vault key still on your belt — the same key you have carried faithfully for three years. You did not do this.',kb:'kb2'},
  {title:'The Setup',body:'Through the chamber grille you watch the Diwan-i-Am fill. Ulemas taking their seats. Qazi Ibrahim unrolling his scroll. The Sultan ascending. The machinery of judgment assembling itself for you.',kb:'kb3'},
  {title:'The Charge',body:'Qazi Ibrahim stands. His voice fills the court. Every eye turns. The Sultan\'s gaze settles on you like a weight. Then — silence. Your moment has arrived. Everything depends on what you say next.',kb:'kb1'},
];

function buildEndingScene(key, sceneIdx) {
  const W=1200,H=620;
  // Shared helpers
  const vig = (op='.78') => `<radialGradient id="ev" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${op}"/></radialGradient><rect width="${W}" height="${H}" fill="url(#ev)"/>`;
  const stars = (n=20,opa='.6') => Array.from({length:n},()=>`<circle cx="${100+Math.floor(Math.random()*1000)}" cy="${10+Math.floor(Math.random()*180)}" r="${Math.random()>.6?1.5:.8}" fill="#fff" opacity="${opa}"/>`).join('');
  const torch = (x,y,i=0) => `<g transform="translate(${x},${y})"><rect x="-5" y="4" width="10" height="18" rx="2" fill="#3a2810"/><rect x="-6" y="1" width="12" height="6" rx="1" fill="#8b6030"/><g style="animation:torchFlame ${.9+i*.15}s ease-in-out infinite;transform-origin:0 4px"><ellipse cx="0" cy="-10" rx="6" ry="13" fill="#ff6200" opacity=".9"/><ellipse cx="0" cy="-13" rx="4" ry="8" fill="#ffaa00" opacity=".8"/><ellipse cx="0" cy="-16" rx="2" ry="5" fill="#ffe000" opacity=".7"/></g><radialGradient id="tg${x}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff8c00" stop-opacity=".45"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient><ellipse cx="0" cy="-2" rx="30" ry="22" fill="url(#tg${x})"/></g>`;
  const throne = (color='#c9a84c') => `<rect x="520" y="240" width="160" height="80" rx="5" fill="#1a1006" stroke="${color}" stroke-width="2"/><rect x="514" y="228" width="172" height="90" rx="7" fill="#140e06" stroke="${color}" stroke-width="2"/><path d="M 514 244 Q 600 195 686 244" fill="#140e06" stroke="${color}" stroke-width="2"/><circle cx="600" cy="188" r="8" fill="${color}"/><line x1="600" y1="180" x2="600" y2="165" stroke="${color}" stroke-width="2.5"/><polygon points="600,157 594,166 606,166" fill="${color}"/><rect x="512" y="234" width="16" height="88" rx="4" fill="#2e1e08" stroke="${color}" stroke-width="1"/><rect x="672" y="234" width="16" height="88" rx="4" fill="#2e1e08" stroke="${color}" stroke-width="1"/><circle cx="520" cy="231" r="6" fill="${color}"/><circle cx="680" cy="231" r="6" fill="${color}"/>`;
  const floor = () => `<pattern id="pf" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#1a1208"/><line x1="0" y1="30" x2="60" y2="30" stroke="#100a04" stroke-width=".8" opacity=".7"/><line x1="30" y1="0" x2="30" y2="60" stroke="#100a04" stroke-width=".8" opacity=".7"/></pattern><rect x="0" y="420" width="${W}" height="200" fill="url(#pf)"/>`;
  const carpet = () => `<pattern id="pc" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="#7a0000"/><circle cx="15" cy="15" r="4" fill="none" stroke="#ffd700" stroke-width=".5" opacity=".2"/><rect x="0" y="0" width="4" height="4" fill="#ffd700" opacity=".08"/></pattern><rect x="0" y="420" width="${W}" height="200" fill="url(#pc)" opacity=".8"/>`;
  const arch = () => `<path d="M 370 460 Q 370 40 600 40 Q 830 40 830 460" fill="none" stroke="#c9a84c" stroke-width="6"/><path d="M 378 460 Q 378 52 600 52 Q 822 52 822 460" fill="none" stroke="#3a2810" stroke-width="2"/>`;
  const guard = (x,facing=1) => `<g transform="translate(${x},300)"><ellipse cx="0" cy="-20" rx="22" ry="24" fill="#1a1408"/><path d="M -24 0 Q -28 50 -26 120 L 26 120 Q 28 50 24 0 Z" fill="#1a1408"/><path d="M -24 -22 Q 0 -64 24 -22" fill="#1a1408"/><rect x="-7" y="-72" width="14" height="40" rx="2" fill="#2a2010"/><line x1="${facing*30}" y1="-100" x2="${facing*24}" y2="125" stroke="#4a4030" stroke-width="5"/><polygon points="${facing*30},-100 ${facing*24},-122 ${facing*36},-122" fill="#7a7060"/></g>`;
  const sultan_figure = (mood='neutral') => {
    const eyeH = mood==='angry'?.6:mood==='pleased'?1.2:1;
    return `<ellipse cx="600" cy="300" rx="28" ry="34" fill="#c8a880"/><rect x="572" y="324" width="56" height="16" rx="2" fill="#1a1208"/><path d="M 555 334 Q 540 355 535 420 L 665 420 Q 660 355 645 334 Z" fill="#8b3a00"/><ellipse cx="600" cy="278" rx="35" ry="17" fill="#8b3a00"/><ellipse cx="600" cy="272" rx="12" ry="6" fill="#8b3a00"/><ellipse cx="588" cy="310" rx="${6*eyeH*.7}" ry="${6*eyeH*.7}" fill="#1a0e06"/><ellipse cx="612" cy="310" rx="${6*eyeH*.7}" ry="${6*eyeH*.7}" fill="#1a0e06"/><circle cx="590" cy="308" r="1.8" fill="#fff" opacity=".4"/><circle cx="614" cy="308" r="1.8" fill="#fff" opacity=".4"/><path d="M ${mood==='pleased'?'592 320 Q 600 315 608 320':'592 322 Q 600 326 608 322'}" fill="none" stroke="#5a3020" stroke-width="2.2" stroke-linecap="round"/>`;
  };
  const player_silhouette = (x=580,y=400,facing=1) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="-60" rx="18" ry="20" fill="#c8a880"/><rect x="-20" y="-42" width="40" height="70" rx="4" fill="#2a2010"/><line x1="-20" y1="-20" x2="${-30*facing}" y2="10" stroke="#2a2010" stroke-width="10" stroke-linecap="round"/><line x1="20" y1="-20" x2="${25*facing}" y2="10" stroke="#2a2010" stroke-width="10" stroke-linecap="round"/><line x1="-10" y1="28" x2="-10" y2="65" stroke="#1a1208" stroke-width="12" stroke-linecap="round"/><line x1="10" y1="28" x2="10" y2="65" stroke="#1a1208" stroke-width="12" stroke-linecap="round"/></g>`;
  const chains = () => `<path d="M 490 500 Q 520 480 560 490 Q 590 498 610 490 Q 650 480 680 500" fill="none" stroke="#9a9080" stroke-width="3" stroke-dasharray="8,4"/>`;
  const moon = (x=900,y=60) => `<circle cx="${x}" cy="${y}" r="28" fill="#d4c8a8" opacity=".75"/><circle cx="${x+8}" cy="${y-5}" r="24" fill="#0e1e3a" opacity=".85"/>`;
  const sun = (x=300,y=80,color='#ff8c00') => `<circle cx="${x}" cy="${y}" r="45" fill="${color}" opacity=".25"/><circle cx="${x}" cy="${y}" r="28" fill="${color}" opacity=".35"/><circle cx="${x}" cy="${y}" r="16" fill="${color}" opacity=".55"/>`;
  const door = (open=false) => open
    ? `<rect x="420" y="80" width="180" height="460" fill="#160e04" stroke="#c9a84c" stroke-width="3" style="transform:perspective(900px) rotateY(-70deg);transform-origin:420px 310px"/><rect x="600" y="80" width="180" height="460" fill="#160e04" stroke="#c9a84c" stroke-width="3" style="transform:perspective(900px) rotateY(70deg);transform-origin:780px 310px"/><radialGradient id="dg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".5"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient><ellipse cx="600" cy="310" rx="180" ry="230" fill="url(#dg)"/>`
    : `<rect x="420" y="80" width="360" height="460" rx="4" fill="#0e0a06" stroke="#c9a84c" stroke-width="4"/><rect x="424" y="84" width="176" height="452" fill="#160e04" stroke="#2a1e0a" stroke-width="1"/><rect x="600" y="84" width="176" height="452" fill="#160e04" stroke="#2a1e0a" stroke-width="1"/>${[0,1,2].map(r=>[0,1].map(s=>`<rect x="${424+s*180}" y="${100+r*140}" width="160" height="118" rx="3" fill="none" stroke="#2a1e0a" stroke-width="1.5" opacity=".6"/>`).join('')).join('')}<circle cx="597" cy="310" r="10" fill="#c9a84c"/><circle cx="603" cy="310" r="10" fill="#c9a84c"/>`;
  const cell = () => `${Array.from({length:10},(_,i)=>`<rect x="${60+i*115}" y="0" width="20" height="${H}" rx="6" fill="#120e08" stroke="#1e1608" stroke-width="1" opacity=".92"/>`).join('')}<rect x="0" y="${H*.55}" width="${W}" height="14" fill="#120e08" rx="4" opacity=".85"/>`;
  const chest = (open=false,gold=true) => `<rect x="440" y="350" width="320" height="130" rx="5" fill="#1e1408" stroke="${gold?'#8b6914':'#5a5050'}" stroke-width="2.5"/>${open?`<path d="M 440 368 Q 600 330 760 368" fill="#2a1c0a" stroke="${gold?'#c9a84c':'#7a7060'}" stroke-width="2.5"/>`:`<rect x="440" y="348" width="320" height="12" rx="3" fill="${gold?'#c9a84c':'#6a6050'}"/>`}${gold?`<ellipse cx="600" cy="390" rx="50" ry="15" fill="#ffd700" opacity=".6"/>${Array.from({length:8},(_,i)=>`<circle cx="${480+i*22}" cy="408" r="8" fill="#ffd700" opacity=".7"/>`).join('')}`:''}`;
  const road = (dir='south') => `<linearGradient id="rd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0c04"/><stop offset="100%" stop-color="#3a1c08"/></linearGradient><rect width="${W}" height="${H}" fill="url(#rd)"/><polygon points="560,100 640,100 ${W},${H} 0,${H}" fill="#2a1808" opacity=".6"/><polygon points="580,100 620,100 680,${H} 520,${H}" fill="#1a1006" opacity=".4"/>${dir==='south'?`<text x="600" y="80" text-anchor="middle" fill="#5a4030" font-size="14" font-family="Cinzel,serif" letter-spacing="4">DAULATABAD — 1,500 KM</text>`:''}`;
  const desert = () => `<linearGradient id="ds" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0c04"/><stop offset="55%" stop-color="#3a2010"/><stop offset="100%" stop-color="#2a1408"/></linearGradient><rect width="${W}" height="${H}" fill="url(#ds)"/><path d="M 0 420 Q 200 380 400 410 Q 600 440 800 390 Q 1000 370 1200 400 L 1200 620 L 0 620 Z" fill="#3a2010" opacity=".8"/><path d="M 0 460 Q 300 430 600 455 Q 900 480 1200 445 L 1200 620 L 0 620 Z" fill="#2a1808" opacity=".7"/>`;
  const city_silhouette = () => `<g fill="#0a0804" opacity=".7">${[80,160,220,300,400,480,560,640,720,800,880,960,1040,1120].map((x,i)=>`<rect x="${x}" y="${220+Math.sin(i*.8)*40}" width="${30+Math.sin(i*1.2)*15}" height="${180-Math.sin(i*.8)*40}" />`).join('')}<polygon points="600,140 540,220 660,220" /><circle cx="600" cy="136" r="16" fill="#0a0804"/></g>`;

  const SCENES = {
    // ── FIROZ WIN ─────────────────────────────────────────
    firoz_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0e04"/><stop offset="100%" stop-color="#0a0804"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${floor()}${carpet()}
      ${torch(120,220,0)}${torch(1080,220,1)}
      ${arch()}
      <radialGradient id="tg" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".22"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#tg)"/>
      ${throne('#ffd700')}
      ${sultan_figure('pleased')}
      <path d="M 560 290 Q 540 295 530 305 Q 524 318 526 330" stroke="#163d18" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M 640 290 Q 660 295 670 305 Q 676 318 674 330" stroke="#163d18" stroke-width="15" fill="none" stroke-linecap="round"/>
      <ellipse cx="600" cy="215" rx="38" ry="16" fill="#1b4d1e"/><ellipse cx="600" cy="209" rx="12" ry="6" fill="#1b4d1e"/>
      <circle cx="600" cy="208" r="8" fill="#ffd700" opacity=".9"/>
      <!-- Nodding gesture: raised hand -->
      <line x1="670" y1="310" x2="700" y2="270" stroke="#c8a880" stroke-width="12" stroke-linecap="round"/>
      <ellipse cx="705" cy="265" rx="10" ry="8" fill="#c8a880"/>
      ${player_silhouette(580,480,-1)}
      ${vig('.65')}
    </svg>`,

    firoz_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0804"/>
      ${floor()}${carpet()}
      ${torch(200,260,0)}${torch(1000,260,1)}
      <!-- Open gold chest centre -->
      ${chest(true,true)}
      <!-- Gold coins spilling -->
      ${Array.from({length:18},(_,i)=>`<circle cx="${470+i*20}" cy="${415+Math.sin(i*.8)*12}" r="9" fill="#ffd700" opacity="${.55+i*.02}"/>`).join('')}
      <!-- Servants carrying -->
      <g transform="translate(350,370)" fill="#2a2010"><ellipse cx="0" cy="-18" rx="16" ry="18"/><rect x="-18" y="0" width="36" height="65" rx="3"/></g>
      <g transform="translate(850,370)" fill="#2a2010"><ellipse cx="0" cy="-18" rx="16" ry="18"/><rect x="-18" y="0" width="36" height="65" rx="3"/></g>
      <!-- Crowd watching -->
      ${[150,250,350,850,950,1050].map((x,i)=>`<ellipse cx="${x}" cy="450" rx="14" ry="20" fill="#1a1408" opacity="${.7+i*.02}"/>`).join('')}
      <radialGradient id="gl" cx="50%" cy="65%" r="45%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".25"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#gl)"/>
      ${vig('.7')}
    </svg>`,

    firoz_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1828"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(25)}${moon(900,70)}
      <!-- Open doors -->
      ${door(true)}
      <!-- Delhi street beyond -->
      ${city_silhouette()}
      <!-- Player walking through -->
      ${player_silhouette(600,440,1)}
      <!-- Light from outside -->
      <radialGradient id="ol" cx="50%" cy="50%" r="45%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".18"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
      <ellipse cx="600" cy="400" rx="220" ry="180" fill="url(#ol)"/>
      ${vig('.72')}
    </svg>`,

    // ── FIROZ LOSE ────────────────────────────────────────
    firoz_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080604"/>
      ${floor()}${carpet()}
      ${torch(150,240,0)}${torch(1050,240,1)}
      ${throne('#888')}
      ${sultan_figure('suspicious')}
      <ellipse cx="600" cy="215" rx="38" ry="16" fill="#1b4d1e"/><ellipse cx="600" cy="209" rx="12" ry="6" fill="#1b4d1e"/>
      <!-- Reluctant gesture -->
      <path d="M 640 295 Q 655 285 668 278" stroke="#c8a880" stroke-width="11" fill="none" stroke-linecap="round"/>
      <!-- Guards approaching -->
      ${guard(380,1)}${guard(820,-1)}
      ${player_silhouette(585,470,0)}
      ${vig('.75')}
    </svg>`,

    firoz_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#060402"/>
      <!-- Stone corridor -->
      ${Array.from({length:8},(_,i)=>`<rect x="${i*150}" y="0" width="148" height="${H}" fill="none" stroke="#0e0a04" stroke-width="1" opacity=".5"/>`).join('')}
      ${Array.from({length:6},(_,j)=>`<rect x="0" y="${j*100}" width="${W}" height="98" fill="none" stroke="#0e0a04" stroke-width="1" opacity=".4"/>`).join('')}
      <!-- Iron door filling frame -->
      <rect x="350" y="60" width="500" height="500" rx="4" fill="#0a0804" stroke="#4a4040" stroke-width="5"/>
      <rect x="355" y="65" width="244" height="490" fill="#140e08" stroke="#2e2010" stroke-width="1.5"/>
      <rect x="601" y="65" width="244" height="490" fill="#140e08" stroke="#2e2010" stroke-width="1.5"/>
      <!-- Lock -->
      <rect x="575" y="280" width="50" height="40" rx="3" fill="#3a3030" stroke="#6a6050" stroke-width="2"/>
      <path d="M 583 280 Q 583 258 600 256 Q 617 258 617 280" fill="none" stroke="#6a6050" stroke-width="4"/>
      <!-- Torch going out -->
      ${torch(200,200,0)}
      <radialGradient id="dg" cx="30%" cy="35%" r="40%"><stop offset="0%" stop-color="#ff8c00" stop-opacity=".14"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#dg)"/>
      ${player_silhouette(590,450,-1)}
      ${vig('.82')}
    </svg>`,

    firoz_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1828"/><stop offset="60%" stop-color="#1a2a10"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${sun(200,60,'#ff9500')}
      ${cell()}
      <!-- Tally marks on wall -->
      ${Array.from({length:4},(_,i)=>`<line x1="${220+i*18}" y1="300" x2="${220+i*18}" y2="360" stroke="#4a3820" stroke-width="3"/>`).join('')}
      <line x1="208" y1="325" x2="298" y2="325" stroke="#4a3820" stroke-width="3"/>
      <!-- Player at bars -->
      ${player_silhouette(590,430,1)}
      <radialGradient id="dl" cx="16%" cy="47%" r="35%"><stop offset="0%" stop-color="#ff9500" stop-opacity=".18"/><stop offset="100%" stop-color="#ff9500" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#dl)"/>
      ${vig('.75')}
    </svg>`,

    // ── JALALUDDIN WIN ────────────────────────────────────
    jal_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0a0e"/>
      ${floor()}${carpet()}
      ${torch(180,230,0)}${torch(1020,230,1)}
      ${throne('#8ab0d0')}
      <!-- Old sultan — white beard, blue robes, gentle nod -->
      <ellipse cx="600" cy="300" rx="28" ry="32" fill="#d4b48c"/>
      <path d="M 555 335 Q 540 360 535 420 L 665 420 Q 660 360 645 335 Z" fill="#162840"/>
      <ellipse cx="600" cy="278" rx="35" ry="14" fill="#1a3a5c"/>
      <!-- Long white beard -->
      <path d="M 572 318 Q 568 340 575 365 Q 588 382 600 385 Q 612 382 625 365 Q 632 340 628 318" fill="#f0e8dc" opacity=".9"/>
      <!-- Eyes gentle, slightly closed -->
      <ellipse cx="588" cy="308" rx="5" ry="4" fill="#1a0e06"/>
      <ellipse cx="612" cy="308" rx="5" ry="4" fill="#1a0e06"/>
      <path d="M 592 315 Q 600 312 608 315" fill="none" stroke="#5a3020" stroke-width="2" stroke-linecap="round"/>
      ${player_silhouette(590,470,-1)}
      ${vig('.68')}
    </svg>`,

    jal_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0a0e"/>
      ${floor()}${carpet()}
      ${torch(250,250,0)}
      <!-- Hand exchanging purse — close up -->
      <ellipse cx="420" cy="330" rx="48" ry="28" fill="#d4b48c" opacity=".9"/>
      <ellipse cx="780" cy="350" rx="48" ry="28" fill="#c8a880" opacity=".9"/>
      <!-- Coin purse -->
      <ellipse cx="600" cy="330" rx="55" ry="42" fill="#8b6914"/>
      <ellipse cx="600" cy="310" rx="30" ry="18" fill="#6a5010"/>
      <line x1="570" y1="285" x2="630" y2="285" stroke="#c9a84c" stroke-width="3"/>
      <radialGradient id="pl" cx="50%" cy="55%" r="40%"><stop offset="0%" stop-color="#c9a84c" stop-opacity=".25"/><stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#pl)"/>
      <!-- Soft text from sultan -->
      <text x="600" y="530" text-anchor="middle" fill="#4a7aaa" font-size="16" font-family="IM Fell English,serif" font-style="italic" opacity=".7">"For your trouble."</text>
      ${vig('.72')}
    </svg>`,

    jal_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0c1420"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(30)}${moon(800,55)}
      <!-- Delhi gates -->
      <rect x="380" y="120" width="440" height="440" fill="#0e0a06" stroke="#4a7aaa" stroke-width="4"/>
      <path d="M 380 220 Q 600 110 820 220" fill="#0e0a06" stroke="#8ab0d0" stroke-width="3"/>
      <!-- Open gate -->
      <rect x="385" y="222" width="210" height="334" fill="#0c1420" stroke="#2a3840" stroke-width="1.5" style="transform:perspective(800px) rotateY(-60deg);transform-origin:385px 389px"/>
      <rect x="605" y="222" width="210" height="334" fill="#0c1420" stroke="#2a3840" stroke-width="1.5" style="transform:perspective(800px) rotateY(60deg);transform-origin:815px 389px"/>
      ${city_silhouette()}
      ${player_silhouette(600,450,1)}
      ${vig('.7')}
    </svg>`,

    // ── JALALUDDIN LOSE ───────────────────────────────────
    jal_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080606"/>
      ${floor()}${carpet()}
      ${torch(200,240,0)}${torch(1000,240,1)}
      ${throne('#78909c')}
      <!-- Apologetic sultan -->
      <ellipse cx="600" cy="300" rx="28" ry="32" fill="#d4b48c"/>
      <path d="M 555 335 Q 540 360 535 420 L 665 420 Q 660 360 645 335 Z" fill="#162840"/>
      <ellipse cx="600" cy="278" rx="35" ry="14" fill="#1a3a5c"/>
      <path d="M 572 318 Q 568 338 575 358 Q 587 372 600 374 Q 613 372 625 358 Q 632 338 628 318" fill="#f0e8dc" opacity=".88"/>
      <!-- Sad expression -->
      <ellipse cx="588" cy="308" rx="5" ry="4.5" fill="#1a0e06"/>
      <ellipse cx="612" cy="308" rx="5" ry="4.5" fill="#1a0e06"/>
      <path d="M 592 318 Q 600 322 608 318" fill="none" stroke="#5a3020" stroke-width="2" stroke-linecap="round"/>
      <!-- Raised hand, palm out -->
      <path d="M 638 295 Q 660 285 672 272" stroke="#d4b48c" stroke-width="12" fill="none" stroke-linecap="round"/>
      <ellipse cx="678" cy="268" rx="10" ry="8" fill="#d4b48c"/>
      ${player_silhouette(590,470,-1)}
      ${vig('.72')}
    </svg>`,

    jal_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0c10"/><stop offset="100%" stop-color="#060504"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(20)}${moon(900,65)}
      <!-- City gate from outside -->
      <rect x="300" y="80" width="600" height="500" fill="#0a0806" stroke="#2a2a2a" stroke-width="6"/>
      <path d="M 300 200 Q 600 80 900 200" fill="#0a0806" stroke="#3a3030" stroke-width="3"/>
      <!-- Closed gate — iron bars -->
      ${Array.from({length:8},(_,i)=>`<rect x="${320+i*76}" y="204" width="14" height="372" rx="5" fill="#2a2020" stroke="#1a1818" stroke-width="1"/>`).join('')}
      <rect x="300" y="480" width="600" height="16" fill="#2a2020" rx="3"/>
      <!-- Player looking back -->
      ${player_silhouette(580,450,-1)}
      ${city_silhouette()}
      ${vig('.78')}
    </svg>`,

    jal_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      ${road('north')}
      ${stars(22)}${moon(1000,55)}
      <!-- Lone figure on road -->
      ${player_silhouette(600,420,1)}
      <!-- Road markers receding -->
      ${[200,320,440,560,680,780,860].map((x,i)=>`<circle cx="${x}" cy="${340+i*15}" r="${8-i*.8}" fill="#2a1808" opacity="${.5-i*.04}"/>`).join('')}
      <text x="600" y="100" text-anchor="middle" fill="#3a2a18" font-size="14" font-family="Cinzel,serif" letter-spacing="4" opacity=".7">30 DAYS</text>
      ${vig('.72')}
    </svg>`,

    // ── QUTBUDDIN WIN ─────────────────────────────────────
    qut_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0804"/>
      ${floor()}${carpet()}
      ${torch(140,230,0)}${torch(1060,230,1)}
      ${throne('#a5d6a7')}
      ${arch()}
      <!-- Sultan rising to full height — commanding -->
      <ellipse cx="600" cy="290" rx="30" ry="34" fill="#c0956a"/>
      <path d="M 550 324 Q 532 348 528 420 L 672 420 Q 668 348 650 324 Z" fill="#2a1a08"/>
      <ellipse cx="600" cy="268" rx="38" ry="16" fill="#3a2a10"/>
      <ellipse cx="600" cy="262" rx="14" ry="7" fill="#3a2a10"/>
      <!-- Medium beard -->
      <path d="M 572 310 Q 568 330 572 350 Q 582 366 600 369 Q 618 366 628 350 Q 632 330 628 310" fill="#6a4020" opacity=".88"/>
      <!-- Both arms open wide — acquittal gesture -->
      <path d="M 552 320 Q 520 308 495 295" stroke="#c0956a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M 648 320 Q 680 308 705 295" stroke="#c0956a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <ellipse cx="490" cy="292" rx="10" ry="8" fill="#c0956a"/>
      <ellipse cx="710" cy="292" rx="10" ry="8" fill="#c0956a"/>
      ${player_silhouette(590,470,0)}
      <!-- Court watching in silence -->
      ${[80,150,220,950,1020,1090].map(x=>`<ellipse cx="${x}" cy="445" rx="12" ry="18" fill="#1a1208" opacity=".75"/>`).join('')}
      ${vig('.68')}
    </svg>`,

    qut_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0804"/>
      ${floor()}${carpet()}
      ${torch(300,260,0)}${torch(900,260,1)}
      <!-- Silver chest open -->
      <rect x="440" y="340" width="320" height="140" rx="5" fill="#1e1408" stroke="#7a8888" stroke-width="2.5"/>
      <path d="M 440 358 Q 600 318 760 358" fill="#2a2828" stroke="#9a9898" stroke-width="2.5"/>
      <!-- Silver coins -->
      ${Array.from({length:16},(_,i)=>`<circle cx="${468+i*22}" cy="${405+Math.sin(i*.9)*10}" r="10" fill="#b0bec5" opacity="${.6+i*.015}"/>`).join('')}
      ${Array.from({length:8},(_,i)=>`<circle cx="${480+i*26}" cy="390" r="8" fill="#90a4ae" opacity=".7"/>`).join('')}
      <radialGradient id="sl" cx="50%" cy="62%" r="38%"><stop offset="0%" stop-color="#b0bec5" stop-opacity=".22"/><stop offset="100%" stop-color="#b0bec5" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#sl)"/>
      ${player_silhouette(590,480,-1)}
      ${vig('.72')}
    </svg>`,

    qut_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1008"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${torch(160,240,0)}${torch(1040,240,1)}
      ${arch()}
      <!-- Open doors, light streaming -->
      ${door(true)}
      <!-- Player walking OUT head high — upright posture -->
      <g transform="translate(600,430)">
        <ellipse cx="0" cy="-60" rx="18" ry="20" fill="#c0956a"/>
        <rect x="-18" y="-42" width="36" height="68" rx="4" fill="#2a1a08"/>
        <line x1="-18" y1="-22" x2="-30" y2="8" stroke="#2a1a08" stroke-width="10" stroke-linecap="round"/>
        <line x1="18" y1="-22" x2="28" y2="8" stroke="#2a1a08" stroke-width="10" stroke-linecap="round"/>
        <line x1="-10" y1="26" x2="-12" y2="62" stroke="#1a1208" stroke-width="12" stroke-linecap="round"/>
        <line x1="10" y1="26" x2="14" y2="62" stroke="#1a1208" stroke-width="12" stroke-linecap="round"/>
      </g>
      <!-- Court watching -->
      ${[100,200,300,900,1000,1100].map(x=>`<ellipse cx="${x}" cy="450" rx="14" ry="20" fill="#1a1208" opacity=".65"/>`).join('')}
      ${vig('.68')}
    </svg>`,

    // ── QUTBUDDIN LOSE ────────────────────────────────────
    qut_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0a0804"/>
      ${floor()}
      ${torch(180,230,0)}${torch(1020,230,1)}
      ${throne('#ef9a9a')}
      <!-- Sultan with stern expression -->
      <ellipse cx="600" cy="298" rx="29" ry="33" fill="#c0956a"/>
      <path d="M 555 332 Q 540 355 536 420 L 664 420 Q 660 355 645 332 Z" fill="#2a1a08"/>
      <ellipse cx="600" cy="277" rx="37" ry="15" fill="#3a2a10"/>
      <path d="M 572 310 Q 568 328 572 346 Q 582 360 600 362 Q 618 360 628 346 Q 632 328 628 310" fill="#6a4020" opacity=".85"/>
      <!-- Stern, no smile -->
      <ellipse cx="587" cy="307" rx="5.5" ry="4" fill="#1a0e06"/>
      <ellipse cx="613" cy="307" rx="5.5" ry="4" fill="#1a0e06"/>
      <path d="M 591 316 Q 600 320 609 316" fill="none" stroke="#5a3020" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Pointing down gesture -->
      <path d="M 636 292 Q 660 295 672 308" stroke="#c0956a" stroke-width="12" fill="none" stroke-linecap="round"/>
      <!-- Post in courtyard (flogging) -->
      <rect x="585" y="360" width="30" height="100" rx="4" fill="#2a1808"/>
      <rect x="545" y="355" width="110" height="12" rx="3" fill="#3a2810"/>
      ${vig('.72')}
    </svg>`,

    qut_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#090604"/>
      <!-- Courtyard — open sky -->
      ${sun(600,80,'#cc7700')}
      <rect x="0" y="350" width="${W}" height="270" fill="#1a1208"/>
      <!-- Watching crowd silhouettes -->
      ${Array.from({length:22},(_,i)=>`<ellipse cx="${40+i*52}" cy="380" rx="16" ry="${22+Math.sin(i*.7)*4}" fill="#0a0804" opacity="${.7+i*.01}"/>`).join('')}
      <!-- Post -->
      <rect x="585" y="200" width="30" height="180" rx="4" fill="#2a1808"/>
      <rect x="550" y="195" width="100" height="14" rx="3" fill="#3a2810"/>
      <!-- Player bound -->
      <g transform="translate(600,340)">
        <ellipse cx="0" cy="-50" rx="17" ry="19" fill="#c0956a"/>
        <rect x="-16" y="-34" width="32" height="60" rx="3" fill="#2a2010"/>
        <path d="M -10 -34 L -12 -55 L 12 -55 L 10 -34" fill="none" stroke="#9a8060" stroke-width="3"/>
      </g>
      ${vig('.68')}
    </svg>`,

    qut_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1828"/><stop offset="100%" stop-color="#060402"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(18)}${moon(850,70)}
      <!-- Empty street, player walking alone -->
      <rect x="0" y="400" width="${W}" height="220" fill="#1a1208"/>
      ${city_silhouette()}
      ${player_silhouette(600,445,1)}
      <!-- Closed doors, shuttered windows -->
      ${[120,280,440,700,860,1020].map((x,i)=>`<rect x="${x}" y="200" width="80" height="120" rx="2" fill="#0e0a04" stroke="#1a1208" stroke-width="1"/><line x1="${x+10}" y1="200" x2="${x+10}" y2="320" stroke="#0a0802" stroke-width="2" opacity=".5"/>`).join('')}
      <text x="600" y="560" text-anchor="middle" fill="#3e2e18" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".7">Delhi has a long memory.</text>
      ${vig('.75')}
    </svg>`,

    // ── MUHAMMAD TUGHLAQ WIN ──────────────────────────────
    tug_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0e0804"/>
      ${floor()}${carpet()}
      ${torch(140,230,0)}${torch(1060,230,1)}
      ${throne('#ffca28')}
      <!-- Tughlaq laughing — arms gesturing wildly -->
      <ellipse cx="600" cy="295" rx="29" ry="33" fill="#b5845a"/>
      <path d="M 552 328 Q 536 352 532 420 L 668 420 Q 664 352 648 328 Z" fill="#6b2a00"/>
      <ellipse cx="600" cy="274" rx="38" ry="16" fill="#8b3a00"/>
      <!-- Medium beard -->
      <path d="M 571 308 Q 567 328 571 348 Q 581 364 600 367 Q 619 364 629 348 Q 633 328 629 308" fill="#3d2c1a" opacity=".88"/>
      <!-- Big open mouth laugh -->
      <ellipse cx="587" cy="305" rx="6" ry="5" fill="#1a0e06"/>
      <ellipse cx="613" cy="305" rx="6" ry="5" fill="#1a0e06"/>
      <path d="M 590 316 Q 600 308 610 316" fill="#8b3a20" opacity=".6"/>
      <ellipse cx="600" cy="318" rx="10" ry="7" fill="#5a2a18"/>
      <!-- Both arms raised in delight -->
      <path d="M 554 322 Q 525 302 505 280" stroke="#b5845a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M 646 322 Q 675 302 695 280" stroke="#b5845a" stroke-width="14" fill="none" stroke-linecap="round"/>
      <!-- Court flinching -->
      ${[80,160,240,920,1000,1080].map(x=>`<ellipse cx="${x}" cy="445" rx="13" ry="18" fill="#1a1208" opacity=".65"/>`).join('')}
      ${player_silhouette(590,470,0)}
      <radialGradient id="tl" cx="50%" cy="48%" r="45%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".15"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#tl)"/>
      ${vig('.68')}
    </svg>`,

    tug_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0e0804"/>
      ${floor()}${carpet()}
      ${torch(260,255,0)}${torch(940,255,1)}
      <!-- Servant draping golden cape -->
      <g transform="translate(400,360)" fill="#2a2010"><ellipse cx="0" cy="-18" rx="16" ry="18"/><rect x="-18" y="0" width="36" height="65" rx="3"/></g>
      <!-- Cape draped over player shoulders -->
      <g transform="translate(600,400)">
        <ellipse cx="0" cy="-55" rx="18" ry="20" fill="#c8a880"/>
        <path d="M -45 -20 Q -35 10 -25 60 L 25 60 Q 35 10 45 -20 Q 20 -15 0 -14 Q -20 -15 -45 -20 Z" fill="#c9a84c" opacity=".88"/>
        <rect x="-20" y="-38" width="40" height="22" rx="3" fill="#2a2010"/>
      </g>
      <radialGradient id="cl" cx="50%" cy="65%" r="42%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".28"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#cl)"/>
      ${vig('.7')}
    </svg>`,

    tug_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a0c04"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${torch(200,240,0)}${torch(1000,240,1)}
      <!-- Palace corridor — player running -->
      ${Array.from({length:6},(_,i)=>`<rect x="${i*200}" y="0" width="4" height="${H}" fill="#2a1e0a" opacity=".3"/>`).join('')}
      <!-- Player running fast — leaning forward -->
      <g transform="translate(600,430) rotate(-8)">
        <ellipse cx="0" cy="-60" rx="17" ry="19" fill="#c8a880"/>
        <rect x="-17" y="-43" width="34" height="65" rx="3" fill="#2a2010"/>
        <line x1="-17" y1="-24" x2="-38" y2="4" stroke="#2a2010" stroke-width="10" stroke-linecap="round"/>
        <line x1="17" y1="-24" x2="28" y2="-8" stroke="#2a2010" stroke-width="10" stroke-linecap="round"/>
        <line x1="-9" y1="22" x2="-22" y2="58" stroke="#1a1208" stroke-width="11" stroke-linecap="round"/>
        <line x1="9" y1="22" x2="20" y2="55" stroke="#1a1208" stroke-width="11" stroke-linecap="round"/>
        <!-- Cape flowing behind -->
        <path d="M -17 -20 Q -60 0 -80 40 Q -55 20 -17 10" fill="#c9a84c" opacity=".7"/>
      </g>
      <text x="600" y="565" text-anchor="middle" fill="#5a4030" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".8">Run while you still can.</text>
      ${vig('.72')}
    </svg>`,

    // ── MUHAMMAD TUGHLAQ LOSE ─────────────────────────────
    tug_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#0e0804"/>
      ${floor()}${carpet()}
      ${torch(140,230,0)}${torch(1060,230,1)}
      ${throne('#ff7043')}
      <!-- Tughlaq dismissing with a wave, bored -->
      <ellipse cx="600" cy="295" rx="29" ry="33" fill="#b5845a"/>
      <path d="M 552 328 Q 536 352 532 420 L 668 420 Q 664 352 648 328 Z" fill="#6b2a00"/>
      <ellipse cx="600" cy="274" rx="38" ry="16" fill="#8b3a00"/>
      <path d="M 571 308 Q 567 328 571 348 Q 581 364 600 367 Q 619 364 629 348 Q 633 328 629 308" fill="#3d2c1a" opacity=".88"/>
      <ellipse cx="587" cy="305" rx="6" ry="4" fill="#1a0e06"/>
      <ellipse cx="613" cy="305" rx="6" ry="4" fill="#1a0e06"/>
      <path d="M 591 314 Q 600 318 609 314" fill="none" stroke="#5a3020" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Casual dismissal wave -->
      <path d="M 642 298 Q 670 282 686 264" stroke="#b5845a" stroke-width="13" fill="none" stroke-linecap="round"/>
      <ellipse cx="692" cy="259" rx="10" ry="8" fill="#b5845a"/>
      ${player_silhouette(590,470,-1)}
      ${vig('.72')}
    </svg>`,

    tug_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      ${desert()}
      ${sun(600,60,'#ff8c00')}
      <!-- Long march columns -->
      ${Array.from({length:12},(_,i)=>`<g transform="translate(${80+i*95},380)"><ellipse cx="0" cy="-18" rx="12" ry="14" fill="#2a1a08" opacity="${.7+i*.02}"/><rect x="-13" y="0" width="26" height="55" rx="3" fill="${i%3===0?'#2a2010':'#1e1808'}" opacity="${.75+i*.02}"/></g>`).join('')}
      <!-- Chains linking figures -->
      ${Array.from({length:11},(_,i)=>`<line x1="${120+i*95}" y1="395" x2="${175+i*95}" y2="395" stroke="#7a7060" stroke-width="2.5" stroke-dasharray="6,3"/>`).join('')}
      <text x="600" y="560" text-anchor="middle" fill="#5a4030" font-size="14" font-family="Cinzel,serif" letter-spacing="3" opacity=".8">DAULATABAD — 1,500 KM SOUTH</text>
      ${vig('.68')}
    </svg>`,

    tug_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      ${desert()}
      ${sun(1000,80,'#cc6600')}
      <!-- Heat haze effect -->
      <rect x="0" y="350" width="${W}" height="80" fill="#3a1c08" opacity=".3"/>
      <!-- Horizon vanishing point road -->
      <polygon points="560,80 640,80 ${W},${H} 0,${H}" fill="#2a1406" opacity=".5"/>
      <!-- Small figures far ahead, fewer now -->
      ${Array.from({length:6},(_,i)=>`<g transform="translate(${450+i*60},${200+i*30}) scale(${.5+i*.1})"><ellipse cx="0" cy="-12" rx="8" ry="9" fill="#1e1408" opacity=".6"/><rect x="-8" y="0" width="16" height="35" rx="2" fill="#1a1208" opacity=".6"/></g>`).join('')}
      <!-- Player near front, exhausted slouch -->
      <g transform="translate(540,430) rotate(5)">
        <ellipse cx="0" cy="-55" rx="16" ry="18" fill="#b5845a"/>
        <rect x="-16" y="-40" width="32" height="62" rx="3" fill="#1e1808"/>
        <line x1="-16" y1="-22" x2="-28" y2="6" stroke="#1e1808" stroke-width="9" stroke-linecap="round"/>
        <line x1="16" y1="-22" x2="18" y2="6" stroke="#1e1808" stroke-width="9" stroke-linecap="round"/>
        <line x1="-8" y1="22" x2="-10" y2="58" stroke="#1a1208" stroke-width="10" stroke-linecap="round"/>
        <line x1="8" y1="22" x2="12" y2="58" stroke="#1a1208" stroke-width="10" stroke-linecap="round"/>
      </g>
      ${vig('.72')}
    </svg>`,

    // ── ILTUTMISH WIN ─────────────────────────────────────
    ilt_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080806"/>
      ${floor()}${carpet()}
      ${torch(160,238,0)}${torch(1040,238,1)}
      ${throne('#ce93d8')}
      <!-- Iltutmish — impassive, calculating stare -->
      <ellipse cx="600" cy="296" rx="28" ry="32" fill="#a07848"/>
      <path d="M 554 329 Q 538 354 534 420 L 666 420 Q 662 354 646 329 Z" fill="#1e1408"/>
      <ellipse cx="600" cy="275" rx="36" ry="15" fill="#2a1e10"/>
      <!-- Medium beard -->
      <path d="M 572 308 Q 568 328 572 348 Q 582 362 600 365 Q 618 362 628 348 Q 632 328 628 308" fill="#4a3020" opacity=".88"/>
      <!-- Narrow calculating eyes -->
      <ellipse cx="587" cy="304" rx="5.5" ry="3.5" fill="#1a0e06"/>
      <ellipse cx="613" cy="304" rx="5.5" ry="3.5" fill="#1a0e06"/>
      <!-- Flat expression -->
      <path d="M 593 313 Q 600 313 607 313" fill="none" stroke="#5a3020" stroke-width="2" stroke-linecap="round"/>
      <!-- Two word gesture: two fingers -->
      <path d="M 640 294 Q 660 284 672 270" stroke="#a07848" stroke-width="12" fill="none" stroke-linecap="round"/>
      <ellipse cx="677" cy="265" rx="10" ry="8" fill="#a07848"/>
      ${player_silhouette(590,470,0)}
      <!-- Total silence atmosphere -->
      ${[70,160,240,940,1020,1110].map(x=>`<ellipse cx="${x}" cy="448" rx="12" ry="17" fill="#1a1208" opacity=".65"/>`).join('')}
      ${vig('.72')}
    </svg>`,

    ilt_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080806"/>
      ${floor()}${carpet()}
      ${torch(280,255,0)}${torch(920,255,1)}
      <!-- Pouch hitting floor — silver spilling -->
      <path d="M 580 360 Q 595 340 610 360 Q 615 375 610 390 L 590 390 Q 585 375 580 360 Z" fill="#7a8888"/>
      <ellipse cx="600" cy="390" rx="30" ry="10" fill="#8a9898"/>
      <!-- Silver coins on floor -->
      ${Array.from({length:10},(_,i)=>`<circle cx="${545+i*14}" cy="${406+Math.sin(i)*5}" r="7" fill="#90a4ae" opacity="${.6+i*.02}"/>`).join('')}
      <!-- Papers/dispatches on table beside throne -->
      <rect x="720" y="350" width="120" height="80" rx="3" fill="#e8d5b0" opacity=".7"/>
      ${[0,1,2,3].map(j=>`<line x1="730" y1="${364+j*14}" x2="828" y2="${364+j*14}" stroke="#8a7050" stroke-width="1" opacity=".5"/>`).join('')}
      <!-- Sultan already looking at dispatches, not at player -->
      <ellipse cx="780" cy="320" rx="22" ry="26" fill="#a07848"/>
      <radialGradient id="sl" cx="50%" cy="65%" r="38%"><stop offset="0%" stop-color="#b0bec5" stop-opacity=".2"/><stop offset="100%" stop-color="#b0bec5" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#sl)"/>
      ${player_silhouette(560,475,-1)}
      ${vig('.75')}
    </svg>`,

    ilt_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#060604"/>
      ${floor()}${carpet()}
      ${torch(200,242,0)}${torch(1000,242,1)}
      ${arch()}
      <!-- Player backing out carefully — backs to viewer -->
      <g transform="translate(600,440)">
        <ellipse cx="0" cy="-58" rx="17" ry="19" fill="#a07848"/>
        <rect x="-17" y="-42" width="34" height="65" rx="3" fill="#1e1408"/>
        <line x1="-17" y1="-22" x2="-26" y2="8" stroke="#1e1408" stroke-width="9" stroke-linecap="round"/>
        <line x1="17" y1="-22" x2="24" y2="8" stroke="#1e1408" stroke-width="9" stroke-linecap="round"/>
        <line x1="-9" y1="23" x2="-11" y2="58" stroke="#1a1208" stroke-width="11" stroke-linecap="round"/>
        <line x1="9" y1="23" x2="11" y2="58" stroke="#1a1208" stroke-width="11" stroke-linecap="round"/>
      </g>
      <!-- Sultan silhouette watching from throne -->
      <ellipse cx="600" cy="295" rx="22" ry="26" fill="#1a1208" opacity=".85"/>
      <text x="600" y="565" text-anchor="middle" fill="#4a3820" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".75">You do not turn your back on Iltutmish.</text>
      ${vig('.72')}
    </svg>`,

    // ── ILTUTMISH LOSE ────────────────────────────────────
    ilt_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080806"/>
      ${floor()}${carpet()}
      ${torch(180,238,0)}${torch(1020,238,1)}
      ${throne('#b0bec5')}
      <!-- Scales of justice on platform -->
      <line x1="600" y1="320" x2="600" y2="370" stroke="#c9a84c" stroke-width="4"/>
      <line x1="540" y1="340" x2="660" y2="340" stroke="#c9a84c" stroke-width="3"/>
      <ellipse cx="545" cy="342" rx="35" ry="8" fill="#1a1408" stroke="#c9a84c" stroke-width="1.5"/>
      <ellipse cx="655" cy="348" rx="35" ry="8" fill="#1a1408" stroke="#c9a84c" stroke-width="1.5"/>
      <!-- One side lower — tipping against player -->
      <ellipse cx="655" cy="350" rx="25" ry="6" fill="#c9a84c" opacity=".5"/>
      ${player_silhouette(590,460,0)}
      ${vig('.72')}
    </svg>`,

    ilt_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#070505"/>
      ${floor()}
      ${torch(240,250,0)}${torch(960,250,1)}
      <!-- Guards at door of home -->
      ${guard(340,1)}${guard(860,-1)}
      <!-- Household goods being catalogued -->
      <rect x="450" y="380" width="300" height="100" fill="#1a1208" stroke="#2a1e0a" stroke-width="1"/>
      ${[0,1,2,3].map(i=>`<rect x="${465+i*70}" y="388" width="55" height="84" rx="2" fill="#2a1c08" stroke="#1e1408" stroke-width="1"/>`).join('')}
      <text x="600" y="545" text-anchor="middle" fill="#3a2a18" font-size="13" font-family="Cinzel,serif" letter-spacing="2" opacity=".75">PROPERTY SEIZED</text>
      ${vig('.75')}
    </svg>`,

    ilt_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#050504"/>
      <!-- Stone prison cell -->
      ${cell()}
      <!-- Single candle -->
      <g transform="translate(600,320)"><rect x="-4" y="0" width="8" height="30" rx="1" fill="#e8d5b0" opacity=".8"/><g style="animation:torchFlame .9s ease-in-out infinite;transform-origin:0 0"><ellipse cx="0" cy="-8" rx="4" ry="8" fill="#ff9500" opacity=".8"/><ellipse cx="0" cy="-10" rx="2.5" ry="5" fill="#ffcc00" opacity=".7"/></g></g>
      <!-- Player sitting against wall -->
      <g transform="translate(600,440)">
        <ellipse cx="0" cy="-28" rx="16" ry="18" fill="#c8a880"/>
        <rect x="-22" y="-12" width="44" height="40" rx="5" fill="#2a2010"/>
      </g>
      <!-- Wall tally marks -->
      ${Array.from({length:4},(_,i)=>`<line x1="${820+i*16}" y1="310" x2="${820+i*16}" y2="365" stroke="#3a2a18" stroke-width="2.5"/>`).join('')}
      <line x1="808" y1="336" x2="884" y2="336" stroke="#3a2a18" stroke-width="2.5"/>
      ${vig('.8')}
    </svg>`,

    // ── BALBAN WIN ────────────────────────────────────────
    bal_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#060604"/>
      ${floor()}${carpet()}
      ${torch(140,232,0)}${torch(1060,232,1)}
      ${throne('#888')}
      <!-- Balban rising — cold, tall, dark robes -->
      <ellipse cx="600" cy="293" rx="27" ry="31" fill="#a0704a"/>
      <path d="M 556 325 Q 540 350 537 420 L 663 420 Q 660 350 644 325 Z" fill="#141414"/>
      <ellipse cx="600" cy="273" rx="36" ry="14" fill="#1e1e1e"/>
      <!-- Full dark beard -->
      <path d="M 571 305 Q 566 332 569 358 Q 580 378 600 382 Q 620 378 631 358 Q 634 332 629 305" fill="#1a1a1a" opacity=".92"/>
      <!-- Iron stare — half lidded -->
      <ellipse cx="587" cy="302" rx="5.5" ry="3" fill="#1a0e06"/>
      <ellipse cx="613" cy="302" rx="5.5" ry="3" fill="#1a0e06"/>
      <path d="M 592 310 Q 600 310 608 310" fill="none" stroke="#3a2820" stroke-width="2" stroke-linecap="round"/>
      <!-- Rising gesture — one arm on armrest -->
      <path d="M 530 270 Q 510 262 492 255" stroke="#141414" stroke-width="14" fill="none" stroke-linecap="round"/>
      ${player_silhouette(590,470,0)}
      ${vig('.75')}
    </svg>`,

    bal_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#060604"/>
      ${floor()}${carpet()}
      ${torch(300,258,0)}${torch(900,258,1)}
      <!-- Silver coins hitting cold stone floor -->
      ${Array.from({length:12},(_,i)=>`<circle cx="${520+i*16}" cy="${430+Math.sin(i*1.1)*8}" r="9" fill="#90a4ae" opacity="${.55+i*.02}"/>`).join('')}
      ${Array.from({length:6},(_,i)=>`<circle cx="${530+i*26}" cy="418" r="7" fill="#b0bec5" opacity=".7"/>`).join('')}
      <!-- Small pouch tossed aside -->
      <ellipse cx="580" cy="408" rx="28" ry="18" fill="#5a5848"/>
      <!-- No eye contact — cold atmosphere -->
      <text x="600" y="545" text-anchor="middle" fill="#3a3830" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".75">He does not look at you.</text>
      ${player_silhouette(590,470,-1)}
      ${vig('.78')}
    </svg>`,

    bal_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#060604"/>
      ${floor()}${carpet()}
      ${torch(180,240,0)}${torch(1020,240,1)}
      ${arch()}
      <!-- Player backing out, bowing deeply -->
      <g transform="translate(600,440) rotate(25)">
        <ellipse cx="0" cy="-45" rx="16" ry="18" fill="#a07848"/>
        <rect x="-15" y="-30" width="30" height="60" rx="3" fill="#1e1408"/>
        <line x1="-15" y1="-14" x2="-32" y2="12" stroke="#1e1408" stroke-width="9" stroke-linecap="round"/>
        <line x1="15" y1="-14" x2="22" y2="14" stroke="#1e1408" stroke-width="9" stroke-linecap="round"/>
      </g>
      <!-- Balban dark silhouette on throne watching -->
      <ellipse cx="600" cy="295" rx="22" ry="27" fill="#0e0c0a" opacity=".92"/>
      <rect x="555" y="318" width="90" height="80" rx="3" fill="#0e0c0a" opacity=".88"/>
      <text x="600" y="565" text-anchor="middle" fill="#3a3020" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".75">Never. Turn. Your back.</text>
      ${vig('.72')}
    </svg>`,

    // ── BALBAN LOSE ───────────────────────────────────────
    bal_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#050403"/>
      ${floor()}${carpet()}
      ${torch(160,234,0)}${torch(1040,234,1)}
      ${throne('#666')}
      <!-- Balban standing — single finger raised -->
      <ellipse cx="600" cy="293" rx="26" ry="30" fill="#a0704a"/>
      <path d="M 558 325 Q 542 350 539 420 L 661 420 Q 658 350 642 325 Z" fill="#141414"/>
      <ellipse cx="600" cy="273" rx="35" ry="14" fill="#1e1e1e"/>
      <path d="M 571 305 Q 566 330 570 355 Q 580 374 600 378 Q 620 374 630 355 Q 634 330 629 305" fill="#1a1a1a" opacity=".92"/>
      <ellipse cx="587" cy="301" rx="5" ry="2.8" fill="#1a0e06"/>
      <ellipse cx="613" cy="301" rx="5" ry="2.8" fill="#1a0e06"/>
      <!-- One word gesture — single raised finger -->
      <path d="M 642 294 Q 658 278 664 258" stroke="#a0704a" stroke-width="12" fill="none" stroke-linecap="round"/>
      <ellipse cx="665" cy="252" rx="9" ry="7" fill="#a0704a"/>
      <line x1="665" y1="240" x2="665" y2="228" stroke="#a0704a" stroke-width="7" stroke-linecap="round"/>
      ${player_silhouette(590,468,0)}
      ${[80,160,940,1020].map(x=>`<ellipse cx="${x}" cy="448" rx="12" ry="16" fill="#0e0c08" opacity=".82"/>`).join('')}
      ${vig('.78')}
    </svg>`,

    bal_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#040302"/>
      ${stars(10,'.4')}${moon(900,50)}
      <!-- Pre-dawn dark corridor -->
      ${Array.from({length:8},(_,i)=>`<rect x="${i*150}" y="0" width="148" height="${H}" fill="none" stroke="#0e0a04" stroke-width="1" opacity=".4"/>`).join('')}
      <!-- Guards with torches — minimal light -->
      ${torch(280,280,0)}${torch(920,280,1)}
      <!-- Two guard silhouettes -->
      ${guard(380,1)}${guard(820,-1)}
      <!-- Player between them — no ceremony -->
      ${player_silhouette(600,450,0)}
      <!-- Heavy darkness -->
      <text x="600" y="565" text-anchor="middle" fill="#2e2818" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".7">No ceremony. No final words.</text>
      ${vig('.85')}
    </svg>`,

    bal_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#030202"/>
      ${stars(8,'.35')}${moon(1000,45)}
      <!-- The blade — silhouette -->
      <radialGradient id="bl" cx="30%" cy="40%" r="50%"><stop offset="0%" stop-color="#b71c1c" stop-opacity=".15"/><stop offset="100%" stop-color="#b71c1c" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#bl)"/>
      <!-- Blade shape -->
      <path d="M 400 200 L 700 430 L 710 420 L 410 190 Z" fill="#5a5050" opacity=".8"/>
      <path d="M 400 200 L 420 195 L 710 420 L 700 430 Z" fill="#8a8080" opacity=".6"/>
      <!-- Balban distant silhouette, back turned, reading -->
      <ellipse cx="950" cy="355" rx="22" ry="26" fill="#0e0c0a" opacity=".9"/>
      <rect x="928" y="378" width="44" height="65" rx="3" fill="#0e0c0a" opacity=".88"/>
      <text x="600" y="565" text-anchor="middle" fill="#3e2818" font-size="13" font-family="IM Fell English,serif" font-style="italic" opacity=".75">Balban is already reading dispatches.</text>
      ${vig('.85')}
    </svg>`,

    // ── KHALJI WIN ────────────────────────────────────────
    kha_win_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <radialGradient id="bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#160820"/><stop offset="100%" stop-color="#060408"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${floor()}${carpet()}
      ${torch(140,232,0)}${torch(1060,232,1)}
      ${throne('#9933cc')}
      <!-- Khilji — paranoid hawk stare — long black beard, purple robes -->
      <ellipse cx="600" cy="294" rx="28" ry="32" fill="#96613e"/>
      <path d="M 554 328 Q 538 352 534 420 L 666 420 Q 662 352 646 328 Z" fill="#1e0038"/>
      <ellipse cx="600" cy="273" rx="37" ry="16" fill="#2e004e"/>
      <!-- Long dark beard -->
      <path d="M 568 306 Q 560 336 562 370 Q 573 396 600 404 Q 627 396 638 370 Q 640 336 632 306" fill="#0a0a0a" opacity=".92"/>
      <!-- Hawk eyes — narrow, intense -->
      <ellipse cx="586" cy="301" rx="5.5" ry="3" fill="#1a0e06"/>
      <ellipse cx="614" cy="301" rx="5.5" ry="3" fill="#1a0e06"/>
      <ellipse cx="587" cy="300" rx="2" ry="2" fill="#cc88ff" opacity=".5"/>
      <ellipse cx="615" cy="300" rx="2" ry="2" fill="#cc88ff" opacity=".5"/>
      <path d="M 592 310 Q 600 308 608 310" fill="none" stroke="#4a3828" stroke-width="2" stroke-linecap="round"/>
      ${player_silhouette(590,470,0)}
      ${vig('.72')}
    </svg>`,

    kha_win_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <radialGradient id="bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#160820"/><stop offset="100%" stop-color="#060408"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${floor()}${carpet()}
      ${torch(260,252,0)}${torch(940,252,1)}
      <!-- Empty, silent court — one word echoing -->
      ${[80,160,240,320,880,960,1040,1120].map(x=>`<ellipse cx="${x}" cy="445" rx="11" ry="16" fill="#0e0c10" opacity=".75"/>`).join('')}
      <!-- Large text "LEAVE." in purple -->
      <text x="600" y="320" text-anchor="middle" fill="#9933cc" font-size="72" font-family="Cinzel Decorative,serif" font-weight="900" letter-spacing="8" opacity=".88">LEAVE.</text>
      <text x="600" y="400" text-anchor="middle" fill="#5a3888" font-size="18" font-family="IM Fell English,serif" font-style="italic" opacity=".65">— Alauddin Khilji</text>
      ${vig('.65')}
    </svg>`,

    kha_win_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1828"/><stop offset="100%" stop-color="#070503"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(28)}${moon(850,62)}
      ${city_silhouette()}
      <!-- Delhi market, dawn -->
      <rect x="0" y="400" width="${W}" height="220" fill="#1a1208"/>
      <!-- Player in street, alone, small figure -->
      ${player_silhouette(600,448,1)}
      <radialGradient id="al" cx="50%" cy="72%" r="35%"><stop offset="0%" stop-color="#9933cc" stop-opacity=".14"/><stop offset="100%" stop-color="#9933cc" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#al)"/>
      <text x="600" y="565" text-anchor="middle" fill="#5a3888" font-size="14" font-family="IM Fell English,serif" font-style="italic" opacity=".8">Against all probability — alive.</text>
      ${vig('.68')}
    </svg>`,

    // ── KHALJI LOSE ───────────────────────────────────────
    kha_lose_0: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080202"/>
      ${floor()}${carpet()}
      ${torch(140,232,0)}${torch(1060,232,1)}
      ${throne('#880e4f')}
      <!-- Khilji standing — full menace, purple and black -->
      <ellipse cx="600" cy="290" rx="28" ry="32" fill="#96613e"/>
      <path d="M 552 324 Q 535 348 531 420 L 669 420 Q 665 348 648 324 Z" fill="#1e0038"/>
      <ellipse cx="600" cy="268" rx="38" ry="16" fill="#2e004e"/>
      <path d="M 566 304 Q 558 336 560 372 Q 572 400 600 408 Q 628 400 640 372 Q 642 336 634 304" fill="#0a0a0a" opacity=".92"/>
      <path d="M 578 263 Q 600 271 622 263 Q 612 254 600 256 Q 588 254 578 263" fill="#0a0a0a" opacity=".7"/>
      <!-- Eyes of absolute fury — glowing almost -->
      <ellipse cx="586" cy="299" rx="5.5" ry="4" fill="#880e4f"/>
      <ellipse cx="614" cy="299" rx="5.5" ry="4" fill="#880e4f"/>
      <ellipse cx="587" cy="298" rx="2.5" ry="2.5" fill="#cc0044" opacity=".8"/>
      <ellipse cx="615" cy="298" rx="2.5" ry="2.5" fill="#cc0044" opacity=".8"/>
      <!-- Standing, both fists -->
      <ellipse cx="520" cy="335" rx="11" ry="9" fill="#96613e"/>
      <ellipse cx="680" cy="335" rx="11" ry="9" fill="#96613e"/>
      ${player_silhouette(590,468,0)}
      ${[60,140,220,960,1040,1120].map(x=>`<ellipse cx="${x}" cy="448" rx="12" ry="17" fill="#0e0a08" opacity=".8"/>`).join('')}
      ${vig('.72')}
    </svg>`,

    kha_lose_1: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="${W}" height="${H}" fill="#080202"/>
      ${sun(600,60,'#cc0022')}
      <!-- Open courtyard — harsh light -->
      <rect x="0" y="380" width="${W}" height="240" fill="#1a0808"/>
      <!-- Watching crowd — dense -->
      ${Array.from({length:20},(_,i)=>`<ellipse cx="${30+i*58}" cy="415" rx="${10+Math.sin(i*.7)*3}" ry="${18+Math.sin(i*.5)*4}" fill="#0e0806" opacity="${.65+i*.015}"/>`).join('')}
      <!-- Centre: post and figure -->
      <rect x="590" y="250" width="20" height="170" rx="3" fill="#2a1808"/>
      <rect x="550" y="245" width="100" height="14" rx="3" fill="#3a2010"/>
      <!-- Khilji watching from balcony above -->
      <ellipse cx="600" cy="185" rx="22" ry="26" fill="#2e004e" opacity=".9"/>
      <rect x="578" y="208" width="44" height="50" rx="3" fill="#2e004e" opacity=".88"/>
      ${vig('.7')}
    </svg>`,

    kha_lose_2: `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e0204"/><stop offset="100%" stop-color="#060102"/></linearGradient>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      ${stars(15,'.4')}${moon(900,55)}
      ${city_silhouette()}
      <!-- Nighttime Delhi — whispers everywhere -->
      <rect x="0" y="400" width="${W}" height="220" fill="#1a0808"/>
      <!-- Small figures whispering in pairs across the scene -->
      ${[150,400,700,950].map((x,i)=>`<ellipse cx="${x}" cy="448" rx="12" ry="16" fill="#0e0806" opacity=".7"/><ellipse cx="${x+35}" cy="448" rx="12" ry="16" fill="#0e0806" opacity=".7"/>`).join('')}
      <radialGradient id="rl" cx="50%" cy="70%" r="40%"><stop offset="0%" stop-color="#880e4f" stop-opacity=".12"/><stop offset="100%" stop-color="#880e4f" stop-opacity="0"/></radialGradient>
      <rect width="${W}" height="${H}" fill="url(#rl)"/>
      <text x="600" y="565" text-anchor="middle" fill="#5a1828" font-size="14" font-family="IM Fell English,serif" font-style="italic" opacity=".85">Your name becomes a warning. Forever.</text>
      ${vig('.75')}
    </svg>`,
  };

  const sceneKey = `${key}_${sceneIdx}`;
  return SCENES[sceneKey] || `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#070503"/>${vig()}</svg>`;
}

export { DIFFS, ENDINGS, EVIDENCE_TYPES, CROWD, INTRO_STEPS, buildEndingScene };
