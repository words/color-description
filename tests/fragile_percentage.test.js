import ColorDescription from "../src/index";

describe("Fragile Percentage Logic", () => {
  test("should handle unsorted percentWords correctly", () => {
    const unsortedWords = {
      descriptions: [],
      temperatures: [],
      percentWords: [
        { maxPercentile: 1.0, word: "full" },
        { maxPercentile: 0.1, word: "low" },
        { maxPercentile: 0.5, word: "medium" },
      ],
    };

    const cd = new ColorDescription("#ff0000", unsortedWords);

    // Verify internal sorting
    expect(cd.percentWords[0].maxPercentile).toBe(0.1);
    expect(cd.percentWords[1].maxPercentile).toBe(0.5);
    expect(cd.percentWords[2].maxPercentile).toBe(1.0);

    // Verify logic
    // #ff0000 -> R=1, G=0, B=0
    // 1.0 matches "full" (>= 1.0 is true for 1.0? No, find is >= component.
    // 0.1 >= 1.0 False
    // 0.5 >= 1.0 False
    // 1.0 >= 1.0 True. -> "full"

    // 0.0 matches "low"
    // 0.1 >= 0.0 True. -> "low"

    const words = cd.percentageWords("rgb");
    expect(words).toEqual(["full", "low", "low"]);
  });
});
