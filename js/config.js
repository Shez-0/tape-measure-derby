/* =====================================================================
   TAPE MEASURE DERBY - game code
   Sections: config, helpers, answer matching, storage, sound,
             the field (canvas), game flow, screens, events.
   ===================================================================== */

/* ---------- config ---------- */
const SWINGS = 10;          // questions per derby
const CLOCK = 30;           // seconds on the pitch clock
const MAX_STRIKES = 3;
const STRIKE_TAX = 0.10;    // each strike takes 10% off the swing
const ROSTERS_PER_GAME = 4; // the rest come from the other categories
const HR_FT = 400, MOON_FT = 460, MAX_FT = 540;

// rarity tier -> distance range in feet
const TIERS = [
  {name:"Common",    say:"the answer everyone gives", hit:"infield single", lo:60,  hi:150, color:"#c9d3df", emoji:"⬜"},
  {name:"Uncommon",  say:"a regular",                 hit:"line drive",     lo:170, hi:270, color:"#6fdc6f", emoji:"🟩"},
  {name:"Rare",      say:"takes a real fan",          hit:"off the wall",   lo:290, hi:385, color:"#58b4ff", emoji:"🟦"},
  {name:"Deep cut",  say:"few people get here",       hit:"home run",       lo:402, hi:445, color:"#c98bff", emoji:"🟪"},
  {name:"Legend",    say:"almost nobody says it",     hit:"moonshot",       lo:465, hi:MAX_FT, color:"#ffcf40", emoji:"🟨"}
];

