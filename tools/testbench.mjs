#!/usr/bin/env node

/**
 * Hue-naming testbench.
 *
 * Samples the sRGB gamut on an OKLCH grid (hue × lightness × chroma), runs
 * every sample through ColorDescription, and rates the nouns against the
 * most common answers of the nearest survey responses in the UW "Many
 * Languages, Many Colors" English data (Kim et al., EuroVis 2019), from
 * tools/survey-labels.json. Writes an HTML swatch grid for eyeballing
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
// Survey labels: for every grid cell, the most common names among the 60
// nearest survey responses (tools/survey-labels.json, built by
// tools/survey-finemap.mjs from Kim et al. 2019).
// ---------------------------------------------------------------------------
const LABELS = JSON.parse(
  readFileSync(new URL("./survey-labels.json", import.meta.url), "utf8"),
);
// library nouns and survey terms are both mapped onto one vocabulary
const NORM = {
  grey: "gray",
  "sky blue": "sky",
  lilac: "lavender",
  fuchsia: "magenta",
  aqua: "turquoise",
  burgundy: "maroon",
  mustard: "gold",
};
const norm = (n) => NORM[n] || n;
const labelKey = (h, l, c) => `${h}/${l.toFixed(2)}/${c.toFixed(2)}`;

// ---------------------------------------------------------------------------
// Sampling grid
// ---------------------------------------------------------------------------
const HUES = ONLY_HUES
  ? ONLY_HUES.split(",").map(Number)
  : Array.from({ length: 36 }, (_, i) => i * 10);
const LIGHTS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const CHROMAS = [0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24, 0.27];

const inSrgb = inGamut("rgb");
const toRgb = converter("rgb");

const cells = [];
for (const h of HUES) {
  for (const l of LIGHTS) {
    for (const c of CHROMAS) {
      const color = { mode: "oklch", l, c, h };
      if (!inSrgb(color)) continue;
      const hex = formatHex(toRgb(color));
      const cd = new ColorDescription(hex);
      const nouns = cd.nouns;
      const top = LABELS[labelKey(h, l, c)] || [];
      const normed = nouns.map(norm);
      // agree when the library returns the survey's top term, or its second
      // term if that one has at least a fifth of the votes
      const agree =
        top.length > 0 &&
        (normed.includes(norm(top[0][0])) ||
          (top[1] && top[1][1] >= 0.2 && normed.includes(norm(top[1][0]))));
      const expectedText = top
        .slice(0, 2)
        .map(([t, s]) => `${t} ${Math.round(s * 100)}%`)
        .join(", ");
      const flags = [];
      if (nouns.length === 0) flags.push("no-noun");
      const chromatic = nouns.filter(
        (n) => !["black", "grey", "white"].includes(n),
      );
      if (chromatic.length > 2) flags.push("many-nouns");
      if (!agree) flags.push("disagree");
      cells.push({
        key: `${h}/${l}/${c}`,
        h,
        l,
        c,
        hex,
        nouns,
        words: cd.descriptiveWords,
        expected: top[0] ? top[0][0] : "—",
        expectedText,
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
console.log(`agree with survey vote: ${agreeCount} (${summary.agreePct}%)`);
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
        `survey: ${cell.expectedText}`,
        cell.changed ? `was: ${cell.changed.join(", ") || "—"}` : "",
        `words: ${cell.words.join(", ")}`,
      ]
        .filter(Boolean)
        .join("\n");
      const was = cell.changed
        ? `<s>${esc(cell.changed.join(" ") || "∅")}</s>`
        : "";
      const data = [
        `data-hex="${cell.hex}"`,
        `data-oklch="${esc(`oklch(${l} ${c} ${h})`)}"`,
        `data-was="${esc((cell.changed || cell.nouns).join(", ") || "—")}"`,
        `data-now="${esc(cell.nouns.join(", ") || "—")}"`,
        `data-expected="${esc(cell.expectedText)}"`,
        `data-words="${esc(cell.words.join(", "))}"`,
        `data-fg="${textOn(cell.hex)}"`,
      ].join(" ");
      rows += `<td class="${cls}" ${data} tabindex="0" style="background:${cell.hex};color:${textOn(cell.hex)}" title="${esc(title)}">${was}<span>${esc(cell.nouns.join(" ") || "∅")}</span><small>${esc(cell.expectedText)}</small></td>`;
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
  td { width: 104px; height: 56px; padding: 3px 5px; vertical-align: top; box-sizing: border-box; border: 2px solid transparent; }
  td span { display: block; font-weight: 600; font-size: 12px; line-height: 1.15; }
  td small { display: block; font-size: 10px; opacity: .75; }
  td s { display: block; font-size: 10px; opacity: .7; }
  td.oog { background: repeating-linear-gradient(45deg, transparent 0 6px, var(--line) 6px 7px); }
  td.f-disagree { border-color: #e0163b; }
  td.f-no-noun { border-color: #000; border-style: double; }
  td.f-changed { outline: 2px dashed #06f; outline-offset: -5px; }
  .legend { color: var(--muted); font-size: 12px; margin: 6px 0 14px; }
  .legend i { display: inline-block; width: 12px; height: 12px; border: 2px solid; vertical-align: -2px; margin-right: 3px; }
  .terms td { width: auto; height: auto; border: 0; border-bottom: 1px solid var(--line); padding: 3px 10px 3px 0; font-size: 12px; }
  .grid { display: flex; flex-wrap: wrap; gap: 0 28px; }
  td[data-hex] { cursor: zoom-in; }
  td[data-hex]:focus-visible { outline: 3px solid #06f; outline-offset: -3px; }
  #view { position: fixed; inset: 0; z-index: 10; display: none; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 24px; font-family: inherit; outline: none; }
  #view .pos { font-size: 13px; letter-spacing: .06em; text-transform: uppercase; opacity: .7; margin-bottom: 18px; }
  #view .nav { position: absolute; top: 14px; right: 14px; display: flex; gap: 8px; }
  #view .nav button, #view .side { font: inherit; font-size: 15px; width: 40px; height: 40px; border-radius: 50%; border: 2px solid currentColor; background: transparent; color: inherit; cursor: pointer; }
  #view .side { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; font-size: 20px; }
  #view .side.prev { left: 14px; } #view .side.next { right: 14px; }
  #view button:focus-visible { outline: 3px solid currentColor; outline-offset: 2px; }
  td.last { outline: 4px solid #06f; outline-offset: -4px; animation: last 1.6s ease-out 3; }
  @keyframes last { 50% { outline-color: transparent; } }
  #view.open { display: flex; }
  #view .names { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; margin-bottom: 28px; max-width: 100%; }
  #view .names > div { min-width: 0; }
  #view .names small { display: block; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; opacity: .65; margin-bottom: 6px; }
  #view .names b { font-size: clamp(28px, 6vw, 64px); font-weight: 700; line-height: 1.05; text-wrap: balance; }
  #view .names .was b { text-decoration: line-through; text-decoration-thickness: 3px; opacity: .8; }
  #view.unchanged .names .was b { text-decoration: none; }
  #view .names .arrow { font-size: clamp(24px, 4vw, 48px); opacity: .6; }
  #view .meta { font-size: 15px; opacity: .8; font-variant-numeric: tabular-nums; }
  #view .meta span { display: inline-block; margin: 0 10px; }
  #view .words { margin-top: 18px; max-width: 60ch; font-size: 14px; opacity: .75; line-height: 1.5; }
  #view .hint { position: absolute; bottom: 12px; left: 0; right: 0; font-size: 12px; opacity: .55; }
  @media (max-width: 600px) { #view .names { grid-template-columns: 1fr; } #view .names .arrow { transform: rotate(90deg); } }
  @media (prefers-reduced-motion: no-preference) { #view.open { animation: fade .15s ease-out; } }
  @keyframes fade { from { opacity: 0; } }
  section { overflow-x: auto; }
</style>
</head>
<body>
<h1>Hue naming testbench</h1>
<p>Every cell is one sRGB color sampled on an OKLCH grid. Bold text = hue nouns the library returns now. Struck-through text above it = what it returned before (only on changed cells). Small text = the most common survey answers for that color and their vote share (Kim et al. 2019). Click a cell to see it full screen with its old and new name.</p>
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
<div id="view" role="dialog" aria-modal="true" aria-label="Swatch detail" tabindex="-1">
  <div class="nav"><button type="button" id="v-close" aria-label="Close">✕</button></div>
  <button type="button" class="side prev" id="v-prev" aria-label="Previous swatch">‹</button>
  <button type="button" class="side next" id="v-next" aria-label="Next swatch">›</button>
  <div class="pos" id="v-pos"></div>
  <div class="names">
    <div class="was"><small>Before</small><b id="v-was"></b></div>
    <div class="arrow" aria-hidden="true">→</div>
    <div class="now"><small>Now</small><b id="v-now"></b></div>
  </div>
  <div class="meta"><span id="v-hex"></span><span id="v-oklch"></span><span id="v-expected"></span></div>
  <div class="words" id="v-words"></div>
  <div class="hint">Esc or ✕ closes and jumps back to the swatch in the grid. Arrow keys or ‹ › step through swatches.</div>
</div>
<script>
(function () {
  var view = document.getElementById("view");
  var cells = Array.prototype.slice.call(document.querySelectorAll("td[data-hex]"));
  var current = -1;
  function show(i) {
    var td = cells[i];
    if (!td) return;
    current = i;
    var d = td.dataset;
    view.style.background = d.hex;
    view.style.color = d.fg;
    document.getElementById("v-was").textContent = d.was;
    document.getElementById("v-now").textContent = d.now;
    document.getElementById("v-hex").textContent = d.hex;
    document.getElementById("v-oklch").textContent = d.oklch;
    document.getElementById("v-expected").textContent = "survey: " + d.expected;
    document.getElementById("v-words").textContent = d.words;
    var m = /oklch\\(([\\d.]+) ([\\d.]+) (\\d+)\\)/.exec(d.oklch);
    document.getElementById("v-pos").textContent = m ? "Panel H " + m[3] + "\u00b0 \u00b7 row L " + m[1] + " \u00b7 column C " + m[2] + " \u00b7 " + (i + 1) + " of " + cells.length : "";
    view.classList.toggle("unchanged", d.was === d.now);
    view.classList.add("open");
    view.focus({ preventScroll: true });
  }
  function close() {
    view.classList.remove("open");
    var td = cells[current];
    if (!td) return;
    cells.forEach(function (c) { c.classList.remove("last"); });
    td.classList.add("last");
    td.scrollIntoView({ block: "center", inline: "center" });
    td.focus({ preventScroll: true });
  }
  window.swatchView = { show: show, close: close, refocus: function () { view.focus({ preventScroll: true }); } };
  cells.forEach(function (td, i) {
    td.addEventListener("click", function () { show(i); });
    td.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); show(i); }
    });
  });
  document.getElementById("v-close").addEventListener("click", close);
  document.getElementById("v-prev").addEventListener("click", function () { show(Math.max(current - 1, 0)); });
  document.getElementById("v-next").addEventListener("click", function () { show(Math.min(current + 1, cells.length - 1)); });
  document.addEventListener("keydown", function (e) {
    if (!view.classList.contains("open")) return;
    var tag = e.target && e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") { if (e.key === "Escape") { e.target.blur(); view.focus(); } return; }
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show(Math.min(current + 1, cells.length - 1)); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show(Math.max(current - 1, 0)); }
  });
})();
</script>
</body>
</html>`;

writeFileSync(OUT_HTML, html);
console.log(`\nwrote ${OUT_HTML}`);
