#!/usr/bin/env node

/**
 * Hue-naming testbench.
 *
 * Samples the sRGB gamut on an OKLCH grid (hue × lightness × chroma), runs
 * every sample through ColorDescription, and rates the hue nouns against the
 * nearest survey centroid from the UW "Many Languages, Many Colors" English
 * data (Kim et al., EuroVis 2019). Writes an HTML swatch grid for eyeballing
 * plus a JSON summary for diffing between iterations.
 *
 * Usage (run `npm run build` first):
 *   node tools/testbench.mjs                     # writes tools/testbench.html
 *   node tools/testbench.mjs --json out.json     # also dump per-cell results
 *   node tools/testbench.mjs --baseline a.json   # mark cells that changed
 *   node tools/testbench.mjs --hues 80,100,120   # render only these hues
 */

import { writeFileSync, readFileSync } from "node:fs";
import { converter, inGamut, formatHex } from "culori";
// dist is used because src/index.js has extension-less imports (esbuild resolves them)
import ColorDescription from "../dist/index.esm.js";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i === -1 ? def : args[i + 1];
};
const OUT_HTML = opt("--out", "tools/testbench.html");
const OUT_JSON = opt("--json", null);
const BASELINE = opt("--baseline", null);
const ONLY_HUES = opt("--hues", null); // e.g. "80,90,100" to render a subset

// ---------------------------------------------------------------------------
// Survey centroids (English, ≥50 responses) in OKLCH. Source:
// tools/survey-comparison.mjs → basic_colors_info_en.csv
// ---------------------------------------------------------------------------
const SURVEY = [
  ["burgundy", 988, 8.9, 0.404, 0.12],
  ["maroon", 2130, 11.8, 0.416, 0.124],
  ["coral", 431, 23.8, 0.69, 0.153],
  ["salmon", 727, 24.3, 0.708, 0.133],
  ["red", 4692, 24.8, 0.594, 0.218],
  ["peach", 1218, 40.6, 0.779, 0.097],
  ["orange", 4072, 53.5, 0.72, 0.168],
  ["brown", 6421, 54.1, 0.491, 0.078],
  ["beige", 1254, 81.4, 0.799, 0.062],
  ["gold", 695, 91.3, 0.773, 0.144],
  ["yellow", 3360, 104.9, 0.896, 0.177],
  ["olive", 950, 118.0, 0.618, 0.105],
  ["lime", 913, 133.6, 0.859, 0.214],
  ["green", 14773, 142.9, 0.721, 0.171],
  ["mint", 718, 156.8, 0.854, 0.142],
  ["teal", 3233, 184.1, 0.74, 0.114],
  ["turquoise", 2113, 185.8, 0.783, 0.125],
  ["aqua", 823, 188.0, 0.815, 0.128],
  ["cyan", 1329, 197.0, 0.816, 0.123],
  ["blue", 12192, 257.4, 0.579, 0.174],
  ["navy", 1002, 267.8, 0.35, 0.114],
  ["periwinkle", 733, 279.0, 0.683, 0.116],
  ["indigo", 1256, 284.6, 0.453, 0.181],
  ["lavender", 2445, 305.6, 0.694, 0.117],
  ["violet", 3120, 306.5, 0.525, 0.185],
  ["purple", 13445, 310.5, 0.54, 0.192],
  ["mauve", 1114, 340.5, 0.598, 0.096],
  ["magenta", 3696, 340.7, 0.603, 0.226],
  ["pink", 8657, 347.8, 0.681, 0.195],
].map(([term, n, h, l, c]) => ({ term, n, h, l, c }));

// Which library nouns count as "agreeing" with a survey term.
const ACCEPT = {
  burgundy: ["maroon", "red"],
  maroon: ["maroon"],
  coral: ["red", "orange", "pink"],
  salmon: ["pink", "red", "orange"],
  red: ["red"],
  peach: ["orange", "beige"],
  orange: ["orange"],
  brown: ["brown"],
  beige: ["beige"],
  gold: ["yellow", "beige"],
  yellow: ["yellow"],
  olive: ["olive"],
  lime: ["lime"],
  green: ["green"],
  mint: ["green", "teal"],
  teal: ["teal"],
  turquoise: ["teal", "cyan"],
  aqua: ["cyan", "teal"],
  cyan: ["cyan"],
  blue: ["blue"],
  navy: ["navy"],
  periwinkle: ["indigo", "blue", "lavender"],
  indigo: ["indigo"],
  lavender: ["lavender"],
  violet: ["purple"],
  purple: ["purple"],
  mauve: ["magenta", "purple", "pink", "lavender"],
  magenta: ["magenta"],
  pink: ["pink"],
};

const HUE_NOUNS = new Set([
  "red",
  "maroon",
  "orange",
  "brown",
  "beige",
  "yellow",
  "olive",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "navy",
  "indigo",
  "purple",
  "lavender",
  "magenta",
  "pink",
]);

// ---------------------------------------------------------------------------
// Sampling grid
// ---------------------------------------------------------------------------
const HUES = ONLY_HUES
  ? ONLY_HUES.split(",").map(Number)
  : Array.from({ length: 36 }, (_, i) => i * 10);
const LIGHTS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const CHROMAS = [0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.22, 0.26];

const inSrgb = inGamut("rgb");
const toRgb = converter("rgb");

// Distance to a survey centroid. Plain OKLab distance is wrong for naming:
// at low chroma every hue collapses onto the few dark centroids (navy, brown,
// burgundy). People still name dark colors by hue, so hue is measured as an
// angle. The divisors are rough per-axis spreads (ΔL 0.25, ΔC 0.08, Δh 25°).
function nearestSurvey(l, c, h) {
  let best = null;
  let bestD = Infinity;
  for (const s of SURVEY) {
    let dh = Math.abs(s.h - h);
    if (dh > 180) dh = 360 - dh;
    const d =
      ((s.l - l) / 0.25) ** 2 + ((s.c - c) / 0.08) ** 2 + (dh / 25) ** 2;
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return { term: best.term, dist: Math.sqrt(bestD) };
}

const cells = [];
for (const h of HUES) {
  for (const l of LIGHTS) {
    for (const c of CHROMAS) {
      const color = { mode: "oklch", l, c, h };
      if (!inSrgb(color)) continue;
      const hex = formatHex(toRgb(color));
      const cd = new ColorDescription(hex);
      const nouns = cd.nouns.filter((n) => HUE_NOUNS.has(n));
      const expected = nearestSurvey(l, c, h);
      const accept = ACCEPT[expected.term];
      const agree = nouns.some((n) => accept.includes(n));
      const flags = [];
      if (nouns.length === 0) flags.push("no-noun");
      if (nouns.length > 2) flags.push("many-nouns");
      if (!agree) flags.push("disagree");
      cells.push({
        key: `${h}/${l}/${c}`,
        h,
        l,
        c,
        hex,
        nouns,
        words: cd.descriptiveWords,
        expected: expected.term,
        expectedDist: +expected.dist.toFixed(3),
        agree,
        flags,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
const total = cells.length;
const agreeCount = cells.filter((c) => c.agree).length;
const noNoun = cells.filter((c) => c.flags.includes("no-noun")).length;
const manyNouns = cells.filter((c) => c.flags.includes("many-nouns")).length;

// Per survey-term agreement
const perTerm = {};
for (const c of cells) {
  perTerm[c.expected] ??= { n: 0, ok: 0, confusions: {} };
  perTerm[c.expected].n++;
  if (c.agree) perTerm[c.expected].ok++;
  else {
    const k = c.nouns.join("+") || "(none)";
    perTerm[c.expected].confusions[k] =
      (perTerm[c.expected].confusions[k] || 0) + 1;
  }
}

// Baseline diff
let baseline = null;
if (BASELINE) {
  baseline = JSON.parse(readFileSync(BASELINE, "utf8"));
  const map = new Map(baseline.cells.map((c) => [c.key, c]));
  for (const c of cells) {
    const b = map.get(c.key);
    if (b && b.nouns.join(",") !== c.nouns.join(",")) {
      c.changed = b.nouns;
      c.flags.push("changed");
    }
  }
}

const summary = {
  total,
  agree: agreeCount,
  agreePct: +((100 * agreeCount) / total).toFixed(2),
  noNoun,
  manyNouns,
  perTerm: Object.fromEntries(
    Object.entries(perTerm)
      .sort((a, b) => b[1].n - a[1].n)
      .map(([k, v]) => [
        k,
        {
          n: v.n,
          ok: v.ok,
          pct: +((100 * v.ok) / v.n).toFixed(1),
          confusions: v.confusions,
        },
      ]),
  ),
};

console.log(`samples: ${total}`);
console.log(
  `agree with nearest survey centroid: ${agreeCount} (${summary.agreePct}%)`,
);
console.log(`no hue noun: ${noNoun}   >2 hue nouns: ${manyNouns}`);
if (baseline) {
  console.log(
    `baseline agree: ${baseline.summary.agreePct}%  → changed cells: ${cells.filter((c) => c.changed).length}`,
  );
}
console.log("\nper survey term:");
for (const [term, v] of Object.entries(summary.perTerm)) {
  const conf = Object.entries(v.confusions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k, n]) => `${k}×${n}`)
    .join(", ");
  console.log(
    `  ${term.padEnd(11)} ${String(v.ok).padStart(3)}/${String(v.n).padEnd(3)} ${String(v.pct).padStart(5)}%  ${conf}`,
  );
}

if (OUT_JSON)
  writeFileSync(OUT_JSON, JSON.stringify({ summary, cells }, null, 0));

// ---------------------------------------------------------------------------
// HTML
// ---------------------------------------------------------------------------
const esc = (s) =>
  String(s).replace(
    /[&<>"]/g,
    (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch],
  );
const textOn = (hex) => {
  const { r, g, b } = toRgb(hex);
  const lin = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const y = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return y > 0.3 ? "#000" : "#fff";
};

const byHue = new Map();
for (const c of cells) {
  if (!byHue.has(c.h)) byHue.set(c.h, []);
  byHue.get(c.h).push(c);
}

let panels = "";
for (const [h, list] of byHue) {
  const idx = new Map(list.map((c) => [`${c.l}/${c.c}`, c]));
  let rows = "";
  for (const l of [...LIGHTS].reverse()) {
    rows += `<tr><th>L ${l.toFixed(1)}</th>`;
    for (const c of CHROMAS) {
      const cell = idx.get(`${l}/${c}`);
      if (!cell) {
        rows += `<td class="oog"></td>`;
        continue;
      }
      const cls = cell.flags.map((f) => `f-${f}`).join(" ");
      const title = [
        cell.hex,
        `oklch(${l} ${c} ${h})`,
        `nouns: ${cell.nouns.join(", ") || "—"}`,
        `expected (survey): ${cell.expected} (Δ${cell.expectedDist})`,
        cell.changed ? `was: ${cell.changed.join(", ") || "—"}` : "",
        `words: ${cell.words.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n");
      rows += `<td class="${cls}" style="background:${cell.hex};color:${textOn(cell.hex)}" title="${esc(title)}"><span>${esc(cell.nouns.join(" ") || "∅")}</span><small>${esc(cell.expected)}</small></td>`;
    }
    rows += `</tr>`;
  }
  const hueAgree = list.filter((c) => c.agree).length;
  panels += `<section><h2>H ${h}° <small>${hueAgree}/${list.length} agree</small></h2><table><thead><tr><th></th>${CHROMAS.map((c) => `<th>C ${c}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></section>`;
}

let termRows = "";
for (const [term, v] of Object.entries(summary.perTerm)) {
  const conf = Object.entries(v.confusions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([k, n]) => `${esc(k)} ×${n}`)
    .join(", ");
  termRows += `<tr><td>${term}</td><td>${v.ok}/${v.n}</td><td>${v.pct}%</td><td>${conf}</td></tr>`;
}

const baselineNote = baseline
  ? `<p>Baseline agreement: <b>${baseline.summary.agreePct}%</b> → now <b>${summary.agreePct}%</b>. Cells whose nouns changed have a dashed outline.</p>`
  : "";

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Hue naming testbench</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root { color-scheme: light dark; --bg: #f6f6f4; --fg: #111; --muted: #666; --line: #ddd; }
  @media (prefers-color-scheme: dark) { :root { --bg: #17171a; --fg: #eee; --muted: #999; --line: #333; } }
  body { margin: 0; padding: 16px; font: 13px/1.4 system-ui, sans-serif; background: var(--bg); color: var(--fg); }
  h1 { font-size: 20px; margin: 0 0 8px; }
  h2 { font-size: 14px; margin: 20px 0 6px; }
  h2 small { color: var(--muted); font-weight: normal; margin-left: 8px; }
  .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; max-width: 900px; margin: 12px 0; }
  .stat { border: 1px solid var(--line); border-radius: 6px; padding: 8px 10px; }
  .stat b { display: block; font-size: 22px; }
  .stat span { color: var(--muted); font-size: 12px; }
  table { border-collapse: collapse; }
  th { font-weight: normal; color: var(--muted); font-size: 11px; padding: 2px 4px; text-align: left; white-space: nowrap; }
  td { width: 96px; height: 44px; padding: 3px 5px; vertical-align: top; box-sizing: border-box; border: 2px solid transparent; }
  td span { display: block; font-weight: 600; font-size: 12px; line-height: 1.15; }
  td small { display: block; font-size: 10px; opacity: .75; }
  td.oog { background: repeating-linear-gradient(45deg, transparent 0 6px, var(--line) 6px 7px); }
  td.f-disagree { border-color: #e0163b; }
  td.f-no-noun { border-color: #000; border-style: double; }
  td.f-changed { outline: 2px dashed #06f; outline-offset: -5px; }
  .legend { color: var(--muted); font-size: 12px; margin: 6px 0 14px; }
  .legend i { display: inline-block; width: 12px; height: 12px; border: 2px solid; vertical-align: -2px; margin-right: 3px; }
  .terms td { width: auto; height: auto; border: 0; border-bottom: 1px solid var(--line); padding: 3px 10px 3px 0; font-size: 12px; }
  .grid { display: flex; flex-wrap: wrap; gap: 0 28px; }
  section { overflow-x: auto; }
</style>
</head>
<body>
<h1>Hue naming testbench</h1>
<p>Every cell is one sRGB color sampled on an OKLCH grid. Big text = hue nouns the library returns. Small text = nearest English survey centroid (Kim et al. 2019). Hover a cell for details.</p>
<div class="summary">
  <div class="stat"><b>${summary.agreePct}%</b><span>agree with survey (${agreeCount}/${total})</span></div>
  <div class="stat"><b>${noNoun}</b><span>cells with no hue noun</span></div>
  <div class="stat"><b>${manyNouns}</b><span>cells with &gt;2 hue nouns</span></div>
</div>
${baselineNote}
<p class="legend"><i style="border-color:#e0163b"></i> disagrees with survey &nbsp; <i style="border-color:#000;border-style:double"></i> no hue noun &nbsp; <i style="border:2px dashed #06f"></i> changed vs baseline &nbsp; hatched = outside sRGB</p>
<h2>Per survey term</h2>
<table class="terms"><thead><tr><th>term</th><th>agree</th><th>%</th><th>top confusions</th></tr></thead><tbody>${termRows}</tbody></table>
<div class="grid">${panels}</div>
</body>
</html>`;

writeFileSync(OUT_HTML, html);
console.log(`\nwrote ${OUT_HTML}`);
