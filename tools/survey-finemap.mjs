#!/usr/bin/env node

/**
 * Builds tools/survey-labels.json: for every cell of the testbench grid
 * (hue 5°, OKLCH L 0.15–0.95 in 0.05 steps, C 0.03–0.27 in 0.03 steps,
 * sRGB only), the most common English color names among the 60 nearest
 * survey responses in OKLab, with their vote share.
 *
 * Input: <dir>/survey/rows.json written by tools/survey-fit.mjs.
 * Usage: node tools/survey-finemap.mjs <dir> [--extents]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { inGamut } from "culori";
const S = process.argv[2];
const rows = JSON.parse(readFileSync(`${S}/survey/rows.json`));
const inSrgb = inGamut("rgb");
// bucket index on (l, a, b) with 0.05 cells
const B = 0.05,
  idx = new Map();
const key = (l, a, b) =>
  `${Math.floor(l / B)},${Math.floor((a + 0.5) / B)},${Math.floor((b + 0.5) / B)}`;
rows.forEach((r, i) => {
  const k = key(r[1], r[2], r[3]);
  if (!idx.has(k)) idx.set(k, []);
  idx.get(k).push(i);
});
const K = 60;
function knn(l, a, b) {
  const li = Math.floor(l / B),
    ai = Math.floor((a + 0.5) / B),
    bi = Math.floor((b + 0.5) / B);
  let best = [];
  for (let ring = 0; ring <= 3; ring++) {
    const cand = [];
    for (let x = li - ring; x <= li + ring; x++)
      for (let y = ai - ring; y <= ai + ring; y++)
        for (let z = bi - ring; z <= bi + ring; z++) {
          if (
            Math.max(Math.abs(x - li), Math.abs(y - ai), Math.abs(z - bi)) !==
            ring
          )
            continue;
          const arr = idx.get(`${x},${y},${z}`);
          if (arr)
            for (const i of arr) {
              const r = rows[i];
              cand.push([
                (r[1] - l) ** 2 + (r[2] - a) ** 2 + (r[3] - b) ** 2,
                r[0],
              ]);
            }
        }
    best = best
      .concat(cand)
      .sort((p, q) => p[0] - q[0])
      .slice(0, K);
    if (best.length === K && best[K - 1][0] <= (ring * B) ** 2) break;
  }
  const votes = {};
  for (const [, t] of best) votes[t] = (votes[t] || 0) + 1;
  return Object.entries(votes)
    .sort((x, y) => y[1] - x[1])
    .slice(0, 3)
    .map(([t, n]) => [t, +(n / best.length).toFixed(2)]);
}
const map = [];
for (let h = 0; h < 360; h += 5)
  for (let l = 0.15; l <= 0.96; l += 0.05)
    for (let c = 0.03; c <= 0.28; c += 0.03) {
      const L = +l.toFixed(2),
        C = +c.toFixed(2);
      if (!inSrgb({ mode: "oklch", l: L, c: C, h })) continue;
      const rad = (h * Math.PI) / 180;
      map.push({
        h,
        l: L,
        c: C,
        top: knn(L, C * Math.cos(rad), C * Math.sin(rad)),
      });
    }
const labels = {};
for (const m of map)
  labels[`${m.h}/${m.l.toFixed(2)}/${m.c.toFixed(2)}`] = m.top;
writeFileSync(
  new URL("./survey-labels.json", import.meta.url),
  JSON.stringify(labels),
);
if (!process.argv.includes("--extents")) process.exit(0);
console.log("cells", map.length);
// per-term winning region boxes
const q = (arr, p) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(p * s.length))];
};
const win = {};
for (const m of map) {
  const [t, s] = m.top[0];
  (win[t] ??= []).push(m);
  if (m.top[1] && m.top[1][1] >= 0.25) (win[m.top[1][0]] ??= []).push(m);
}
console.log(
  "\nterm         wins   L05  L50  L95   C05  C50  C95   hue range (5–95 around circular mean)",
);
for (const [t, ms] of Object.entries(win).sort(
  (a, b) => b[1].length - a[1].length,
)) {
  if (ms.length < 8) continue;
  let x = 0,
    y = 0;
  for (const m of ms) {
    x += Math.cos((m.h * Math.PI) / 180);
    y += Math.sin((m.h * Math.PI) / 180);
  }
  const hm = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const rel = ms.map((m) => {
    let d = m.h - hm;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  });
  console.log(
    `${t.padEnd(12)}${String(ms.length).padStart(5)}   ${[0.95]
      .map((p) =>
        q(
          ms.map((m) => m.l),
          p,
        ).toFixed(2),
      )
      .join(" ")}   ${[0.95]
      .map((p) =>
        q(
          ms.map((m) => m.c),
          p,
        ).toFixed(2),
      )
      .join(
        " ",
      )}   ${((hm + q(rel, 0.05) + 360) % 360).toFixed(0).padStart(4)}–${((hm + q(rel, 0.95) + 360) % 360).toFixed(0)} (mean ${hm.toFixed(0)})`,
  );
}

// per term, per hue: L and C extent of the cells it wins (top-1)
console.log("\n=== winning extents per term per hue (top-1) ===");
const top1 = {};
for (const m of map) (top1[m.top[0][0]] ??= []).push(m);
for (const [t, ms] of Object.entries(top1).sort(
  (a, b) => b[1].length - a[1].length,
)) {
  if (ms.length < 8) continue;
  const byH = {};
  for (const m of ms) (byH[m.h] ??= []).push(m);
  const parts = Object.entries(byH)
    .sort((a, b) => a[0] - b[0])
    .map(([h, list]) => {
      const Ls = list.map((m) => m.l),
        Cs = list.map((m) => m.c);
      return `${h}:L${Math.min(...Ls).toFixed(2)}-${Math.max(...Ls).toFixed(2)}/C${Math.min(...Cs).toFixed(2)}-${Math.max(...Cs).toFixed(2)}(${list.length})`;
    });
  console.log(`\n${t} (${ms.length} cells)\n  ` + parts.join("  "));
}
