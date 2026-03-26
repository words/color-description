export interface ColorDescriptionEntry {
  criteria: {
    oklch: {
      h: [number, number] | null;
      c: [number, number] | null;
      l: [number, number] | null;
    };
  };
  descriptive?: string[];
  nouns?: string[];
  description?: string[];
  meanings?: string[];
  effects?: string[];
  usage?: string[];
}

export interface TemperatureEntry {
  value: number;
  descriptive: string[];
}

export interface PercentWordEntry {
  maxPercentile: number;
  word: string;
}

export interface WordDictionary {
  descriptions: ColorDescriptionEntry[];
  temperatures: TemperatureEntry[];
  percentWords?: PercentWordEntry[];
}

declare class ColorDescription {
  constructor(color: string, words?: WordDictionary);

  /** Set or get the current color (any culori-compatible color string) */
  color: string;

  /** Parsed color formats keyed by model name */
  formats: Record<string, Record<string, number>>;

  /** Closest color temperature bucket */
  readonly temperatureWords: TemperatureEntry;

  /** Color component ratios as percentages (0-1) */
  percentages(model?: "rgb" | "cmyk"): number[];

  /** Descriptive words for each color component's percentage */
  percentageWords(model?: "rgb" | "cmyk"): string[];

  /** Adjectives describing the color's appearance */
  readonly descriptiveWords: string[];

  /** Nouns associated with the color */
  readonly nouns: string[];

  /** Symbolic meanings of the color */
  readonly meanings: string[];

  /** Psychological/emotional effects of the color */
  readonly effects: string[];

  /** Suggested usage contexts for the color */
  readonly usage: string[];

  /** Short descriptions of the color */
  readonly description: string[];

  /** Best contrasting color for text: "black" or "white" */
  readonly bestContrast: "black" | "white";

  /**
   * Returns a formatted string of descriptive words joined with commas and "and"
   * @param random - if true, randomizes the order
   * @param limit - maximum number of words to include
   */
  getDescriptiveList(random?: boolean, limit?: number): string;
}

export default ColorDescription;
