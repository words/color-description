import ColorDescription from "../src/index";
import { rgb2temperature, rgbToCMYK, isInRange } from "../src/utils";

const HUE_NOUNS = new Set([
  "red",
  "maroon",
  "orange",
  "brown",
  "yellow",
  "olive",
  "lime",
  "green",
  "teal",
  "cyan",
  "sky blue",
  "blue",
  "navy",
  "indigo",
  "purple",
  "lavender",
  "magenta",
  "pink",
]);

describe("Systematic hue sweep", () => {
  // Every 5° across the full hue wheel, at multiple S/L combos,
  // the library must return descriptive words, nouns, and descriptions.
  const saturations = [0.2, 0.5, 0.8, 1.0];
  const lightnesses = [0.15, 0.3, 0.5, 0.7, 0.85];

  test.each(saturations.flatMap((s) => lightnesses.map((l) => [s, l])))(
    "every 5° hue has a hue noun at s=%f l=%f",
    (s, l) => {
      const missing = [];
      for (let h = 0; h < 360; h += 5) {
        const cd = new ColorDescription(`hsl(${h} ${s * 100}% ${l * 100}%)`);
        const hasHueNoun = cd.nouns.some((n) => HUE_NOUNS.has(n));
        if (!hasHueNoun) {
          missing.push(h);
        }
      }
      expect(missing).toEqual([]);
    },
  );

  test.each(saturations.flatMap((s) => lightnesses.map((l) => [s, l])))(
    "every 5° hue returns descriptive words at s=%f l=%f",
    (s, l) => {
      const missing = [];
      for (let h = 0; h < 360; h += 5) {
        const cd = new ColorDescription(`hsl(${h} ${s * 100}% ${l * 100}%)`);
        if (cd.descriptiveWords.length === 0) {
          missing.push(h);
        }
      }
      expect(missing).toEqual([]);
    },
  );

  test.each(saturations.flatMap((s) => lightnesses.map((l) => [s, l])))(
    "every 5° hue returns a description at s=%f l=%f",
    (s, l) => {
      const missing = [];
      for (let h = 0; h < 360; h += 5) {
        const cd = new ColorDescription(`hsl(${h} ${s * 100}% ${l * 100}%)`);
        if (cd.description.length === 0) {
          missing.push(h);
        }
      }
      expect(missing).toEqual([]);
    },
  );
});

describe("Saturation and lightness boundaries", () => {
  const boundaryS = [0, 0.01, 0.1, 0.5, 0.99, 1.0];
  const boundaryL = [0, 0.01, 0.07, 0.5, 0.93, 0.99, 1.0];

  test.each(boundaryS.flatMap((s) => boundaryL.map((l) => [s, l])))(
    "s=%f l=%f produces valid output without errors",
    (s, l) => {
      const cd = new ColorDescription(`hsl(180 ${s * 100}% ${l * 100}%)`);
      // Should never throw — always returns arrays
      expect(Array.isArray(cd.descriptiveWords)).toBe(true);
      expect(Array.isArray(cd.nouns)).toBe(true);
      expect(Array.isArray(cd.meanings)).toBe(true);
      expect(Array.isArray(cd.usage)).toBe(true);
      expect(Array.isArray(cd.description)).toBe(true);
    },
  );

  test("pure black (l=0) gets descriptive words", () => {
    const cd = new ColorDescription("hsl(0 0% 0%)");
    expect(cd.descriptiveWords.length).toBeGreaterThan(0);
  });

  test("pure white (l=100) gets descriptive words", () => {
    const cd = new ColorDescription("hsl(0 0% 100%)");
    expect(cd.descriptiveWords.length).toBeGreaterThan(0);
  });

  test("fully desaturated mid-grey gets descriptive words", () => {
    const cd = new ColorDescription("hsl(0 0% 50%)");
    expect(cd.descriptiveWords.length).toBeGreaterThan(0);
  });

  test("high-saturation near-white colors are not labeled neutral or muted", () => {
    const cd = new ColorDescription("hsl(0 100% 95%)");
    expect(cd.descriptiveWords).not.toContain("neutral");
    expect(cd.descriptiveWords).not.toContain("muted");
    expect(cd.descriptiveWords).toContain("luminous");
  });

  test("near-white low-saturation colors can still be labeled neutral", () => {
    const cd = new ColorDescription("hsl(0 5% 95%)");
    expect(cd.descriptiveWords).toContain("neutral");
  });
});

describe("Achromatic colors", () => {
  const greys = [
    "#000000",
    "#111111",
    "#333333",
    "#555555",
    "#777777",
    "#999999",
    "#bbbbbb",
    "#dddddd",
    "#eeeeee",
    "#ffffff",
  ];

  test.each(greys)("%s returns descriptive words", (hex) => {
    const cd = new ColorDescription(hex);
    expect(cd.descriptiveWords.length).toBeGreaterThan(0);
  });

  test.each(greys)("%s returns a valid bestContrast", (hex) => {
    const cd = new ColorDescription(hex);
    expect(cd.bestContrast).toMatch(/^(black|white)$/);
  });

  test("achromatic colors should not return chromatic hue nouns", () => {
    const cd = new ColorDescription("#808080");
    const nouns = cd.nouns;
    // Grey shouldn't claim to be "red" or "blue" etc.
    const chromaticMatch = nouns.filter((n) => HUE_NOUNS.has(n));
    expect(chromaticMatch).toEqual([]);
  });
});

describe("Temperature (rgb2temperature)", () => {
  test("returns values in [1000, 40000] for primary colors", () => {
    const colors = [
      { r: 1, g: 0, b: 0 },
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
      { r: 1, g: 1, b: 1 },
      { r: 1, g: 1, b: 0 },
      { r: 0, g: 1, b: 1 },
      { r: 1, g: 0, b: 1 },
    ];
    for (const rgb of colors) {
      const temp = rgb2temperature(rgb);
      expect(temp).toBeGreaterThanOrEqual(1000);
      expect(temp).toBeLessThanOrEqual(40000);
    }
  });

  test("red is warmer than blue", () => {
    const redTemp = rgb2temperature({ r: 1, g: 0, b: 0 });
    const blueTemp = rgb2temperature({ r: 0, g: 0, b: 1 });
    expect(redTemp).toBeLessThan(blueTemp);
  });

  test("temperature sweep: every hue maps to a valid range", () => {
    for (let h = 0; h < 360; h += 10) {
      const cd = new ColorDescription(`hsl(${h} 100% 50%)`);
      const temp = cd.temperatureWords;
      expect(temp).toHaveProperty("value");
      expect(temp).toHaveProperty("descriptive");
      expect(temp.descriptive.length).toBeGreaterThan(0);
    }
  });
});

describe("CMYK conversion (rgbToCMYK)", () => {
  test("components are in [0, 1]", () => {
    const testColors = [
      { r: 1, g: 0, b: 0 },
      { r: 0, g: 1, b: 0 },
      { r: 0, g: 0, b: 1 },
      { r: 1, g: 1, b: 1 },
      { r: 0, g: 0, b: 0 },
      { r: 0.5, g: 0.3, b: 0.8 },
    ];
    for (const rgb of testColors) {
      const cmyk = rgbToCMYK(rgb);
      expect(cmyk.c).toBeGreaterThanOrEqual(0);
      expect(cmyk.c).toBeLessThanOrEqual(1);
      expect(cmyk.m).toBeGreaterThanOrEqual(0);
      expect(cmyk.m).toBeLessThanOrEqual(1);
      expect(cmyk.y).toBeGreaterThanOrEqual(0);
      expect(cmyk.y).toBeLessThanOrEqual(1);
      expect(cmyk.k).toBeGreaterThanOrEqual(0);
      expect(cmyk.k).toBeLessThanOrEqual(1);
    }
  });

  test("pure white has k=0", () => {
    const cmyk = rgbToCMYK({ r: 1, g: 1, b: 1 });
    expect(cmyk.k).toBe(0);
    expect(cmyk.c).toBe(0);
    expect(cmyk.m).toBe(0);
    expect(cmyk.y).toBe(0);
  });

  test("pure black has k=1", () => {
    const cmyk = rgbToCMYK({ r: 0, g: 0, b: 0 });
    expect(cmyk.k).toBe(1);
  });

  test("pure red", () => {
    const cmyk = rgbToCMYK({ r: 1, g: 0, b: 0 });
    expect(cmyk.c).toBeCloseTo(0);
    expect(cmyk.m).toBeCloseTo(1);
    expect(cmyk.y).toBeCloseTo(1);
    expect(cmyk.k).toBeCloseTo(0);
  });

  test("pure cyan", () => {
    const cmyk = rgbToCMYK({ r: 0, g: 1, b: 1 });
    expect(cmyk.c).toBeCloseTo(1);
    expect(cmyk.m).toBeCloseTo(0);
    expect(cmyk.y).toBeCloseTo(0);
    expect(cmyk.k).toBeCloseTo(0);
  });
});

describe("Best contrast sweep", () => {
  test("dark colors get white contrast", () => {
    const darkColors = ["#000000", "#1a1a1a", "#333333", "#0a0a2e"];
    for (const hex of darkColors) {
      const cd = new ColorDescription(hex);
      expect(cd.bestContrast).toBe("white");
    }
  });

  test("light colors get black contrast", () => {
    const lightColors = ["#ffffff", "#f0f0f0", "#ffffe0", "#e0ffff"];
    for (const hex of lightColors) {
      const cd = new ColorDescription(hex);
      expect(cd.bestContrast).toBe("black");
    }
  });

  test("contrast is always black or white for every 30° hue", () => {
    for (let h = 0; h < 360; h += 30) {
      const cd = new ColorDescription(`hsl(${h} 100% 50%)`);
      expect(cd.bestContrast).toMatch(/^(black|white)$/);
    }
  });
});

describe("Invalid inputs", () => {
  test("throws TypeError for nonsense strings", () => {
    expect(() => new ColorDescription("banana")).toThrow(TypeError);
    expect(() => new ColorDescription("not a color")).toThrow(TypeError);
    expect(() => new ColorDescription("")).toThrow(TypeError);
  });

  test("throws TypeError when setting invalid color", () => {
    const cd = new ColorDescription("#ff0000");
    expect(() => {
      cd.color = "garbage";
    }).toThrow(TypeError);
  });

  test("throws TypeError for invalid percentage model", () => {
    const cd = new ColorDescription("#ff0000");
    expect(() => cd.percentages("xyz")).toThrow(TypeError);
  });
});

describe("isInRange utility", () => {
  test("inclusive on both ends", () => {
    expect(isInRange(0, 0, 1)).toBe(true);
    expect(isInRange(1, 0, 1)).toBe(true);
  });

  test("rejects values outside", () => {
    expect(isInRange(-0.01, 0, 1)).toBe(false);
    expect(isInRange(1.01, 0, 1)).toBe(false);
  });
});

describe("Multiple color formats accepted", () => {
  const sameRed = ["#ff0000", "rgb(255, 0, 0)", "hsl(0, 100%, 50%)", "red"];

  test("all formats for red produce the same nouns", () => {
    const nounSets = sameRed.map((c) =>
      new ColorDescription(c).nouns.sort().join(","),
    );
    // All should be identical
    for (const ns of nounSets) {
      expect(ns).toBe(nounSets[0]);
    }
  });

  test("all formats for red produce the same bestContrast", () => {
    const contrasts = sameRed.map((c) => new ColorDescription(c).bestContrast);
    for (const c of contrasts) {
      expect(c).toBe(contrasts[0]);
    }
  });
});
