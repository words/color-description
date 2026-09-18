#!/usr/bin/env node

/**
 * Reads the English responses of the "Many Languages, Many Colors" survey
 * (Kim et al., EuroVis 2019), keeps the full-gamut sRGB trials, maps
 * compound names to canonical terms (darkgreen → green, navyblue → navy)
 * and prints per-term OKLCH percentiles. Writes <dir>/survey/rows.json and
 * <dir>/survey/stats.json for tools/survey-finemap.mjs.
 *
 * Data: put cleaned_color_names-en.csv from
 *   https://github.com/uwdata/color-naming-in-different-languages
 *   (model/cleaned_color_data_by_lang/) at <dir>/survey/en.csv
 * Usage: node tools/survey-fit.mjs <dir>
 */

import { readFileSync, writeFileSync } from "node:fs";
import { converter } from "culori";
const toOklch = converter("oklch"),
  toOklab = converter("oklab");
const S = process.argv[2];
const text = readFileSync(`${S}/survey/en.csv`, "utf8").split("\n");
const header = text[0].split(",");
const idx = Object.fromEntries(header.map((h, i) => [h, i]));
// naive CSV split is fine: names were cleaned (no commas in `name`), but entered_name may have commas → parse carefully
function parse(line) {
  const out = [];
  let cur = "",
    q = false;
  for (const ch of line) {
    if (ch === '"') {
      q = !q;
      continue;
    }
    if (ch === "," && !q) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}
const rows = [];
for (const line of text.slice(1)) {
  if (!line) continue;
  const p = parse(line);
  if (p[idx.rgbSet] !== "full" || p[idx.colorSpace] !== "rgb") continue;
  const r = +p[idx.r] / 255,
    g = +p[idx.g] / 255,
    b = +p[idx.b] / 255;
  const lab = toOklab({ mode: "rgb", r, g, b });
  const lch = toOklch(lab);
  rows.push({
    name: p[idx.name],
    l: lab.l,
    a: lab.a,
    b: lab.b,
    c: lch.c,
    h: lch.h ?? 0,
  });
}
console.log("rows", rows.length);

// Canonical terms and modifier stripping
const CANON = [
  "red",
  "maroon",
  "burgundy",
  "crimson",
  "scarlet",
  "orange",
  "brown",
  "tan",
  "khaki",
  "beige",
  "cream",
  "peach",
  "apricot",
  "gold",
  "yellow",
  "mustard",
  "olive",
  "lime",
  "chartreuse",
  "green",
  "mint",
  "seafoam",
  "teal",
  "turquoise",
  "aqua",
  "cyan",
  "blue",
  "navy",
  "indigo",
  "periwinkle",
  "purple",
  "violet",
  "lavender",
  "lilac",
  "magenta",
  "fuchsia",
  "pink",
  "rose",
  "salmon",
  "coral",
  "mauve",
  "plum",
  "black",
  "white",
  "gray",
  "grey",
  "silver",
  "charcoal",
  "rust",
  "terracotta",
  "sand",
  "ochre",
  "amber",
  "emerald",
  "jade",
  "sage",
  "forest",
  "cobalt",
  "denim",
  "slate",
  "wine",
  "raspberry",
  "cerise",
  "orchid",
  "eggplant",
  "taupe",
  "ivory",
  "lemon",
  "canary",
  "copper",
  "bronze",
  "chocolate",
  "coffee",
  "caramel",
  "sky",
];
const MODS = [
  "dark",
  "light",
  "bright",
  "pale",
  "deep",
  "neon",
  "pastel",
  "hot",
  "baby",
  "royal",
  "forest",
  "grass",
  "sea",
  "dull",
  "muted",
  "dusty",
  "medium",
  "vivid",
  "soft",
  "electric",
  "dirty",
  "faded",
  "greyish",
  "grayish",
  "very",
  "warm",
  "cool",
  "true",
  "pure",
  "offwhite",
  "off",
];
const ALIAS = {
  grey: "gray",
  navyblue: "navy",
  skyblue: "sky",
  limegreen: "lime",
  olivegreen: "olive",
  mintgreen: "mint",
  yellowgreen: "lime",
  bluegreen: "teal",
  greenblue: "teal",
  seagreen: "green",
  forestgreen: "green",
  grassgreen: "green",
  hotpink: "pink",
  babyblue: "blue",
  royalblue: "blue",
  lightgreen: "green",
  darkgreen: "green",
  darkblue: "blue",
  lightblue: "blue",
  darkpurple: "purple",
  lightpurple: "purple",
  darkpink: "pink",
  lightpink: "pink",
  lightbrown: "brown",
  darkbrown: "brown",
  brightgreen: "green",
  neongreen: "green",
  brightpurple: "purple",
  bluegray: "gray",
  bluegrey: "gray",
  greygreen: "green",
  graygreen: "green",
  greyblue: "blue",
  grayblue: "blue",
  redorange: "orange",
  orangered: "red",
  redbrown: "brown",
  brownred: "red",
  yelloworange: "orange",
  orangeyellow: "yellow",
  pinkpurple: "purple",
  purplepink: "pink",
  bluepurple: "purple",
  purpleblue: "blue",
  pinkred: "red",
  redpink: "pink",
  greenyellow: "lime",
  tealblue: "teal",
  blueteal: "teal",
  greenteal: "teal",
  tealgreen: "teal",
  brownorange: "orange",
  orangebrown: "brown",
  greenishblue: "teal",
  bluishgreen: "teal",
  darkred: "red",
  lightred: "red",
  darkorange: "orange",
  lightorange: "orange",
  darkyellow: "yellow",
  lightyellow: "yellow",
  darkteal: "teal",
  lightteal: "teal",
  darkgray: "gray",
  lightgray: "gray",
  darkgrey: "gray",
  lightgrey: "gray",
  darkmagenta: "magenta",
  darkcyan: "cyan",
  lightcyan: "cyan",
  darkviolet: "violet",
  lightviolet: "violet",
  darklavender: "lavender",
  darkolive: "olive",
  lightolive: "olive",
  darkmaroon: "maroon",
  darknavy: "navy",
  darkindigo: "indigo",
  darkturquoise: "turquoise",
  lightturquoise: "turquoise",
  darklime: "lime",
  lightlime: "lime",
  darktan: "tan",
  lighttan: "tan",
  darkbeige: "beige",
  lightbeige: "beige",
  darkpeach: "peach",
  lightpeach: "peach",
  darkgold: "gold",
  lightgold: "gold",
  darkmustard: "mustard",
  darkmint: "mint",
  lightmint: "mint",
  darksalmon: "salmon",
  lightsalmon: "salmon",
  darkcoral: "coral",
  lightcoral: "coral",
  darkmauve: "mauve",
  lightmauve: "mauve",
  darkplum: "plum",
  lightplum: "plum",
  darkfuchsia: "fuchsia",
  lightfuchsia: "fuchsia",
  darklilac: "lilac",
  lightlilac: "lilac",
  darkperiwinkle: "periwinkle",
  lightperiwinkle: "periwinkle",
  darkaqua: "aqua",
  lightaqua: "aqua",
};
function canon(name) {
  if (ALIAS[name]) return ALIAS[name];
  if (CANON.includes(name)) return name === "grey" ? "gray" : name;
  for (const m of MODS)
    if (name.startsWith(m) && name.length > m.length) {
      const rest = name.slice(m.length);
      const c = canon(rest);
      if (c) return c;
    }
  for (const m of MODS)
    if (name.endsWith(m) && name.length > m.length) {
      const c = canon(name.slice(0, -m.length));
      if (c) return c;
    }
  return null;
}
let mapped = 0;
const unmapped = new Map();
for (const r of rows) {
  r.canon = canon(r.name);
  if (r.canon) mapped++;
  else unmapped.set(r.name, (unmapped.get(r.name) || 0) + 1);
}
console.log("mapped", mapped, "of", rows.length);
console.log(
  "top unmapped:",
  [...unmapped.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([n, k]) => `${n}:${k}`)
    .join(" "),
);

// per-canonical-term stats
const byTerm = new Map();
for (const r of rows)
  if (r.canon) {
    if (!byTerm.has(r.canon)) byTerm.set(r.canon, []);
    byTerm.get(r.canon).push(r);
  }
const q = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(p * s.length))];
};
function circMean(hs) {
  let x = 0,
    y = 0;
  for (const h of hs) {
    x += Math.cos((h * Math.PI) / 180);
    y += Math.sin((h * Math.PI) / 180);
  }
  let m = (Math.atan2(y, x) * 180) / Math.PI;
  return (m + 360) % 360;
}
console.log(
  "\nterm            n     L10  L50  L90   C10  C50  C90   hue(mean) h10  h90 (relative to mean)",
);
const stats = [];
for (const [t, rs] of [...byTerm.entries()].sort(
  (a, b) => b[1].length - a[1].length,
)) {
  if (rs.length < 150) continue;
  const chroma = rs.filter((r) => r.c > 0.03);
  const hm = chroma.length ? circMean(chroma.map((r) => r.h)) : 0;
  const rel = chroma.map((r) => {
    let d = r.h - hm;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  });
  const st = {
    t,
    n: rs.length,
    L: [
      q(
        rs.map((r) => r.l),
        0.1,
      ),
      q(
        rs.map((r) => r.l),
        0.5,
      ),
      q(
        rs.map((r) => r.l),
        0.9,
      ),
    ],
    C: [
      q(
        rs.map((r) => r.c),
        0.1,
      ),
      q(
        rs.map((r) => r.c),
        0.5,
      ),
      q(
        rs.map((r) => r.c),
        0.9,
      ),
    ],
    hm,
    h: [q(rel, 0.1), q(rel, 0.9)],
  };
  stats.push(st);
  console.log(
    `${t.padEnd(14)}${String(st.n).padStart(6)}  ${st.L.map((v) => v.toFixed(2)).join(" ")}   ${st.C.map((v) => v.toFixed(2)).join(" ")}   ${hm.toFixed(0).padStart(5)}      ${st.h[0].toFixed(0).padStart(4)} ${st.h[1].toFixed(0).padStart(4)}`,
  );
}
writeFileSync(
  `${S}/survey/rows.json`,
  JSON.stringify(
    rows
      .filter((r) => r.canon)
      .map((r) => [r.canon, +r.l.toFixed(4), +r.a.toFixed(4), +r.b.toFixed(4)]),
  ),
);
writeFileSync(`${S}/survey/stats.json`, JSON.stringify(stats));
