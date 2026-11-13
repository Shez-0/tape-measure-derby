/* =====================================================================
   SCREENS
   ===================================================================== */
function viewHome(){
  G = null; hud.hidden = true; clockEl.hidden = true;
  const s = load(), day = dayIndex(), done = s.daily && s.daily.day === day, prog = !done && s.prog && s.prog.day === day;
  stage.attract(done ? s.daily.rounds : []);
  panel.innerHTML = `
  <section class="card">
    <p class="eyebrow">Baseball trivia home run derby</p>
    <h1 class="title">The deeper the cut, <span>the farther it flies.</span></h1>
    <p class="lede">Seven questions, Seven swings. Every question has dozens of right answers. Name one almost nobody would think of and it leaves the park.</p>
    <div class="acts">
      <button class="btn" data-act="daily">${done ? "Today's box score" : prog ? "Resume daily" : "Daily derby"}<small>${done ? fmt(s.daily.total) + " ft today" : "#" + (day + 1) + " &middot; " + dateLabel(day) + (prog ? " &middot; swing " + (s.prog.rounds.length + 1) : "")}</small></button>
      <button class="btn alt" data-act="free">Free swing<small>7 random questions</small></button>
    </div>
  </section>
  <section class="card">
    <p class="eyebrow">How it works</p>
    <ol class="rules">
      <li>Type any answer that fits. Last names work, and small typos are forgiven.</li>
      <li>Rarer answers travel farther. Your score is the total distance of all ${SWINGS} swings.</li>
      <li>A wrong answer is a strike and takes ${Math.round(STRIKE_TAX * 100)}% off that swing. Three strikes and you are out.</li>
      <li>The pitch clock gives you ${CLOCK} seconds per question.</li>
      <li>The daily derby is the same ${SWINGS} questions for everyone, once a day.</li>
    </ol>
    <div class="ladder">
      ${TIERS.map(t => `<div class="rung" style="--c:${t.color}"><span class="sq"></span><span>${t.name} <em>&middot; ${t.say}</em></span><span class="ft">${t.lo}-${t.hi} ft &middot; ${t.hit}</span></div>`).join("")}
    </div>
  </section>
  <section class="card">
    <p class="eyebrow">Your career</p>
    <div class="stats">
      <div class="stat"><b>${fmt(s.games)}</b><span>Derbies</span></div>
      <div class="stat"><b>${fmt(s.best)}</b><span>Best total</span></div>
      <div class="stat"><b>${fmt(s.longest)}</b><span>Longest hit</span></div>
      <div class="stat"><b>${fmt(s.streak)}</b><span>Daily streak</span></div>
    </div>
    <p class="fine">${QUESTIONS.length} questions and ${fmt(QUESTIONS.reduce((n, q) => n + q.answers.length, 0))} answers, current through the 2026 World Series. Rarity is an editorial estimate, not a poll of players. Stats are saved in this browser only.</p>
  </section>`;
}

function shareText(sum){
  const dists = sum.rounds.map(r => r.dist);
  return "⚾ Tape Measure Derby · " + (sum.mode === "daily" ? "Daily #" + (sum.day + 1) : "Free swing") + "\n" +
    sum.rounds.map(r => r.tier ? TIERS[r.tier - 1].emoji : "⬛").join("") + "\n" +
    fmt(sum.total) + " ft · " + dists.filter(d => d >= HR_FT).length + " HR · longest " + Math.max.apply(null, dists.concat(0)) + " ft";
}

function viewSummary(sum){
  lastSummary = sum; G = null; hud.hidden = true; clockEl.hidden = true;
  stage.attract(sum.rounds);
  const dists = sum.rounds.map(r => r.dist), hr = dists.filter(d => d >= HR_FT).length, longest = Math.max.apply(null, dists.concat(0));
  panel.innerHTML = `
  <section class="card">
    <p class="eyebrow">${sum.mode === "daily" ? "Daily derby #" + (sum.day + 1) + " &middot; " + dateLabel(sum.day) : "Free swing"} &middot; final</p>
    <div class="feet"><span>${fmt(sum.total)}</span><small>FT</small></div>
    <div class="call">${rating(sum.total)}</div>
    <p class="note">${hr} home run${hr === 1 ? "" : "s"} &middot; longest ${longest} ft</p>
    <div class="grid" aria-label="Rarity of each swing">${sum.rounds.map(r => `<span class="sq" style="--c:${r.tier ? TIERS[r.tier - 1].color : "#141a44"}" title="${r.dist} ft"></span>`).join("")}</div>
    <div class="acts">
      <button class="btn" data-act="share">Copy result</button>
      <button class="btn alt" data-act="free">Free swing</button>
    </div>
    <textarea class="sharebox" id="sharebox" rows="3" readonly hidden aria-label="Your result, ready to copy"></textarea>
  </section>
  <section class="card">
    <p class="eyebrow">Box score</p>
    <div class="rounds">
      ${sum.rounds.map(r => `
      <div class="rd" style="--c:${r.tier ? TIERS[r.tier - 1].color : "var(--red)"}">
        <span>${r.ans ? esc(r.ans) : "Struck out"}</span><span class="ft">${r.dist} ft</span>
        <span class="qq">${esc(r.q)}</span>
        <span class="track"><i style="width:${(100 * r.dist / MAX_FT).toFixed(1)}%"></i><u title="The wall, 400 ft"></u></span>
      </div>`).join("")}
    </div>
    <p class="fine">The white tick on each bar is the outfield wall at 400 ft.</p>
    <div class="acts one"><button class="btn alt" data-act="home">Home</button></div>
  </section>`;
}

function share(){
  const txt = shareText(lastSummary), box = $("#sharebox");
  const manual = () => { box.hidden = false; box.value = txt; box.focus(); box.select(); toast("Select and copy"); };
  try{ navigator.clipboard.writeText(txt).then(() => toast("Copied"), manual); }catch(e){ manual(); }
}

