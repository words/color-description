#!/usr/bin/env node

/**
 * Compares the library's OKLCH hue boundaries against empirical color naming
 * data from the UW "Many Languages, Many Colors" project.
 *
 * Data source:
 *   Kim, Y., Thayer, K., Gorsky, G. S., & Heer, J. (2019).
 *   "Color Names Across Languages: Salient Colors and Term Translation
 *    in Multilingual Color Naming Models." EuroVis 2019.
 *   https://github.com/uwdata/color-naming-in-different-languages
 *
 * Usage:  node tools/survey-comparison.mjs
 */

import { converter } from "culori";

const toOklch = converter("oklch");

const CSV_URL =
  "https://raw.githubusercontent.com/uwdata/color-naming-in-different-languages/master/model/color_info_by_lang/basic_colors_info_en.csv";

// Current library hue ranges (from src/en.js)
const LIB_RANGES = {
  pink: [[345, 360], [0, 7]],
  red: [[7, 40]],
  orange: [[40, 80]],
  brown: [[40, 80]], // same hue as orange, distinguished by lightness
  beige: [[70, 105]],
  yellow: [[80, 120]],
  lime: [[120, 138]],
  green: [[138, 163]],
  teal: [[163, 190]],
  cyan: [[190, 228]],
  blue: [[228, 271]],
  indigo: [[271, 285]],
  purple: [[285, 327]],
  magenta: [[327, 345]],
  // Lightness/chroma variants (overlap parent hue ranges)
  maroon: [[7, 40]],    // dark red
  navy: [[228, 285]],   // dark blue/indigo
  olive: [[80, 138]],   // dark/muted yellow-green
  lavender: [[285, 327]], // light purple
};

// Terms to track — the primary hue names used in the library plus
// high-count survey terms that inform boundary placement
const TRACKED_TERMS = new Set([
  "red", "orange", "yellow", "green", "blue", "purple", "pink",
  "brown", "magenta", "cyan", "teal", "turquoise", "lime",
  "indigo", "violet", "beige", "aqua", "navy", "maroon",
  "olive", "coral", "salmon", "lavender", "mint", "peach",
  "gold", "burgundy", "mauve", "fuchsia", "periwinkle",
]);

async function main() {
  // Fetch the CSV
  console.log(`Fetching survey data from:\n  ${CSV_URL}\n`);
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const csv = await res.text();

  // Parse (handles quoted RGB values with commas inside)
  const rows = csv.trim().split("\n").slice(1).map((line) => {
    const parts = [];
    let inQuote = false,
      cur = "";
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === "," && !inQuote) { parts.push(cur); cur = ""; continue; }
      cur += ch;
    }
    parts.push(cur);
    return {
      name: parts[2],
      fullCount: +parts[6],
      fullRGB: parts[7],
    };
  });

  // Convert to OKLCH, filter to tracked terms with enough data
  const terms = [];
  for (const row of rows) {
    if (row.fullCount < 50 || !row.fullRGB) continue;
    if (!TRACKED_TERMS.has(row.name)) continue;
    const m = row.fullRGB.match(/rgb\((\d+),(\d+),(\d+)\)/);
    if (!m) continue;
    const [, r, g, b] = m.map(Number);
    const ok = toOklch({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 });
    terms.push({
      name: row.name,
      count: row.fullCount,
      h: ok.h != null ? +ok.h.toFixed(1) : null,
      l: +(ok.l * 100).toFixed(1),
      c: +ok.c.toFixed(3),
    });
  }

  terms.sort((a, b) => (a.h ?? -1) - (b.h ?? -1));

  // Find which library range each term's centroid falls in
  function libRangeFor(h) {
    if (h == null) return "—";
    for (const [name, ranges] of Object.entries(LIB_RANGES)) {
      for (const [lo, hi] of ranges) {
        if (h >= lo && h <= hi) return name;
      }
    }
    return "—";
  }

  // ── Table 1: Library hue ranges ──
  console.log("┌─────────────────────────────────────────────┐");
  console.log("│       Library OKLCH Hue Ranges (en.js)      │");
  console.log("├──────────┬──────────────────────────────────┤");
  console.log("│ Name     │ OKLCH H°                         │");
  console.log("├──────────┼──────────────────────────────────┤");
  for (const [name, ranges] of Object.entries(LIB_RANGES)) {
    const rangeStr = ranges.map(([lo, hi]) => `${lo}–${hi}`).join(", ");
    console.log(`│ ${name.padEnd(8)} │ ${rangeStr.padEnd(32)} │`);
  }
  console.log("└──────────┴──────────────────────────────────┘");

  // ── Table 2: Survey terms ──
  console.log("");
  console.log("┌───────────────────────────────────────────────────────────────────────────────┐");
  console.log("│              Survey Centroids — English (≥50 responses)                       │");
  console.log("├────────────────┬───────────┬──────────┬─────────┬─────────┬───────────────────┤");
  console.log("│ Term           │ Responses │ OKLCH H° │ OKLCH L │ OKLCH C │ Lib maps to       │");
  console.log("├────────────────┼───────────┼──────────┼─────────┼─────────┼───────────────────┤");
  for (const t of terms) {
    const hStr = t.h != null ? t.h.toFixed(1) : "none";
    const lib = libRangeFor(t.h);
    const match = lib === t.name ? "✓ " + lib : lib;
    console.log(
      `│ ${t.name.padEnd(14)} │ ${String(t.count).padStart(9)} │ ${hStr.padStart(8)} │ ${String(t.l).padStart(7)} │ ${String(t.c).padStart(7)} │ ${match.padEnd(17)} │`,
    );
  }
  console.log("└────────────────┴───────────┴──────────┴─────────┴─────────┴───────────────────┘");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
