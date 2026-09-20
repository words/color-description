import ColorDescription from "../src/index";
import { converter, formatHex, inGamut } from "culori";

// Every displayable color must get at least one noun and one adjective.
// The grid below is the one the demo's hue atlas and tools/testbench.mjs
// use: OKLCH lightness in steps of 0.05, chroma in steps of 0.03, and
// every whole degree of hue, keeping only the cells inside sRGB. Gaps in
// src/en.js showed up here first (pale lavenders above L 0.95, light
// apricots at hue 74), so the sweep is kept dense on purpose.

const toRgb = converter("rgb");
const inSrgb = inGamut("rgb");

const LIGHTS = Array.from({ length: 21 }, (_, i) => +(1 - i * 0.05).toFixed(2));
const CHROMAS = Array.from(
  { length: 10 },
  (_, i) => +(0.03 + i * 0.03).toFixed(2),
);

function sweep() {
  const cd = new ColorDescription("#000");
  const missing = [];
  let cells = 0;
  for (let h = 0; h < 360; h++) {
    for (const l of LIGHTS) {
      for (const c of CHROMAS) {
        const color = { mode: "oklch", l, c, h };
        if (!inSrgb(color)) continue;
        cells++;
        const hex = formatHex(toRgb(color));
        cd.color = hex;
        if (cd.nouns.length === 0 || cd.descriptiveWords.length === 0) {
          missing.push(`${hex} oklch(${l} ${c} ${h})`);
        }
      }
    }
  }
  return { cells, missing };
}

describe("No gaps in the OKLCH grid", () => {
  const { cells, missing } = sweep();

  test("the sweep covers the sRGB gamut", () => {
    expect(cells).toBeGreaterThan(20000);
  });

  test("every in-gamut cell gets a noun and an adjective", () => {
    expect(missing).toEqual([]);
  });

  test("the grey axis from black to white is named", () => {
    for (let i = 0; i <= 20; i++) {
      const cd = new ColorDescription(
        formatHex(toRgb({ mode: "oklch", l: i / 20, c: 0, h: 0 })),
      );
      expect(cd.nouns.length).toBeGreaterThan(0);
      expect(cd.descriptiveWords.length).toBeGreaterThan(0);
    }
  });
});
