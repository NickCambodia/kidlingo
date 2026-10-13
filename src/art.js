/* Kidlingo phrase pictures: simple picture-book scenes drawn in SVG (600×400), one per phrase (KART.scene(n)).
   The one who says the phrase stands on the LEFT with a speech bubble; the sky (sun / sunset / moon) shows the time. */
const KART = (() => {
const W = 600, H = 400, GY = 352, LN = '#3B2F2C', SK = '#F9D7BC', SW = 2.6;
let uid = 0;
const S = fill => `fill="${fill}" stroke="${LN}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;
const L = (w = SW, c = LN) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const r1 = n => Math.round(n * 10) / 10;
const CAST = {
  sora:{kid:1, hair:'#2B2422', hs:'short', top:'#F8C630', bot:'#3E6FD6', shoe:'#E2553F'},
  mei: {kid:1, hair:'#3C2A21', hs:'pig', top:'#F59BB7', bot:'dress', shoe:'#C9406B'},
  mama:{hair:'#2F2421', hs:'pony', top:'#8DC6F0', bot:'#5A6380', inner:'#FFFFFF', shoe:'#4A4A5A'},
  papa:{hair:'#2B2422', hs:'short', top:'#52AE6C', bot:'#4A5268', shoe:'#3B3B48', collar:1},
  gran:{hair:'#E6E1DA', hs:'bun', top:'#B98FD9', bot:'#6E5D7C', shoe:'#4A4A5A'},
  lady:{hair:'#7A4A32', hs:'bob', top:'#F08E6E', bot:'#5A6380', apron:'#FFFFFF', shoe:'#4A4A5A'}
};
const DIM = {kid:{leg:46, torso:56, hr:40, bw:56, a:28, aw:13}, adult:{leg:104, torso:92, hr:37, bw:64, a:42, aw:15}};
/* Hand targets from the shoulder in kid units: [outward, down]. The elbow bends outward. */
const POSE = {down:[6,54], hold:[12,50], wave:[14,-52], up:[30,-48], out:[56,-4], offer:[44,8], together:[-19,22],
  belly:[-12,34], cross:[-30,20], chin:[-14,-8], cheek:[8,-30], palms:[38,14], throat:[-18,-4], reach:[40,-38],
  fist:[16,-32], hug:[-44,8], rub:[-12,-36], hip:[-2,40], point:[54,-14], pointup:[20,-56], ok:[22,-40]};

/* ---------- faces ---------- */
const EXPR = {
  smile:{e:'dot', m:'smile'}, talk:{e:'dot', m:'talk'}, joy:{e:'happy', m:'grin'}, sad:{e:'dot', b:'sad', m:'frown', tear:1},
  sadtalk:{e:'dot', b:'sad', m:'talk'}, sorry:{e:'closed', b:'sad', m:'talk'}, angry:{e:'dot', b:'angry', m:'frown', puff:1},
  scared:{e:'big', b:'sad', m:'wobble', sweat:1}, sleepy:{e:'sleepy', m:'yawn'}, sleepytalk:{e:'sleepy', m:'talk'},
  content:{e:'closed', m:'smile'}, contenttalk:{e:'closed', m:'talk'}, surprised:{e:'big', b:'up', m:'o'}, wow:{e:'big', b:'up', m:'talk'},
  tired:{e:'sleepy', b:'sad', m:'flat', sweat:1}, worried:{e:'dot', b:'sad', m:'wobble'}, worriedtalk:{e:'dot', b:'sad', m:'talk'},
  curious:{e:'dot', b:'up', m:'talk'}, pain:{e:'squeeze', b:'sad', m:'talk', tear:1}, yum:{e:'happy', m:'yum'},
  full:{e:'happy', m:'smile', puff:1}, shy:{e:'dot', m:'smile', blush:2}, grin:{e:'dot', m:'grin'}
};
function eye(t, x, y, side){
  if(t === 'happy') return `<path d="M${x-6} ${y+2} Q${x} ${y-6} ${x+6} ${y+2}" ${L(3.2)}/>`;
  if(t === 'closed') return `<path d="M${x-6} ${y-1} Q${x} ${y+5} ${x+6} ${y-1}" ${L(3.2)}/>`;
  if(t === 'sleepy') return `<path d="M${x-6} ${y+1} Q${x} ${y+4} ${x+6} ${y+1}" ${L(3.2)}/><path d="M${x-7} ${y-2} L${x+7} ${y-2}" ${L(2.4)}/>`;
  if(t === 'squeeze') return `<path d="M${x-side*6} ${y-5} L${x+side*4} ${y} L${x-side*6} ${y+5}" ${L(3.2)}/>`;
  if(t === 'big') return `<circle cx="${x}" cy="${y}" r="7.5" fill="#fff" stroke="${LN}" stroke-width="2.4"/><circle cx="${x}" cy="${y+1}" r="4" fill="${LN}"/>`;
  return `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="5.6" fill="${LN}"/><circle cx="${x+1.6}" cy="${y-2.2}" r="1.6" fill="#fff"/>`;
}
function face(cx, cy, r, f, name){
  const E = EXPR[name] || EXPR.smile, X = cx + f * 5, ey = cy + 3, my = cy + 19;
  let s = '';
  s += [-1, 1].map(d => `<ellipse cx="${X + d * 22}" cy="${ey + 13}" rx="${E.puff ? 8 : 6.5}" ry="${E.puff ? 6 : 4.5}" fill="#F49A9A" opacity="${E.blush ? .85 : .55}"/>`).join('');
  s += eye(E.e, X - 13, ey, -1) + eye(E.e, X + 13, ey, 1);
  if(E.b === 'sad') s += `<path d="M${X-20} ${ey-11} L${X-8} ${ey-15}" ${L(2.6)}/><path d="M${X+20} ${ey-11} L${X+8} ${ey-15}" ${L(2.6)}/>`;
  if(E.b === 'angry') s += `<path d="M${X-20} ${ey-15} L${X-7} ${ey-9}" ${L(3.2)}/><path d="M${X+20} ${ey-15} L${X+7} ${ey-9}" ${L(3.2)}/>`;
  if(E.b === 'up') s += `<path d="M${X-19} ${ey-13} Q${X-13} ${ey-18} ${X-7} ${ey-13}" ${L(2.6)}/><path d="M${X+7} ${ey-13} Q${X+13} ${ey-18} ${X+19} ${ey-13}" ${L(2.6)}/>`;
  const M = {
    smile:`<path d="M${X-9} ${my} Q${X} ${my+9} ${X+9} ${my}" ${L(3)}/>`,
    talk:`<path d="M${X-9} ${my-1} Q${X} ${my+17} ${X+9} ${my-1} Z" ${S('#9B3B32')}/><ellipse cx="${X}" cy="${my+6}" rx="4.5" ry="2.6" fill="#F07C7C"/>`,
    grin:`<path d="M${X-12} ${my-2} Q${X} ${my+20} ${X+12} ${my-2} Z" ${S('#9B3B32')}/><ellipse cx="${X}" cy="${my+8}" rx="5.5" ry="3" fill="#F07C7C"/>`,
    frown:`<path d="M${X-8} ${my+6} Q${X} ${my-2} ${X+8} ${my+6}" ${L(3)}/>`,
    o:`<ellipse cx="${X}" cy="${my+4}" rx="5" ry="6.5" ${S('#9B3B32')}/>`,
    wobble:`<path d="M${X-9} ${my+4} l4.5 -3 l4.5 3 l4.5 -3 l4.5 3" ${L(2.6)}/>`,
    yawn:`<ellipse cx="${X}" cy="${my+4}" rx="7" ry="9" ${S('#9B3B32')}/>`,
    flat:`<path d="M${X-6} ${my+3} L${X+6} ${my+3}" ${L(3)}/>`,
    yum:`<path d="M${X-9} ${my} Q${X} ${my+9} ${X+9} ${my}" ${L(3)}/><path d="M${X+3} ${my+5} q4 6 8 0" ${S('#F07C7C')}/>`
  };
  s += M[E.m] || M.smile;
  if(E.tear) s += `<path d="M${X-15} ${ey+8} q-4 8 0 10 q4 -2 0 -10 Z" fill="#7CC3F2" stroke="#3E8CC8" stroke-width="1.6"/>`;
  if(E.sweat) s += `<path d="M${cx + f * (r - 6)} ${cy - r * .55} q-5 9 0 11 q5 -2 0 -11 Z" fill="#9ED6F7" stroke="#3E8CC8" stroke-width="1.6"/>`;
  return s;
}
function headSVG(c, cx, cy, r, f, o){
  let s = '';
  if(c.hs === 'pony') s += `<ellipse cx="${cx - f * (r - 2)}" cy="${cy + 20}" rx="14" ry="${r * .8}" ${S(c.hair)}/>`;
  if(c.hs === 'bob') s += `<path d="M${cx-r-5} ${cy+28} L${cx-r-5} ${cy-2} A${r+5} ${r+5} 0 0 1 ${cx+r+5} ${cy-2} L${cx+r+5} ${cy+28} Q${cx} ${cy+20} ${cx-r-5} ${cy+28} Z" ${S(c.hair)}/>`;
  if(c.hs === 'pig') s += [-1, 1].map(d => `<circle cx="${cx + d * (r + 9)}" cy="${cy - 2}" r="13" ${S(c.hair)}/>`).join('');
  if(c.hs === 'bun') s += `<circle cx="${cx}" cy="${cy - r - 4}" r="14" ${S(c.hair)}/>`;
  s += [-1, 1].map(d => `<circle cx="${cx + d * (r - 1)}" cy="${cy + 7}" r="8" ${S(SK)}/>`).join('');
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" ${S(SK)}/>`;
  if(o.messy) s += [-16, -2, 12].map((d, i) => `<path d="M${cx+d-7} ${cy-r+4} L${cx+d+(i-1)*5} ${cy-r-14} L${cx+d+7} ${cy-r+4} Z" ${S(c.hair)}/>`).join('');
  s += `<path d="M${cx-r-1} ${cy+4} C${cx-r-3} ${cy-r*1.38} ${cx+r+3} ${cy-r*1.38} ${cx+r+1} ${cy+4} C${cx+r*.75} ${cy-r*.4} ${cx+r*.25} ${cy-r*.62} ${cx+r*.05} ${cy-r*.42} C${cx-r*.3} ${cy-r*.66} ${cx-r*.78} ${cy-r*.42} ${cx-r-1} ${cy+4} Z" ${S(c.hair)}/>`;
  if(c.hs === 'pig') s += [-1, 1].map(d => `<circle cx="${cx + d * (r - 2)}" cy="${cy - 16}" r="5.5" fill="#E8457A" stroke="${LN}" stroke-width="2"/>`).join('');
  return s + face(cx, cy, r, f, o.x || 'smile');
}
/* ---------- people ---------- */
function arm(D, side, pose, sleeve, kid, sh, item){
  const k = D.a / 28, P = Array.isArray(pose) ? pose : POSE[pose] || POSE.down;
  const Sx = side * (D.bw / 2 - 6), Sy = sh + 4;
  let Tx = Sx + side * P[0] * k, Ty = Sy + P[1] * k;
  let dx = Tx - Sx, dy = Ty - Sy, d = Math.hypot(dx, dy) || 1;
  if(d > 2 * D.a){ Tx = Sx + dx * 2 * D.a / d; Ty = Sy + dy * 2 * D.a / d; dx = Tx - Sx; dy = Ty - Sy; d = 2 * D.a; }
  const h = Math.sqrt(Math.max(0, D.a * D.a - d * d / 4));
  let nx = -dy / d, ny = dx / d; if(dy < -.5 * D.a ? nx * side < 0 : ny < 0){ nx = -nx; ny = -ny; }
  const Ex = (Sx + Tx) / 2 + nx * h, Ey = (Sy + Ty) / 2 + ny * h;
  const seg = (a, b, x, y, col) => `<path d="M${r1(a)} ${r1(b)} L${r1(x)} ${r1(y)}" ${L(D.aw, col)}/>`;
  return `<path d="M${r1(Sx)} ${r1(Sy)} L${r1(Ex)} ${r1(Ey)} L${r1(Tx)} ${r1(Ty)}" ${L(D.aw + 2 * SW)}/>` +
    seg(Sx, Sy, Ex, Ey, sleeve) + seg(Ex, Ey, Tx, Ty, kid ? SK : sleeve) +
    (item ? `<g transform="translate(${r1(Tx)} ${r1(Ty)})">${item}</g>` : '') +
    `<circle cx="${r1(Tx)}" cy="${r1(Ty)}" r="${D.aw * .66}" ${S(SK)}/>`;
}
/* person(who, x, {f: 1 faces right / -1 left, x: face, l/r: arm poses (screen left / right), il/ir: held items,
   lean, sit, s: scale, y, say: speech bubble, pack: backpack, c: colour overrides, messy}) */
function person(who, x, o = {}){
  const c = {...CAST[who], ...(o.c || {})}, D = c.kid ? DIM.kid : DIM.adult, f = o.f || 1, s = o.s || 1, y = o.y ?? GY;
  const hip = o.sit ? -26 : -D.leg, neck = hip - D.torso, sh = neck + 12, hr = D.hr, hy = neck - hr + 10, bw = D.bw;
  let legs = '', body = '';
  if(o.sit){
    const x0 = f > 0 ? -16 : -62;
    legs = `<rect x="${x0}" y="${hip - 4}" width="78" height="26" rx="12" ${S(c.bot === 'dress' ? c.top : c.bot)}/>` +
      `<ellipse cx="${f * 64}" cy="${hip + 12}" rx="9" ry="13" ${S(c.shoe)}/>`;
  } else if(c.kid){
    legs = [-1, 1].map(d => `<g${o.stride ? ` transform="rotate(${d * o.stride} ${d * 11} ${hip + 10})"` : ''}><rect x="${d < 0 ? -18 : 5}" y="${hip + 8}" width="13" height="${-hip - 12}" ${S(SK)}/>` +
      `<ellipse cx="${d * 12}" cy="-4" rx="13" ry="7" ${S(c.shoe)}/></g>`).join('');
    if(c.bot !== 'dress') legs += `<rect x="${-bw/2 + 3}" y="${hip - 8}" width="${bw - 6}" height="26" rx="7" ${S(c.bot)}/>`;
  } else {
    legs = [-1, 1].map(d => `<rect x="${d < 0 ? -25 : 3}" y="${hip - 8}" width="22" height="${-hip + 2}" rx="5" ${S(c.bot)}/>` +
      `<ellipse cx="${d * 15}" cy="-4" rx="15" ry="7" ${S(c.shoe)}/>`).join('');
  }
  const pk = typeof o.pack === 'string' ? o.pack : '#D9443A';
  if(o.pack) body += `<rect x="${-f * (bw / 2) - 16}" y="${neck + 10}" width="32" height="${D.torso - 6}" rx="9" ${S(pk)}/>`;
  body += `<rect x="-7" y="${neck - 10}" width="14" height="16" ${S(SK)}/>`;
  if(c.bot === 'dress') body += `<path d="M${-bw/2 + 4} ${neck + 4} Q0 ${neck - 4} ${bw/2 - 4} ${neck + 4} L${bw/2 + 10} ${hip + 22} Q0 ${hip + 30} ${-bw/2 - 10} ${hip + 22} Z" ${S(c.top)}/>`;
  else body += `<rect x="${-bw/2}" y="${neck}" width="${bw}" height="${hip - neck + 8}" rx="16" ${S(c.top)}/>`;
  if(c.pj) body += [18, 34, 50].map(d => `<path d="M${-bw/2 + 3} ${neck + d} L${bw/2 - 3} ${neck + d}" ${L(3, '#FFFFFF')}/>`).join('');
  if(c.inner) body += `<path d="M-9 ${neck + 2} L9 ${neck + 2} L7 ${hip + 4} L-7 ${hip + 4} Z" ${S(c.inner)}/>`;
  if(c.collar) body += `<path d="M-12 ${neck + 1} L0 ${neck + 12} L12 ${neck + 1}" ${S('#fff')}/><circle cx="0" cy="${neck + 30}" r="2.2" fill="${LN}"/><circle cx="0" cy="${neck + 50}" r="2.2" fill="${LN}"/>`;
  if(c.apron) body += `<rect x="${-bw/2 + 8}" y="${neck + 34}" width="${bw - 16}" height="${hip - neck - 22}" rx="6" ${S(c.apron)}/>`;
  if(o.pack) body += [-1, 1].map(d => `<path d="M${d * 15} ${neck + 2} L${d * 17} ${hip}" ${L(6, LN)}/><path d="M${d * 15} ${neck + 2} L${d * 17} ${hip}" ${L(3.5, pk)}/>`).join('');
  body += headSVG(c, 0, hy, hr, f, o);
  body += arm(D, -1, o.l || 'down', c.top, c.kid, sh, o.il) + arm(D, 1, o.r || 'down', c.top, c.kid, sh, o.ir);
  if(o.front) body += o.front;
  const lean = o.lean ? ` transform="rotate(${o.lean * f} 0 ${hip})"` : '';
  let out = `<g transform="translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}${o.rot ? ` rotate(${o.rot} 0 -100)` : ''}">${o.under || ''}${legs}<g${lean}>${body}</g></g>`;
  if(o.say) out += bubble(x + f * s * (hr + 30), y + s * (hy - hr) - 34, x + f * s * hr * .55, y + s * (hy - hr * .7));
  return out;
}
/* Just a head (someone lying in bed, peeking out). */
const head = (who, x, y, o = {}) => `<g transform="translate(${x} ${y})${o.s ? ` scale(${o.s})` : ''}">${headSVG(CAST[who], 0, 0, (CAST[who].kid ? DIM.kid : DIM.adult).hr, o.f || 1, o)}</g>`;
let BUB = [];
function bubble(bx, by, tx, ty){ BUB.push(bubbleSVG(bx, by, tx, ty)); return ''; }
function bubbleSVG(bx, by, tx, ty){
  bx = Math.max(46, Math.min(W - 46, bx)); by = Math.max(26, by);
  const dir = tx < bx ? -1 : 1, a = bx + dir * 4, b = bx + dir * 18;
  return `<g class="kb"><rect x="${bx - 36}" y="${by - 21}" width="72" height="42" rx="21" ${S('#fff')}/>` +
    `<path d="M${a} ${by + 17} L${tx} ${ty} L${b} ${by + 17}" ${S('#fff')}/><path d="M${a + 1} ${by + 19.5} L${b - 1} ${by + 19.5}" ${L(4, '#fff')}/>` +
    [-15, 0, 15].map(d => `<circle class="kb-d" cx="${bx + d}" cy="${by}" r="5" fill="${LN}"/>`).join('') + `</g>`;
}

/* ---------- sky, rooms, outdoors ---------- */
const SKY = {storm:['#0B1030', '#262E5C'], morning:['#A8D8F4', '#FFE7B0'], day:['#4FAEEE', '#BFE6FB'], evening:['#6E5AAE', '#F28F6B', '#FFD07E'], night:['#0F1740', '#2C3A78']};
function skyRect(t, x, y, w, h){
  const id = 'ks' + (++uid), c = SKY[t];
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${c.map((k, i) => `<stop offset="${i / (c.length - 1)}" stop-color="${k}"/>`).join('')}</linearGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id})"/>`;
}
function sun(x, y, r, t){
  const col = t === 'evening' ? '#FF7A3A' : t === 'morning' ? '#FFB830' : '#FFD43B';
  const rays = t === 'evening' ? '' : Array.from({length:12}, (_, i) => { const a = i * Math.PI / 6;
    return `<path d="M${r1(x + Math.cos(a) * (r + 7))} ${r1(y + Math.sin(a) * (r + 7))} L${r1(x + Math.cos(a) * (r + 17))} ${r1(y + Math.sin(a) * (r + 17))}" ${L(4.5, col)}/>`; }).join('');
  return `<circle cx="${x}" cy="${y}" r="${r + 10}" fill="${col}" opacity=".25"/>${rays}<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" stroke="#E08A1E" stroke-width="2"/>`;
}
function moon(x, y, r){
  const id = 'km' + (++uid);
  return `<defs><mask id="${id}"><rect x="${x - r - 2}" y="${y - r - 2}" width="${2 * r + 4}" height="${2 * r + 4}" fill="#fff"/><circle cx="${x + r * .55}" cy="${y - r * .3}" r="${r}" fill="#000"/></mask></defs>` +
    `<circle cx="${x}" cy="${y}" r="${r * 1.7}" fill="#FFF3B0" opacity=".14"/><circle cx="${x}" cy="${y}" r="${r}" fill="#FFF0A0" mask="url(#${id})"/>`;
}
const star = (x, y, r = 4) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r} Z" fill="#FFF6C8"/>`;
const stars = pts => pts.map(p => star(...p)).join('');
const cloud = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".95"><circle cx="0" cy="0" r="16"/><circle cx="18" cy="-8" r="20"/><circle cx="38" cy="0" r="15"/><rect x="0" y="0" width="38" height="15"/></g>`;
const roofs = (x, y, w, col) => `<path d="M${x} ${y} l20 -14 l20 14 l0 -6 l26 -18 l26 18 l0 8 l18 -12 l18 12 l0 -4 l24 -16 l24 16 L${x + w} ${y} L${x + w} ${y + 60} L${x} ${y + 60} Z" fill="${col}"/>`;
/* What a window shows at each time of day. */
function view(t, w, h){
  let s = skyRect(t, 0, 0, w, h);
  if(t === 'morning') s += sun(w * .45, h * .62, 18, t) + roofs(0, h * .78, w, '#9DB7C9');
  if(t === 'day') s += sun(w * .7, h * .26, 17, t) + cloud(w * .12, h * .45, .7) + roofs(0, h * .86, w, '#A9C6DA');
  if(t === 'evening') s += sun(w * .5, h * .8, 20, t) + roofs(0, h * .82, w, '#7D5A7C');
  if(t === 'storm') s += cloud(w * .1, h * .3, 1.1).replace('#fff', '#5A6488') + cloud(w * .55, h * .25, 1.2).replace('#fff', '#5A6488') + roofs(0, h * .84, w, '#1C2552');
  if(t === 'night') s += moon(w * .62, h * .34, 20) + stars([[w * .18, h * .22, 4], [w * .32, h * .5, 3], [w * .85, h * .62, 3.5], [w * .4, h * .15, 3]]) + roofs(0, h * .84, w, '#1C2552');
  return s;
}
function windowAt(x, y, w, h, t, o = {}){
  let s = `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="6" ${S('#FFFFFF')}/>`;
  s += `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${view(t, w, h)}`;
  if(o.rain) s += Array.from({length:14}, (_, i) => `<path d="M${(i * 37) % w} ${(i * 53) % h} l-6 16" ${L(2.4, '#9FB8E8')}/>`).join('') + `<path d="M${w * .7} 0 L${w * .56} ${h * .45} L${w * .68} ${h * .45} L${w * .5} ${h}" fill="none" stroke="#FFE45C" stroke-width="7" stroke-linejoin="round"/>`;
  s += `</svg><path d="M${x + w / 2} ${y} L${x + w / 2} ${y + h} M${x} ${y + h / 2} L${x + w} ${y + h / 2}" ${L(6, '#FFFFFF')}/><rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="6" fill="none" stroke="${LN}" stroke-width="${SW}"/>`;
  if(o.curtain !== false) s += [-1, 1].map(d => { const cx = d < 0 ? x - 8 : x + w + 8;
    return `<path d="M${cx} ${y - 14} L${cx + d * 30} ${y - 14} Q${cx + d * 18} ${y + h / 2} ${cx + d * 34} ${y + h + 16} L${cx} ${y + h + 16} Z" ${S(o.curtain || '#F6B8A0')}/>`; }).join('');
  return s;
}
const WALL = {storm:'#C9B9A2', morning:'#FCF2E0', day:'#FCF2E0', evening:'#F6DFC4', night:'#D9C7AE'};
function room(t, o = {}){
  let s = `<rect width="${W}" height="${H}" fill="${WALL[t]}"/>`;
  s += `<rect y="${GY - 30}" width="${W}" height="${H - GY + 30}" fill="${t === 'night' ? '#C99A6C' : '#E4B887'}"/>` +
    Array.from({length:5}, (_, i) => `<path d="M${i * 140 - 20} ${H} L${i * 140 + 40} ${GY - 30}" ${L(2, '#C9935F')}/>`).join('') +
    `<rect y="${GY - 36}" width="${W}" height="8" fill="#fff" stroke="${LN}" stroke-width="2"/>`;
  if(o.win !== false){ const [wx, wy, ww, wh] = o.win || [215, 40, 170, 130]; s += windowAt(wx, wy, ww, wh, o.rain ? 'storm' : t, o);
    if(t === 'morning' || t === 'day') s += `<path d="M${wx} ${wy + wh + 8} L${wx + ww} ${wy + wh + 8} L${wx + ww + 60} ${GY - 10} L${wx + 40} ${GY - 10} Z" fill="#FFE9A6" opacity=".35"/>`; }
  if(t === 'night' || t === 'evening') s += lamp(o.lamp ?? 540, 150, t === 'night');
  return s;
}
function lamp(x, y, glow){
  return (glow ? `<circle cx="${x}" cy="${y + 10}" r="90" fill="#FFE6A0" opacity=".35"/><circle cx="${x}" cy="${y + 10}" r="50" fill="#FFE6A0" opacity=".4"/>` : '') +
    `<path d="M${x} ${y - 160} L${x} ${y - 14}" ${L(2.4)}/><path d="M${x - 28} ${y + 14} L${x - 16} ${y - 16} L${x + 16} ${y - 16} L${x + 28} ${y + 14} Z" ${S('#FFD98A')}/>`;
}
const HILL = {morning:['#B8DFA0', '#8CCB78'], day:['#A6DA8E', '#7CC66A'], evening:['#B9879A', '#8E9B6A'], night:['#2A3A66', '#24443A']};
function outside(t, o = {}){
  let s = skyRect(t, 0, 0, W, GY);
  if(t === 'morning') s += sun(o.sun ?? 90, o.sunY ?? GY - 115, 30, t);
  if(t === 'day') s += sun(o.sun ?? 520, 62, 32, t) + cloud(130, 70) + cloud(330, 110, .8);
  if(t === 'evening') s += sun(o.sun ?? 300, GY - 92, 40, t);
  if(t === 'night') s += moon(o.sun ?? 480, 70, 30) + stars([[80, 50, 5], [170, 110, 4], [260, 40, 4], [380, 90, 3.5], [560, 150, 4], [40, 160, 3]]);
  s += `<path d="M0 ${GY - 90} Q150 ${GY - 150} 300 ${GY - 95} T600 ${GY - 100} L600 ${GY} L0 ${GY} Z" fill="${HILL[t][0]}"/>`;
  s += `<rect y="${GY - 40}" width="${W}" height="${H - GY + 40}" fill="${HILL[t][1]}"/>`;
  return s;
}
const night = s => s; // characters keep their colours at night: clearer for small children

/* ---------- props ---------- */
const P = {
  cup:`<rect x="-9" y="-22" width="18" height="18" rx="3" ${S('#FFFFFF')}/><path d="M9 -18 q8 0 8 6 q0 5 -8 5" ${L(2.4)}/><path d="M-3 -28 q-4 -5 0 -10 M4 -28 q-4 -5 0 -10" ${L(2, '#B9A99A')}/>`,
  bag:`<path d="M-8 4 Q0 -8 8 4" ${L(2.6)}/><path d="M6 8 L14 -18" ${L(6, '#5DB14B')}/><rect x="-16" y="4" width="32" height="34" rx="4" ${S('#F1D3A6')}/>`,
  can:`<path d="M-4 6 L-30 -8" ${L(5, '#4A9BD6')}/><rect x="-6" y="0" width="30" height="24" rx="5" ${S('#6CB6E8')}/><path d="M2 0 Q10 -14 18 0" ${L(3)}/>`,
  present:`<rect x="-20" y="-40" width="40" height="34" rx="4" ${S('#F59BB7')}/><path d="M0 -40 L0 -6 M-20 -24 L20 -24" ${L(5, '#E8457A')}/><path d="M0 -40 q-14 -14 -16 -2 q2 6 16 2 q14 -14 16 -2 q-2 6 -16 2" ${S('#E8457A')}/>`,
  cookies:`<ellipse cx="0" cy="-6" rx="34" ry="8" ${S('#FFFFFF')}/>` + [-18, 0, 18].map((d, i) => `<circle cx="${d}" cy="${-14 - (i % 2) * 6}" r="11" ${S('#D9A05B')}/><circle cx="${d - 3}" cy="${-16 - (i % 2) * 6}" r="1.8" fill="${LN}"/><circle cx="${d + 4}" cy="${-11 - (i % 2) * 6}" r="1.8" fill="${LN}"/>`).join(''),
  cookie:`<circle cx="0" cy="-12" r="12" ${S('#D9A05B')}/><circle cx="-4" cy="-15" r="1.8" fill="${LN}"/><circle cx="4" cy="-9" r="1.8" fill="${LN}"/>`,
  onigiri:`<path d="M0 -40 Q4 -40 20 -12 Q22 -4 14 -4 L-14 -4 Q-22 -4 -20 -12 Q-4 -40 0 -40 Z" ${S('#FFFFFF')}/><rect x="-10" y="-18" width="20" height="14" fill="#2F3A2E"/>`,
  jug:`<path d="M-12 -46 L12 -46 L16 -4 L-16 -4 Z" fill="#CFEAFB" stroke="${LN}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-14 -26 L14 -26 L16 -4 L-16 -4 Z" fill="#7CC3F2"/><path d="M14 -40 q12 2 10 16 q-2 8 -10 8" ${L(2.6)}/>`,
  emptycup:`<path d="M-11 -26 L11 -26 L9 -2 L-9 -2 Z" ${S('#FFFFFF')}/>`,
  bottle:`<rect x="-9" y="-46" width="18" height="44" rx="6" fill="#BFE6FB" stroke="${LN}" stroke-width="${SW}"/><rect x="-6" y="-54" width="12" height="9" rx="2" ${S('#4E9BE6')}/><rect x="-9" y="-30" width="18" height="12" fill="#4E9BE6"/>`,
  plaster:`<rect x="-14" y="-24" width="28" height="14" rx="6" ${S('#F5D7A8')}/><rect x="-5" y="-22" width="10" height="10" fill="#EBC28C"/>`,
  book:`<rect x="-24" y="-40" width="48" height="36" rx="3" ${S('#5DB86A')}/><circle cx="0" cy="-22" r="9" fill="#F5C542"/>`,
  car:`<path d="M-26 -10 L-26 -22 L-14 -22 L-8 -34 L12 -34 L18 -22 L26 -22 L26 -10 Z" ${S('#E8443A')}/><rect x="-5" y="-31" width="14" height="8" fill="#CFEAFB"/><circle cx="-15" cy="-8" r="7" ${S('#3B3B48')}/><circle cx="15" cy="-8" r="7" ${S('#3B3B48')}/>`,
  drawing:`<rect x="-34" y="-62" width="68" height="54" rx="2" ${S('#FFFFFF')}/><circle cx="20" cy="-48" r="7" fill="#F5C542"/><path d="M-22 -16 L-22 -32 L-10 -44 L2 -32 L2 -16 Z" fill="none" stroke="#E8443A" stroke-width="3"/><path d="M-30 -14 L30 -14" ${L(3, '#5DB86A')}/>`,
  ball:`<circle cx="0" cy="-18" r="17" ${S('#FFFFFF')}/><path d="M0 -25 l6 4 l-2 7 l-8 0 l-2 -7 Z" fill="${LN}"/><path d="M-15 -26 l5 2 M15 -26 l-5 2 M-9 -4 l3 -5 M9 -4 l-3 -5" ${L(2.4)}/>`,
  game:`<rect x="-34" y="-50" width="68" height="46" rx="4" ${S('#4E9BE6')}/><circle cx="-14" cy="-34" r="7" fill="#F5C542"/><circle cx="12" cy="-22" r="7" fill="#E8604C"/><rect x="6" y="-44" width="14" height="10" rx="2" fill="#5DB86A"/><circle cx="-16" cy="-14" r="5" fill="#fff"/>`,
  remote:`<rect x="-8" y="-40" width="16" height="38" rx="5" ${S('#3B3B48')}/><circle cx="0" cy="-32" r="3" fill="#E8604C"/><circle cx="-3" cy="-22" r="2" fill="#fff"/><circle cx="3" cy="-22" r="2" fill="#fff"/><circle cx="-3" cy="-15" r="2" fill="#fff"/><circle cx="3" cy="-15" r="2" fill="#fff"/>`,
  wallet:`<rect x="-14" y="-20" width="28" height="20" rx="4" ${S('#A9703F')}/><path d="M-14 -12 L14 -12" ${L(2)}/>`,
  cone:`<path d="M-12 -30 L0 0 L12 -30 Z" ${S('#E3A55B')}/><circle cx="0" cy="-36" r="14" ${S('#F7C4D6')}/><circle cx="0" cy="-50" r="11" ${S('#FFF4D6')}/>`,
  juice:`<path d="M-11 -34 L11 -34 L9 -2 L-9 -2 Z" fill="#FFB547" stroke="${LN}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M4 -34 L12 -50" ${L(3, '#E8443A')}/><circle cx="-12" cy="-34" r="6" fill="#FF9A2E" stroke="${LN}" stroke-width="2"/>`,
  cake:`<ellipse cx="0" cy="-4" rx="26" ry="6" ${S('#FFFFFF')}/><path d="M-16 -8 L-16 -28 L16 -18 L16 -8 Z" ${S('#FFF4D6')}/><path d="M-16 -20 L16 -12" ${L(4, '#F59BB7')}/><circle cx="-10" cy="-32" r="5" fill="#E8443A"/>`,
  shirt:`<path d="M-24 -40 L-8 -46 L8 -46 L24 -40 L30 -26 L20 -22 L18 -4 L-18 -4 L-20 -22 L-30 -26 Z" ${S('#F5C542')}/>`,
  balloon:`<path d="M0 0 Q-8 -40 4 -80" ${L(2)}/><ellipse cx="6" cy="-108" rx="24" ry="29" ${S('#E8443A')}/><ellipse cx="-2" cy="-116" rx="5" ry="8" fill="#fff" opacity=".6"/>`,
  plane:`<path d="M-30 -10 L20 -18 Q34 -18 30 -10 L-30 -2 Z" ${S('#4E9BE6')}/><path d="M-4 -12 L-14 -34 L-2 -34 L8 -14 Z" ${S('#F5C542')}/>`,
  puzzle:`<rect x="-26" y="-48" width="48" height="44" rx="4" ${S('#B07AD8')}/><rect x="-26" y="-48" width="24" height="22" fill="#F5C542" stroke="${LN}" stroke-width="2"/><rect x="-2" y="-26" width="24" height="22" fill="#5DB86A" stroke="${LN}" stroke-width="2"/>`,
  glass:`<path d="M-10 -30 L10 -30 L8 -2 L-8 -2 Z" fill="#DFF2FC" stroke="${LN}" stroke-width="${SW}" stroke-linejoin="round"/><path d="M-9 -18 L9 -18 L8 -3 L-8 -3 Z" fill="#7CC3F2"/>`,
  crayon:`<rect x="-4" y="-26" width="8" height="24" rx="2" transform="rotate(30)" ${S('#E8443A')}/>`,
  toymic:`<rect x="-4" y="-6" width="8" height="26" rx="3" ${S('#3B3B48')}/><circle cx="0" cy="-12" r="10" ${S('#C9D1DA')}/>`,
  teddy:`<circle cx="-12" cy="-30" r="7" ${S('#C08A55')}/><circle cx="12" cy="-30" r="7" ${S('#C08A55')}/><ellipse cx="0" cy="2" rx="16" ry="18" ${S('#C08A55')}/><circle cx="0" cy="-20" r="15" ${S('#C08A55')}/><ellipse cx="0" cy="-16" rx="6" ry="4.5" fill="#F0D2AC"/><circle cx="-5" cy="-23" r="2" fill="${LN}"/><circle cx="5" cy="-23" r="2" fill="${LN}"/>`
};
function table(x1, x2, top, col = '#C98B52'){
  return `<rect x="${x1}" y="${top}" width="${x2 - x1}" height="16" rx="4" ${S(col)}/><rect x="${x1 + 14}" y="${top + 16}" width="14" height="${GY - top - 14}" ${S('#A9703F')}/><rect x="${x2 - 28}" y="${top + 16}" width="14" height="${GY - top - 14}" ${S('#A9703F')}/>`;
}
function bowl(x, y, o = {}){
  const fill = o.food === 'rice' ? `<path d="M${x - 20} ${y - 2} Q${x} ${y - 24} ${x + 20} ${y - 2} Z" ${S('#FFFFFF')}/>` : o.food === 'soup' ? `<ellipse cx="${x}" cy="${y - 2}" rx="19" ry="5" fill="#C98A3E"/>` : '';
  const steam = o.food ? `<path d="M${x - 6} ${y - 22} q-5 -7 0 -14 M${x + 6} ${y - 24} q-5 -7 0 -14" ${L(2.4, '#C8B8A8')}/>` : '';
  return steam + fill + `<path d="M${x - 22} ${y - 3} L${x + 22} ${y - 3} Q${x + 20} ${y + 18} ${x} ${y + 18} Q${x - 20} ${y + 18} ${x - 22} ${y - 3} Z" ${S(o.col || '#E8604C')}/>` +
    (o.sticks ? `<path d="M${x - 30} ${y - 9} L${x + 30} ${y - 1}" ${L(4, '#7A4B2A')}/><path d="M${x - 30} ${y - 3} L${x + 30} ${y + 3}" ${L(4, '#7A4B2A')}/>` : '');
}
const plate = (x, y, w = 60) => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${w / 8}" ${S('#FFFFFF')}/>`;
const toast = (x, y) => `<path d="M${x - 16} ${y} L${x - 16} ${y - 20} Q${x - 18} ${y - 34} ${x} ${y - 32} Q${x + 18} ${y - 34} ${x + 16} ${y - 20} L${x + 16} ${y} Z" ${S('#E9B25E')}/><rect x="${x - 10}" y="${y - 24}" width="20" height="18" rx="3" fill="#F6D99A"/>`;
function bed(x, y, w, o = {}){
  return `<rect x="${x}" y="${y - 70}" width="18" height="${GY - y + 70}" rx="6" ${S('#B97F4E')}/><rect x="${x}" y="${y}" width="${w}" height="${GY - y - 4}" rx="10" ${S('#E6B07E')}/>` +
    `<ellipse cx="${x + 70}" cy="${y - 8}" rx="48" ry="20" ${S('#FFFFFF')}/>`;
}
function blanket(x, y, w, col = '#7FB8EA'){
  return `<path d="M${x} ${y + 20} Q${x} ${y - 18} ${x + 40} ${y - 18} L${x + w - 20} ${y - 22} Q${x + w + 6} ${y - 18} ${x + w} ${y + 20} Z" ${S(col)}/>` +
    Array.from({length:Math.floor(w / 46)}, (_, i) => `<circle cx="${x + 40 + i * 46}" cy="${y + 2}" r="5" fill="#fff" opacity=".7"/>`).join('');
}
function door(x, w, h, o = {}){
  const top = GY - h;
  return `<rect x="${x - 10}" y="${top - 10}" width="${w + 20}" height="${h + 10}" ${S('#FFFFFF')}/>` +
    (o.open ? `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${o.inside || '#F8E3BE'}"/>` : `<rect x="${x}" y="${top}" width="${w}" height="${h}" ${S(o.col || '#B9824F')}/><circle cx="${x + w - 16}" cy="${top + h / 2}" r="5" fill="#F5C542" stroke="${LN}" stroke-width="2"/>`);
}
const doorFrame = (x, w, h) => `<rect x="${x - 10}" y="${GY - h - 10}" width="${w + 20}" height="${h + 10}" fill="none" stroke="#FFFFFF" stroke-width="12"/><rect x="${x - 16}" y="${GY - h - 16}" width="${w + 32}" height="${h + 16}" fill="none" stroke="${LN}" stroke-width="${SW}"/><rect x="${x - 4}" y="${GY - h - 4}" width="${w + 8}" height="${h + 4}" fill="none" stroke="${LN}" stroke-width="${SW}"/>`;
function blocks(x, y){
  const B = [[-60, 0, '#E8604C', 10], [-26, 4, '#4E9BE6', -18], [8, 0, '#F5C542', 24], [42, 6, '#5DB86A', -8], [76, 2, '#B07AD8', 34], [-40, -26, '#F5C542', 40], [26, -24, '#E8604C', -30], [-90, 8, '#4E9BE6', 60]];
  return B.map(([dx, dy, c, r]) => `<rect x="${x + dx - 15}" y="${y + dy - 15}" width="30" height="30" rx="4" transform="rotate(${r} ${x + dx} ${y + dy})" ${S(c)}/>`).join('');
}
function flowers(x, y, n = 4){
  const C = ['#F06C8C', '#F5C542', '#B07AD8', '#F08E4E', '#F06C8C'];
  return Array.from({length:n}, (_, i) => { const fx = x + i * 26, fy = y - (i % 2) * 10;
    return `<path d="M${fx} ${fy} L${fx} ${GY - 4}" ${L(3, '#3E8E46')}/>` + [0, 72, 144, 216, 288].map(a => `<circle cx="${r1(fx + Math.cos(a * Math.PI / 180) * 7)}" cy="${r1(fy + Math.sin(a * Math.PI / 180) * 7)}" r="6" fill="${C[i % 5]}"/>`).join('') + `<circle cx="${fx}" cy="${fy}" r="4.5" fill="#FFE07A"/>`; }).join('');
}
function streetLamp(x, lit){
  return (lit ? `<circle cx="${x + 26}" cy="${GY - 214}" r="46" fill="#FFE9A0" opacity=".45"/>` : '') +
    `<path d="M${x} ${GY - 4} L${x} ${GY - 230} Q${x} ${GY - 246} ${x + 18} ${GY - 246} L${x + 26} ${GY - 246}" ${L(7, '#4A5068')}/>` +
    `<path d="M${x + 12} ${GY - 230} L${x + 40} ${GY - 230} L${x + 34} ${GY - 246} L${x + 18} ${GY - 246} Z" ${S(lit ? '#FFE27A' : '#DDE3EA')}/>`;
}
function house(x, w, o = {}){
  const top = GY - 300;
  return `<path d="M${x - 24} ${top + 34} L${x + w / 2} ${top - 26} L${x + w + 24} ${top + 34} Z" ${S(o.roof || '#D9614E')}/>` +
    `<rect x="${x}" y="${top + 30}" width="${w}" height="${270}" ${S(o.wall || '#FFF1D6')}/>`;
}
const path = (x1, x2, w1, w2) => `<path d="M${x1 - w1} ${H} L${x1 + w1} ${H} L${x2 + w2} ${GY - 30} L${x2 - w2} ${GY - 30} Z" fill="#E9D4AE"/>`;


function tree(x, s = 1, o = {}){
  return `<g transform="translate(${x} ${GY}) scale(${s})"><path d="M-16 0 L-12 -150 L12 -150 L16 0 Z" ${S('#A0703F')}/>` +
    (o.branch ? `<path d="M6 -150 L${o.branch} -152 L${o.branch} -138 L6 -128 Z" ${S('#A0703F')}/>` : '') +
    `<circle cx="-40" cy="-170" r="46" ${S('#5DB86A')}/><circle cx="40" cy="-176" r="46" ${S('#5DB86A')}/><circle cx="0" cy="-214" r="54" ${S('#6CC478')}/></g>`;
}
const bench = x => `<rect x="${x}" y="${GY - 70}" width="110" height="12" rx="3" ${S('#C98B52')}/><rect x="${x}" y="${GY - 48}" width="110" height="12" rx="3" ${S('#C98B52')}/><path d="M${x + 12} ${GY - 36} L${x + 12} ${GY - 4} M${x + 98} ${GY - 36} L${x + 98} ${GY - 4}" ${L(6, '#4A5068')}/>`;
function bunting(x1, x2, y){
  const C = ['#E8604C', '#F5C542', '#4E9BE6', '#5DB86A', '#F59BB7'], n = Math.floor((x2 - x1) / 40);
  return `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + 24} ${x2} ${y}" ${L(2)}/>` + Array.from({length:n}, (_, i) => { const x = x1 + 20 + i * 40, yy = y + 4 + Math.sin(Math.PI * (x - x1) / (x2 - x1)) * 22;
    return `<path d="M${x - 12} ${yy - 4} L${x + 12} ${yy - 4} L${x} ${yy + 20} Z" ${S(C[i % 5])}/>`; }).join('');
}
function shelves(x, w){
  const C = ['#E8604C', '#F5C542', '#4E9BE6', '#5DB86A', '#F59BB7', '#B07AD8', '#F08E4E'];
  return `<rect x="${x}" y="40" width="${w}" height="${GY - 70}" ${S('#E9C9A0')}/>` + [110, 190, 270].map((y, j) =>
    `<rect x="${x}" y="${y}" width="${w}" height="8" fill="#C98B52"/>` + Array.from({length:Math.floor((w - 10) / 30)}, (_, i) =>
      `<rect x="${x + 8 + i * 30}" y="${y - 34 - (i + j) % 2 * 8}" width="24" height="${34 + (i + j) % 2 * 8}" rx="3" ${S(C[(i * 3 + j) % 7])}/>`).join('')).join('');
}
const counter = (x, w, top = 250, col = '#E9C08F') => `<rect x="${x}" y="${top}" width="${w}" height="${GY - top}" ${S(col)}/><rect x="${x - 8}" y="${top - 12}" width="${w + 16}" height="14" rx="4" ${S('#C98B52')}/>`;
function sofa(x, w, col = '#E8836C'){
  return `<rect x="${x}" y="${GY - 150}" width="${w}" height="90" rx="22" ${S(col)}/><rect x="${x + 10}" y="${GY - 90}" width="${w - 20}" height="44" rx="12" ${S(col)}/>` +
    `<rect x="${x - 14}" y="${GY - 112}" width="40" height="90" rx="16" ${S(col)}/><rect x="${x + w - 26}" y="${GY - 112}" width="40" height="90" rx="16" ${S(col)}/>` +
    `<rect x="${x + 10}" y="${GY - 24}" width="12" height="22" fill="#7A4B2A"/><rect x="${x + w - 22}" y="${GY - 24}" width="12" height="22" fill="#7A4B2A"/>`;
}
const tv = (x, y) => `<rect x="${x}" y="${y}" width="150" height="96" rx="8" ${S('#3B3B48')}/><rect x="${x + 10}" y="${y + 10}" width="130" height="76" rx="4" fill="#6FC1F0"/><circle cx="${x + 100}" cy="${y + 36}" r="12" fill="#F5C542"/><path d="M${x + 14} ${y + 82} L${x + 50} ${y + 50} L${x + 80} ${y + 82} Z" fill="#5DB86A"/>` +
  `<rect x="${x + 10}" y="${y + 96}" width="130" height="${GY - y - 100}" ${S('#C98B52')}/>`;
function stove(x){
  return `<rect x="${x}" y="${GY - 110}" width="130" height="108" ${S('#FFFFFF')}/><rect x="${x - 4}" y="${GY - 118}" width="138" height="10" ${S('#C9D1DA')}/>` +
    `<rect x="${x + 25}" y="${GY - 160}" width="80" height="42" rx="6" ${S('#E8604C')}/><path d="M${x + 15} ${GY - 150} L${x + 25} ${GY - 150} M${x + 105} ${GY - 150} L${x + 115} ${GY - 150}" ${L(5)}/>` +
    `<path d="M${x + 50} ${GY - 170} q-8 -12 0 -24 q8 -12 0 -24 M${x + 80} ${GY - 170} q-8 -12 0 -24 q8 -12 0 -24" ${L(3, '#C8B8A8')}/>`;
}
function swings(x1, x2){
  return `<path d="M${x1} ${GY - 4} L${x1 + 30} 60 L${x2 - 30} 60 L${x2} ${GY - 4} M${x1 + 30} 60 L${x1 + 60} ${GY - 4} M${x2 - 30} 60 L${x2 - 60} ${GY - 4}" ${L(9, '#4E9BE6')}/>`;
}
const swingRopes = (x, seat) => `<path d="M${x - 26} 64 L${x - 26} ${seat} M${x + 26} 64 L${x + 26} ${seat}" ${L(3, '#7A6A5A')}/>`;
const seat = (x, y) => `<rect x="${x - 34}" y="${y}" width="68" height="9" rx="3" ${S('#C98B52')}/>`;
function slide(x){
  return `<path d="M${x} ${GY - 4} L${x} ${GY - 170} M${x + 40} ${GY - 4} L${x + 40} ${GY - 170}" ${L(7, '#4E9BE6')}/>` +
    [40, 80, 120].map(d => `<path d="M${x} ${GY - d} L${x + 40} ${GY - d}" ${L(5, '#4E9BE6')}/>`).join('') +
    `<path d="M${x + 40} ${GY - 170} Q${x + 90} ${GY - 160} ${x + 140} ${GY - 20} L${x + 160} ${GY - 10}" ${L(16, '#F5C542')}/>`;
}
function track(){
  return `<rect y="${GY - 70}" width="${W}" height="${H - GY + 70}" fill="#D9714F"/>` + [GY - 34, GY + 6].map(y => `<path d="M0 ${y} L${W} ${y}" ${L(4, '#FFFFFF')}/>`).join('');
}
const tape = x => `<path d="M${x} ${GY - 140} L${x} ${GY - 4} M${x + 50} ${GY - 140} L${x + 50} ${GY + 30}" ${L(6, '#4A5068')}/><path d="M${x} ${GY - 110} L${x + 50} ${GY - 110}" ${L(5, '#E8443A')}/>`;
function busStop(x){ return `<path d="M${x} ${GY - 4} L${x} ${GY - 200}" ${L(6, '#4A5068')}/><circle cx="${x}" cy="${GY - 210}" r="22" ${S('#4E9BE6')}/><rect x="${x - 14}" y="${GY - 218}" width="28" height="14" rx="3" fill="#fff"/><circle cx="${x - 8}" cy="${GY - 202}" r="3" fill="${LN}"/><circle cx="${x + 8}" cy="${GY - 202}" r="3" fill="${LN}"/>`; }
function bus(x){
  return `<rect x="${x}" y="${GY - 190}" width="290" height="170" rx="30" ${S('#F5C542')}/>` + [0, 1, 2].map(i => `<rect x="${x + 24 + i * 64}" y="${GY - 170}" width="52" height="50" rx="8" ${S('#CFEAFB')}/>`).join('') +
    `<rect x="${x + 214}" y="${GY - 170}" width="56" height="148" rx="6" ${S('#5A6380')}/><rect x="${x + 220}" y="${GY - 164}" width="44" height="60" fill="#8FA0C8"/>` +
    `<circle cx="${x + 60}" cy="${GY - 18}" r="22" ${S('#3B3B48')}/><circle cx="${x + 190}" cy="${GY - 18}" r="22" ${S('#3B3B48')}/><circle cx="${x + 60}" cy="${GY - 18}" r="8" fill="#C9D1DA"/><circle cx="${x + 190}" cy="${GY - 18}" r="8" fill="#C9D1DA"/>`;
}
function iceCart(x){
  return `<path d="M${x + 60} 60 L${x + 60} ${GY - 120}" ${L(5, '#4A5068')}/><path d="M${x - 20} 110 Q${x + 60} 30 ${x + 140} 110 Z" ${S('#F59BB7')}/><path d="M${x + 20} 110 Q${x + 30} 60 ${x + 60} 52 Q${x + 90} 60 ${x + 100} 110" ${L(3, '#FFFFFF')}/>` +
    `<rect x="${x}" y="${GY - 130}" width="120" height="100" rx="10" ${S('#BFE6FB')}/><circle cx="${x + 20}" cy="${GY - 20}" r="18" ${S('#3B3B48')}/><circle cx="${x + 100}" cy="${GY - 20}" r="18" ${S('#3B3B48')}/>` +
    `<g transform="translate(${x + 60} ${GY - 70}) scale(1.4)">${P.cone}</g>`;
}
function clock(x, y, r = 46){
  return `<circle cx="${x}" cy="${y}" r="${r}" ${S('#FFFFFF')}/><circle cx="${x}" cy="${y}" r="${r - 6}" fill="none" stroke="#F5C542" stroke-width="4"/>` + Array.from({length:12}, (_, i) => { const a = i * Math.PI / 6;
    return `<circle cx="${r1(x + Math.cos(a) * (r - 14))}" cy="${r1(y + Math.sin(a) * (r - 14))}" r="${i % 3 ? 2 : 3.5}" fill="${LN}"/>`; }).join('') +
    `<path d="M${x} ${y} L${x} ${y - r + 16} M${x} ${y} L${x + r - 22} ${y}" ${L(4.5)}/><circle cx="${x}" cy="${y}" r="4" fill="${LN}"/>`;
}
function arrowSign(x, dir, col){
  return `<path d="M${x} ${GY - 4} L${x} ${GY - 150}" ${L(8, '#7A6A5A')}/><g transform="translate(${x} ${GY - 190}) scale(${dir} 1)"><path d="M-60 -24 L20 -24 L20 -48 L70 0 L20 48 L20 24 L-60 24 Z" ${S(col)}/></g>`;
}
const heart = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C-18 -4 -14 -20 -4 -18 Q0 -17 0 -12 Q0 -17 4 -18 C14 -20 18 -4 0 8 Z" fill="#F06C8C" stroke="#C9406B" stroke-width="1.6"/>`;
const tower = (x, n) => Array.from({length:n}, (_, i) => `<rect x="${x - 17 + (i % 2) * 4}" y="${GY - 6 - (i + 1) * 30}" width="34" height="30" rx="4" ${S(['#E8604C', '#4E9BE6', '#F5C542', '#5DB86A', '#B07AD8'][i % 5])}/>`).join('');
const blackboard = (x, y, w, h) => `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="4" ${S('#B97F4E')}/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3E7A5A"/><circle cx="${x + 40}" cy="${y + 40}" r="16" fill="none" stroke="#fff" stroke-width="3"/><path d="M${x + 80} ${y + 56} L${x + 100} ${y + 24} L${x + 120} ${y + 56} Z" fill="none" stroke="#fff" stroke-width="3"/>`;
const desk = x => `<rect x="${x}" y="${GY - 80}" width="80" height="10" ${S('#E3B582')}/><path d="M${x + 8} ${GY - 70} L${x + 8} ${GY - 4} M${x + 72} ${GY - 70} L${x + 72} ${GY - 4}" ${L(5, '#8A8F9C')}/>`;
function school(x){
  return `<rect x="${x}" y="70" width="330" height="${GY - 110}" ${S('#F3E6CF')}/><rect x="${x - 10}" y="58" width="350" height="16" ${S('#D9614E')}/>` +
    [0, 1, 2, 3].map(i => [0, 1].map(j => `<rect x="${x + 22 + i * 78}" y="${100 + j * 80}" width="54" height="50" rx="4" ${S('#CFEAFB')}/>`).join('')).join('') + clock(x + 165, 40, 26);
}
const gate = x => `<rect x="${x}" y="${GY - 150}" width="34" height="148" ${S('#C9C2B6')}/><rect x="${x - 6}" y="${GY - 160}" width="46" height="14" ${S('#B3AA9C')}/>`;
const tile = n => `<rect width="${W}" height="${H}" fill="#2A3470" opacity="${n}"/>`;
const heat = (x, y) => [0, 1, 2].map(i => `<path d="M${x + i * 26} ${y} q8 -10 0 -20 q-8 -10 0 -20" ${L(3, '#FFFFFF')} opacity=".7"/>`).join('');
const rug = (x, w) => `<ellipse cx="${x}" cy="${GY + 4}" rx="${w / 2}" ry="26" ${S('#9FD0A8')}/>`;
const toys = (x, y) => `<g transform="translate(${x} ${y})">${P.car}</g><g transform="translate(${x + 70} ${y}) scale(.8)">${P.ball}</g>` + `<rect x="${x + 110}" y="${y - 30}" width="28" height="28" rx="4" ${S('#F5C542')}/>`;
function frostedDoor(x){
  return `<rect x="${x}" y="${GY - 280}" width="130" height="276" ${S('#B9824F')}/><rect x="${x + 22}" y="${GY - 256}" width="86" height="140" rx="6" fill="#E3EEF5" stroke="${LN}" stroke-width="${SW}"/>` +
    `<circle cx="${x + 65}" cy="${GY - 210}" r="24" fill="#5E6A7A" opacity=".55"/><path d="M${x + 28} ${GY - 117} Q${x + 30} ${GY - 182} ${x + 65} ${GY - 182} Q${x + 100} ${GY - 182} ${x + 102} ${GY - 117} Z" fill="#5E6A7A" opacity=".55"/>` +
    `<circle cx="${x + 112}" cy="${GY - 100}" r="6" fill="#F5C542" stroke="${LN}" stroke-width="2"/>`;
}
const ring = (x, y) => `<circle cx="${x}" cy="${y}" r="9" ${S('#F5C542')}/>` + [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([a, b]) => `<path d="M${x + a * 16} ${y + b * 8} l${a * 9} ${b * 5}" ${L(3, '#F08E4E')}/>`).join('');
const steam = (x, y) => `<path d="M${x} ${y} q-14 -4 -10 -18 q-10 -12 4 -20 q4 -14 18 -8 q12 -8 18 6 q14 4 6 18 q4 14 -12 16 q-10 8 -24 6 Z" fill="#fff" stroke="${LN}" stroke-width="2"/>`;
const hunger = (x, y) => [0, 1].map(i => `<path d="M${x - 30 + i * 60} ${y} q${i ? 6 : -6} -6 0 -12 q${i ? -6 : 6} -6 0 -12" ${L(2.6)}/>`).join('');
const speed = (x, y, dir = -1) => [0, 1, 2].map(i => `<path d="M${x} ${y + i * 22} l${dir * 34} 0" ${L(3, '#FFFFFF')}/>`).join('');
const scrape = `<ellipse cx="0" cy="0" rx="7" ry="5" fill="#E8443A" opacity=".8"/>`;
const sparkle = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -12 Q0 0 12 0 Q0 0 0 12 Q0 0 -12 0 Q0 0 0 -12 Z" fill="#F5C542" stroke="#E08A1E" stroke-width="1.4"/>`;
const PJ = {top:'#A9D3F2', bot:'#A9D3F2', pj:1};
const note = (x, y, s = 1, c = '#B07AD8') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M6 0 L6 -30 L22 -36 L22 -8" ${L(3.4, c)}/><ellipse cx="1" cy="1" rx="7" ry="5.5" fill="${c}"/><ellipse cx="17" cy="-7" rx="7" ry="5.5" fill="${c}"/></g>`;
const steps = (x, y, n) => Array.from({length:n}, (_, i) => `<ellipse cx="${x - i * 38}" cy="${y + (i % 2) * 10}" rx="9" ry="5" fill="#C9B08A" opacity="${.7 - i * .15}"/>`).join('');

/* ---------- the scenes (numbers match art/PROMPTS.md) ---------- */
const SC = {
  // あいさつ
  1: () => room('morning', {win:[218, 34, 164, 120]}) + table(236, 364, 262) + plate(270, 260) + toast(270, 258) + `<g transform="translate(332 258)">${P.cup}</g>` +
    person('sora', 140, {f:1, x:'talk', r:'wave', say:1, c:PJ}) +
    person('mama', 460, {f:-1, x:'smile', l:'hold', il:P.cup}),
  2: () => outside('day', {sun:80}) + house(380, 200, {wall:'#FDE7C8'}) + door(450, 60, 110, {col:'#7FB6E0'}) + path(300, 300, 160, 40) +
    person('sora', 170, {f:1, x:'talk', r:'wave', say:1}) + person('mei', 330, {f:-1, x:'joy', l:'wave'}),
  3: () => outside('evening', {sun:300}) + streetLamp(40, true) + flowers(330, GY - 40, 4) +
    person('sora', 170, {f:1, x:'talk', r:'wave', l:'hold', il:P.bag, say:1}) +
    person('gran', 480, {f:-1, x:'smile', l:[24, 34], il:P.can}),
  4: () => room('night', {win:[350, 50, 150, 120], lamp:72}) + bed(40, 262, 300) + head('sora', 112, 228, {f:1, x:'sleepytalk'}) +
    blanket(40, 268, 300) + `<g transform="translate(160 262) scale(.9)">${P.teddy}</g>` +
    bubble(190, 140, 140, 196) + door(470, 100, 290, {open:1, inside:'#9C8A74'}) +
    person('mama', 520, {f:-1, x:'smile', l:'wave'}) + doorFrame(470, 100, 290),
  5: () => outside('day', {sun:300}) + school(135) + gate(100) + gate(466) + path(80, 230, 70, 30) + path(520, 370, 70, 30) +
    person('sora', 150, {f:1, x:'talk', r:'wave', pack:1, say:1}) + person('mei', 450, {f:-1, x:'smile', l:'wave', pack:'#E8457A'}),
  6: () => room('morning', {win:[400, 40, 150, 110]}) + blackboard(40, 50, 220, 120) + desk(30) + desk(500) +
    person('sora', 180, {f:1, x:'talk', l:'down', r:'down', lean:16, say:1, c:{}}) + person('mei', 420, {f:-1, x:'shy', l:'down', r:'down', lean:16, pack:'#E8457A'}),
  7: () => outside('day', {sun:520}) + tree(80, .9) + bench(420) +
    person('sora', 200, {f:1, x:'curious', r:'palms', say:1}) + person('mei', 400, {f:-1, x:'smile'}),
  8: () => outside('day', {sun:520}) + tree(80, .9) + bench(420) +
    person('sora', 200, {f:1, x:'grin', r:'fist', l:'hip', say:1}) + sparkle(268, 196) + sparkle(130, 170, .8) +
    person('mei', 400, {f:-1, x:'joy', l:'together', r:'together'}),
  // いえで
  9: () => room('evening', {win:[218, 40, 164, 110], lamp:540}) +
    person('sora', 150, {f:1, x:'contenttalk', l:'together', r:'together', say:1, y:GY - 14}) +
    person('mama', 450, {f:-1, x:'content', l:'together', r:'together'}) +
    table(40, 560, 286) + bowl(130, 280, {food:'rice', col:'#E8604C'}) + bowl(200, 284, {food:'soup', col:'#4E9BE6'}) + plate(290, 286, 70) +
    `<path d="M268 282 Q290 266 312 282 L320 274 L320 290 L312 284 Q290 296 268 282 Z" ${S('#F08E6E')}/>` + bowl(460, 280, {food:'rice', col:'#5DB86A'}) + bowl(390, 284, {food:'soup', col:'#F5C542'}),
  10: () => room('evening', {win:[218, 40, 164, 110], lamp:540}) +
    person('sora', 150, {f:1, x:'contenttalk', l:'together', r:'together', say:1, y:GY - 14}) +
    person('mama', 450, {f:-1, x:'content', l:'together', r:'together'}) +
    table(40, 560, 286) + bowl(150, 280, {sticks:1, col:'#E8604C'}) + bowl(215, 284, {col:'#4E9BE6'}) + plate(300, 286, 70) + bowl(450, 280, {sticks:1, col:'#5DB86A'}) + bowl(385, 284, {col:'#F5C542'}),
  11: () => room('day', {win:[218, 40, 164, 110]}) +
    person('sora', 160, {f:1, x:'full', r:'offer', ir:P.onigiri, l:'cheek', say:1, y:GY - 14}) + person('mama', 450, {f:-1, x:'smile', l:'hip', r:'hip'}) +
    table(40, 560, 290) + plate(300, 288, 70) + `<g transform="translate(300 286) scale(.8)">${P.onigiri}</g>`,
  12: () => outside('morning', {sun:70}) + path(140, 210, 150, 26) + house(330, 290) + door(420, 110, 290, {open:1}) +
    person('mama', 475, {f:-1, x:'smile', l:'down'}) + doorFrame(420, 110, 290) +
    person('sora', 170, {f:1, x:'talk', r:'wave', pack:1, say:1}),
  13: () => outside('morning', {sun:540}) + path(460, 400, 150, 26) + house(-20, 290) + door(70, 110, 290, {open:1}) +
    person('mama', 125, {f:1, x:'talk', r:'wave', say:1}) + doorFrame(70, 110, 290) +
    person('sora', 440, {f:1, x:'smile', pack:1, l:'down', r:'down'}),
  14: () => room('evening', {win:false, lamp:560}) + door(50, 140, 290, {open:1, inside:'#FFC48A'}) + `<svg x="50" y="${GY - 290}" width="140" height="290" viewBox="0 0 140 290">${view('evening', 140, 290)}</svg>` +
    person('sora', 120, {f:1, x:'grin', l:'up', r:'up', pack:1, say:1}) + doorFrame(50, 140, 290) + `<ellipse cx="270" cy="${GY + 10}" rx="12" ry="6" ${S('#E2553F')}/><ellipse cx="296" cy="${GY + 14}" rx="12" ry="6" ${S('#E2553F')}/>` +
    person('mama', 460, {f:-1, x:'smile'}),
  15: () => room('evening', {win:false, lamp:40}) + door(410, 140, 290, {open:1, inside:'#FFC48A'}) + `<svg x="410" y="${GY - 290}" width="140" height="290" viewBox="0 0 140 290">${view('evening', 140, 290)}</svg>` +
    person('sora', 480, {f:-1, x:'smile', pack:1}) + doorFrame(410, 140, 290) +
    person('mama', 190, {f:1, x:'talk', l:'up', r:'up', say:1}),
  // ありがとう
  16: () => room('day', {win:[230, 50, 140, 100]}) + bunting(20, 580, 30) +
    person('sora', 180, {f:1, x:'grin', l:'together', r:'together', lean:10, say:1, front:`<g transform="translate(0 -44)">${P.present}</g>`}) +
    person('mei', 420, {f:-1, x:'smile', l:'offer'}),
  17: () => room('day', {win:[230, 50, 140, 100]}) + 
    person('sora', 170, {f:1, x:'talk', r:'palms', say:1}) + person('mei', 430, {f:-1, x:'joy', l:'offer', il:P.cookie}),
  18: () => room('day', {win:[60, 40, 150, 110]}) + blocks(300, GY - 22) +
    person('sora', 140, {f:1, x:'sorry', l:'together', r:'together', lean:22, say:1}) +
    person('mei', 470, {f:-1, x:'sad'}),
  19: () => room('day', {win:[390, 40, 150, 110]}) + blocks(300, GY - 22) +
    person('mei', 140, {f:1, x:'talk', r:'ok', say:1}) +
    person('sora', 470, {f:-1, x:'content', l:'together', r:'together'}),
  20: () => room('day', {win:[230, 50, 140, 100]}) +
    person('sora', 190, {f:1, x:'talk', r:'offer', ir:P.cookies, say:1}) + person('mei', 410, {f:-1, x:'joy', l:'offer'}),
  21: () => room('day', {win:false}) + shelves(20, 300) + person('lady', 470, {f:-1, x:'smile', l:'down'}) + counter(380, 210, 250) +
    `<rect x="440" y="214" width="40" height="22" rx="3" ${S('#B07AD8')}/>` +
    person('sora', 250, {f:1, x:'talk', r:'pointup', say:1}),
  // きもち
  22: () => outside('day', {sun:90}) + flowers(40, GY - 40, 5) + flowers(440, GY - 34, 5) +
    person('sora', 300, {f:1, x:'joy', l:'up', r:'up', ir:P.balloon, y:GY - 28, say:1}) + `<ellipse cx="300" cy="${GY + 6}" rx="40" ry="8" fill="#000" opacity=".12"/>`,
  23: () => outside('day', {sun:300}) + swings(40, 560) + swingRopes(180, 300) + swingRopes(420, 300) +
    person('sora', 180, {f:1, x:'joy', sit:1, l:[8, -20], r:[8, -20], y:322, say:1}) + seat(180, 300) +
    person('mei', 420, {f:-1, x:'joy', sit:1, l:[8, -20], r:[8, -20], y:322}) + seat(420, 300),
  24: () => room('day', {win:[60, 40, 150, 110]}) + `<rect width="${W}" height="${H}" fill="#7C8CC0" opacity=".22"/>` +
    person('sora', 280, {f:1, x:'sad', sit:1, l:'together', r:'together', y:GY + 6, say:1}) +
    `<g transform="translate(390 ${GY + 8})">${P.plane}</g><path d="M430 ${GY + 4} L454 ${GY - 8} L460 ${GY + 6} Z" ${S('#4E9BE6')}/>`,
  25: () => room('day', {win:[60, 40, 150, 110]}) + `<rect x="380" y="${GY - 8}" width="90" height="64" rx="2" transform="rotate(-8 420 ${GY})" ${S('#FFFFFF')}/><circle cx="410" cy="${GY + 12}" r="9" fill="#F5C542"/><path d="M400 ${GY + 6} Q440 ${GY - 10} 470 ${GY + 24} Q430 ${GY + 40} 400 ${GY + 6} Z" fill="#9B5FC0" opacity=".75"/>` +
    `<g transform="translate(470 ${GY + 20}) rotate(80)">${P.emptycup}</g>` +
    person('sora', 260, {f:1, x:'angry', l:'cross', r:'cross', say:1}) + steam(214, 150),
  26: () => room('night', {win:[200, 40, 200, 140], rain:1, lamp:-200, curtain:'#9FA8D8'}) + tile(.28) +
    head('sora', 300, 246, {f:1, x:'scared', s:1.15}) +
    `<path d="M150 ${GY} Q150 268 230 262 Q300 252 370 262 Q450 270 450 ${GY} Z" ${S('#7FB8EA')}/>` +
    `<g transform="translate(400 300)">${P.teddy}</g>` + bubble(400, 196, 340, 226),
  27: () => room('evening', {win:[380, 40, 150, 110], lamp:-200}) + sofa(140, 300) +
    person('sora', 280, {f:1, x:'tired', sit:1, l:'down', r:'down', y:GY - 64, say:1}) +
    `<g transform="translate(520 ${GY + 10})">${P.ball}</g><circle cx="514" cy="${GY - 10}" r="4" fill="#8A6A4A"/><circle cx="526" cy="${GY - 2}" r="3" fill="#8A6A4A"/>`,
  28: () => room('night', {win:[60, 40, 140, 110], lamp:520}) + bed(330, 280, 240) + blanket(330, 286, 240) +
    person('sora', 260, {f:1, x:'sleepy', l:'rub', r:'hold', ir:P.teddy, c:PJ, say:1}),
  // おねがい
  29: () => room('evening', {win:[230, 40, 140, 100], lamp:-200}) + stove(400) +
    person('sora', 160, {f:1, x:'worriedtalk', l:'belly', r:'belly', say:1}) + hunger(160, GY - 60).replace(/M(\d+)/g, (m, a) => 'M' + (a < 160 ? a - 22 : +a + 22)) +
    person('mama', 440, {f:-1, x:'smile', l:'hold'}),
  30: () => outside('day', {sun:300}) + heat(80, GY - 60) + heat(480, GY - 70) +
    person('sora', 180, {f:1, x:'tired', r:'throat', say:1}) + person('mama', 430, {f:-1, x:'smile', l:'offer', il:P.bottle}),
  31: () => room('day', {win:[230, 40, 140, 100]}) +
    person('sora', 180, {f:1, x:'talk', l:[-34, 10], r:'offer', ir:P.emptycup, lean:8, say:1}) + person('mama', 430, {f:-1, x:'smile', l:'offer', il:P.jug}),
  32: () => room('day', {win:false}) + shelves(330, 250) + `<rect x="60" y="${GY - 270}" width="120" height="266" ${S('#9FC7E8')}/>` +
    `<rect x="92" y="${GY - 240}" width="56" height="56" rx="8" ${S('#FFFFFF')}/><circle cx="111" cy="${GY - 228}" r="5" fill="#4E9BE6"/><path d="M104 ${GY - 220} L118 ${GY - 220} L116 ${GY - 196} L106 ${GY - 196} Z" fill="#4E9BE6"/><circle cx="131" cy="${GY - 228}" r="5" fill="#E8604C"/><path d="M131 ${GY - 221} L140 ${GY - 196} L122 ${GY - 196} Z" fill="#E8604C"/>` +
    person('sora', 230, {f:1, x:'worriedtalk', r:'offer', l:'belly', say:1}) + speed(170, GY - 40, -1).replace(/#FFFFFF/g, '#C9B49A') +
    person('mama', 420, {f:-1, x:'smile', l:'down'}),
  33: () => outside('day', {sun:520}) + slide(330) +
    person('sora', 160, {f:1, x:'pain', sit:1, l:'offer', r:'offer', y:GY + 4, say:1}) + `<g transform="translate(205 ${GY - 30})">${scrape}</g>` +
    person('mama', 400, {f:-1, x:'worried', l:'offer', il:P.plaster, lean:16}),
  34: () => outside('day', {sun:520}) + tree(120, 1.15, {branch:150}) +
    person('sora', 230, {f:1, x:'worriedtalk', sit:1, l:'hold', r:'reach', y:GY - 168, say:1}) +
    person('papa', 450, {f:-1, x:'surprised', l:'up', r:'up', lean:8}) + speed(520, GY - 160, 1),
  35: () => room('night', {win:[330, 40, 140, 110], lamp:560}) + bed(20, 280, 220) + blanket(20, 286, 220) +
    person('sora', 190, {f:1, x:'curious', r:'pointup', c:PJ, say:1}) + person('papa', 430, {f:-1, x:'smile', l:'offer', il:P.book}),
  // あそぼう
  36: () => room('day', {win:[60, 40, 150, 110]}) + door(470, 100, 280, {open:1}) + rug(270, 300) + toys(220, GY + 10) +
    person('sora', 170, {f:1, x:'talk', r:'offer', ir:P.teddy, say:1}) + person('mei', 450, {f:-1, x:'shy'}) + doorFrame(470, 100, 280).replace(/<rect[^>]*fill="none" stroke="#FFFFFF"[^>]*\/>/, ''),
  37: () => room('day', {win:[230, 40, 140, 100]}) +
    person('sora', 180, {f:1, x:'talk', l:'palms', r:'offer', say:1}) + person('mei', 420, {f:-1, x:'smile', l:'together', il:P.car}),
  38: () => outside('day', {sun:300}) + tree(560, .8) +
    person('sora', 150, {f:1, x:'worriedtalk', r:'reach', l:'down', lean:10, say:1}) + speed(90, GY - 120, -1) +
    person('mei', 440, {f:1, x:'joy', lean:12, l:'down', r:'offer'}) + speed(380, GY - 120, -1),
  39: () => room('day', {win:[230, 40, 140, 100]}) + sofa(360, 220) +
    person('sora', 170, {f:1, x:'grin', r:'offer', ir:P.drawing, say:1}) + person('mama', 470, {f:-1, x:'wow', sit:1, y:GY - 64}),
  40: () => room('day', {win:[60, 40, 150, 110]}) + tower(300, 8) +
    person('sora', 180, {f:1, x:'grin', l:'up', r:'up', say:1}) + person('mei', 440, {f:-1, x:'wow', l:'together', r:'together'}) + sparkle(300, 90) + sparkle(340, 120, .7),
  41: () => outside('day', {sun:300}) +
    person('sora', 150, {f:1, x:'wow', r:'point', say:1}) +
    person('mei', 420, {f:-1, x:'joy', l:'up', r:'up', rot:160, y:GY + 30}) + `<path d="M350 ${GY - 230} Q420 ${GY - 290} 500 ${GY - 230}" ${L(3, '#FFFFFF')} stroke-dasharray="6 10"/>`,
  42: () => outside('day', {sun:520}) + track() + bunting(0, 600, 34) + tape(500) +
    person('sora', 140, {f:1, x:'grin', l:'up', r:'up', say:1}) +
    person('mei', 400, {f:1, x:'smile', lean:14, l:'offer', r:'hip'}) + speed(330, GY - 120, -1),
  // しつもん
  43: () => room('day', {win:[230, 40, 140, 100]}) + table(250, 370, 268) + `<g transform="translate(310 266)">${P.puzzle}</g>` +
    person('sora', 160, {f:1, x:'curious', r:'point', say:1}) + person('papa', 470, {f:-1, x:'smile'}),
  44: () => room('day', {win:[60, 40, 140, 100]}) + sofa(250, 200, '#7FB6E0') + `<circle cx="318" cy="${GY - 14}" r="8" ${S('#C08A55')}/><circle cx="336" cy="${GY - 4}" r="14" ${S('#C08A55')}/><circle cx="332" cy="${GY - 6}" r="2" fill="${LN}"/>` +
    person('sora', 140, {f:1, x:'worriedtalk', l:'palms', r:'palms', say:1}) + person('mama', 520, {f:-1, x:'smile', lean:14}),
  45: () => room('day', {win:false}) + frostedDoor(400) + ring(560, 130) +
    person('sora', 190, {f:1, x:'curious', r:'palms', say:1}),
  46: () => room('day', {win:[230, 40, 140, 100]}) + table(240, 370, 280) + `<g transform="translate(300 278)"><rect x="-38" y="-6" width="76" height="8" fill="#fff" stroke="${LN}" stroke-width="2"/><path d="M-38 -6 L0 -2 L38 -6 L38 -40 L0 -36 L-38 -40 Z" fill="#BFE6FB" stroke="${LN}" stroke-width="2"/><circle cx="-18" cy="-24" r="8" fill="#F5C542"/><path d="M10 -20 q8 -8 16 0" ${L(2, '#fff')}/></g>` +
    person('sora', 150, {f:1, x:'curious', r:'chin', say:1}) + person('papa', 480, {f:-1, x:'worried', l:[-10, -58]}),
  47: () => room('day', {win:[230, 40, 140, 100]}) + table(220, 380, 270) + bowl(300, 262, {col:'#FFFFFF'}) + [[-14, -18], [8, -20], [-2, -34]].map(([a, b]) => `<circle cx="${300 + a}" cy="${262 + b}" r="12" ${S('#E8443A')}/><path d="M${300 + a} ${250 + b} l2 -6" ${L(2.4, '#5A3A1A')}/>`).join('') +
    person('sora', 140, {f:1, x:'curious', r:'point', l:'offer', say:1}) + person('mama', 480, {f:-1, x:'smile'}),
  48: () => room('day', {win:[60, 50, 120, 90]}) + clock(310, 90, 54) +
    person('sora', 190, {f:1, x:'curious', r:'pointup', say:1}) + person('papa', 450, {f:-1, x:'smile', l:'cross'}),
  49: () => outside('day', {sun:90}) + arrowSign(460, 1, '#5DB86A') + person('sora', 260, {f:1, x:'talk', r:'point', say:1}),
  50: () => outside('day', {sun:510}) + arrowSign(140, -1, '#4E9BE6') + person('sora', 340, {f:-1, x:'talk', l:'point', say:1}),
  // すきな もの
  51: () => room('day', {win:false}) + `<rect x="300" y="50" width="260" height="100" rx="8" ${S('#F6D9B0')}/>` + [0, 1, 2].map(i => `<g transform="translate(${350 + i * 80} 130)">${P.juice}</g>`).join('') +
    person('lady', 460, {f:-1, x:'smile', l:[30, 24], il:P.juice}) + counter(330, 260, 260, '#9FD0A8') +
    person('sora', 180, {f:1, x:'talk', r:'point', say:1}),
  52: () => outside('day', {sun:90}) + heat(30, GY - 40) + iceCart(250) +
    person('sora', 150, {f:1, x:'wow', l:'together', r:'together', say:1}) + person('papa', 490, {f:-1, x:'smile', l:'offer', il:P.wallet}),
  53: () => room('day', {win:[230, 40, 140, 100]}) + bunting(20, 580, 30) + `<g transform="translate(470 120)">${P.balloon}</g>` +
    person('sora', 150, {f:1, x:'yum', r:'offer', ir:P.cake, say:1, y:GY - 14}) + `<circle cx="180" cy="226" r="4" fill="#fff" stroke="${LN}" stroke-width="1.6"/>` +
    person('mama', 450, {f:-1, x:'smile'}) + table(40, 560, 290) +
    `<g transform="translate(300 288)"><rect x="-40" y="-44" width="80" height="40" rx="6" ${S('#FFF4D6')}/><path d="M-40 -30 L40 -30" ${L(6, '#F59BB7')}/>${[-20, 0, 20].map(d => `<rect x="${d - 3}" y="-62" width="6" height="18" fill="#7FB6E0"/><path d="M${d} -64 q-4 -6 0 -10 q4 4 0 10" fill="#F5A13A"/>`).join('')}</g>`,
  54: () => room('day', {win:[60, 40, 140, 100]}) + tv(220, 150) +
    person('sora', 140, {f:1, x:'curious', l:'together', r:'together', ir:P.remote, say:1}) + person('mama', 480, {f:-1, x:'smile', l:'offer', il:P.shirt}),
  55: () => room('day', {win:[230, 40, 140, 100]}) + rug(300, 460) +
    person('sora', 160, {f:1, x:'grin', r:'up', ir:P.game, say:1}) + person('mei', 430, {f:-1, x:'joy', sit:1, l:'together', r:'together', y:GY + 6}),
  56: () => outside('day', {sun:520}) + tree(560, .8) +
    person('sora', 180, {f:1, x:'talk', r:'up', ir:P.ball, say:1}) + person('mei', 420, {f:-1, x:'joy', l:'palms', r:'palms'}),
  57: () => outside('morning', {sun:530, sunY:80}) + bus(330) + busStop(300) +
    person('sora', 110, {f:1, x:'grin', r:'point', say:1}) + person('mama', 270, {f:-1, x:'smile', l:'down'}),
  58: () => room('evening', {win:[230, 40, 140, 100], lamp:540}) + sofa(80, 440, '#E8836C') +
    person('mama', 330, {f:-1, x:'content', sit:1, l:'hug', r:'hug', y:GY + 4}) +
    person('sora', 250, {f:1, x:'contenttalk', l:'hug', r:'hug', say:1}) + heart(430, 110, 1.4) + heart(490, 160) + heart(390, 60, .8),
  59: () => outside('day', {sun:520}) + `<path d="M40 ${GY - 4} L40 150 M340 ${GY - 4} L340 150" ${L(9, '#E8604C')}/><path d="M30 150 L350 150" ${L(7, '#4A5068')}/>` +
    [80, 130, 180, 230, 280].map(x => `<path d="M${x} 146 L${x} 156" ${L(4, '#4A5068')}/>`).join('') +
    person('sora', 190, {f:1, x:'grin', l:[18, -62], r:[18, -62], y:300, say:1}) + person('papa', 470, {f:-1, x:'smile', l:'ok'})
};
/* Speech bubbles are drawn last, so nothing covers them. */
/* the うごき (action) words: Sora alone, doing it */
Object.assign(SC, {
  'a:taberu': () => room('day', {win:[60, 40, 150, 110]}) + person('sora', 300, {f:1, x:'yum', r:[-8, 2], ir:`<g transform="translate(-8 8) scale(.62)">${P.onigiri}</g>`, l:'hold', y:GY - 14}) +
    table(150, 450, 290) + plate(370, 288, 60) + `<g transform="translate(370 286) scale(.7)">${P.onigiri}</g>`,
  'a:nomu': () => room('day', {win:[390, 40, 150, 110]}) + person('sora', 260, {f:1, x:'content', r:[-14, 2], ir:`<g transform="translate(-6 10) scale(.8)">${P.glass}</g>`, l:'hold'}),
  'a:neru': () => room('night', {win:[380, 40, 150, 110], lamp:-200}) + bed(70, 262, 330) + head('sora', 150, 226, {f:1, x:'content'}) +
    blanket(70, 268, 330) + `<g transform="translate(240 262) scale(.85)">${P.teddy}</g>`,
  'a:aruku': () => outside('day', {sun:520}) + path(300, 300, 180, 60) + tree(70, .8) + steps(250, GY + 18, 4) +
    person('sora', 320, {f:1, x:'smile', stride:12, l:[14, 44], r:[-6, 46], pack:1}),
  'a:hashiru': () => outside('day', {sun:520}) + tree(560, .8) + speed(200, GY - 140, -1) +
    person('sora', 300, {f:1, x:'grin', stride:30, lean:14, l:[30, 6], r:[10, -34]}) + `<ellipse cx="300" cy="${GY + 8}" rx="40" ry="7" fill="#000" opacity=".1"/>`,
  'a:oyogu': () => outside('day', {sun:520}) + `<rect y="250" width="${W}" height="${H - 250}" fill="#7CC8F0"/>` +
    person('sora', 300, {f:1, x:'grin', r:[30, -50], l:[40, 6], y:342}) +
    `<path d="M0 262 Q37 250 75 262 T150 262 T225 262 T300 262 T375 262 T450 262 T525 262 T600 262 L600 ${H} L0 ${H} Z" fill="#4FAEE8"/>` +
    [[220, 300], [400, 330], [120, 350], [480, 290]].map(([x, y]) => `<path d="M${x - 20} ${y} q10 -8 20 0 q10 8 20 0" ${L(3, '#FFFFFF')}/>`).join('') +
    `<circle cx="352" cy="190" r="6" fill="#fff" opacity=".9"/><circle cx="366" cy="204" r="4" fill="#fff" opacity=".9"/>`,
  'a:utau': () => room('day', {win:[60, 40, 150, 110]}) + person('sora', 300, {f:1, x:'grin', r:[-10, -6], ir:P.toymic, l:'up'}) +
    note(400, 150) + note(440, 220, .8, '#4E9BE6') + note(200, 190, .7, '#F08E4E'),
  'a:kaku': () => room('day', {win:[390, 40, 150, 110]}) + person('sora', 260, {f:1, x:'smile', r:[20, 44], l:'hold', y:GY - 14}) +
    table(120, 480, 290) + `<path d="M282 290 L392 290 L380 270 L296 270 Z" ${S('#FFFFFF')}/><circle cx="362" cy="278" r="6" fill="#F5C542"/><path d="M318 286 L318 278 L328 272 L338 278 L338 286" ${L(2.4, '#E8443A')}/>` +
    `<g transform="translate(304 286)">${P.crayon}</g><circle cx="304" cy="288" r="8.6" ${S(SK)}/>`
});
const scene = n => { if(!SC[n]) return ''; BUB = []; const body = SC[n]();
  return `<svg class="kart" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">${body}${BUB.join('')}</svg>`; };
return {scene, has:n => !!SC[n], list:() => Object.keys(SC).map(Number)};
})();
