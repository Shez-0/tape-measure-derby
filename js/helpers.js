/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fmt = n => Number(n).toLocaleString("en-US");
const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hash(str){ let h = 2166136261; for (let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry32(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rng){ const a = arr.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(rng() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

const EPOCH = new Date(2026, 10, 12);   // Daily #1
function dayIndex(d){ d = d || new Date(); return Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / 864e5); }
function dateLabel(day){ const d = new Date(EPOCH.getFullYear(), EPOCH.getMonth(), EPOCH.getDate() + day); return d.toLocaleDateString("en-US", {month:"short", day:"numeric"}); }

function callFor(ft){
  if (ft >= MOON_FT) return "Moonshot!";
  if (ft >= HR_FT) return "Home run!";
  if (ft >= 372) return "Off the wall";
  if (ft >= 280) return "Deep drive";
  if (ft >= 160) return "Line drive";
  if (ft >= 100) return "Bloop single";
  return "Infield single";
}
function rating(total){
  if (total >= 4500) return "Cooperstown legend";
  if (total >= 3800) return "MVP";
  if (total >= 3000) return "All-Star";
  if (total >= 2200) return "Everyday starter";
  if (total >= 1400) return "Bench bat";
  if (total >= 600) return "September call-up";
  return "Bat boy";
}

/* ---------- answer matching ---------- */
const SUFFIX = new Set(["jr", "sr", "ii", "iii", "iv"]);
function toks(s){
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[.'’`]/g, "").replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
}
const squashKeep = s => toks(s).join("");                              // "Ken Griffey Jr." -> kengriffeyjr
const squash = s => toks(s).filter(t => !SUFFIX.has(t)).join("");      // -> kengriffey

function lev(a, b){
  if (a === b) return 0;
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = []; for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++){
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

// Parse each question's answer string and build its lookup tables (runs once).
QUESTIONS.forEach((q, id) => {
  q.id = id;
  const list = q.a.split(";").map(s => s.trim()).filter(Boolean).map(s => {
    const parts = s.split("|"), head = parts[0], i = head.lastIndexOf(":");
    const name = head.slice(0, i).trim(), e = {tier: +head.slice(i + 1), aliases: parts.slice(1).map(x => x.trim())};
    if (q.team){
      const bits = name.split("="), nick = bits[0].trim(), T = TEAMS[nick];
      if (!T) throw new Error("Unknown team: " + nick);
      e.name = bits[1] ? bits[1].trim() : T[0];
      e.aliases.push(nick, ...T);
    } else e.name = name;
    return e;
  });
  // distance: the tier sets the range, position inside the tier sets the exact number
  for (let t = 1; t <= 5; t++){
    const inTier = list.filter(e => e.tier === t), T = TIERS[t - 1];
    inTier.forEach((e, k) => { e.dist = Math.round(T.lo + (T.hi - T.lo) * (k + 0.5) / inTier.length); });
  }
  list.forEach(e => { e.pct = list.length > 1 ? Math.round(100 * list.filter(o => o.dist < e.dist).length / (list.length - 1)) : 100; });

  const keep = new Map(), full = new Map(), last = new Map();
  const add = (m, k, e) => { if (k && !m.has(k)) m.set(k, e); };
  list.forEach(e => {
    [e.name].concat(e.aliases).forEach(n => { add(keep, squashKeep(n), e); add(full, squash(n), e); });
    if (!q.team){
      const tk = toks(e.name).filter(t => !SUFFIX.has(t));
      for (let i = 1; i < tk.length; i++){ const k = tk.slice(i).join(""); if (!last.has(k)) last.set(k, new Set()); last.get(k).add(e); }
    }
  });
  q.answers = list; q.idx = {keep, full, last};
});

function match(q, raw){
  const gk = squashKeep(raw), g = squash(raw), ix = q.idx;
  if (g.length < 2) return {type:"none"};
  if (ix.keep.has(gk)) return {type:"ok", e:ix.keep.get(gk)};
  if (ix.full.has(g)) return {type:"ok", e:ix.full.get(g)};
  if (ix.last.has(g)){ const s = ix.last.get(g); return s.size === 1 ? {type:"ok", e:s.values().next().value} : {type:"ambig"}; }
  if (g.length < 5) return {type:"none"};
  let best = null, bd = 9, tie = false;
  const test = (k, e) => {
    if (k.length < 5) return;
    const lim = k.length >= 9 ? 2 : 1;
    if (Math.abs(k.length - g.length) > lim) return;
    const d = lev(g, k);
    if (d > lim) return;
    if (d < bd){ bd = d; best = e; tie = false; } else if (d === bd && best !== e) tie = true;
  };
  ix.full.forEach((e, k) => test(k, e));
  ix.last.forEach((s, k) => { if (s.size === 1) test(k, s.values().next().value); });
  return best && !tie ? {type:"ok", e:best} : {type:"none"};
}

/* ---------- picking questions ---------- */
const ROSTER_QS = QUESTIONS.filter(q => q.cat === "Rosters");
const OTHER_QS = QUESTIONS.filter(q => q.cat !== "Rosters");
function cycleSlice(pool, per, day, salt){
  // walks through a shuffled copy of the pool so the daily does not repeat a question until the pool runs out
  const days = Math.max(1, Math.floor(pool.length / per));
  const cyc = Math.floor(day / days), k = ((day % days) + days) % days;
  return shuffle(pool, mulberry32(hash(salt + cyc))).slice(k * per, k * per + per);
}
function pickDaily(day){
  const set = cycleSlice(ROSTER_QS, ROSTERS_PER_GAME, day, "rosters").concat(cycleSlice(OTHER_QS, SWINGS - ROSTERS_PER_GAME, day, "others"));
  return shuffle(set, mulberry32(hash("order" + day)));
}
function pickFree(){
  const set = shuffle(ROSTER_QS, Math.random).slice(0, ROSTERS_PER_GAME).concat(shuffle(OTHER_QS, Math.random).slice(0, SWINGS - ROSTERS_PER_GAME));
  return shuffle(set, Math.random);
}

/* ---------- storage (one browser only; the game still works without it) ---------- */
const KEY = "tapemeasure.derby.v1";
const BLANK = {games:0, best:0, longest:0, hr:0, streak:0, lastDaily:null, daily:null, prog:null, sound:true};
function load(){ try{ return Object.assign({}, BLANK, JSON.parse(localStorage.getItem(KEY) || "{}")); }catch(e){ return Object.assign({}, BLANK); } }
function save(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }

