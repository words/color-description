import chroma from "chroma-js";
import wordsEN from "./en";

const isInRange = (x, min, max) => x >= min && x <= max;
const randomizeArr = (arr) => {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

class ColorDescription {
  constructor(color, words = wordsEN) {
    this.color = color;
    this.descriptions = words.descriptions;
    this.temperatures = words.temperatures;
    this.percentWords = words.percentWords;
  }

  set color(color) {
    this.currentColor = this.#parseColor(color);
  }

  get color() {
    return this.currentColor;
  }

  /**
   * @param {string} color chroma.js compatible color string
   * @returns {object} chroma.js instance
   * @throws {TypeError} if the color is not valid
   */
  #parseColor(color) {
    if (chroma.valid(color)) {
      return chroma(color);
    } else {
      throw new TypeError("Invalid color. Check the chroma.js documentation.");
    }
  }

  /**
   * @returns {Array} descriptive words describing the color temperature
   */
  get temperatureWords() {
    const goal = this.color.temperature();
    return this.temperatures.reduce(
      (prev, curr) =>
        Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev,
      { value: 0 }
    );
  }

  /**
   * @param {string} model color model in which the components are measured
   * @returns {Array} color component mix in percent
   */
  percentages(model = "gl") {
    const props = this.color[model]();
    if (model === "gl") {
      props.pop(); // removes alpha
    }
    const total = props.reduce((r, d) => r + d, 0);
    return props.map((c) => (total ? c / total : 0));
  }

  /**
   * @param {string} model color model in which the components are measured
   * @returns {Array} descriptive words for color percentages
   */
  percentageWords(model = "gl") {
    return this.percentages(model).map(
      (component) =>
        this.percentWords.find((words) => words.maxPercentile >= component).word
    );
  }

  /**
   * @param {string} scope the scope of words to retrieve
   * @param {boolean} randomize whether to randomize the words
   * @param {number} wordLimit the maximum number of words to retrieve
   * @returns {Array} words matching the criteria
   */
  #getWords(scope = "descriptive", randomize = false, wordLimit) {
    const words = this.descriptions.reduce((rem, current) => {
      if (!current.hasOwnProperty(scope)) {
        return rem;
      }

      const colorModels = Object.keys(current.criteria);

      const matchesEveryCriteria = colorModels.every((colorModel) => {
        const colorAsModel = this.color[colorModel]();
        if (["hsl", "gl", "rgb"].includes(colorModel)) {
          colorAsModel.pop(); // ignore alpha
        }
        return current.criteria[colorModel].every((criterium, i) => {
          if (criterium === null) {
            return true;
          } else if (Array.isArray(criterium)) {
            return isInRange(colorAsModel[i], criterium[0], criterium[1]);
          } else if (!isNaN(criterium)) {
            return colorAsModel[i] === criterium;
          } else {
            return false;
          }
        });
      });

      if (matchesEveryCriteria) {
        return [...new Set([...rem, ...current[scope]])];
      } else {
        return rem;
      }
    }, []);

    if (randomize) {
      return randomizeArr(words).slice(0, wordLimit);
    }

    return words.slice(0, wordLimit);
  }

  get descriptiveWords() {
    return this.#getWords("descriptive");
  }

  get nouns() {
    return this.#getWords("nouns");
  }

  get meanings() {
    return this.#getWords("meanings");
  }

  get usage() {
    return this.#getWords("usage");
  }

  /**
   * @returns {string} a description of the color
   */
  get description() {
    return this.#getWords("description");
  }

  get bestContrast() {
    return chroma.contrast(this.color, "black") >
      chroma.contrast(this.color, "white")
      ? "black"
      : "white";
  }

  /**
   * @param {Boolean} random randomizes sentence of descriptive
   * @param {Integer} limit maximum descriptive to return
   * @returns {String} descriptive describing the color
   */
  getDescriptiveList(random, limit) {
    let arr = [...this.descriptiveWords];

    if (random) {
      arr = randomizeArr(arr);
    }

    if (limit) {
      arr = arr.slice(0, limit);
    }

    if (arr.length > 1) {
      const last = arr.pop();
      return `${arr.join(", ")} and ${last}`;
    } else {
      return arr[0];
    }
  }
}

export default ColorDescription;
