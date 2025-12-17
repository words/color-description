import ColorDescription from "../src/index";
import wordsEN from "../src/en";

describe("ColorDescription Library", () => {
  let colorDesc;

  beforeEach(() => {
    colorDesc = new ColorDescription("#FF5733");
  });

  /*
  test("Constructor and color parsing", () => {
    expect(colorDesc.color).toBeInstanceOf(chroma);
    expect(colorDesc.color.hex()).toBe("#ff5733");

    expect(() => new ColorDescription("not a color")).toThrow(TypeError);
  });*/

  test("Color setter", () => {
    colorDesc.color = "#00FF00";
    expect(colorDesc.formats.rgb.r).toBe(0);
    expect(colorDesc.formats.rgb.g).toBe(1);
    expect(colorDesc.formats.rgb.b).toBe(0);

    expect(() => {
      colorDesc.color = "invalid color";
    }).toThrow(TypeError);
  });

  test("Temperature words", () => {
    const tempWords = colorDesc.temperatureWords;
    expect(tempWords).toHaveProperty("value");
    expect(tempWords).toHaveProperty("descriptive");
    expect(Array.isArray(tempWords.descriptive)).toBe(true);
  });

  test("Percentages", () => {
    const percentages = colorDesc.percentages();
    expect(Array.isArray(percentages)).toBe(true);
    expect(percentages).toHaveLength(3);
    percentages.forEach((percent) => {
      expect(percent).toBeGreaterThanOrEqual(0);
      expect(percent).toBeLessThanOrEqual(1);
    });
  });

  test("Percentage words", () => {
    const percentWords = colorDesc.percentageWords();
    expect(Array.isArray(percentWords)).toBe(true);
    expect(percentWords).toHaveLength(3);
    percentWords.forEach((word) => {
      expect(typeof word).toBe("string");
    });
  });

  test("Descriptive words", () => {
    const descriptiveWords = colorDesc.descriptiveWords;
    expect(Array.isArray(descriptiveWords)).toBe(true);
    descriptiveWords.forEach((word) => {
      expect(typeof word).toBe("string");
    });
  });

  test("Nouns", () => {
    const nouns = colorDesc.nouns;
    expect(Array.isArray(nouns)).toBe(true);
    nouns.forEach((noun) => {
      expect(typeof noun).toBe("string");
    });
  });

  test("Meanings", () => {
    const meanings = colorDesc.meanings;
    expect(Array.isArray(meanings)).toBe(true);
    meanings.forEach((meaning) => {
      expect(typeof meaning).toBe("string");
    });
  });

  test("Usage", () => {
    const usage = colorDesc.usage;
    expect(Array.isArray(usage)).toBe(true);
    usage.forEach((use) => {
      expect(typeof use).toBe("string");
    });
  });

  test("Description", () => {
    const description = colorDesc.description;
    expect(Array.isArray(description)).toBe(true);
    expect(description.length).toBeGreaterThanOrEqual(1);
    description.forEach((desc) => {
      expect(typeof desc).toBe("string");
    });
  });

  test("Best contrast", () => {
    const contrast = colorDesc.bestContrast;
    expect(contrast).toMatch(/^(black|white)$/);
  });

  test("Get descriptive list", () => {
    const list = colorDesc.getDescriptiveList(false, 3);
    expect(typeof list).toBe("string");
    expect(list.split(",").length).toBeLessThanOrEqual(3);
  });

  test("Get descriptive list with randomization", () => {
    const list1 = colorDesc.getDescriptiveList(true, 5);
    const list2 = colorDesc.getDescriptiveList(true, 5);
    expect(list1).not.toBe(list2); // This might occasionally fail due to randomness
  });

  test("English dataset contains only non-empty strings", () => {
    const listScopes = [
      "descriptive",
      "nouns",
      "meanings",
      "usage",
      "description",
    ];

    wordsEN.descriptions.forEach((entry) => {
      listScopes.forEach((scope) => {
        if (!Object.prototype.hasOwnProperty.call(entry, scope)) return;

        expect(Array.isArray(entry[scope])).toBe(true);
        entry[scope].forEach((item) => {
          expect(typeof item).toBe("string");
          expect(item.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});
