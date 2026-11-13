/* =====================================================================
   THE FIELD
   A side-on ballpark drawn at low resolution and scaled up.
   One world pixel is one foot: home plate is x = 0, the wall is at 396,
   the bleachers run to 452, and the parking lot is everything past that.
   ===================================================================== */
const stage = (() => {
  const cv = $("#stage"), wrap = $("#wrap"), g = cv.getContext("2d");
  const WX0 = -80, WX1 = 640, SKY_W = 400;
  let W = 240, H = 126, SC = 3, GY = 98;        // GY = the line the players stand on
  let layers = null, sky = null, skyline = null, stars = [];
  let cam = -60, camT = -60, camHome = -60;
  let mode = "attract", time = 0, lastT = 0, fast = false;
  let sched = [];
  let bat = {swing:-1, sad:false}, pit = {t:-1};
  let pball = null, ball = null, trail = [], flags = [], parts = [];
  let banner = null, pop = null, cheer = 0, shake = 0;

  /* --- sprites --- */
  function sprite(rows, pal){
    const c = document.createElement("canvas"); c.width = rows[0].length; c.height = rows.length;
    const x = c.getContext("2d");
    rows.forEach((r, j) => { for (let i = 0; i < r.length; i++){ const col = pal[r[i]]; if (col){ x.fillStyle = col; x.fillRect(i, j, 1, 1); } } });
    return c;
  }
  const PAL = {k:"#14142a", h:"#c8323c", H:"#ef5b63", s:"#f0b98d", w:"#f2f3f6", g:"#b9c0cf", r:"#c8323c", b:"#20222e",
               n:"#2f4bb0", y:"#a3adc4", Y:"#7d88a3", o:"#8a5a2b"};
  const SPR = {
    batStance: sprite([
      "....hhhh....",
      "...hHhhhh...",
      "...hhhhhhhh.",
      "...sssks....",
      "...sssss....",
      "....sss.....",
      "..wwwwwww...",
      ".swwwrwwww..",
      ".sswwwwwww..",
      "..wwwwwwww..",
      "..gwwwwwww..",
      "..bbbbbbbb..",
      "..wwwwwwww..",
      "..gww..www..",
      ".gww....www.",
      ".gw......ww.",
      ".gw......ww.",
      ".rr......rr.",
      ".rr......rr.",
      "kkk......kkk"], PAL),
    batSwing: sprite([
      "....hhhh....",
      "...hHhhhh...",
      "...hhhhhhhh.",
      "...sssks....",
      "...sssss....",
      "....sss.....",
      "..wwwwwww...",
      "..wwwrwwwss.",
      "..gwwwwwwss.",
      "..gwwwwwww..",
      "..gwwwwwww..",
      "..bbbbbbbb..",
      "..wwwwwwww..",
      ".gww...www..",
      "gww.....www.",
      "gw.......ww.",
      "gw.......ww.",
      "rr.......rr.",
      "rr.......rr.",
      "kkk......kkk"], PAL),
    pitcher: sprite([
      "....nnnn....",
      "...nnnnnn...",
      ".nnnnnnnn...",
      "....kssss...",
      "....sssss...",
      ".....sss....",
      "...yyyyyyy..",
      "..yyyyyyyyy.",
      ".ooyyynyyyy.",
      ".ooyyyyyyy..",
      "..yyyyyyyY..",
      "..bbbbbbbb..",
      "..yyyyyyyy..",
      "..yyy..yyY..",
      ".yyy....yyY.",
      ".yy......yY.",
      ".yy......yY.",
      ".nn......nn.",
      ".nn......nn.",
      "kkk......kkk"], PAL)
  };
  function car(body, roof){
    return sprite([
      "....kkkkkkk.....",
      "...kwwkwwwwk....",
      "..kkwwkwwwwkkk..",
      ".kCCCCCCCCCCCCk.",
      "kCCCCCCCCCCCCCyk",
      "kkoookkkkkkoookk",
      "..ooo.....ooo..."], {k:"#0b0d18", w:roof, C:body, y:"#ffe9a3", o:"#2a2d3a"});
  }
  const CARS = [car("#c8323c", "#8fd0ff"), car("#3a6fd8", "#8fd0ff"), car("#e2b36b", "#8fd0ff"), car("#c9d3df", "#8fd0ff")];
  const CROWD = ["#e8505b", "#58b4ff", "#f4efd8", "#ffcf40", "#6fdc6f", "#c98bff", "#f0b98d", "#8a96b8", "#8a96b8", "#5c688f"];

  /* --- 3x5 pixel font for text drawn on the field --- */
  const FONT = {
    A:"010101111101101", B:"110101110101110", C:"011100100100011", D:"110101101101110", E:"111100110100111",
    F:"111100110100100", G:"011100101101011", H:"101101111101101", I:"111010010010111", J:"001001001101010",
    K:"101101110101101", L:"100100100100111", M:"101111111101101", N:"110101101101101", O:"111101101101111",
    P:"110101110100100", Q:"111101101111001", R:"110101110101101", S:"011100010001110", T:"111010010010010",
    U:"101101101101111", V:"101101101101010", W:"101101111111101", X:"101101010101101", Y:"101101010010010",
    Z:"111001010100111", "0":"111101101101111", "1":"010110010010111", "2":"111001111100111", "3":"111001111001111",
    "4":"101101111001001", "5":"111100111001111", "6":"111100111101111", "7":"111001001010010", "8":"111101111101111",
    "9":"111101111001111", "!":"010010010000010", "-":"000000111000000", ".":"000000000000010", "'":"010010000000000",
    "?":"111001010000010"
  };
  const textW = (s, sc) => (String(s).length * 4 - 1) * (sc || 1);
  function text(c, s, x, y, col, sc, outline){
    s = String(s).toUpperCase(); sc = sc || 1;
    const pass = (ox, oy, color) => {
      c.fillStyle = color; let px = x;
      for (const ch of s){
        const m = FONT[ch];
        if (m) for (let i = 0; i < 15; i++) if (m[i] === "1") c.fillRect(px + (i % 3) * sc + ox, y + Math.floor(i / 3) * sc + oy, sc, sc);
        px += 4 * sc;
      }
    };
    if (outline) for (let ox = -1; ox <= 1; ox++) for (let oy = -1; oy <= 1; oy++) if (ox || oy) pass(ox, oy, outline);
    pass(0, 0, col);
  }

  /* --- the shape of the park: how high is the surface at world x? --- */
  function surf(x){
    if (x < 396) return 0;
    if (x < 400) return 10;                                   // outfield wall
    if (x < 452) return 10 + Math.round(Math.floor((x - 400) / 4) * 1.4);   // bleachers
    if (x < 456) return 30;                                   // back wall of the park
    return 0;                                                 // parking lot
  }

  /* --- static layers (rebuilt when the canvas size changes) --- */
  function buildSky(){
    const c = document.createElement("canvas"); c.width = W; c.height = H; const x = c.getContext("2d");
    const far = GY - 8, bands = ["#070a22", "#0b0f30", "#111640", "#1a1c52", "#272063", "#38266c", "#4d2c72"];
    bands.forEach((col, i) => { const y0 = Math.round(far * i / bands.length), y1 = Math.round(far * (i + 1) / bands.length); x.fillStyle = col; x.fillRect(0, y0, W, y1 - y0);
      if (i){ x.fillStyle = col; for (let px = (i % 2); px < W; px += 2) x.fillRect(px, y0 - 1, 1, 1); } });   // dithered seams
    x.fillStyle = "#4d2c72"; x.fillRect(0, far, W, H - far);
    // moon
    const mx = W - 30, my = 22, moon = [".ooooo.", "ooooooo", "ooOoooo", "ooooOoo", "oOooooo", "ooooooo", ".ooooo."];
    moon.forEach((r, j) => { for (let i = 0; i < r.length; i++) if (r[i] !== "."){ x.fillStyle = r[i] === "O" ? "#cfc9a4" : "#f4f0cf"; x.fillRect(mx + i, my + j, 1, 1); } });
    return c;
  }
  function buildSkyline(){
    const c = document.createElement("canvas"); c.width = SKY_W; c.height = H; const x = c.getContext("2d");
    const rnd = mulberry32(5), far = GY - 8;
    let px = 0;
    while (px < SKY_W){
      const w = 9 + Math.floor(rnd() * 16), h = 14 + Math.floor(rnd() * Math.min(44, far - 30));
      x.fillStyle = rnd() < 0.5 ? "#12173c" : "#0e1232"; x.fillRect(px, far - h, Math.min(w, SKY_W - px), h);
      for (let yy = far - h + 2; yy < far - 2; yy += 3) for (let xx = px + 1; xx < px + w - 1 && xx < SKY_W; xx += 2) if (rnd() < 0.16){ x.fillStyle = rnd() < 0.7 ? "#e9bf5a" : "#8fd0ff"; x.fillRect(xx, yy, 1, 1); }
      px += w + (rnd() < 0.3 ? 2 : 0);
    }
    return c;
  }
  function buildWorld(frame){
    const c = document.createElement("canvas"); c.width = WX1 - WX0; c.height = H; const x = c.getContext("2d");
    const R = (col, wx, y, w, h) => { x.fillStyle = col; x.fillRect(Math.round(wx - WX0), Math.round(y), w, h); };
    const T = (s, wx, y, col) => text(x, s, Math.round(wx - WX0), Math.round(y), col, 1, null);
    const rnd = mulberry32(11), far = GY - 8, IN1 = 456;

    // light towers
    [-40, 120, 280].forEach(tx => {
      R("#39426f", tx, far - 62, 2, 30); R("#222952", tx - 8, far - 71, 18, 10);
      for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) R("#fff6c4", tx - 7 + i * 4, far - 70 + j * 4, 3, 3);
      x.globalAlpha = 0.10; R("#fff6c4", tx - 14, far - 77, 30, 22); R("#fff6c4", tx - 20, far - 82, 42, 32); x.globalAlpha = 1;
    });
    // far grandstand, full of people
    R("#181d40", WX0, far - 34, IN1 - WX0, 26); R("#2c3566", WX0, far - 37, IN1 - WX0, 3); R("#3d4884", WX0, far - 37, IN1 - WX0, 1);
    for (let yy = far - 33; yy < far - 10; yy += 3) for (let xx = WX0; xx < IN1; xx += 2){
      const r = rnd(); if (r > 0.74) continue;
      const up = frame && ((xx * 7 + yy * 3) % 5 < 2) ? -1 : 0;
      R(CROWD[Math.floor(r * 131) % CROWD.length], xx, yy + up, 1, 2);
    }
    x.globalAlpha = 0.38; R("#181d40", WX0, far - 34, IN1 - WX0, 26); x.globalAlpha = 1;   // push the far crowd back a little
    // far fence with the distance signs
    R("#11472e", WX0, far - 8, IN1 - WX0, 8); R("#e6c53a", WX0, far - 8, IN1 - WX0, 1);
    for (let xx = WX0; xx < IN1; xx += 24) R("#0c3823", xx, far - 7, 1, 7);
    T("100", 95, far - 6, "#f4efd8"); T("200", 195, far - 6, "#f4efd8"); T("300", 295, far - 6, "#f4efd8");
    T("DEEP CUTS ONLY", 14, far - 6, "#3f8f66"); T("GO DEEP", 232, far - 6, "#3f8f66"); T("TAPE MEASURE", 134, far - 6, "#3f8f66");

    // grass with mowing stripes
    for (let xx = WX0; xx < 396; xx += 20) R(((xx - WX0) / 20) % 2 ? "#2f9c4a" : "#2a8e42", xx, far, 20, H - far);
    R("#1f6f35", WX0, far, 396 - WX0, 1);
    // infield dirt, home plate, mound
    for (let yy = far; yy < H; yy++){ const edge = 28 - Math.abs(yy - GY) * 0.9 + (yy % 2); R("#b8743c", WX0, yy, Math.max(0, Math.round(edge - WX0)), 1); }
    for (let i = 0; i < 70; i++) R("#a5642f", WX0 + rnd() * 96, far + 1 + rnd() * (H - far - 1), 1, 1);
    R("#f4efd8", -3, GY + 1, 6, 2); R("#f4efd8", -2, GY + 3, 4, 1);
    R("#b8743c", 51, GY, 18, 1); R("#b8743c", 48, GY + 1, 24, 2); R("#b8743c", 51, GY + 3, 18, 1); R("#f4efd8", 58, GY + 1, 4, 1);
    // backstop
    R("#39426f", -46, GY - 34, 1, H - GY + 34);
    x.globalAlpha = 0.22; for (let yy = GY - 34; yy < H; yy += 4) R("#c9d3df", WX0, yy, 34, 1); for (let xx = WX0; xx < -46; xx += 5) R("#c9d3df", xx, GY - 34, 1, H - GY + 34); x.globalAlpha = 1;
    // distance ticks painted on the grass
    [100, 200, 300].forEach(d => { x.globalAlpha = 0.6; R("#f4efd8", d, GY + 2, 1, 4); T(d, d - 5, GY + 9, "#f4efd8"); x.globalAlpha = 1; });
    // warning track and the wall
    R("#9c6436", 370, far, 26, H - far); for (let i = 0; i < 26; i++) R("#8a5630", 370 + rnd() * 26, far + rnd() * (H - far), 1, 1);
    x.globalAlpha = 0.7; T("400", 374, GY + 9, "#f4efd8"); x.globalAlpha = 1;
    R("#0c3f29", 396, GY - 10, 4, H - GY + 10); R("#e6c53a", 396, GY - 10, 4, 1);

    // scoreboard over the bleachers
    const top = Math.max(3, GY - 74);
    R("#39426f", 414, top + 19, 2, GY - top - 34); R("#39426f", 444, top + 19, 2, GY - top - 40);
    R("#2c3566", 406, top, 46, 20); R("#070912", 408, top + 2, 42, 16);
    T("DERBY", 419, top + 4, "#ffcf40");
    for (let i = 0; i < 10; i++) R((i * 3 + (frame ? 1 : 0)) % 4 ? "#ffcf40" : "#5a4a17", 410 + i * 4, top + 13, 2, 2);
    // bleachers, seen from the side
    for (let k = 0; k < 13; k++){
      const sx = 400 + k * 4, h = surf(sx), up = frame && k % 2 ? -1 : 0, up2 = frame && k % 2 === 0 ? -1 : 0;
      R("#33406b", sx, GY - h, 4, H - GY + h); R("#5868a3", sx, GY - h, 4, 1);
      R("#f0b98d", sx + 1, GY - h - 4 + up, 2, 1); R(CROWD[(k * 5) % 6], sx + 1, GY - h - 3 + up, 2, 3);
      for (let yy = GY - h + 3; yy < GY + 7; yy += 4){ const r = rnd(); R(CROWD[Math.floor(r * 131) % CROWD.length], sx + (r < 0.5 ? 0 : 2), yy + up2, 2, 2); }
    }
    R("#232b47", 400, GY + 9, 52, H - GY - 9); R("#5868a3", 400, GY + 9, 52, 1);
    R("#1c2340", 452, GY - 30, 4, H - GY + 30); R("#5868a3", 452, GY - 30, 4, 1);
    R("#c9d3df", 453, GY - 41, 1, 11); R("#ff5d4f", 454, GY - 41, frame ? 4 : 5, 3);

    // outside: parking lot, lamps, cars
    R("#23273a", 456, far, WX1 - 456, H - far); R("#4a5070", 456, far, WX1 - 456, 1);
    for (let xx = 456; xx < WX1; xx += 10) R("#39426f", xx, far - 6, 1, 6); R("#39426f", 456, far - 6, WX1 - 456, 1);
    x.globalAlpha = 0.35; for (let xx = 468; xx < WX1; xx += 22) R("#f4efd8", xx, GY + 8, 1, H - GY - 8); x.globalAlpha = 1;
    [498, 588].forEach(lx => { R("#4a5070", lx, far - 30, 1, 30); R("#4a5070", lx, far - 30, 6, 1); R("#fff6c4", lx + 3, far - 29, 3, 2);
      x.globalAlpha = 0.08; R("#fff6c4", lx - 4, far - 27, 17, 27); x.globalAlpha = 1; });
    x.drawImage(CARS[0], 472 - WX0, GY + 11); x.drawImage(CARS[1], 516 - WX0, GY + 11); x.drawImage(CARS[2], 560 - WX0, GY + 11); x.drawImage(CARS[3], 604 - WX0, GY + 11);
    x.drawImage(CARS[1], 536 - WX0, far + 1); x.drawImage(CARS[3], 480 - WX0, far + 1);
    return c;
  }

  function resize(){
    const cssW = Math.max(240, wrap.clientWidth);
    const big = cssW >= 560;
    SC = big ? 3 : 2; W = Math.ceil(cssW / SC); H = big ? 126 : 118; GY = H - 28;
    cv.width = W; cv.height = H; cv.style.width = (W * SC) + "px"; cv.style.height = (H * SC) + "px";
    g.imageSmoothingEnabled = false;
    sky = buildSky(); skyline = buildSkyline(); layers = [buildWorld(0), buildWorld(1)];
    const rnd = mulberry32(3); stars = [];
    for (let i = 0; i < 46; i++) stars.push({x:rnd() * (W + 40), y:rnd() * (GY - 46), p:rnd() * 6, b:rnd()});
    camHome = -Math.round(W * 0.27);
    if (mode !== "attract" && !ball) cam = camT = camHome;
    draw();
  }

  /* --- drawing --- */
  const X = wx => Math.round(wx - cam);
  function line(x0, y0, x1, y1, col, thick){
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, n = Math.max(dx, dy);
    let err = dx - dy, i = 0;
    g.fillStyle = col;
    for (;;){
      g.fillRect(x0, y0, 1, 1);
      if (thick && i > n * 0.4){ if (dx > dy) g.fillRect(x0, y0 - 1, 1, 1); else g.fillRect(x0 + 1, y0, 1, 1); }
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err; if (e2 > -dy){ err -= dy; x0 += sx; } if (e2 < dx){ err += dx; y0 += sy; }
      i++;
    }
  }
  function drawBatter(){
    const bx = X(0) - 6, by = GY - 20, s = bat.swing;
    g.fillStyle = "rgba(0,0,0,.25)"; g.fillRect(bx, GY, 12, 1);
    g.drawImage(s >= 0.2 ? SPR.batSwing : SPR.batStance, bx, by);
    let hx, hy, tx, ty;
    if (bat.sad){ hx = 2; hy = 9; tx = 7; ty = 19; }
    else if (s < 0){ const wag = Math.floor(time * 2.5) % 2; hx = 1; hy = 8; tx = -1 + wag; ty = -3; }
    else {
      hx = lerp(1, 9, Math.min(1, s * 4)); hy = 8;
      const phi = Math.PI - s * (11 * Math.PI / 6), L = 10;
      const ex = hx + Math.cos(phi) * L, ey = hy + Math.sin(phi) * L * 0.3 + 1, b = Math.min(1, s * 6);
      tx = lerp(-1, ex, b); ty = lerp(-3, ey, b);
    }
    line(bx + hx, by + hy, bx + tx, by + ty, "#e2b36b", true);
  }
  function drawPitcher(){
    const px = X(60) - 6, py = GY - 20;
    let ax = 10, ay = 12;
    if (pit.t >= 0){
      const t = pit.t;
      if (t < .24){ const k = t / .24; ax = lerp(10, 12, k); ay = lerp(12, 2, k); }
      else if (t < .32){ const k = (t - .24) / .08; ax = lerp(12, 1, k); ay = lerp(2, 6, k); }
      else if (t < .6){ ax = 1; ay = 7; }
      else { const k = Math.min(1, (t - .6) / .2); ax = lerp(1, 10, k); ay = lerp(7, 12, k); }
    }
    g.fillStyle = "rgba(0,0,0,.25)"; g.fillRect(px, GY, 12, 1);
    g.drawImage(SPR.pitcher, px, py - (pit.t >= 0 && pit.t < .24 ? 1 : 0));
    line(px + 9, py + 7, px + ax, py + ay, "#a3adc4");
    g.fillStyle = "#f0b98d"; g.fillRect(px + Math.round(ax), py + Math.round(ay), 1, 1);
    if (pit.t >= 0 && pit.t < .32){ g.fillStyle = "#fff"; g.fillRect(px + Math.round(ax), py + Math.round(ay) - 1, 1, 1); }
  }
  function draw(){
    if (!layers) return;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.drawImage(sky, 0, 0);
    for (const s of stars){ const tw = Math.sin(time * 1.5 + s.p); if (tw < -0.6) continue; g.fillStyle = s.b > 0.8 ? "#ffffff" : "#9fb0e8"; g.fillRect(Math.round(((s.x - cam * 0.04) % (W + 40) + W + 40) % (W + 40)), Math.round(s.y), 1, 1); }
    const so = -((((cam * 0.3) % SKY_W) + SKY_W) % SKY_W);
    for (let xx = so; xx < W; xx += SKY_W) g.drawImage(skyline, Math.round(xx), 0);
    if (shake > 0 && !REDUCED) g.translate(Math.round(Math.random() * 2 - 1), Math.round(Math.random() * 2 - 1));
    g.drawImage(cheer > 0 && Math.floor(time * 8) % 2 ? layers[1] : layers[0], WX0 - Math.round(cam), 0);

    for (const f of flags){ const fx = X(f.x), fy = GY - f.sy; if (fx < -4 || fx > W + 4) continue; g.fillStyle = "#f4efd8"; g.fillRect(fx, fy - 7, 1, 8); g.fillStyle = f.color; g.fillRect(fx + 1, fy - 7, 3, 2); g.fillRect(fx + 1, fy - 5, 2, 1); }
    drawPitcher(); drawBatter();
    if (pball){ g.fillStyle = "#fff"; g.fillRect(X(pball.x), Math.round(GY - pball.y), 2, 2); }
    if (ball){
      trail.forEach((p, i) => { g.fillStyle = "rgba(255,255,255," + (0.08 + 0.5 * i / trail.length).toFixed(2) + ")"; g.fillRect(X(p.x), Math.round(GY - p.y), 1, 1); });
      const bx = X(ball.x), byy = Math.round(GY - ball.y);
      if (!ball.landed){ g.fillStyle = "rgba(0,0,0,.3)"; g.fillRect(bx - 1, GY - surf(ball.x) + 1, 3, 1); }
      g.fillStyle = "#fff"; g.fillRect(bx, byy - 1, 2, 2);
      if (byy < 0){ g.fillStyle = "#ffcf40"; g.fillRect(bx, 2, 2, 1); g.fillRect(bx - 1, 3, 4, 1); g.fillRect(bx - 2, 4, 6, 1); }
    }
    for (const p of parts){ g.fillStyle = p.c; g.fillRect(Math.round(p.w ? p.x - cam : p.x), Math.round(p.y), p.s || 1, p.s || 1); }
    g.setTransform(1, 0, 0, 1, 0, 0);

    if (pop){
      const w = textW(pop.text, 1), px = clamp(X(pop.x) - Math.floor(w / 2), 2, W - w - 2), bounce = Math.max(0, 4 - pop.t * 16);
      text(g, pop.text, px, Math.round(GY - pop.sy - 16 - bounce), pop.color, 1, "#05060f");
    }
    const by = SC === 3 ? 20 : 18;
    if (ball && !ball.landed){ const s = Math.round(ball.d * ball.k) + " FT"; text(g, s, Math.round((W - textW(s, 2)) / 2), by, "#ffcf40", 2, "#05060f"); }
    else if (banner){ const sc = textW(banner.text, 2) <= W - 8 ? 2 : 1; text(g, banner.text, Math.round((W - textW(banner.text, sc)) / 2), by, banner.color, sc, "#05060f"); }
  }

  /* --- simulation --- */
  const after = (dt, fn) => sched.push({t: time + dt, fn});
  function flightY(b, k){
    if (b.d < 150) return Math.abs(Math.sin(k * Math.PI * 3)) * 9 * (1 - k) + 5 * (1 - k);     // bouncing grounder
    return b.h * k * Math.sqrt(1 - k) / 0.3849 + 6 * (1 - k);                                    // rises fast, drops steep
  }
  function apex(d){
    if (d < 280) return 12 + (d - 150) * 0.09;
    if (d < 372) return 30 + (d - 280) * 0.22;
    if (d < HR_FT) return 46;
    let h = d < MOON_FT ? 60 + (d - HR_FT) * 0.15 : 96 + (d - MOON_FT) * 0.2;
    const k = 398 / d, need = 13 / (k * Math.sqrt(1 - k) / 0.3849);       // make sure a homer clears the wall
    return Math.min(140, Math.max(h, need));
  }
  function burst(x, y, n, colors, speed, world){
    for (let i = 0; i < n; i++){ const a = Math.random() * Math.PI * 2, v = speed * (0.4 + Math.random() * 0.6); parts.push({x, y, vx:Math.cos(a) * v, vy:Math.sin(a) * v, g:40, life:0.5 + Math.random() * 0.6, c:colors[i % colors.length], w:world}); }
  }
  function land(){
    const b = ball; b.landed = true;
    const sy = surf(b.x); b.y = sy + 1;
    flags.push({x:b.x, sy, color:b.color}); pop = {x:b.x, sy, text:b.d + " FT", color:b.color, t:0};
    banner = {text:callFor(b.d), color:b.color};
    const level = b.d >= MOON_FT ? 3 : b.d >= HR_FT ? 2 : b.d >= 280 ? 1 : 0;
    sfx.land(); if (level) sfx.cheer(level);
    cheer = [0, 1, 2.4, 3.6][level];
    burst(b.x, GY - sy, 7, sy ? ["#fff", b.color] : ["#d9c08f", "#bfe3a0"], 22, true);
    if (level >= 2 && !REDUCED){
      shake = 0.25; sfx.homer(level === 3);
      const n = level === 3 ? 6 : 3;
      for (let i = 0; i < n; i++) after(0.15 + i * 0.28, () => { burst(20 + Math.random() * (W - 40), 14 + Math.random() * (GY - 60), 26, [b.color, "#fff", "#ff5d4f", "#58b4ff"], 46, false); sfx.boom(); });
    }
    fast = false;
    const done = b.done; b.done = null; if (done) done({x:b.x, sy});
  }
  function update(dt){
    const ts = fast ? dt * 6 : dt;
    time += ts;
    if (sched.length){ sched.sort((a, b) => a.t - b.t); while (sched.length && sched[0].t <= time) sched.shift().fn(); }
    if (pit.t >= 0){ pit.t += ts; if (pit.t > 0.85) pit.t = -1; }
    if (bat.swing >= 0 && bat.swing < 1) bat.swing = Math.min(1, bat.swing + ts / 0.24);
    if (pball){ pball.k += ts / pball.dur; if (pball.k >= 1) pball = null; else { pball.x = lerp(55, pball.x1, pball.k); pball.y = lerp(14, pball.y1, pball.k); } }
    if (ball && !ball.landed){
      const steps = Math.max(1, Math.ceil(ts / 0.008));
      for (let i = 0; i < steps && !ball.landed; i++){
        ball.u = Math.min(1, ball.u + ts / steps / ball.dur);
        ball.k = ball.u * (1.35 - 0.35 * ball.u);          // ball slows down as it travels
        ball.x = ball.d * ball.k; ball.y = flightY(ball, ball.k);
        if (ball.u >= 1 || (ball.x > 380 && ball.k > 0.6 && ball.y <= surf(ball.x))) land();
      }
      if (ball && !ball.landed && ball.onFeet) ball.onFeet(Math.round(ball.d * ball.k));
      trail.push({x:ball.x, y:ball.y}); if (trail.length > 9) trail.shift();
    } else if (trail.length) trail.shift();
    for (let i = parts.length - 1; i >= 0; i--){ const p = parts[i]; p.life -= ts; if (p.life <= 0){ parts.splice(i, 1); continue; } p.vy += p.g * ts; p.x += p.vx * ts; p.y += p.vy * ts; }
    if (pop) pop.t += ts;
    if (cheer > 0) cheer -= ts;
    if (shake > 0) shake -= dt;

    if (mode === "attract") camT = lerp(WX0 + 6, WX1 - W - 6, (1 - Math.cos(time * 0.11)) / 2);
    else if (ball) camT = ball.x - W * (ball.landed ? 0.6 : 0.5);
    else camT = camHome;
    camT = clamp(camT, WX0, WX1 - W);
    cam += (camT - cam) * Math.min(1, dt * (mode === "attract" ? 2 : 7));
  }
  function frame(now){
    const dt = Math.min(0.05, (now - lastT) / 1000 || 0); lastT = now;
    update(dt); draw();
    requestAnimationFrame(frame);
  }

  /* --- what the game can ask the field to do --- */
  function throwPitch(swingAt, x1, y1, dur){
    pit.t = 0; sfx.pitch();
    after(0.32, () => { pball = {x:55, y:14, x1, y1, k:0, dur}; });
    if (swingAt != null) after(swingAt, () => { bat.swing = 0; });
  }
  const api = {
    resize,
    attract(rounds){ mode = "attract"; sched = []; ball = null; pball = null; trail = []; pop = null; banner = null; bat = {swing:-1, sad:false}; fast = false; api.setFlags(rounds || []); },
    setFlags(rounds){ flags = rounds.filter(r => r.dist > 0).map(r => ({x:r.fx, sy:r.fsy, color:TIERS[r.tier - 1].color})); },
    ready(){ mode = "play"; sched = []; ball = null; pball = null; trail = []; pop = null; banner = null; bat = {swing:-1, sad:false}; pit.t = -1; fast = false; },
    hurry(){ fast = true; },
    hit(dist, color, onFeet, done){
      sched = []; pball = null; bat.swing = -1;
      const launch = () => {
        sfx.crack(dist / 135);
        ball = {d:dist, h:apex(dist), u:0, k:0, x:0, y:6, color, onFeet, done, landed:false, dur:REDUCED ? 0.01 : clamp(0.95 + dist / 250, 1.1, 3.1)};
        trail = [];
        burst(X(4), GY - 9, 5, ["#fff", "#ffcf40"], 26, false);
      };
      if (REDUCED){ launch(); return; }
      throwPitch(0.46, 4, 9, 0.26);
      after(0.58, () => { pball = null; launch(); });
    },
    whiff(n){
      sched = []; pball = null; bat.swing = -1;
      if (REDUCED){ banner = {text:"Strike " + n, color:"#ff5d4f"}; sfx.strike(); return; }
      throwPitch(0.5, -38, 8, 0.44);
      after(0.6, () => { sfx.whiff(); });
      after(0.72, () => { sfx.strike(); banner = {text:"Strike " + n, color:"#ff5d4f"}; });
      after(1.5, () => { if (!ball){ bat.swing = -1; if (banner && banner.color === "#ff5d4f") banner = null; } });
    },
    strikeout(swinging, done){
      sched = []; pball = null; bat.swing = -1;
      const fin = () => { bat.sad = true; bat.swing = -1; banner = {text:swinging ? "Struck out swinging" : "Caught looking", color:"#ff5d4f"}; sfx.out(); fast = false; done(); };
      if (REDUCED){ fin(); return; }
      throwPitch(swinging ? 0.5 : null, -38, 8, 0.44);
      if (swinging) after(0.6, () => sfx.whiff());
      after(0.8, fin);
    }
  };
  resize();
  if (window.ResizeObserver) new ResizeObserver(() => { const w = Math.max(240, wrap.clientWidth); if (Math.ceil(w / (w >= 560 ? 3 : 2)) !== W) resize(); }).observe(wrap);
  else window.addEventListener("resize", resize);
  requestAnimationFrame(frame);
  return api;
})();

