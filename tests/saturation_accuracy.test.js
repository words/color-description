import ColorDescription from "../src/index";

// Regression tests for the chroma/relative-saturation accuracy bugs:
// vivid light colors were mislabeled "pale/faded/bleached", and colors with
// very different chroma (clear teal vs dull brown) collapsed to the same
// muted word set. Relative saturation is okhsl s (chroma relative to the
// sRGB gamut at that lightness and hue), exposed as formats.okhsl.s.

const PALE_WORDS = ["pale", "faded"];

describe("Saturation accuracy", () => {
  test("vivid light yellow (#ffe737) is NOT pale/faded/bleached", () => {
    const words = new ColorDescription("#ffe737").descriptiveWords;
    expect(words).not.toEqual(expect.arrayContaining(PALE_WORDS));
    for (const w of PALE_WORDS) {
      expect(words).not.toContain(w);
    }
  });

  test("vivid light yellow still gets non-pale descriptive words", () => {
    const words = new ColorDescription("#ffe737").descriptiveWords;
    // Instead of the pale family it now reads as high-chroma/bright
    // (e.g. "neon", "luminous"). It must still produce useful words.
    expect(words.length).toBeGreaterThan(0);
    expect(words.some((w) => ["neon", "luminous", "bright"].includes(w))).toBe(
      true,
    );
  });

  test("genuinely pale (#f3f4d9) DOES get pale-family words", () => {
    const words = new ColorDescription("#f3f4d9").descriptiveWords;
    expect(words.some((w) => PALE_WORDS.includes(w))).toBe(true);
  });

  test("teal (#007590) and brown (#8c724f) are no longer identical", () => {
    const teal = new ColorDescription("#007590").descriptiveWords;
    const brown = new ColorDescription("#8c724f").descriptiveWords;
    expect(teal.slice().sort()).not.toEqual(brown.slice().sort());
  });

  test("clear teal (#007590) is not labeled muted/dusty/gloomy", () => {
    const words = new ColorDescription("#007590").descriptiveWords;
    expect(words).not.toContain("muted");
    expect(words).not.toContain("dusty");
    expect(words).not.toContain("gloomy");
    expect(words).not.toContain("bleak");
  });

  test("dull brown (#8c724f) is still muted", () => {
    const words = new ColorDescription("#8c724f").descriptiveWords;
    expect(words).toContain("muted");
  });

  test("pure red (#ff0000) stays saturated/vivid", () => {
    const words = new ColorDescription("#ff0000").descriptiveWords;
    expect(words.some((w) => ["saturated", "vivid"].includes(w))).toBe(true);
  });

  test("contradictory saturation adjectives never co-occur", () => {
    const groups = [
      ["pale", "faded"],
      ["muted", "matte", "dusty"],
      ["saturated", "vivid", "vibrant", "bold"],
    ];
    // Sweep a wide range of colors.
    for (let h = 0; h < 360; h += 30) {
      for (const l of [0.3, 0.5, 0.7, 0.85]) {
        for (const s of [0.1, 0.4, 0.7, 1.0]) {
          const words = new ColorDescription(
            `hsl(${h} ${s * 100}% ${l * 100}%)`,
          ).descriptiveWords;
          const hits = groups.filter((g) => g.some((w) => words.includes(w)));
          expect(hits.length).toBeLessThanOrEqual(1);
        }
      }
    }
  });

  test("rising saturation moves words muted -> vivid (no vivid color is pale)", () => {
    // Fixed hue + lightness, sweep HSL saturation upward.
    const h = 60;
    const l = 80;
    let sawVivid = false;
    for (let s = 5; s <= 100; s += 5) {
      const cd = new ColorDescription(`hsl(${h} ${s}% ${l}%)`);
      const words = cd.descriptiveWords;
      const relC = cd.formats.okhsl.s;

      // A vivid (high relative chroma) color must never be pale/faded/bleached.
      if (relC >= 0.6) {
        sawVivid = true;
        for (const w of PALE_WORDS) {
          expect(words).not.toContain(w);
        }
      }

      // A clearly muted (low relative chroma) color must never be saturated/vivid.
      if (relC < 0.35) {
        expect(words).not.toContain("saturated");
        expect(words).not.toContain("vivid");
      }
    }
    expect(sawVivid).toBe(true);
  });
});
