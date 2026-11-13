/* ---------- sound: tiny chiptune effects made with WebAudio ---------- */
const sfx = (() => {
  let ac = null, master = null, on = true;
  function ctx(){
    if (!on) return null;
    try{
      if (!ac){ const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; ac = new C(); master = ac.createGain(); master.gain.value = 0.5; master.connect(ac.destination); }
      if (ac.state === "suspended") ac.resume().catch(() => {});
    }catch(e){ return null; }
    return ac;
  }
  function tone(f, dur, o){
    o = o || {}; const a = ctx(); if (!a) return;
    const t = a.currentTime + (o.at || 0), osc = a.createOscillator(), gn = a.createGain();
    osc.type = o.type || "square"; osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + dur);
    gn.gain.setValueAtTime(o.vol || 0.1, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gn); gn.connect(master); osc.start(t); osc.stop(t + dur + 0.02);
  }
  function noise(dur, o){
    o = o || {}; const a = ctx(); if (!a) return;
    const t = a.currentTime + (o.at || 0), n = Math.floor(a.sampleRate * dur), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const src = a.createBufferSource(), fl = a.createBiquadFilter(), gn = a.createGain(), v = o.vol || 0.15;
    src.buffer = buf; fl.type = o.type || "bandpass"; fl.frequency.value = o.freq || 1200; fl.Q.value = o.q || 0.8;
    if (o.swell){ gn.gain.setValueAtTime(0.0001, t); gn.gain.exponentialRampToValueAtTime(v, t + dur * 0.25); } else gn.gain.setValueAtTime(v, t);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(fl); fl.connect(gn); gn.connect(master); src.start(t);
  }
  return {
    get on(){ return on; },
    set on(v){ on = v; if (ac){ if (v) ctx(); else ac.suspend(); } },
    wake: ctx,
    click(){ tone(660, .05, {vol:.05}); },
    pitch(){ noise(.18, {freq:2400, vol:.05}); },
    crack(power){ noise(.07, {type:"highpass", freq:1800, vol:.3}); tone(200 + power * 70, .1, {type:"triangle", vol:.25, to:90}); },
    whiff(){ noise(.16, {freq:900, vol:.09}); },
    strike(){ tone(140, .22, {type:"sawtooth", vol:.09, to:90}); },
    out(){ [330, 262, 196].forEach((f, i) => tone(f, .2, {at:i * .16, vol:.09})); },
    land(){ tone(110, .1, {type:"triangle", vol:.2, to:60}); },
    cheer(level){ noise(.8 + level * .5, {freq:1100, q:.5, vol:.04 + level * .035, swell:true}); },
    homer(big){ (big ? [523, 659, 784, 1047, 1319, 1568] : [523, 659, 784, 1047]).forEach((f, i) => tone(f, .14, {at:i * .09, vol:.08})); },
    boom(){ noise(.25, {type:"lowpass", freq:500, vol:.1}); },
    tick(){ tone(880, .04, {vol:.05}); }
  };
})();

