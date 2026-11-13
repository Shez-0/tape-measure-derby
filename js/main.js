/* ---------- events ---------- */
document.addEventListener("click", ev => {
  const b = ev.target.closest("[data-act]"); if (!b) return;
  const act = b.dataset.act;
  if (act === "sound"){ const s = load(); s.sound = !s.sound; save(s); applySound(s.sound); if (s.sound) sfx.click(); return; }
  sfx.wake(); sfx.click();
  if (act === "daily") startGame("daily");
  else if (act === "free") startGame("free");
  else if (act === "pass") strikeOut(false, "You took the pitch.");
  else if (act === "next") nextRound();
  else if (act === "share") share();
  else if (act === "home") viewHome();
});
document.addEventListener("submit", ev => { if (ev.target.id === "form"){ ev.preventDefault(); submitGuess(); } });
document.addEventListener("keydown", ev => {
  if (ev.key !== "Enter" || !G) return;
  if (G.phase === "anim"){ ev.preventDefault(); stage.hurry(); }
  else if (G.phase === "result"){ ev.preventDefault(); if (performance.now() - G.resultAt > 450) nextRound(); }
});
$("#stage").addEventListener("click", () => { if (G && G.phase === "anim") stage.hurry(); });

function applySound(on){ sfx.on = on; const b = $("#snd"); b.textContent = on ? "SOUND ON" : "SOUND OFF"; b.setAttribute("aria-pressed", on ? "true" : "false"); }

// If the pixel fonts could not load, fall back to tidy system monospace sizes.
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { try{ if (!document.fonts.check('16px "VT323"')) document.documentElement.classList.add("sysfont"); }catch(e){} });

applySound(load().sound);
viewHome();
