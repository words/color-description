import ColorDescription from "../src/index";

const HUE_NOUNS = new Set([
  "red",
  "orange",
  "brown",
  "yellow",
  "lime",
  "green",
  "cyan",
  "sky blue",
  "blue",
  "indigo",
  "violet",
  "purple",
  "magenta",
  "pink",
]);

test("parses color corectly", () => {
  const cd = new ColorDescription("red");

  expect(cd).toHaveProperty("formats");
  expect(cd.formats.rgb.r).toBe(1);
  expect(cd.formats.rgb.g).toBe(0);
  expect(cd.formats.rgb.b).toBe(0);
});

test("get adjectives for color temperature", () => {
  const cd = new ColorDescription("red");

  expect(cd).toHaveProperty("temperatureWords");
  expect(cd.temperatureWords.descriptive[0]).toBe("ultra warm");
});

test("gets fancy HSL Descriptions", () => {
  const cd = new ColorDescription("white");

  expect(cd).toHaveProperty("descriptiveWords");
  expect(cd.descriptiveWords.length).toBeGreaterThan(0);
});

test("gets a maximum of 2 Descriptions", () => {
  const cd = new ColorDescription("white");

  expect(cd).toHaveProperty("getDescriptiveList");
  expect(cd.getDescriptiveList(false, 2).length).toBeGreaterThan(0);
  expect(cd.getDescriptiveList(false, 2).split(" and ").length).toBe(2);
});

test("getting RGB in percentage of the whole color", () => {
  const cd = new ColorDescription("#ffffff");

  expect(cd).toHaveProperty("percentages");
  expect(cd.percentages()[0]).toBeGreaterThan(0.3);
  expect(cd.percentages()[1]).toBeGreaterThan(0.3);
  expect(cd.percentages()[2]).toBeGreaterThan(0.3);

  cd.color = "#ff0000";
  expect(cd.percentages()[0]).toBe(1);
});

test("get general color adjectives", () => {
  const cd = new ColorDescription("#ffffff");

  expect(cd).toHaveProperty("percentages");
  expect(cd.percentages()[0]).toBeGreaterThan(0.3);
  expect(cd.percentages()[1]).toBeGreaterThan(0.3);
  expect(cd.percentages()[2]).toBeGreaterThan(0.3);

  cd.color = "#ff0000";
  expect(cd.percentages()[0]).toBe(1);
});

test("get best contrast color, using WCAG formula", () => {
  // test data from https://webaim.org/resources/contrastchecker/
  const cd = new ColorDescription("#0000ff");

  expect(cd).toHaveProperty("bestContrast");
  expect(cd.bestContrast).toBe("white");
});

test("no hue naming deadzones across typical chromatic s/l", () => {
  // Hue nouns in the dataset are defined for s in [0.1, 1] and l in [0.07, 0.99].
  // We sample a small grid well inside those bounds to detect gaps.
  const saturations = [0.2, 0.5, 0.9];
  const lightnesses = [0.15, 0.5, 0.85];

  const uncovered = [];

  for (let h = 0; h < 360; h += 1) {
    for (const s of saturations) {
      for (const l of lightnesses) {
        const cd = new ColorDescription(`hsl(${h} ${s * 100}% ${l * 100}%)`);
        const nouns = cd.nouns;
        const hasHueNoun = nouns.some((n) => HUE_NOUNS.has(n));

        if (!hasHueNoun) {
          uncovered.push({ h, s, l, nouns });
        }
      }
    }
  }

  expect(uncovered).toEqual([]);
});
