const { round, min, max, log, floor, random } = Math;

const temperature2rgb = (kelvin) => {
  const temp = kelvin / 100;
  let r, g, b;
  if (temp < 66) {
    r = 1;
    g =
      temp < 6
        ? 0
        : (-155.25485562709179 -
            0.44596950469579133 * (g = temp - 2) +
            104.49216199393888 * log(g)) /
          255;
    b =
      temp < 20
        ? 0
        : (-254.76935184120902 +
            0.8274096064007395 * (b = temp - 10) +
            115.67994401066147 * log(b)) /
          255;
  } else {
    r =
      (351.97690566805693 +
        0.114206453784165 * (r = temp - 55) -
        40.25366309332127 * log(r)) /
      255;
    g =
      (325.4494125711974 +
        0.07943456536662342 * (g = temp - 50) -
        28.0852963507957 * log(g)) /
      255;
    b = 1;
  }
  return {
    r: max(0, min(1, r)),
    g: max(0, min(1, g)),
    b: max(0, min(1, b)),
    a: 1,
  };
};

/**
 * Calculate color temperature from RGB
 * Based on standard algorithms for CCT (Correlated Color Temperature)
 */
export const rgb2temperature = (rgb) => {
  const { r, g, b } = rgb;
  let minTemp = 1000;
  let maxTemp = 40000;
  const eps = 0.4;
  let temp;
  while (maxTemp - minTemp > eps) {
    temp = (maxTemp + minTemp) * 0.5;
    const rgbFromTemp = temperature2rgb(temp);
    if (rgbFromTemp.b / rgbFromTemp.r >= b / r) {
      maxTemp = temp;
    } else {
      minTemp = temp;
    }
  }
  return round(temp);
};

export const isInRange = (x, rMin, rMax) => x >= rMin && x <= rMax;

export const randomizeArr = (arr) => {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = floor(random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Convert RGB to CMYK color space
 * @param {object} rgb - RGB color object with r, g, b values (0-1 range)
 * @returns {object} CMYK color object with c, m, y, k values
 * @note When kInverted is 0 (pure white), c, m, y will be 0 by design
 */
export const rgbToCMYK = (rgb) => {
  const { r, g, b } = rgb;
  const k = 1 - max(r, g, b);
  const kInverted = 1 - k;
  return {
    mode: "cmyk",
    c: kInverted && (kInverted - r) / kInverted,
    m: kInverted && (kInverted - g) / kInverted,
    y: kInverted && (kInverted - b) / kInverted,
    k,
  };
};
