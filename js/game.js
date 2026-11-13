/* =====================================================================
   GAME FLOW
   ===================================================================== */
const panel = $("#panel"), hud = $("#hud"), clockEl = $("#clock");
let G = null;          // the derby in progress
let lastSummary = null;

function toast(t){ const el = $("#toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("on"), 1800); }

function startGame(mode){
  sfx.wake();
  const day = dayIndex(), s = load();
  if (mode === "daily" && s.daily && s.daily.day === day){ viewSummary(s.daily); return; }
  const resume = mode === "daily" && s.prog && s.prog.day === day ? s.prog : null;
  G = {mode, day, qs: mode === "daily" ? pickDaily(day) : pickFree(), i: resume ? resume.rounds.length : 0,
       total: resume ? resume.total : 0, rounds: resume ? resume.rounds : [], strikes:0, tried:new Set(), phase:"idle", t0:0, lastTick:0};
  hud.hidden = false;
  stage.ready(); stage.setFlags(G.rounds);
  if (G.i >= SWINGS) endGame(); else nextQuestion();
}

function setHud(){
  $("#hSwing").textContent = "SWING " + Math.min(G.i + 1, SWINGS) + "/" + SWINGS;
  $("#hTotal").textContent = fmt(G.total);
  document.querySelectorAll(".lamp").forEach((el, i) => el.classList.toggle("on", i < G.strikes));
}

function nextQuestion(){
  G.strikes = 0; G.tried = new Set(); G.phase = "answer"; G.t0 = performance.now(); G.lastTick = 0;
  stage.ready(); setHud(); clockEl.hidden = false; drawClock(CLOCK);
  const q = G.qs[G.i];
  panel.innerHTML = `
  <section class="card">
    <p class="eyebrow">${esc(q.cat)} &middot; ${q.answers.length} answers on the board</p>
    <h2 class="q">${esc(q.text)}</h2>
    <form class="entry" id="form" autocomplete="off">
      <input class="inp" id="guess" type="text" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="go" placeholder="${q.team ? "Type a team" : "Type a name"}" aria-label="Your answer">
      <button class="btn" type="submit">Swing</button>
    </form>
    <p class="msg" id="msg" role="status"></p>
    <div class="under"><button class="link" type="button" data-act="pass">Take the pitch (0 ft)</button></div>
  </section>`;
  $("#guess").focus({preventScroll:true});
}

function drawClock(left){
  const pct = clamp(left / CLOCK, 0, 1);
  clockEl.querySelector("i").style.width = (Math.ceil(pct * 30) / 30 * 100) + "%";
  clockEl.querySelector(".num").textContent = "0:" + String(Math.ceil(left)).padStart(2, "0");
  clockEl.classList.toggle("low", left <= 5);
}
setInterval(() => {
  if (!G || G.phase !== "answer") return;
  const left = CLOCK - (performance.now() - G.t0) / 1000;
  drawClock(Math.max(0, left));
  const sec = Math.ceil(left);
  if (sec <= 5 && sec > 0 && sec !== G.lastTick){ G.lastTick = sec; sfx.tick(); }
  if (left <= 0) strikeOut(false, "The pitch clock ran out.");
}, 100);

function say(text, bad){ const m = $("#msg"); if (m){ m.textContent = text; m.classList.toggle("bad", !!bad); } }

function submitGuess(){
  if (!G || G.phase !== "answer") return;
  const input = $("#guess"), raw = input.value.trim();
  if (!raw) return;
  sfx.wake();
  const q = G.qs[G.i], r = match(q, raw);
  if (r.type === "ok"){ connect(r.e); return; }
  if (r.type === "ambig"){ say("More than one answer has that last name. Add a first name."); return; }
  const key = squash(raw);
  if (G.tried.has(key)){ say("You already tried that one. No strike."); input.select(); return; }
  G.tried.add(key); G.strikes++; setHud();
  input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
  if (G.strikes >= MAX_STRIKES){ strikeOut(true, "Three strikes. “" + raw + "” was not on the board."); return; }
  stage.whiff(G.strikes);
  say("Not on the board. Strike " + G.strikes + ", and this swing loses " + Math.round(G.strikes * STRIKE_TAX * 100) + "%.", true);
  input.select();
}

function connect(e){
  G.phase = "anim"; clockEl.hidden = true; showField();
  const t = TIERS[e.tier - 1], dist = Math.round(e.dist * (1 - STRIKE_TAX * G.strikes));
  panel.innerHTML = `
  <section class="card" style="--c:${t.color}">
    <p class="eyebrow">Swing ${G.i + 1} of ${SWINGS}</p>
    <div class="call">${esc(e.name)} &middot; it's in the air</div>
    <div class="feet"><span id="feet">0</span><small>FT</small></div>
    <p class="note">Press Enter to skip ahead.</p>
  </section>`;
  const feet = $("#feet");
  stage.hit(dist, t.color, ft => { feet.textContent = ft; }, spot => finishRound(e, dist, spot, ""));
}

// on a phone the keyboard can push the field off screen; bring it back for the swing
function showField(){ const w = $("#wrap"); if (w.getBoundingClientRect().top < 0) w.scrollIntoView({block:"start"}); }

function strikeOut(swinging, reason){
  if (!G || G.phase !== "answer") return;
  G.phase = "anim"; clockEl.hidden = true; showField();
  if (!swinging){ G.strikes = MAX_STRIKES; setHud(); }
  const f = $("#form"); if (f) f.querySelectorAll("input,button").forEach(el => { el.disabled = true; });
  stage.strikeout(swinging, () => finishRound(null, 0, null, reason));
}

function finishRound(e, dist, spot, reason){
  const q = G.qs[G.i];
  const round = {q:q.text, ans:e ? e.name : null, tier:e ? e.tier : 0, dist, strikes:G.strikes, fx:spot ? Math.round(spot.x) : 0, fsy:spot ? spot.sy : 0};
  G.rounds.push(round); G.total += dist; G.phase = "result"; G.resultAt = performance.now();
  setHud();
  if (G.mode === "daily"){ const s = load(); s.prog = {day:G.day, total:G.total, rounds:G.rounds}; save(s); }

  const t = e ? TIERS[e.tier - 1] : null, last = G.i === SWINGS - 1;
  const sorted = q.answers.slice().sort((a, b) => a.dist - b.dist);
  const chip = (x, me) => `<span class="chip${me ? " me" : ""}" style="--c:${TIERS[x.tier - 1].color}"><span class="sq"></span>${esc(x.name)} <i>${x.dist}</i></span>`;
  const lost = e ? e.dist - dist : 0;
  panel.innerHTML = `
  <section class="card" style="--c:${t ? t.color : "var(--red)"}">
    <p class="eyebrow">Swing ${G.i + 1} of ${SWINGS}</p>
    <p class="note ask">${esc(q.text)}</p>
    <div class="call">${e ? esc(callFor(dist)) : "Strikeout"}</div>
    <div class="feet"><span>${dist}</span><small>FT</small></div>
    ${e ? `<p class="who"><b>${esc(e.name)}</b> &middot; ${t.name}</p>
           <p class="note">${e.pct ? "Deeper than " + e.pct + "% of the board" : "The most common answer on the board"}${lost ? " &middot; " + G.strikes + (G.strikes > 1 ? " strikes" : " strike") + " cost you " + lost + " ft" : ""}</p>`
        : `<p class="note">${esc(reason)}</p>`}
    <div class="acts one"><button class="btn" id="next" data-act="next">${last ? "See the box score" : "Next pitch"}</button></div>
    <p class="lbl">What most people say</p>
    <div class="chips">${sorted.slice(0, 3).map(x => chip(x, x === e)).join("")}</div>
    <p class="lbl">The deepest cuts</p>
    <div class="chips">${sorted.slice(-3).reverse().map(x => chip(x, x === e)).join("")}</div>
    <details class="all">
      <summary class="link">Show all ${sorted.length} answers</summary>
      <div class="chips">${sorted.map(x => chip(x, x === e)).join("")}</div>
    </details>
  </section>`;
  $("#next").focus({preventScroll:true});
}

function nextRound(){
  if (!G || G.phase !== "result") return;
  G.i++;
  if (G.i >= SWINGS) endGame(); else nextQuestion();
}

function endGame(){
  const sum = {mode:G.mode, day:G.day, total:G.total, rounds:G.rounds};
  const s = load(), dists = sum.rounds.map(r => r.dist);
  s.games++; s.best = Math.max(s.best, sum.total); s.longest = Math.max(s.longest, Math.max.apply(null, dists.concat(0)));
  s.hr += dists.filter(d => d >= HR_FT).length;
  if (sum.mode === "daily"){ s.streak = s.lastDaily === sum.day - 1 ? s.streak + 1 : 1; s.lastDaily = sum.day; s.daily = sum; s.prog = null; }
  save(s);
  G = null;
  viewSummary(sum);
}

