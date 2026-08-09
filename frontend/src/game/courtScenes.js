/* Verbatim port from original delhi-court HTML — balance & visuals preserved exactly. */

// ═══════════════════════════════════════════════════
//  COURT SVG  — full ultra-realistic Delhi Sultanate
// ═══════════════════════════════════════════════════
function buildCourtSVG(d, mood) {
  const mc={neutral:'#c9a84c',pleased:'#4a9e5c',suspicious:'#d4872a',angry:'#c04040',amused:'#3a7abd',thoughtful:'#9933cc'}[mood]||'#c9a84c';
  const bY={neutral:0,pleased:-4,suspicious:5,angry:8,amused:-5,thoughtful:4}[mood]||0;
  const eH={neutral:1,pleased:1.2,suspicious:.58,angry:.62,amused:1.25,thoughtful:.78}[mood]||1;
  const mD={neutral:0,pleased:-6,suspicious:3,angry:7,amused:-8,thoughtful:2}[mood]||0;

  return `<svg viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
<defs>
<linearGradient id="gsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1e3a"/><stop offset="100%" stop-color="#060c14"/></linearGradient>
<linearGradient id="gwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a0a"/><stop offset="50%" stop-color="#1a1006"/><stop offset="100%" stop-color="#0e0a04"/></linearGradient>
<linearGradient id="gfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2e2010"/><stop offset="100%" stop-color="#0e0a04"/></linearGradient>
<linearGradient id="gceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e0a04"/><stop offset="100%" stop-color="#1e1408"/></linearGradient>
<linearGradient id="ggold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd700"/><stop offset="50%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#8b6914"/></linearGradient>
<linearGradient id="gcarpet" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#8b0000"/><stop offset="35%" stop-color="#a01010"/><stop offset="65%" stop-color="#7a0000"/><stop offset="100%" stop-color="#600000"/></linearGradient>
<linearGradient id="gcol" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2a1c0a"/><stop offset="30%" stop-color="#4e3818"/><stop offset="65%" stop-color="#3a2a10"/><stop offset="100%" stop-color="#1e1408"/></linearGradient>
<linearGradient id="gthrone" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffd700"/><stop offset="50%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#7a5c10"/></linearGradient>
<linearGradient id="grobe" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${d.robeMain}"/><stop offset="100%" stop-color="${d.robeAccent}"/></linearGradient>
<linearGradient id="gchhatri" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd700"/><stop offset="40%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#8b6914"/></linearGradient>
<linearGradient id="gdl" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#8b1a00"/><stop offset="100%" stop-color="#6b1400"/></linearGradient>
<linearGradient id="gdr" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#6b1400"/><stop offset="100%" stop-color="#8b1a00"/></linearGradient>
<radialGradient id="rtglow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".28"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
<radialGradient id="rtorch" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff8c00" stop-opacity=".5"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient>
<radialGradient id="rvig" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".78"/></radialGradient>
<radialGradient id="ramb" cx="50%" cy="35%" r="60%"><stop offset="0%" stop-color="#c9a84c" stop-opacity=".07"/><stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/></radialGradient>
<radialGradient id="rarch" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".1"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
<pattern id="pmarble" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="url(#gfloor)"/><line x1="0" y1="30" x2="60" y2="30" stroke="#140e04" stroke-width=".7" opacity=".7"/><line x1="30" y1="0" x2="30" y2="60" stroke="#140e04" stroke-width=".7" opacity=".7"/><rect x="26" y="26" width="8" height="8" fill="#241808" opacity=".35"/></pattern>
<pattern id="pcarpet" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="url(#gcarpet)"/><rect x="2" y="2" width="10" height="10" fill="none" stroke="#ffd700" stroke-width=".5" opacity=".22"/><rect x="18" y="18" width="10" height="10" fill="none" stroke="#ffd700" stroke-width=".5" opacity=".22"/><circle cx="15" cy="15" r="4" fill="none" stroke="#ffd700" stroke-width=".55" opacity=".18"/><circle cx="15" cy="15" r="1.5" fill="#ffd700" opacity=".18"/><rect x="0" y="0" width="4" height="4" fill="#ffd700" opacity=".09"/><rect x="26" y="0" width="4" height="4" fill="#ffd700" opacity=".09"/><rect x="0" y="26" width="4" height="4" fill="#ffd700" opacity=".09"/><rect x="26" y="26" width="4" height="4" fill="#ffd700" opacity=".09"/></pattern>
<pattern id="pjali" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="none"/><circle cx="20" cy="20" r="8" fill="none" stroke="#3a2810" stroke-width="1.5"/><circle cx="20" cy="20" r="3" fill="#2a1e0a" opacity=".55"/><line x1="20" y1="0" x2="20" y2="12" stroke="#3a2810" stroke-width="1.5"/><line x1="20" y1="28" x2="20" y2="40" stroke="#3a2810" stroke-width="1.5"/><line x1="0" y1="20" x2="12" y2="20" stroke="#3a2810" stroke-width="1.5"/><line x1="28" y1="20" x2="40" y2="20" stroke="#3a2810" stroke-width="1.5"/><line x1="0" y1="0" x2="13" y2="13" stroke="#2a1e0a" stroke-width=".8" opacity=".4"/><line x1="27" y1="27" x2="40" y2="40" stroke="#2a1e0a" stroke-width=".8" opacity=".4"/></pattern>
<pattern id="pstone" width="80" height="50" patternUnits="userSpaceOnUse"><rect width="80" height="50" fill="url(#gwall)"/><rect x="1" y="1" width="78" height="23" rx="1" fill="none" stroke="#1a1006" stroke-width=".8" opacity=".55"/><rect x="41" y="26" width="38" height="23" rx="1" fill="none" stroke="#1a1006" stroke-width=".8" opacity=".55"/><rect x="1" y="26" width="38" height="23" rx="1" fill="none" stroke="#1a1006" stroke-width=".8" opacity=".55"/></pattern>
<pattern id="pceil" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="url(#gceil)"/><polygon points="40,4 76,22 76,62 40,76 4,62 4,22" fill="none" stroke="#2a1e0a" stroke-width="1" opacity=".5"/><polygon points="40,14 68,26 68,56 40,66 12,56 12,26" fill="none" stroke="#221608" stroke-width=".7" opacity=".38"/><circle cx="40" cy="40" r="6" fill="none" stroke="#2a1e0a" stroke-width=".8" opacity=".45"/><circle cx="40" cy="40" r="2" fill="#2a1e0a" opacity=".38"/></pattern>
<filter id="fglow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="fsoft"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="1200" height="620" fill="url(#ramb)"/>
<!-- SKY -->
<ellipse cx="600" cy="100" rx="180" ry="145" fill="url(#gsky)"/>
${[[530,35],[558,20],[592,28],[618,18],[645,38],[568,52],[622,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.3" fill="#fff" opacity=".65"/>`).join('')}
<circle cx="638" cy="28" r="14" fill="#d4c8a8" opacity=".75"/>
<circle cx="645" cy="24" r="12" fill="#0e1e3a" opacity=".82"/>
<g opacity=".52" filter="url(#fsoft)">
  <rect x="530" y="180" width="140" height="170" fill="#0a1428"/>
  <polygon points="600,130 530,180 670,180" fill="#0a1428"/>
  <circle cx="600" cy="128" r="14" fill="#0e1e3a"/>
  <rect x="500" y="195" width="28" height="155" fill="#0a1428"/>
  <polygon points="514,182 500,198 528,198" fill="#0a1428"/>
  <rect x="672" y="195" width="28" height="155" fill="#0a1428"/>
  <polygon points="686,182 672,198 700,198" fill="#0a1428"/>
  ${[548,565,582,618,635,652].map(x=>`<ellipse cx="${x}" cy="175" rx="11" ry="17" fill="#0d2010" opacity=".7"/>`).join('')}
</g>
<!-- CEILING -->
<rect x="0" y="0" width="1200" height="160" fill="url(#pceil)"/>
<rect x="0" y="0" width="1200" height="160" fill="url(#gceil)" opacity=".42"/>
<rect x="0" y="156" width="1200" height="5" fill="url(#ggold)" opacity=".52"/>
${[200,400,600,800,1000].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="160" stroke="#2a1e0a" stroke-width="1.2" opacity=".3"/>`).join('')}
${[100,300,600,900,1100].map(x=>`<polygon points="${x},15 ${x+17},34 ${x},48 ${x-17},34" fill="none" stroke="#3a2810" stroke-width="1" opacity=".5"/><circle cx="${x}" cy="31" r="3.5" fill="#2a1e0a" opacity=".45"/>`).join('')}
<!-- LANTERNS -->
${[140,320,600,880,1060].map((x,i)=>`<g style="animation:lanternSway ${2.2+i*.4}s ease-in-out infinite;transform-origin:${x}px 0px"><line x1="${x}" y1="0" x2="${x}" y2="66" stroke="#6a4818" stroke-width="2" stroke-dasharray="5,3"/><g style="animation:flicker ${1.5+i*.3}s ease-in-out infinite"><rect x="${x-11}" y="66" width="22" height="6" rx="2" fill="url(#ggold)"/><rect x="${x-13}" y="72" width="26" height="30" rx="4" fill="#241808" stroke="#c9a84c" stroke-width="1"/><rect x="${x-9}" y="76" width="18" height="22" rx="2" fill="#ff9500" opacity=".32"/><rect x="${x-11}" y="102" width="22" height="6" rx="2" fill="url(#ggold)"/><ellipse cx="${x}" cy="88" rx="26" ry="18" fill="#ff9500" opacity=".09"/><line x1="${x-6}" y1="66" x2="${x-6}" y2="56" stroke="#8b6030" stroke-width="1.5"/><line x1="${x+6}" y1="66" x2="${x+6}" y2="56" stroke="#8b6030" stroke-width="1.5"/></g></g>`).join('')}
<!-- WALLS -->
<rect x="0" y="0" width="1200" height="620" fill="url(#pstone)"/>
<rect x="0" y="0" width="1200" height="620" fill="url(#gwall)" opacity=".52"/>
<rect x="0" y="160" width="220" height="300" fill="url(#pjali)" opacity=".55"/>
<rect x="980" y="160" width="220" height="300" fill="url(#pjali)" opacity=".55"/>
<rect x="0" y="155" width="1200" height="7" fill="#2a1e0a" opacity=".38"/>
<rect x="0" y="438" width="1200" height="6" fill="#2a1e0a" opacity=".28"/>
<!-- SIDE ARCHES -->
<path d="M 30 450 Q 30 200 155 165 Q 280 200 280 450" fill="#0a0602" opacity=".78"/><path d="M 30 452 Q 30 194 155 159 Q 280 194 280 452" fill="none" stroke="url(#ggold)" stroke-width="5"/><path d="M 42 452 Q 42 208 155 175 Q 268 208 268 452" fill="none" stroke="#3a2810" stroke-width="1.5"/>
<path d="M 1170 450 Q 1170 200 1045 165 Q 920 200 920 450" fill="#0a0602" opacity=".78"/><path d="M 1170 452 Q 1170 194 1045 159 Q 920 194 920 452" fill="none" stroke="url(#ggold)" stroke-width="5"/><path d="M 1158 452 Q 1158 208 1045 175 Q 932 208 932 452" fill="none" stroke="#3a2810" stroke-width="1.5"/>
<!-- GRAND ARCH -->
<path d="M 370 460 Q 370 40 600 40 Q 830 40 830 460" fill="#080604" opacity=".84"/>
<ellipse cx="600" cy="250" rx="250" ry="200" fill="url(#rarch)"/>
<path d="M 370 462 Q 370 34 600 34 Q 830 34 830 462" fill="none" stroke="url(#ggold)" stroke-width="9"/>
<path d="M 378 462 Q 378 48 600 48 Q 822 48 822 462" fill="none" stroke="#3a2810" stroke-width="2.5"/>
<path d="M 386 462 Q 386 58 600 58 Q 814 58 814 462" fill="none" stroke="#ffd700" stroke-width=".8" opacity=".28"/>
<path d="M 360 462 Q 360 24 600 24 Q 840 24 840 462" fill="none" stroke="#2a1e0a" stroke-width="3"/>
<g transform="translate(600,38)" filter="url(#fglow)"><polygon points="0,-18 -12,-5 -8,8 8,8 12,-5" fill="#ffd700"/><circle cx="0" cy="-2" r="5" fill="#fff" opacity=".38"/><line x1="0" y1="-18" x2="0" y2="-30" stroke="#ffd700" stroke-width="2.5"/><polygon points="0,-36 -5,-29 5,-29" fill="#ffd700"/></g>
<!-- FLOOR -->
<rect x="0" y="450" width="1200" height="170" fill="url(#pmarble)"/>
<rect x="0" y="449" width="1200" height="4" fill="#3a2810" opacity=".55"/>
<!-- CARPET -->
<rect x="0" y="450" width="1200" height="170" fill="url(#pcarpet)" opacity=".82"/>
<rect x="0" y="450" width="1200" height="170" fill="none" stroke="#ffd700" stroke-width="3" opacity=".28"/>
<rect x="8" y="458" width="1184" height="154" fill="none" stroke="#ffd700" stroke-width="1" opacity=".14"/>
<ellipse cx="600" cy="535" rx="120" ry="50" fill="none" stroke="#ffd700" stroke-width="1.5" opacity=".22"/>
<ellipse cx="600" cy="535" rx="80" ry="33" fill="none" stroke="#ffd700" stroke-width="1" opacity=".18"/>
<!-- THRONE PLATFORM -->
<rect x="460" y="380" width="280" height="75" rx="3" fill="#1e1408"/><rect x="460" y="380" width="280" height="75" fill="url(#pcarpet)" opacity=".68"/><rect x="460" y="380" width="280" height="4" fill="url(#ggold)" opacity=".48"/>
<rect x="473" y="352" width="254" height="32" rx="2" fill="#281c0a"/><rect x="473" y="352" width="254" height="32" fill="url(#pcarpet)" opacity=".58"/><rect x="473" y="352" width="254" height="3" fill="url(#ggold)" opacity=".38"/>
<rect x="488" y="330" width="224" height="25" rx="2" fill="#342610"/><rect x="488" y="330" width="224" height="25" fill="url(#pcarpet)" opacity=".48"/><rect x="488" y="330" width="224" height="3" fill="url(#ggold)" opacity=".33"/>
<!-- THRONE -->
<ellipse cx="600" cy="260" rx="130" ry="110" fill="url(#rtglow)"/>
<rect x="538" y="265" width="124" height="68" rx="5" fill="#1a1006" stroke="url(#gthrone)" stroke-width="2.5"/>
<rect x="541" y="268" width="118" height="62" rx="3" fill="${d.robeAccent}" opacity=".28"/>
<rect x="530" y="262" width="16" height="72" rx="4" fill="#2e1e08" stroke="#c9a84c" stroke-width="1.2"/>
<rect x="654" y="262" width="16" height="72" rx="4" fill="#2e1e08" stroke="#c9a84c" stroke-width="1.2"/>
<circle cx="538" cy="259" r="7" fill="url(#ggold)"/><circle cx="662" cy="259" r="7" fill="url(#ggold)"/>
<rect x="532" y="188" width="136" height="80" rx="7" fill="#140e06" stroke="url(#gthrone)" stroke-width="2.5"/>
<path d="M 532 204 Q 600 155 668 204" fill="#140e06" stroke="url(#ggold)" stroke-width="2.5"/>
${[545,565,585].map(x=>`<line x1="${x}" y1="210" x2="${x}" y2="265" stroke="#c9a84c" stroke-width=".6" opacity=".28"/>`).join('')}
${[625,640,655].map(x=>`<line x1="${x}" y1="210" x2="${x}" y2="265" stroke="#c9a84c" stroke-width=".6" opacity=".28"/>`).join('')}
<circle cx="600" cy="167" r="10" fill="url(#ggold)" filter="url(#fsoft)"/><line x1="600" y1="157" x2="600" y2="142" stroke="#ffd700" stroke-width="2.5"/><polygon points="600,134 594,143 606,143" fill="#ffd700"/><circle cx="600" cy="134" r="4" fill="url(#ggold)"/>
<circle cx="535" cy="185" r="5" fill="url(#ggold)"/><circle cx="665" cy="185" r="5" fill="url(#ggold)"/>
<!-- CHHATRI -->
<line x1="600" y1="155" x2="600" y2="360" stroke="url(#ggold)" stroke-width="5"/>
<rect x="596" y="155" width="8" height="205" fill="url(#ggold)" opacity=".38"/>
<path d="M 440 230 Q 450 190 520 178 Q 560 170 600 168 Q 640 170 680 178 Q 750 190 760 230 Z" fill="url(#gchhatri)"/>
${[440,470,500,530,560,590,620,650,680,710,740,760].map(x=>`<line x1="${x}" y1="230" x2="${(x-600)*.55+600}" y2="170" stroke="#8b6914" stroke-width="1.2" opacity=".48"/>`).join('')}
<path d="M 440 230 Q 450 218 600 212 Q 750 218 760 230 Z" fill="#8b6914" opacity=".38"/>
${Array.from({length:33},(_,i)=>`<line x1="${440+i*10}" y1="230" x2="${440+i*10+(i%2?4:-4)}" y2="246" stroke="#c9a84c" stroke-width="2"/>`).join('')}
<circle cx="600" cy="162" r="8" fill="url(#ggold)" filter="url(#fglow)"/><polygon points="600,145 594,157 606,157" fill="#ffd700"/>
<!-- CURTAINS -->
<path d="M 0 0 Q 50 100 30 300 Q 20 400 0 450 L 0 0 Z" fill="url(#gdl)" opacity=".78"/><path d="M 0 0 Q 80 80 60 200 Q 50 300 20 380" fill="none" stroke="#ffd700" stroke-width="1.5" opacity=".28"/>
<path d="M 1200 0 Q 1150 100 1170 300 Q 1180 400 1200 450 L 1200 0 Z" fill="url(#gdr)" opacity=".78"/><path d="M 1200 0 Q 1120 80 1140 200 Q 1150 300 1180 380" fill="none" stroke="#ffd700" stroke-width="1.5" opacity=".28"/>
<!-- COLUMNS -->
${[165,310,490,710,890,1035].map((x,i)=>`
<rect x="${x-22}" y="158" width="44" height="298" fill="url(#gcol)"/>
${[-16,-9,-2,5,12,19].map(o=>`<line x1="${x+o}" y1="162" x2="${x+o}" y2="452" stroke="#100a04" stroke-width=".7" opacity=".38"/>`).join('')}
<rect x="${x-24}" y="198" width="48" height="7" rx="1" fill="url(#ggold)" opacity=".58"/>
<rect x="${x-24}" y="318" width="48" height="7" rx="1" fill="url(#ggold)" opacity=".58"/>
<rect x="${x-26}" y="450" width="52" height="16" rx="2" fill="url(#gcol)"/>
<rect x="${x-28}" y="464" width="56" height="7" rx="1" fill="url(#ggold)" opacity=".43"/>
<rect x="${x-28}" y="148" width="56" height="14" rx="2" fill="url(#gcol)"/>
<rect x="${x-24}" y="144" width="48" height="9" rx="1" fill="url(#ggold)" opacity=".52"/>
<path d="M ${x-18} 151 Q ${x} 136 ${x+18} 151" fill="none" stroke="#c9a84c" stroke-width="2"/>
`).join('')}
<!-- TORCHES -->
${[88,248,952,1112].map((x,i)=>`
<g transform="translate(${x},235)">
  <rect x="-8" y="5" width="16" height="26" rx="3" fill="#3a2810"/>
  <rect x="-9" y="2" width="18" height="8" rx="2" fill="#8b6030"/>
  <g style="animation:torchFlame ${.9+i*.2}s ease-in-out infinite;transform-origin:0 5px">
    <ellipse cx="0" cy="-14" rx="8" ry="17" fill="#ff6200" opacity=".9"/>
    <ellipse cx="0" cy="-18" rx="5.5" ry="11" fill="#ffaa00" opacity=".82"/>
    <ellipse cx="0" cy="-22" rx="3" ry="6" fill="#ffe000" opacity=".75"/>
  </g>
  <ellipse cx="0" cy="-4" rx="38" ry="28" fill="url(#rtorch)" opacity=".88"/>
  <rect x="-10" y="28" width="20" height="4" rx="1" fill="#c9a84c" opacity=".38"/>
</g>`).join('')}
<!-- SEATED ULEMAS LEFT -->
${[60,108,152,192,230,265,298].map((x,i)=>`
<g transform="translate(${x},${415+Math.abs(i-3)*7})" opacity="${.9-i*.04}">
  <ellipse cx="0" cy="30" rx="21" ry="11" fill="${['#e8e0d0','#ddd8cc','#f0e8dc','#e0d8c8','#dcd4c4','#e8ddd0','#d8d0c0'][i]}" opacity=".65"/>
  <path d="M -20 5 Q -24 20 -22 40 L 22 40 Q 24 20 20 5 Z" fill="${['#e8e0d0','#282018','#e0d8c8','#2a2018','#dcd4c4','#e8ddd0','#201c10'][i]}" stroke="#2e2010" stroke-width=".4"/>
  <ellipse cx="0" cy="-12" rx="12" ry="14" fill="${['#c8a880','#b87858','#c0a068','#b88060','#c0a878','#b87858','#c8a880'][i]}"/>
  ${i<3?`<ellipse cx="0" cy="-22" rx="15" ry="7" fill="#f0e8dc"/><ellipse cx="0" cy="-25" rx="12" ry="5" fill="#e8e0d0"/><ellipse cx="0" cy="-28" rx="8" ry="3.5" fill="#f5f0e8"/>`:`<ellipse cx="0" cy="-22" rx="14" ry="6" fill="${['','','','#c94020','#2040a0','#20a050','#a04020'][i]}"/><ellipse cx="0" cy="-25" rx="11" ry="4.5" fill="${['','','','#a83518','#182e80','#188040','#803018'][i]}"/>`}
  <path d="M -8 -6 Q -10 5 0 9 Q 10 5 8 -6" fill="${['#a08860','#6a4020','#9a7848','#5a3010','#8a6838','#6a4020','#9a7848'][i]}" opacity=".72"/>
  ${i<3?`<g transform="translate(${i===0?-24:i===1?-22:-20},12) rotate(${i===0?-15:i===1?-10:-5})"><rect x="-9" y="-7" width="18" height="24" rx="2" fill="#4a3010" stroke="#8b6914" stroke-width=".8"/>${[0,3,6,9].map(y=>`<line x1="-6" y1="${y-5}" x2="6" y2="${y-5}" stroke="#c9a84c" stroke-width=".5" opacity=".45"/>`).join('')}</g>`:''}
</g>`).join('')}
<!-- SEATED NOBLES RIGHT -->
${[1138,1088,1043,1003,965,929,895].map((x,i)=>`
<g transform="translate(${x},${415+Math.abs(i-3)*7})" opacity="${.9-i*.04}">
  <ellipse cx="0" cy="30" rx="21" ry="11" fill="${['#8b4a20','#204880','#186030','#6030a0','#802020','#204040','#605020'][i]}" opacity=".48"/>
  <path d="M -20 5 Q -24 20 -22 40 L 22 40 Q 24 20 20 5 Z" fill="${['#8b4a20','#204880','#186030','#6030a0','#802020','#204040','#605020'][i]}" stroke="#2e1e08" stroke-width=".4"/>
  <path d="M -14 5 Q -17 18 -16 40 L 16 40 Q 17 18 14 5 Z" fill="${['#ffd700','#4a80c0','#30a060','#9050c0','#c04040','#408080','#a09040'][i]}" opacity=".22"/>
  <ellipse cx="0" cy="-12" rx="12" ry="14" fill="${['#c0905a','#b08050','#b89060','#c0a070','#b07850','#b09060','#c09858'][i]}"/>
  <ellipse cx="0" cy="-22" rx="15" ry="7" fill="${['#c94020','#204880','#186030','#6030a0','#802020','#204040','#605020'][i]}"/>
  <ellipse cx="0" cy="-25" rx="12" ry="5" fill="${['#a83518','#182e80','#188040','#503080','#601818','#183438','#504018'][i]}"/>
  <ellipse cx="0" cy="-28" rx="8" ry="3.5" fill="${['#c94020','#204880','#186030','#6030a0','#802020','#204040','#605020'][i]}"/>
  ${i<3?`<circle cx="0" cy="-28" r="3" fill="${['#ffd700','#4a80ff','#40ff80'][i]}" opacity=".75"/>`:''}
  <path d="M -8 -6 Q -10 5 0 9 Q 10 5 8 -6" fill="#4a2810" opacity=".68"/>
  ${i===1?`<path d="M 18 10 Q 38 4 55 -6" stroke="#b08050" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="55" cy="-6" rx="7" ry="6" fill="#b08050"/><line x1="55" y1="-6" x2="68" y2="-14" stroke="#b08050" stroke-width="4.5" stroke-linecap="round"/><g transform="translate(-20,16) rotate(-12)"><rect x="-3" y="-14" width="8" height="28" rx="2" fill="#e8d5b0"/><rect x="-4" y="-16" width="10" height="6" rx="1" fill="#c9a84c"/></g>`:''}
  ${i===6?`<rect x="-22" y="-28" width="44" height="44" rx="2" fill="#4a4a4a" stroke="#666" stroke-width="1"/><ellipse cx="0" cy="-30" rx="14" ry="8" fill="#555"/>`:''}
</g>`).join('')}
<!-- FOREGROUND DEPTH FIGURES -->
<g transform="translate(200,530)" opacity=".85"><ellipse cx="0" cy="-8" rx="35" ry="21" fill="#c94020" opacity=".68"/><ellipse cx="0" cy="-26" rx="15" ry="9" fill="#c94020"/><ellipse cx="0" cy="-30" rx="12" ry="7" fill="#a83518"/></g>
<g transform="translate(130,545)" opacity=".72"><ellipse cx="0" cy="-8" rx="29" ry="17" fill="#f0e8dc" opacity=".75"/><ellipse cx="0" cy="-22" rx="13" ry="8" fill="#f0e8dc"/><ellipse cx="0" cy="-26" rx="10" ry="6" fill="#e8e0d0"/></g>
<g transform="translate(1002,530)" opacity=".85"><ellipse cx="0" cy="-8" rx="35" ry="21" fill="#204880" opacity=".68"/><ellipse cx="0" cy="-26" rx="15" ry="9" fill="#204880"/><ellipse cx="0" cy="-30" rx="12" ry="7" fill="#182e80"/></g>
<g transform="translate(1070,545)" opacity=".72"><ellipse cx="0" cy="-8" rx="29" ry="17" fill="#186030" opacity=".75"/><ellipse cx="0" cy="-22" rx="13" ry="8" fill="#186030"/><ellipse cx="0" cy="-26" rx="10" ry="6" fill="#104820"/></g>
<!-- BRASS VESSELS -->
<g transform="translate(378,492)"><ellipse cx="0" cy="10" rx="15" ry="5" fill="#6a5010" opacity=".55"/><path d="M -11 10 Q -14 -2 -8 -20 Q 0 -28 8 -20 Q 14 -2 11 10" fill="url(#ggold)"/><ellipse cx="0" cy="-20" rx="7" ry="4" fill="url(#ggold)"/><path d="M -11 -4 Q -20 -12 -16 -2" fill="none" stroke="url(#ggold)" stroke-width="2.5"/></g>
<g transform="translate(600,512)"><ellipse cx="0" cy="0" rx="55" ry="15" fill="url(#ggold)" opacity=".58"/><ellipse cx="0" cy="-3" rx="48" ry="11" fill="#b08a28" opacity=".32"/>${[-24,0,24].map(dx=>`<ellipse cx="${dx}" cy="-6" rx="9" ry="7" fill="url(#ggold)" opacity=".82"/><circle cx="${dx}" cy="-10" r="3" fill="#ffd700" opacity=".55"/>`).join('')}<ellipse cx="-36" cy="-2" rx="7" ry="5" fill="url(#ggold)" opacity=".65"/><ellipse cx="36" cy="-2" rx="7" ry="5" fill="url(#ggold)" opacity=".65"/></g>
<g transform="translate(822,494)"><ellipse cx="0" cy="8" rx="13" ry="4" fill="#6a5010" opacity=".48"/><path d="M -9 8 Q -11 0 -7 -14 Q 0 -20 7 -14 Q 11 0 9 8" fill="url(#ggold)"/><ellipse cx="0" cy="-14" rx="6" ry="3.5" fill="url(#ggold)"/><path d="M 9 -2 Q 16 -8 14 0" fill="none" stroke="url(#ggold)" stroke-width="2"/></g>
<!-- PEACOCK FAN BEARER -->
<g transform="translate(432,292)">
  <path d="M 0 80 Q -5 40 0 0" stroke="#3a2810" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${[-55,-40,-25,-10,5,20,35].map((a,i)=>`<ellipse cx="0" cy="${-22-i*8}" rx="${5-i*.3}" ry="${22-i*2}" fill="hsl(${120+i*18},${55+i*3}%,${25+i*4}%)" opacity=".85" transform="rotate(${a})"/>`).join('')}
  <ellipse cx="0" cy="95" rx="13" ry="15" fill="#c08858"/>
  <rect x="-14" y="110" width="28" height="65" rx="4" fill="#1e1a10"/>
</g>
<!-- SULTAN BODY -->
<path d="M 564 342 Q 548 374 542 455 L 658 455 Q 652 374 636 342 Z" fill="url(#grobe)"/>
<path d="M 564 342 Q 550 370 546 455" fill="none" stroke="${d.robeTrim}" stroke-width="2"/>
<path d="M 636 342 Q 650 370 654 455" fill="none" stroke="${d.robeTrim}" stroke-width="2"/>
${[-20,-10,0,10,20].map(x=>`<line x1="${600+x}" y1="348" x2="${600+x*.8}" y2="455" stroke="${d.robeTrim}" stroke-width=".7" opacity=".3"/>`).join('')}
<rect x="558" y="345" width="84" height="12" rx="3" fill="url(#ggold)"/><circle cx="600" cy="351" r="7" fill="url(#ggold)"/><circle cx="600" cy="351" r="3.5" fill="#ffd700"/>
<rect x="575" y="440" width="22" height="18" rx="2" fill="#1a1008"/><rect x="603" y="440" width="22" height="18" rx="2" fill="#1a1008"/>
<rect x="535" y="370" width="130" height="8" rx="4" fill="#5a5050" transform="rotate(-5,600,374)"/><rect x="535" y="370" width="130" height="8" rx="4" fill="none" stroke="#c9a84c" stroke-width="1" opacity=".55" transform="rotate(-5,600,374)"/>
<rect x="590" y="362" width="20" height="24" rx="3" fill="url(#ggold)"/>
<!-- LEFT ARM + SCEPTER -->
<path d="M 565 275 Q 540 285 524 302 Q 518 315 520 328" stroke="${d.robeMain}" stroke-width="18" fill="none" stroke-linecap="round"/>
<path d="M 565 275 Q 540 285 524 302 Q 518 315 520 328" stroke="${d.robeTrim}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".22"/>
<ellipse cx="519" cy="332" rx="10" ry="7" fill="${d.skinTone}"/>
<line x1="514" y1="334" x2="497" y2="276" stroke="#7a5c10" stroke-width="4.5"/>
<circle cx="496" cy="270" r="10" fill="url(#ggold)" filter="url(#fsoft)"/><circle cx="496" cy="270" r="5" fill="#ffd700"/>
<!-- RIGHT ARM RAISED -->
<path d="M 635 275 Q 660 285 676 302 Q 682 315 680 328" stroke="${d.robeMain}" stroke-width="18" fill="none" stroke-linecap="round"/>
<path d="M 635 275 Q 660 285 676 302 Q 682 315 680 328" stroke="${d.robeTrim}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".22"/>
<ellipse cx="681" cy="332" rx="10" ry="7" fill="${d.skinTone}"/>
${[[-10,-18],[-6,-20],[-2,-22],[2,-20],[6,-17]].map(([dx,dy])=>`<line x1="${681+dx}" y1="330" x2="${681+dx*1.2}" y2="${330+dy}" stroke="${d.skinTone}" stroke-width="4" stroke-linecap="round"/>`).join('')}
<!-- SULTAN HEAD -->
<rect x="589" y="256" width="22" height="22" rx="4" fill="${d.skinTone}"/>
<ellipse cx="600" cy="244" rx="34" ry="38" fill="${d.skinTone}"/>
<ellipse cx="600" cy="254" rx="24" ry="14" fill="#00000015"/>
<!-- TURBAN -->
<ellipse cx="600" cy="216" rx="40" ry="17" fill="${d.turbanMain}"/>
${[0,1,2,3,4].map(i=>`<ellipse cx="600" cy="${222-i*7}" rx="${38-i*2.5}" ry="${10-i*1.2}" fill="none" stroke="${d.turbanAccent}" stroke-width="1" opacity="${.52-i*.08}"/>`).join('')}
<path d="M 564 218 Q 600 212 636 218" fill="none" stroke="${d.turbanBand}" stroke-width="3"/>
<circle cx="600" cy="212" r="9" fill="${mc}" filter="url(#fglow)"/><circle cx="600" cy="212" r="4.5" fill="#fff" opacity=".32"/>
<ellipse cx="600" cy="202" rx="11" ry="6" fill="${d.turbanMain}"/>
<path d="M 590 203 Q 600 193 610 203" fill="${d.turbanAccent}" opacity=".6"/>
<!-- EYEBROWS MOOD-REACTIVE -->
<path d="M ${582} ${232+bY*.5} Q ${589} ${229+bY} ${596} ${232+bY*.3}" fill="none" stroke="${d.beardColor}" stroke-width="3" stroke-linecap="round"/>
<path d="M ${604} ${232+bY*.3} Q ${611} ${229+bY} ${618} ${232+bY*.5}" fill="none" stroke="${d.beardColor}" stroke-width="3" stroke-linecap="round"/>
<!-- EYES MOOD-REACTIVE -->
<ellipse cx="588" cy="240" rx="6.5" ry="${6.5*eH*.72}" fill="#1a0e06"/>
<ellipse cx="612" cy="240" rx="6.5" ry="${6.5*eH*.72}" fill="#1a0e06"/>
<ellipse cx="588" cy="240" rx="7" ry="${7*eH*.72}" fill="none" stroke="#c8b090" stroke-width=".8"/>
<ellipse cx="612" cy="240" rx="7" ry="${7*eH*.72}" fill="none" stroke="#c8b090" stroke-width=".8"/>
<circle cx="590" cy="238" r="2" fill="#fff" opacity=".48"/>
<circle cx="614" cy="238" r="2" fill="#fff" opacity=".48"/>
<!-- NOSE -->
<path d="M 600 244 Q 595 253 594 258 Q 597 262 600 261 Q 603 262 606 258 Q 605 253 600 244" fill="${d.skinTone}" stroke="#0a0704" stroke-width=".5"/>
<!-- MOUTH MOOD-REACTIVE -->
<path d="M 591 265 Q 600 ${268+mD} 609 265" fill="none" stroke="#5a3020" stroke-width="2.5" stroke-linecap="round"/>
<path d="M 592 264 Q 600 261 608 264" fill="#8b4a3a" opacity=".38"/>
<!-- BEARD -->
${d.beardStyle==='short'?`<path d="M 575 268 Q 573 280 580 290 Q 590 298 600 299 Q 610 298 620 290 Q 627 280 625 268 Q 612 278 600 279 Q 588 278 575 268" fill="${d.beardColor}" opacity=".86"/>`:
  d.beardStyle==='medium'?`<path d="M 572 267 Q 567 286 570 305 Q 580 320 600 324 Q 620 320 630 305 Q 633 286 628 267" fill="${d.beardColor}" opacity=".9"/>${[-10,-5,0,5,10].map(x=>`<line x1="${600+x}" y1="273" x2="${600+x*1.25}" y2="318" stroke="#080402" stroke-width=".7" opacity=".28"/>`).join('')}`:
  d.beardStyle==='full'?`<path d="M 568 265 Q 562 290 564 320 Q 573 342 600 348 Q 627 342 636 320 Q 638 290 632 265" fill="${d.beardColor}" opacity=".9"/>${[-14,-7,0,7,14].map(x=>`<line x1="${600+x}" y1="272" x2="${600+x*1.35}" y2="340" stroke="#080402" stroke-width=".8" opacity=".26"/>`).join('')}`:
  `<path d="M 566 264 Q 558 294 560 332 Q 569 362 600 372 Q 631 362 640 332 Q 642 294 634 264" fill="${d.beardColor}" opacity=".9"/><path d="M 579 263 Q 600 271 621 263 Q 612 255 600 257 Q 588 255 579 263" fill="${d.beardColor}" opacity=".7"/>${[-15,-8,0,8,15].map(x=>`<line x1="${600+x}" y1="272" x2="${600+x*1.45}" y2="365" stroke="#080402" stroke-width=".8" opacity=".24"/>`).join('')}`}
<!-- VIGNETTE -->
<rect x="0" y="0" width="1200" height="620" fill="url(#rvig)"/>
<rect x="0" y="0" width="1200" height="620" fill="url(#ramb)"/>
</svg>`;
}

// ═══════════════════════════════════════════════════
//  INTRO SCENE SVGs
// ═══════════════════════════════════════════════════
function buildIntroSVG(i) {
  const W=1200,H=620;
  const vig=(op='.82')=>`<radialGradient id="v${i}" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${op}"/></radialGradient><rect width="${W}" height="${H}" fill="url(#v${i})"/>`;
  const stone=`<pattern id="st${i}" width="90" height="55" patternUnits="userSpaceOnUse"><rect width="90" height="55" fill="#100a04"/><rect x="1" y="1" width="88" height="27" rx="1" fill="none" stroke="#0a0602" stroke-width="1" opacity=".6"/><rect x="46" y="28" width="43" height="26" rx="1" fill="none" stroke="#0a0602" stroke-width="1" opacity=".6"/><rect x="1" y="28" width="43" height="26" rx="1" fill="none" stroke="#0a0602" stroke-width="1" opacity=".6"/></pattern>`;
  const torch=(x,y,idx=0)=>`<g transform="translate(${x},${y})"><rect x="-5" y="4" width="10" height="18" rx="2" fill="#3a2810"/><rect x="-6" y="1" width="12" height="6" rx="1" fill="#8b6030"/><g style="animation:torchFlame ${.9+idx*.15}s ease-in-out infinite;transform-origin:0 4px"><ellipse cx="0" cy="-10" rx="7" ry="14" fill="#ff6200" opacity=".9"/><ellipse cx="0" cy="-13" rx="4.5" ry="9" fill="#ffaa00" opacity=".82"/><ellipse cx="0" cy="-16" rx="2.5" ry="5" fill="#ffe000" opacity=".72"/></g><radialGradient id="tg${x}${i}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff8c00" stop-opacity=".48"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient><ellipse cx="0" cy="-2" rx="34" ry="24" fill="url(#tg${x}${i})"/></g>`;
  const hands=(chains=false)=>`<g transform="translate(540,${H-90})">${chains?`<path d="M -28 0 Q 0 14 28 0" fill="none" stroke="#9a9080" stroke-width="7" style="animation:chainSway 2s ease-in-out infinite"/>${[-18,-9,0,9,18].map(x=>`<ellipse cx="${x}" cy="${x%18===0?1:5}" rx="5.5" ry="4.5" fill="none" stroke="#aaaaa0" stroke-width="2.5"/>`).join('')}`:''}<ellipse cx="-55" cy="0" rx="30" ry="18" fill="#c8a880" opacity=".88"/><ellipse cx="55" cy="0" rx="30" ry="18" fill="#c8a880" opacity=".88"/></g>`;
  const guard=(x,dir=1)=>`<g transform="translate(${x},290)" fill="#060402"><ellipse cx="0" cy="-26" rx="22" ry="24"/><path d="M -22 -5 Q -26 46 -24 108 L 24 108 Q 26 46 22 -5 Z"/><path d="M -22 -28 Q 0 -70 22 -28" fill="#060402"/><rect x="-6" y="-70" width="12" height="36" rx="2" fill="#2a2010"/><line x1="${dir*32}" y1="-95" x2="${dir*26}" y2="112" stroke="#4a4030" stroke-width="5"/><polygon points="${dir*32},-95 ${dir*26},-117 ${dir*38},-117" fill="#7a7060"/></g>`;

  const S = [
    // 0: The Ordinary Life — vault close-up, your hands on the chest
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="url(#st${i})"/>
    ${torch(180,220,0)}${torch(1020,220,1)}
    <!-- Wooden desk surface -->
    <rect x="0" y="${H*.55}" width="${W}" height="${H*.45}" fill="#1e1208"/>
    <rect x="0" y="${H*.55}" width="${W}" height="6" fill="#2e1c0a"/>
    <!-- Ledger book open -->
    <rect x="320" y="${H*.32}" width="560" height="380" rx="4" fill="#e8d5b0"/>
    <rect x="320" y="${H*.32}" width="278" height="380" fill="#e0cca0"/>
    <line x1="598" y1="${H*.32}" x2="598" y2="${H*.32+380}" stroke="#c8aa80" stroke-width="3"/>
    ${Array.from({length:12},(_,j)=>`<line x1="340" y1="${H*.36+j*26}" x2="578" y2="${H*.36+j*26}" stroke="#c8aa80" stroke-width="1" opacity=".5"/><line x1="620" y1="${H*.36+j*26}" x2="860" y2="${H*.36+j*26}" stroke="#c8aa80" stroke-width="1" opacity=".5"/>`).join('')}
    <!-- Vault key on desk -->
    <g transform="translate(920,${H*.65})">
      <circle cx="0" cy="0" r="22" fill="none" stroke="#c9a84c" stroke-width="4"/>
      <circle cx="0" cy="0" r="10" fill="none" stroke="#c9a84c" stroke-width="3"/>
      <rect x="20" y="-4" width="55" height="8" rx="4" fill="#c9a84c"/>
      <rect x="60" y="-4" width="8" height="18" rx="2" fill="#c9a84c"/>
      <rect x="48" y="-4" width="8" height="14" rx="2" fill="#c9a84c"/>
    </g>
    <!-- Inkwell and quill -->
    <ellipse cx="300" cy="${H*.66}" rx="22" ry="28" fill="#1a1208" stroke="#3a2810" stroke-width="2"/>
    <path d="M 300 ${H*.38} Q 280 ${H*.5} 295 ${H*.64}" fill="none" stroke="#e8d5b0" stroke-width="3" opacity=".8"/>
    <!-- Your hands on desk -->
    <ellipse cx="460" cy="${H*.9}" rx="50" ry="28" fill="#c8a880" opacity=".85"/>
    <ellipse cx="740" cy="${H*.9}" rx="50" ry="28" fill="#c8a880" opacity=".85"/>
    <!-- Sealed chest in background -->
    <rect x="440" y="${H*.14}" width="320" height="120" rx="5" fill="#1e1408" stroke="#8b6914" stroke-width="2.5"/>
    <rect x="440" y="${H*.14}" width="320" height="14" rx="3" fill="#c9a84c"/>
    <ellipse cx="600" cy="${H*.14+7}" rx="18" ry="9" fill="#8b6914"/>
    <text x="600" y="${H*.28}" text-anchor="middle" fill="#3e2c14" font-size="12" font-family="Cinzel,serif" letter-spacing="3" opacity=".6">ROYAL TREASURY — SEALED</text>
    ${vig('.65')}</svg>`,

    // 1: Midnight — hooded figure, broken vault
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}<radialGradient id="mg${i}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".2"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="#030202"/>
    <rect width="${W}" height="${H}" fill="url(#st${i})" opacity=".5"/>
    <!-- Moon through small window -->
    <rect x="520" y="20" width="160" height="110" rx="3" fill="#0c1828" stroke="#1a2840" stroke-width="2"/>
    <circle cx="600" cy="70" r="32" fill="#d4c8a8" opacity=".7"/>
    <circle cx="612" cy="62" r="27" fill="#0c1828" opacity=".82"/>
    <!-- Hooded figure at chest -->
    <g transform="translate(600,${H*.52})" fill="#0a0806">
      <ellipse cx="0" cy="-35" rx="28" ry="32"/>
      <!-- Hood -->
      <path d="M -28 -20 Q -35 -65 0 -75 Q 35 -65 28 -20" fill="#0a0806"/>
      <path d="M -25 -18 Q -30 -58 0 -68 Q 30 -58 25 -18" fill="#141010"/>
      <path d="M -28 -10 Q -35 28 -32 80 L 32 80 Q 35 28 28 -10 Z"/>
      <!-- Glint of knife -->
      <line x1="30" y1="-10" x2="72" y2="-40" stroke="#c8c0b0" stroke-width="3"/>
    </g>
    <!-- Broken chest -->
    <rect x="380" y="${H*.62}" width="440" height="130" rx="5" fill="#1e1408" stroke="#8b6914" stroke-width="2"/>
    <path d="M 380 ${H*.62+18} Q 600 ${H*.62-8} 820 ${H*.62+18}" fill="#2a1c0a" stroke="#c9a84c" stroke-width="2"/>
    <!-- Seal shards -->
    ${Array.from({length:5},(_,j)=>`<polygon points="${560+j*22},${H*.62+28} ${568+j*22},${H*.62+14} ${576+j*22},${H*.62+30}" fill="#c9a84c" opacity="${.4+j*.08}" transform="rotate(${j*18},${568+j*22},${H*.62+22})"/>`).join('')}
    <text x="600" y="${H*.88}" text-anchor="middle" fill="#8b1a00" font-size="32" font-family="Cinzel Decorative,serif" font-weight="700" letter-spacing="4" opacity=".9">10,000 DINARS — GONE</text>
    ${vig('.88')}</svg>`,

    // 2: Morning Prayer — seized before the adhan
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="#080604"/>
    <!-- Pre-dawn window -->
    <rect x="440" y="20" width="320" height="200" rx="3" fill="#0d1828" stroke="#1a2840" stroke-width="2"/>
    <path d="M 440 100 Q 600 25 760 100" fill="#0d1828" stroke="#1a2840" stroke-width="1.5"/>
    <!-- Faint dawn glow -->
    <radialGradient id="dg${i}" cx="50%" cy="15%" r="45%"><stop offset="0%" stop-color="#ff8c00" stop-opacity=".08"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#dg${i})"/>
    <!-- Prayer mat -->
    <ellipse cx="600" cy="${H*.72}" rx="200" ry="60" fill="#3a1808" opacity=".7"/>
    <ellipse cx="600" cy="${H*.72}" rx="180" ry="52" fill="none" stroke="#c9a84c" stroke-width="1" opacity=".3"/>
    <!-- Qazi silhouette in doorway -->
    <g transform="translate(200,${H*.35})" fill="#060402">
      <ellipse cx="0" cy="-30" rx="26" ry="28"/>
      <path d="M -26 -5 Q -30 50 -28 120 L 28 120 Q 30 50 26 -5 Z"/>
      <!-- Dark turban -->
      <ellipse cx="0" cy="-50" rx="30" ry="13"/>
      <ellipse cx="0" cy="-54" rx="24" ry="9"/>
    </g>
    <!-- Two guard silhouettes flanking -->
    ${guard(90,1)}${guard(340,-1)}
    <!-- Hands reaching toward you from left -->
    <path d="M 0 ${H*.6} Q 120 ${H*.52} 240 ${H*.55}" stroke="#a07848" stroke-width="28" fill="none" stroke-linecap="round"/>
    <ellipse cx="244" cy="${H*.55}" rx="22" ry="16" fill="#a07848"/>
    <!-- Your hands in prayer, interrupted -->
    <g transform="translate(600,${H*.78})">
      <ellipse cx="-30" cy="0" rx="26" ry="16" fill="#c8a880" opacity=".85"/>
      <ellipse cx="30" cy="0" rx="26" ry="16" fill="#c8a880" opacity=".85"/>
    </g>
    ${vig('.78')}</svg>`,

    // 3: Thrown Outside — crowd staring down
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="#0a0806"/>
    <!-- Sky — very early morning blue -->
    <linearGradient id="sky${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0e1828"/><stop offset="100%" stop-color="#1a2838"/></linearGradient>
    <rect width="${W}" height="${H*.4}" fill="url(#sky${i})"/>
    <!-- Ground — cobblestones from POV on ground -->
    <rect x="0" y="${H*.6}" width="${W}" height="${H*.4}" fill="#1a1208"/>
    ${Array.from({length:8},(_,j)=>Array.from({length:5},(_,k)=>`<rect x="${j*152}" y="${H*.62+k*40}" width="148" height="37" rx="2" fill="none" stroke="#120e06" stroke-width="1" opacity=".5"/>`).join('')).join('')}
    <!-- Crowd staring DOWN at you — just feet and lower bodies visible up close -->
    ${Array.from({length:12},(_,j)=>`<g transform="translate(${60+j*92},${H*.45})">
      <rect x="-18" y="0" width="36" height="${H*.2}" rx="4" fill="${['#2a2010','#1e1a10','#2e2210','#221a0c','#1a1808','#281e0c'][j%6]}" opacity=".88"/>
      <ellipse cx="0" cy="${H*.2}" rx="20" ry="8" fill="#1a1208" opacity=".7"/>
    </g>`).join('')}
    <!-- Your perspective — looking up, hands on ground -->
    <ellipse cx="440" cy="${H*.85}" rx="45" ry="24" fill="#c8a880" opacity=".82"/>
    <ellipse cx="760" cy="${H*.85}" rx="45" ry="24" fill="#c8a880" opacity=".82"/>
    <!-- One face staring directly down -->
    <ellipse cx="600" cy="${H*.28}" rx="36" ry="40" fill="#c0956a" opacity=".88"/>
    <ellipse cx="590" cy="${H*.24}" rx="7" ry="5" fill="#1a0e06"/>
    <ellipse cx="612" cy="${H*.24}" rx="7" ry="5" fill="#1a0e06"/>
    <ellipse cx="600" cy="${H*.18}" rx="38" ry="16" fill="#8b3a00"/>
    ${vig('.72')}</svg>`,

    // 4: The Sword — blade at throat
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="${W}" height="${H}" fill="#060402"/>
    ${torch(200,240,0)}${torch(1000,240,1)}
    <!-- Guard's arm holding sword across frame -->
    <path d="M 0 ${H*.42} Q 200 ${H*.38} 420 ${H*.4}" stroke="#2a2010" stroke-width="55" fill="none" stroke-linecap="round"/>
    <!-- Sword blade — filling most of the frame horizontally -->
    <rect x="100" y="${H*.39}" width="880" height="14" rx="3" fill="#8a8070" transform="rotate(-1,100,${H*.39})"/>
    <rect x="100" y="${H*.39}" width="880" height="14" rx="3" fill="none" stroke="#c8c0b0" stroke-width="1.5" opacity=".6" transform="rotate(-1,100,${H*.39})"/>
    <!-- Fuller (groove down middle of blade) -->
    <rect x="150" y="${H*.395}" width="750" height="4" rx="2" fill="#6a6258" opacity=".6" transform="rotate(-1,150,${H*.395})"/>
    <!-- Blade tip catching torchlight -->
    <ellipse cx="980" cy="${H*.396}" rx="60" ry="8" fill="#c8c0b0" opacity=".35"/>
    <!-- Guard's gauntleted hand gripping hilt -->
    <ellipse cx="92" cy="${H*.42}" rx="45" ry="30" fill="#3a3028"/>
    <rect x="60" y="${H*.39}" width="28" height="44" rx="4" fill="#c9a84c"/>
    <rect x="48" y="${H*.39}" width="52" height="10" rx="3" fill="#8b6914"/>
    <!-- Your neck/chin visible -->
    <path d="M 460 ${H*.52} Q 540 ${H*.48} 660 ${H*.5} Q 740 ${H*.52} 760 ${H*.58}" fill="#c8a880" opacity=".8"/>
    <!-- "MOVE" text -->
    <text x="600" y="${H*.82}" text-anchor="middle" fill="#c9a84c" font-size="58" font-family="Cinzel Decorative,serif" font-weight="900" letter-spacing="8" opacity=".95">MOVE.</text>
    ${vig('.7')}</svg>`,

    // 5: The Walk — crowd following silently
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="#080604"/>
    <!-- Street perspective -->
    <polygon points="520,${H*.25} 680,${H*.25} ${W},${H} 0,${H}" fill="#0e0a06" opacity=".7"/>
    <!-- Buildings either side -->
    <rect x="0" y="0" width="280" height="${H}" fill="#0a0804"/><rect x="920" y="0" width="280" height="${H}" fill="#0a0804"/>
    <!-- Windows — some lit -->
    ${Array.from({length:6},(_,j)=>`<rect x="${20+j%2*140}" y="${60+Math.floor(j/2)*120}" width="80" height="60" rx="2" fill="${j%3===0?'#c9a84c22':'#0a0804'}" stroke="#1a1208" stroke-width="1"/>`).join('')}
    ${Array.from({length:6},(_,j)=>`<rect x="${940+j%2*140}" y="${60+Math.floor(j/2)*120}" width="80" height="60" rx="2" fill="${j%2===0?'#c9a84c18':'#0a0804'}" stroke="#1a1208" stroke-width="1"/>`).join('')}
    <!-- Guard ahead, pulling chain -->
    <g transform="translate(600,${H*.3})" fill="#080604" opacity=".75">
      <ellipse cx="0" cy="-24" rx="20" ry="22"/>
      <path d="M -20 -5 Q -24 36 -22 86 L 22 86 Q 24 36 20 -5 Z"/>
    </g>
    <!-- Chain -->
    <path d="M 480 ${H*.62} Q 540 ${H*.5} 600 ${H*.44}" fill="none" stroke="#9a9080" stroke-width="3.5" stroke-dasharray="10,5"/>
    <!-- Your hands / chains foreground -->
    ${hands(true)}
    <!-- Crowd following — silhouettes receding into distance -->
    ${Array.from({length:16},(_,j)=>{const x=j*76+40;const scale=0.35+j*.04;return `<ellipse cx="${x}" cy="${H*.72+j*6}" rx="${14*scale}" ry="${20*scale}" fill="#0e0c08" opacity="${.55+j*.02}"/>`;}).join('')}
    ${Array.from({length:16},(_,j)=>{const x=W-j*76-40;const scale=0.35+j*.04;return `<ellipse cx="${x}" cy="${H*.72+j*6}" rx="${14*scale}" ry="${20*scale}" fill="#0e0c08" opacity="${.55+j*.02}"/>`;}).join('')}
    ${vig('.72')}</svg>`,

    // 6: The Palace — Sultan rising confused
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="url(#st${i})"/>
    <rect width="${W}" height="${H}" fill="#0a0804" opacity=".6"/>
    ${torch(120,230,0)}${torch(1080,230,1)}
    <!-- Marble floor -->
    <rect x="0" y="${H*.65}" width="${W}" height="${H*.35}" fill="#1a1208"/>
    ${Array.from({length:7},(_,j)=>`<rect x="${j*172}" y="${H*.65}" width="170" height="${H*.12}" rx="1" fill="none" stroke="#100e08" stroke-width="1" opacity=".5"/>`).join('')}
    <!-- Grand columns -->
    ${[150,350,850,1050].map(x=>`<rect x="${x-18}" y="60" width="36" height="${H*.62}" fill="#2a1c0a"/><rect x="${x-20}" y="${H*.62}" width="40" height="14" rx="2" fill="#3a2810"/><rect x="${x-20}" y="54" width="40" height="12" rx="2" fill="#3a2810"/>`).join('')}
    <!-- Prayer mat, Sultan just rising -->
    <ellipse cx="600" cy="${H*.6}" rx="140" ry="42" fill="#2a0808" opacity=".7"/>
    <ellipse cx="600" cy="${H*.6}" rx="125" ry="36" fill="none" stroke="#c9a84c" stroke-width="1" opacity=".25"/>
    <!-- Sultan figure mid-rise — confused posture -->
    <g transform="translate(600,${H*.38})">
      <ellipse cx="0" cy="-30" rx="26" ry="29" fill="#b5845a"/>
      <path d="M -28 -5 Q -32 42 -30 100 L 30 100 Q 32 42 28 -5 Z" fill="#6b2a00"/>
      <ellipse cx="0" cy="-48" rx="32" ry="13" fill="#8b3a00"/>
      <ellipse cx="0" cy="-52" rx="25" ry="9" fill="#8b3a00"/>
      <!-- Confused raised hands -->
      <path d="M -28 10 Q -55 0 -70 -12" stroke="#b5845a" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M 28 10 Q 55 0 70 -12" stroke="#b5845a" stroke-width="13" fill="none" stroke-linecap="round"/>
    </g>
    <!-- You being thrown in, first person view hitting floor -->
    <ellipse cx="420" cy="${H*.88}" rx="50" ry="25" fill="#c8a880" opacity=".82"/>
    <ellipse cx="780" cy="${H*.88}" rx="50" ry="25" fill="#c8a880" opacity=".82"/>
    ${vig('.7')}</svg>`,

    // 7: The Innocence — key on belt, bound hands
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="${W}" height="${H}" fill="#040302"/>
    <!-- Stone wall texture -->
    <rect width="${W}" height="${H}" fill="url(#st${i})" opacity=".45"/>
    <!-- Single candle light -->
    <radialGradient id="cl${i}" cx="50%" cy="45%" r="45%"><stop offset="0%" stop-color="#ff9500" stop-opacity=".18"/><stop offset="100%" stop-color="#ff9500" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#cl${i})"/>
    <!-- Candle -->
    <g transform="translate(600,${H*.28})">
      <rect x="-6" y="0" width="12" height="38" rx="2" fill="#e8d5b0" opacity=".85"/>
      <g style="animation:torchFlame .85s ease-in-out infinite;transform-origin:0 0">
        <ellipse cx="0" cy="-10" rx="5" ry="10" fill="#ff9500" opacity=".85"/>
        <ellipse cx="0" cy="-13" rx="3" ry="6" fill="#ffcc00" opacity=".75"/>
      </g>
    </g>
    <!-- Your bound hands in lap, looking down at them -->
    <g transform="translate(600,${H*.62})">
      <ellipse cx="-45" cy="0" rx="42" ry="24" fill="#c8a880" opacity=".88"/>
      <ellipse cx="45" cy="0" rx="42" ry="24" fill="#c8a880" opacity=".88"/>
      <!-- Rope binding -->
      <path d="M -12 -6 Q 0 -10 12 -6 Q 14 4 0 6 Q -14 4 -12 -6" fill="#8a6a40" opacity=".9"/>
      ${Array.from({length:4},(_,j)=>`<ellipse cx="${-6+j*4}" cy="${-2+j}" rx="3" ry="5" fill="none" stroke="#7a5a30" stroke-width="1.5" opacity=".7"/>`).join('')}
    </g>
    <!-- The vault key prominent — on your belt visible -->
    <g transform="translate(600,${H*.82})">
      <circle cx="0" cy="0" r="20" fill="none" stroke="#c9a84c" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="9" fill="none" stroke="#c9a84c" stroke-width="2.5"/>
      <rect x="18" y="-3.5" width="50" height="7" rx="3.5" fill="#c9a84c"/>
      <rect x="54" y="-3.5" width="7" height="16" rx="2" fill="#c9a84c"/>
      <rect x="43" y="-3.5" width="7" height="12" rx="2" fill="#c9a84c"/>
    </g>
    <text x="600" y="${H*.96}" text-anchor="middle" fill="#5a4030" font-size="15" font-family="IM Fell English,serif" font-style="italic" opacity=".75">This key has never opened anything it shouldn't.</text>
    ${vig('.8')}</svg>`,

    // 8: The Setup — court assembling through grille
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="${W}" height="${H}" fill="#060402"/>
    <!-- Looking through iron grille bars -->
    ${Array.from({length:9},(_,j)=>`<rect x="${j*134}" y="0" width="18" height="${H}" rx="5" fill="#1a1208" stroke="#0e0c08" stroke-width="1" opacity=".95"/>`).join('')}
    <rect x="0" y="${H*.44}" width="${W}" height="16" fill="#1a1208" rx="4" opacity=".9"/>
    <rect x="0" y="${H*.68}" width="${W}" height="14" fill="#1a1208" rx="3" opacity=".8"/>
    <!-- Through the bars: the court assembling -->
    <!-- Carpet and throne suggestion -->
    <rect x="0" y="${H*.58}" width="${W}" height="${H*.42}" fill="#6a0000" opacity=".25"/>
    <!-- Ulemas taking seats left -->
    ${[80,150,215,275].map((x,j)=>`<ellipse cx="${x}" cy="${H*.7}" rx="22" ry="28" fill="#e8e0d0" opacity=".45"/>`).join('')}
    <!-- Nobles right -->
    ${[925,990,1055,1115].map((x,j)=>`<ellipse cx="${x}" cy="${H*.7}" rx="22" ry="28" fill="${['#c94020','#204880','#186030','#6030a0'][j]}" opacity=".4"/>`).join('')}
    <!-- Qazi unrolling scroll centre-right -->
    <g transform="translate(780,${H*.58})" opacity=".6">
      <ellipse cx="0" cy="-20" rx="18" ry="20" fill="#b08050"/>
      <rect x="-15" y="0" width="30" height="60" rx="3" fill="#3a1808"/>
      <!-- Scroll -->
      <g transform="translate(22,10) rotate(15)">
        <rect x="-3" y="-12" width="7" height="24" rx="2" fill="#e8d5b0"/>
        <rect x="-4" y="-14" width="9" height="5" rx="1" fill="#c9a84c"/>
      </g>
    </g>
    <!-- Sultan ascending throne -->
    <g transform="translate(600,${H*.32})" opacity=".7">
      <ellipse cx="0" cy="-22" rx="24" ry="27" fill="#b5845a"/>
      <path d="M -26 0 Q -30 44 -28 90 L 28 90 Q 30 44 26 0 Z" fill="#6b2a00"/>
      <ellipse cx="0" cy="-40" rx="30" ry="12" fill="#8b3a00"/>
    </g>
    <!-- Golden glow on throne -->
    <radialGradient id="tgl${i}" cx="50%" cy="52%" r="28%"><stop offset="0%" stop-color="#ffd700" stop-opacity=".12"/><stop offset="100%" stop-color="#ffd700" stop-opacity="0"/></radialGradient>
    <rect width="${W}" height="${H}" fill="url(#tgl${i})"/>
    ${vig('.72')}</svg>`,

    // 9: The Charge — Qazi reading, all eyes on you
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${stone}</defs>
    <rect width="${W}" height="${H}" fill="url(#st${i})"/>
    <rect width="${W}" height="${H}" fill="#0a0804" opacity=".55"/>
    ${torch(100,225,0)}${torch(1100,225,1)}
    <!-- Grand arch suggestion -->
    <path d="M 370 ${H} Q 370 40 600 40 Q 830 40 830 ${H}" fill="none" stroke="#c9a84c" stroke-width="5" opacity=".5"/>
    <!-- Qazi Ibrahim standing — scroll open, reading aloud -->
    <g transform="translate(750,${H*.3})">
      <ellipse cx="0" cy="-26" rx="20" ry="23" fill="#b08060"/>
      <path d="M -22 0 Q -26 45 -24 100 L 24 100 Q 26 45 22 0 Z" fill="#280808"/>
      <ellipse cx="0" cy="-44" rx="22" ry="10" fill="#280808"/>
      <!-- Scroll unrolled -->
      <g transform="translate(28,12)">
        <rect x="-4" y="-28" width="9" height="56" rx="2" fill="#e8d5b0"/>
        <rect x="-5" y="-30" width="11" height="6" rx="2" fill="#c9a84c"/>
        <rect x="-5" y="24" width="11" height="6" rx="2" fill="#c9a84c"/>
        ${Array.from({length:5},(_,j)=>`<line x1="-2" y1="${j*9-22}" x2="4" y2="${j*9-22}" stroke="#8a7050" stroke-width="1" opacity=".6"/>`).join('')}
      </g>
      <!-- Pointing at you -->
      <path d="M -22 18 Q -55 10 -80 -4" stroke="#b08060" stroke-width="12" fill="none" stroke-linecap="round"/>
      <ellipse cx="-84" cy="-5" rx="9" ry="7" fill="#b08060"/>
    </g>
    <!-- All eyes turning — crowd silhouettes left and right -->
    ${[60,130,200,270].map(x=>`<ellipse cx="${x}" cy="${H*.62}" rx="14" ry="20" fill="#1a1408" opacity=".75"/>`).join('')}
    ${[930,1000,1070,1140].map(x=>`<ellipse cx="${x}" cy="${H*.62}" rx="14" ry="20" fill="#1a1408" opacity=".75"/>`).join('')}
    <!-- Sultan watching from throne -->
    <g transform="translate(600,${H*.26})" opacity=".8">
      <ellipse cx="0" cy="-20" rx="22" ry="25" fill="#b5845a"/>
      <path d="M -24 2 Q -28 38 -26 82 L 26 82 Q 28 38 24 2 Z" fill="#6b2a00"/>
      <ellipse cx="0" cy="-36" rx="28" ry="11" fill="#8b3a00"/>
    </g>
    <!-- Your POV — the weight of all gazes -->
    ${hands(true)}
    <text x="600" y="${H*.94}" text-anchor="middle" fill="#c9a84c" font-size="16" font-family="IM Fell English,serif" font-style="italic" opacity=".8">Everything depends on what you say next.</text>
    ${vig('.68')}</svg>`,
  ];
  return S[i] || S[0];
}

export { buildCourtSVG, buildIntroSVG };
