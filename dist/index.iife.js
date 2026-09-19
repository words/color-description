var ColorDescription = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });

  // src/utils.js
  var { round, min, max, log, floor, random } = Math;
  var temperature2rgb = (kelvin) => {
    const temp = kelvin / 100;
    let r, g, b;
    if (temp < 66) {
      r = 1;
      g = temp < 6 ? 0 : (-155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g)) / 255;
      b = temp < 20 ? 0 : (-254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b)) / 255;
    } else {
      r = (351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r)) / 255;
      g = (325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g)) / 255;
      b = 1;
    }
    return {
      r: max(0, min(1, r)),
      g: max(0, min(1, g)),
      b: max(0, min(1, b)),
      a: 1
    };
  };
  var rgb2temperature = (rgb) => {
    const { r, g, b } = rgb;
    if (r < 1e-10) {
      return b > r ? 4e4 : 1e3;
    }
    let minTemp = 1e3;
    let maxTemp = 4e4;
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
  var isInRange = (x, rMin, rMax) => x >= rMin && x <= rMax;
  var randomizeArr = (arr) => {
    let newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = floor(random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };
  var rgbToCMYK = (rgb) => {
    const { r, g, b } = rgb;
    const k3 = 1 - max(r, g, b);
    const kInverted = 1 - k3;
    return {
      mode: "cmyk",
      c: kInverted && (kInverted - r) / kInverted,
      m: kInverted && (kInverted - g) / kInverted,
      y: kInverted && (kInverted - b) / kInverted,
      k: k3
    };
  };

  // node_modules/culori/src/rgb/parseNumber.js
  var parseNumber = (color, len) => {
    if (typeof color !== "number") return;
    if (len === 3) {
      return {
        mode: "rgb",
        r: (color >> 8 & 15 | color >> 4 & 240) / 255,
        g: (color >> 4 & 15 | color & 240) / 255,
        b: (color & 15 | color << 4 & 240) / 255
      };
    }
    if (len === 4) {
      return {
        mode: "rgb",
        r: (color >> 12 & 15 | color >> 8 & 240) / 255,
        g: (color >> 8 & 15 | color >> 4 & 240) / 255,
        b: (color >> 4 & 15 | color & 240) / 255,
        alpha: (color & 15 | color << 4 & 240) / 255
      };
    }
    if (len === 6) {
      return {
        mode: "rgb",
        r: (color >> 16 & 255) / 255,
        g: (color >> 8 & 255) / 255,
        b: (color & 255) / 255
      };
    }
    if (len === 8) {
      return {
        mode: "rgb",
        r: (color >> 24 & 255) / 255,
        g: (color >> 16 & 255) / 255,
        b: (color >> 8 & 255) / 255,
        alpha: (color & 255) / 255
      };
    }
  };
  var parseNumber_default = parseNumber;

  // node_modules/culori/src/colors/named.js
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    // Added in CSS Colors Level 4:
    // https://drafts.csswg.org/css-color/#changes-from-3
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  var named_default = named;

  // node_modules/culori/src/rgb/parseNamed.js
  var parseNamed = (color) => {
    return parseNumber_default(named_default[color.toLowerCase()], 6);
  };
  var parseNamed_default = parseNamed;

  // node_modules/culori/src/rgb/parseHex.js
  var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
  var parseHex = (color) => {
    let match;
    return (match = color.match(hex)) ? parseNumber_default(parseInt(match[1], 16), match[1].length) : void 0;
  };
  var parseHex_default = parseHex;

  // node_modules/culori/src/util/regex.js
  var num = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
  var num_none = `(?:${num}|none)`;
  var per = `${num}%`;
  var per_none = `(?:${num}%|none)`;
  var num_per = `(?:${num}%|${num})`;
  var num_per_none = `(?:${num}%|${num}|none)`;
  var hue = `(?:${num}(deg|grad|rad|turn)|${num})`;
  var hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`;
  var c = `\\s*,\\s*`;
  var rx_num_per_none = new RegExp("^" + num_per_none + "$");

  // node_modules/culori/src/rgb/parseRgbLegacy.js
  var rgb_num_old = new RegExp(
    `^rgba?\\(\\s*${num}${c}${num}${c}${num}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var rgb_per_old = new RegExp(
    `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var parseRgbLegacy = (color) => {
    let res = { mode: "rgb" };
    let match;
    if (match = color.match(rgb_num_old)) {
      if (match[1] !== void 0) {
        res.r = match[1] / 255;
      }
      if (match[2] !== void 0) {
        res.g = match[2] / 255;
      }
      if (match[3] !== void 0) {
        res.b = match[3] / 255;
      }
    } else if (match = color.match(rgb_per_old)) {
      if (match[1] !== void 0) {
        res.r = match[1] / 100;
      }
      if (match[2] !== void 0) {
        res.g = match[2] / 100;
      }
      if (match[3] !== void 0) {
        res.b = match[3] / 100;
      }
    } else {
      return void 0;
    }
    if (match[4] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, match[4] / 100));
    } else if (match[5] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, +match[5]));
    }
    return res;
  };
  var parseRgbLegacy_default = parseRgbLegacy;

  // node_modules/culori/src/_prepare.js
  var prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse_default(color) : color.mode !== void 0 ? color : mode ? __spreadProps(__spreadValues({}, color), { mode }) : void 0;
  var prepare_default = prepare;

  // node_modules/culori/src/converter.js
  var converter = (target_mode = "rgb") => (color) => (color = prepare_default(color, target_mode)) !== void 0 ? (
    // if the color's mode corresponds to our target mode
    color.mode === target_mode ? (
      // then just return the color
      color
    ) : (
      // otherwise check to see if we have a dedicated
      // converter for the target mode
      converters[color.mode][target_mode] ? (
        // and return its result...
        converters[color.mode][target_mode](color)
      ) : (
        // ...otherwise pass through RGB as an intermediary step.
        // if the target mode is RGB...
        target_mode === "rgb" ? (
          // just return the RGB
          converters[color.mode].rgb(color)
        ) : (
          // otherwise convert color.mode -> RGB -> target_mode
          converters.rgb[target_mode](converters[color.mode].rgb(color))
        )
      )
    )
  ) : void 0;
  var converter_default = converter;

  // node_modules/culori/src/modes.js
  var converters = {};
  var modes = {};
  var parsers = [];
  var colorProfiles = {};
  var identity = (v) => v;
  var useMode = (definition10) => {
    converters[definition10.mode] = __spreadValues(__spreadValues({}, converters[definition10.mode]), definition10.toMode);
    Object.keys(definition10.fromMode || {}).forEach((k3) => {
      if (!converters[k3]) {
        converters[k3] = {};
      }
      converters[k3][definition10.mode] = definition10.fromMode[k3];
    });
    if (!definition10.ranges) {
      definition10.ranges = {};
    }
    if (!definition10.difference) {
      definition10.difference = {};
    }
    definition10.channels.forEach((channel) => {
      if (definition10.ranges[channel] === void 0) {
        definition10.ranges[channel] = [0, 1];
      }
      if (!definition10.interpolate[channel]) {
        throw new Error(`Missing interpolator for: ${channel}`);
      }
      if (typeof definition10.interpolate[channel] === "function") {
        definition10.interpolate[channel] = {
          use: definition10.interpolate[channel]
        };
      }
      if (!definition10.interpolate[channel].fixup) {
        definition10.interpolate[channel].fixup = identity;
      }
    });
    modes[definition10.mode] = definition10;
    (definition10.parse || []).forEach((parser) => {
      useParser(parser, definition10.mode);
    });
    return converter_default(definition10.mode);
  };
  var getMode = (mode) => modes[mode];
  var useParser = (parser, mode) => {
    if (typeof parser === "string") {
      if (!mode) {
        throw new Error(`'mode' required when 'parser' is a string`);
      }
      colorProfiles[parser] = mode;
    } else if (typeof parser === "function") {
      if (parsers.indexOf(parser) < 0) {
        parsers.push(parser);
      }
    }
  };

  // node_modules/culori/src/parse.js
  var IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
  var IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
  var Tok = {
    Function: "function",
    Ident: "ident",
    Number: "number",
    Percentage: "percentage",
    ParenClose: ")",
    None: "none",
    Hue: "hue",
    Alpha: "alpha"
  };
  var _i = 0;
  function is_num(chars) {
    let ch = chars[_i];
    let ch1 = chars[_i + 1];
    if (ch === "-" || ch === "+") {
      return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]);
    }
    if (ch === ".") {
      return /\d/.test(ch1);
    }
    return /\d/.test(ch);
  }
  function is_ident(chars) {
    if (_i >= chars.length) {
      return false;
    }
    let ch = chars[_i];
    if (IdentStartCodePoint.test(ch)) {
      return true;
    }
    if (ch === "-") {
      if (chars.length - _i < 2) {
        return false;
      }
      let ch1 = chars[_i + 1];
      if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
        return true;
      }
      return false;
    }
    return false;
  }
  var huenits = {
    deg: 1,
    rad: 180 / Math.PI,
    grad: 9 / 10,
    turn: 360
  };
  function num2(chars) {
    let value = "";
    if (chars[_i] === "-" || chars[_i] === "+") {
      value += chars[_i++];
    }
    value += digits(chars);
    if (chars[_i] === "." && /\d/.test(chars[_i + 1])) {
      value += chars[_i++] + digits(chars);
    }
    if (chars[_i] === "e" || chars[_i] === "E") {
      if ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2])) {
        value += chars[_i++] + chars[_i++] + digits(chars);
      } else if (/\d/.test(chars[_i + 1])) {
        value += chars[_i++] + digits(chars);
      }
    }
    if (is_ident(chars)) {
      let id = ident(chars);
      if (id === "deg" || id === "rad" || id === "turn" || id === "grad") {
        return { type: Tok.Hue, value: value * huenits[id] };
      }
      return void 0;
    }
    if (chars[_i] === "%") {
      _i++;
      return { type: Tok.Percentage, value: +value };
    }
    return { type: Tok.Number, value: +value };
  }
  function digits(chars) {
    let v = "";
    while (/\d/.test(chars[_i])) {
      v += chars[_i++];
    }
    return v;
  }
  function ident(chars) {
    let v = "";
    while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
      v += chars[_i++];
    }
    return v;
  }
  function identlike(chars) {
    let v = ident(chars);
    if (chars[_i] === "(") {
      _i++;
      return { type: Tok.Function, value: v };
    }
    if (v === "none") {
      return { type: Tok.None, value: void 0 };
    }
    return { type: Tok.Ident, value: v };
  }
  function tokenize(str = "") {
    let chars = str.trim();
    let tokens = [];
    let ch;
    _i = 0;
    while (_i < chars.length) {
      ch = chars[_i++];
      if (ch === "\n" || ch === "	" || ch === " ") {
        while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
          _i++;
        }
        continue;
      }
      if (ch === ",") {
        return void 0;
      }
      if (ch === ")") {
        tokens.push({ type: Tok.ParenClose });
        continue;
      }
      if (ch === "+") {
        _i--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return void 0;
      }
      if (ch === "-") {
        _i--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        if (is_ident(chars)) {
          tokens.push({ type: Tok.Ident, value: ident(chars) });
          continue;
        }
        return void 0;
      }
      if (ch === ".") {
        _i--;
        if (is_num(chars)) {
          tokens.push(num2(chars));
          continue;
        }
        return void 0;
      }
      if (ch === "/") {
        while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
          _i++;
        }
        let alpha;
        if (is_num(chars)) {
          alpha = num2(chars);
          if (alpha.type !== Tok.Hue) {
            tokens.push({ type: Tok.Alpha, value: alpha });
            continue;
          }
        }
        if (is_ident(chars)) {
          if (ident(chars) === "none") {
            tokens.push({
              type: Tok.Alpha,
              value: { type: Tok.None, value: void 0 }
            });
            continue;
          }
        }
        return void 0;
      }
      if (/\d/.test(ch)) {
        _i--;
        tokens.push(num2(chars));
        continue;
      }
      if (IdentStartCodePoint.test(ch)) {
        _i--;
        tokens.push(identlike(chars));
        continue;
      }
      return void 0;
    }
    return tokens;
  }
  function parseColorSyntax(tokens) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function || token.value !== "color") {
      return void 0;
    }
    token = tokens[tokens._i++];
    if (token.type !== Tok.Ident) {
      return void 0;
    }
    const mode = colorProfiles[token.value];
    if (!mode) {
      return void 0;
    }
    const res = { mode };
    const coords = consumeCoords(tokens, false);
    if (!coords) {
      return void 0;
    }
    const channels = getMode(mode).channels;
    for (let ii = 0, c2, ch; ii < channels.length; ii++) {
      c2 = coords[ii];
      ch = channels[ii];
      if (c2.type !== Tok.None) {
        res[ch] = c2.type === Tok.Number ? c2.value : c2.value / 100;
        if (ch === "alpha") {
          res[ch] = Math.max(0, Math.min(1, res[ch]));
        }
      }
    }
    return res;
  }
  function consumeCoords(tokens, includeHue) {
    const coords = [];
    let token;
    while (tokens._i < tokens.length) {
      token = tokens[tokens._i++];
      if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
        coords.push(token);
        continue;
      }
      if (token.type === Tok.ParenClose) {
        if (tokens._i < tokens.length) {
          return void 0;
        }
        continue;
      }
      return void 0;
    }
    if (coords.length < 3 || coords.length > 4) {
      return void 0;
    }
    if (coords.length === 4) {
      if (coords[3].type !== Tok.Alpha) {
        return void 0;
      }
      coords[3] = coords[3].value;
    }
    if (coords.length === 3) {
      coords.push({ type: Tok.None, value: void 0 });
    }
    return coords.every((c2) => c2.type !== Tok.Alpha) ? coords : void 0;
  }
  function parseModernSyntax(tokens, includeHue) {
    tokens._i = 0;
    let token = tokens[tokens._i++];
    if (!token || token.type !== Tok.Function) {
      return void 0;
    }
    let coords = consumeCoords(tokens, includeHue);
    if (!coords) {
      return void 0;
    }
    coords.unshift(token.value);
    return coords;
  }
  var parse = (color) => {
    if (typeof color !== "string") {
      return void 0;
    }
    const tokens = tokenize(color);
    const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
    let result = void 0;
    let i = 0;
    let len = parsers.length;
    while (i < len) {
      if ((result = parsers[i++](color, parsed)) !== void 0) {
        return result;
      }
    }
    return tokens ? parseColorSyntax(tokens) : void 0;
  };
  var parse_default = parse;

  // node_modules/culori/src/rgb/parseRgb.js
  function parseRgb(color, parsed) {
    if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
      return void 0;
    }
    const res = { mode: "rgb" };
    const [, r, g, b, alpha] = parsed;
    if (r.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue) {
      return void 0;
    }
    if (r.type !== Tok.None) {
      res.r = r.type === Tok.Number ? r.value / 255 : r.value / 100;
    }
    if (g.type !== Tok.None) {
      res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100;
    }
    if (b.type !== Tok.None) {
      res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseRgb_default = parseRgb;

  // node_modules/culori/src/rgb/parseTransparent.js
  var parseTransparent = (c2) => c2 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
  var parseTransparent_default = parseTransparent;

  // node_modules/culori/src/interpolate/lerp.js
  var lerp = (a, b, t) => a + t * (b - a);

  // node_modules/culori/src/interpolate/piecewise.js
  var get_classes = (arr) => {
    let classes = [];
    for (let i = 0; i < arr.length - 1; i++) {
      let a = arr[i];
      let b = arr[i + 1];
      if (a === void 0 && b === void 0) {
        classes.push(void 0);
      } else if (a !== void 0 && b !== void 0) {
        classes.push([a, b]);
      } else {
        classes.push(a !== void 0 ? [a, a] : [b, b]);
      }
    }
    return classes;
  };
  var interpolatorPiecewise = (interpolator) => (arr) => {
    let classes = get_classes(arr);
    return (t) => {
      let cls = t * classes.length;
      let idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
      let pair = classes[idx];
      return pair === void 0 ? void 0 : interpolator(pair[0], pair[1], cls - idx);
    };
  };

  // node_modules/culori/src/interpolate/linear.js
  var interpolatorLinear = interpolatorPiecewise(lerp);

  // node_modules/culori/src/fixup/alpha.js
  var fixupAlpha = (arr) => {
    let some_defined = false;
    let res = arr.map((v) => {
      if (v !== void 0) {
        some_defined = true;
        return v;
      }
      return 1;
    });
    return some_defined ? res : arr;
  };

  // node_modules/culori/src/rgb/definition.js
  var definition = {
    mode: "rgb",
    channels: ["r", "g", "b", "alpha"],
    parse: [
      parseRgb_default,
      parseHex_default,
      parseRgbLegacy_default,
      parseNamed_default,
      parseTransparent_default,
      "srgb"
    ],
    serialize: "srgb",
    interpolate: {
      r: interpolatorLinear,
      g: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    gamut: true,
    white: { r: 1, g: 1, b: 1 },
    black: { r: 0, g: 0, b: 0 }
  };
  var definition_default = definition;

  // node_modules/culori/src/lrgb/convertRgbToLrgb.js
  var fn = (c2 = 0) => {
    const abs = Math.abs(c2);
    if (abs <= 0.04045) {
      return c2 / 12.92;
    }
    return (Math.sign(c2) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
  };
  var convertRgbToLrgb = ({ r, g, b, alpha }) => {
    let res = {
      mode: "lrgb",
      r: fn(r),
      g: fn(g),
      b: fn(b)
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertRgbToLrgb_default = convertRgbToLrgb;

  // node_modules/culori/src/xyz65/convertRgbToXyz65.js
  var convertRgbToXyz65 = (rgb) => {
    let { r, g, b, alpha } = convertRgbToLrgb_default(rgb);
    let res = {
      mode: "xyz65",
      x: 0.4123907992659593 * r + 0.357584339383878 * g + 0.1804807884018343 * b,
      y: 0.2126390058715102 * r + 0.715168678767756 * g + 0.0721923153607337 * b,
      z: 0.0193308187155918 * r + 0.119194779794626 * g + 0.9505321522496607 * b
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertRgbToXyz65_default = convertRgbToXyz65;

  // node_modules/culori/src/lrgb/convertLrgbToRgb.js
  var fn2 = (c2 = 0) => {
    const abs = Math.abs(c2);
    if (abs > 31308e-7) {
      return (Math.sign(c2) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
    }
    return c2 * 12.92;
  };
  var convertLrgbToRgb = ({ r, g, b, alpha }, mode = "rgb") => {
    let res = {
      mode,
      r: fn2(r),
      g: fn2(g),
      b: fn2(b)
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLrgbToRgb_default = convertLrgbToRgb;

  // node_modules/culori/src/xyz65/convertXyz65ToRgb.js
  var convertXyz65ToRgb = ({ x, y, z, alpha }) => {
    if (x === void 0) x = 0;
    if (y === void 0) y = 0;
    if (z === void 0) z = 0;
    let res = convertLrgbToRgb_default({
      r: x * 3.2409699419045226 - y * 1.537383177570094 - 0.4986107602930034 * z,
      g: x * -0.9692436362808796 + y * 1.8759675015077204 + 0.0415550574071756 * z,
      b: x * 0.0556300796969936 - y * 0.2039769588889765 + 1.0569715142428784 * z
    });
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToRgb_default = convertXyz65ToRgb;

  // node_modules/culori/src/util/normalizeHue.js
  var normalizeHue = (hue3) => (hue3 = hue3 % 360) < 0 ? hue3 + 360 : hue3;
  var normalizeHue_default = normalizeHue;

  // node_modules/culori/src/fixup/hue.js
  var hue2 = (hues, fn4) => {
    return hues.map((hue3, idx, arr) => {
      if (hue3 === void 0) {
        return hue3;
      }
      let normalized = normalizeHue_default(hue3);
      if (idx === 0 || hues[idx - 1] === void 0) {
        return normalized;
      }
      return fn4(normalized - normalizeHue_default(arr[idx - 1]));
    }).reduce((acc, curr) => {
      if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
        acc.push(curr);
        return acc;
      }
      acc.push(curr + acc[acc.length - 1]);
      return acc;
    }, []);
  };
  var fixupHueShorter = (arr) => hue2(arr, (d) => Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));

  // node_modules/culori/src/difference.js
  var differenceHueSaturation = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.s * smp.s) * dH;
  };
  var differenceHueNaive = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    if (Math.abs(smp_h - std_h) > 180) {
      return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
    }
    return smp_h - std_h;
  };
  var differenceHueChroma = (std, smp) => {
    if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
      return 0;
    }
    let std_h = normalizeHue_default(std.h);
    let smp_h = normalizeHue_default(smp.h);
    let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
    return 2 * Math.sqrt(std.c * smp.c) * dH;
  };

  // node_modules/culori/src/average.js
  var averageAngle = (val) => {
    let sum = val.reduce(
      (sum2, val2) => {
        if (val2 !== void 0) {
          let rad = val2 * Math.PI / 180;
          sum2.sin += Math.sin(rad);
          sum2.cos += Math.cos(rad);
        }
        return sum2;
      },
      { sin: 0, cos: 0 }
    );
    let angle = Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
    return angle < 0 ? 360 + angle : angle;
  };

  // node_modules/culori/src/lch/convertLabToLch.js
  var convertLabToLch = ({ l, a, b, alpha }, mode = "lch") => {
    if (a === void 0) a = 0;
    if (b === void 0) b = 0;
    let c2 = Math.sqrt(a * a + b * b);
    let res = { mode, l, c: c2 };
    if (c2) res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLabToLch_default = convertLabToLch;

  // node_modules/culori/src/lch/convertLchToLab.js
  var convertLchToLab = ({ l, c: c2, h, alpha }, mode = "lab") => {
    if (h === void 0) h = 0;
    let res = {
      mode,
      l,
      a: c2 ? c2 * Math.cos(h / 180 * Math.PI) : 0,
      b: c2 ? c2 * Math.sin(h / 180 * Math.PI) : 0
    };
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  };
  var convertLchToLab_default = convertLchToLab;

  // node_modules/culori/src/constants.js
  var D50 = {
    X: 0.3457 / 0.3585,
    Y: 1,
    Z: (1 - 0.3457 - 0.3585) / 0.3585
  };
  var D65 = {
    X: 0.3127 / 0.329,
    Y: 1,
    Z: (1 - 0.3127 - 0.329) / 0.329
  };
  var k = Math.pow(29, 3) / Math.pow(3, 3);
  var e = Math.pow(6, 3) / Math.pow(29, 3);

  // node_modules/culori/src/hsl/convertHslToRgb.js
  function convertHslToRgb({ h, s, l, alpha }) {
    h = normalizeHue_default(h !== void 0 ? h : 0);
    if (s === void 0) s = 0;
    if (l === void 0) l = 0;
    let m1 = l + s * (l < 0.5 ? l : 1 - l);
    let m2 = m1 - (m1 - l) * 2 * Math.abs(h / 60 % 2 - 1);
    let res;
    switch (Math.floor(h / 60)) {
      case 0:
        res = { r: m1, g: m2, b: 2 * l - m1 };
        break;
      case 1:
        res = { r: m2, g: m1, b: 2 * l - m1 };
        break;
      case 2:
        res = { r: 2 * l - m1, g: m1, b: m2 };
        break;
      case 3:
        res = { r: 2 * l - m1, g: m2, b: m1 };
        break;
      case 4:
        res = { r: m2, g: 2 * l - m1, b: m1 };
        break;
      case 5:
        res = { r: m1, g: 2 * l - m1, b: m2 };
        break;
      default:
        res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
    }
    res.mode = "rgb";
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // node_modules/culori/src/hsl/convertRgbToHsl.js
  function convertRgbToHsl({ r, g, b, alpha }) {
    if (r === void 0) r = 0;
    if (g === void 0) g = 0;
    if (b === void 0) b = 0;
    let M = Math.max(r, g, b), m = Math.min(r, g, b);
    let res = {
      mode: "hsl",
      s: M === m ? 0 : (M - m) / (1 - Math.abs(M + m - 1)),
      l: 0.5 * (M + m)
    };
    if (M - m !== 0)
      res.h = (M === r ? (g - b) / (M - m) + (g < b) * 6 : M === g ? (b - r) / (M - m) + 2 : (r - g) / (M - m) + 4) * 60;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // node_modules/culori/src/util/hue.js
  var hueToDeg = (val, unit) => {
    switch (unit) {
      case "deg":
        return +val;
      case "rad":
        return val / Math.PI * 180;
      case "grad":
        return val / 10 * 9;
      case "turn":
        return val * 360;
    }
  };
  var hue_default = hueToDeg;

  // node_modules/culori/src/hsl/parseHslLegacy.js
  var hsl_old = new RegExp(
    `^hsla?\\(\\s*${hue}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
  );
  var parseHslLegacy = (color) => {
    let match = color.match(hsl_old);
    if (!match) return;
    let res = { mode: "hsl" };
    if (match[3] !== void 0) {
      res.h = +match[3];
    } else if (match[1] !== void 0 && match[2] !== void 0) {
      res.h = hue_default(match[1], match[2]);
    }
    if (match[4] !== void 0) {
      res.s = Math.min(Math.max(0, match[4] / 100), 1);
    }
    if (match[5] !== void 0) {
      res.l = Math.min(Math.max(0, match[5] / 100), 1);
    }
    if (match[6] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, match[6] / 100));
    } else if (match[7] !== void 0) {
      res.alpha = Math.max(0, Math.min(1, +match[7]));
    }
    return res;
  };
  var parseHslLegacy_default = parseHslLegacy;

  // node_modules/culori/src/hsl/parseHsl.js
  function parseHsl(color, parsed) {
    if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
      return void 0;
    }
    const res = { mode: "hsl" };
    const [, h, s, l, alpha] = parsed;
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h.value;
    }
    if (s.type !== Tok.None) {
      if (s.type === Tok.Hue) {
        return void 0;
      }
      res.s = s.value / 100;
    }
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue) {
        return void 0;
      }
      res.l = l.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseHsl_default = parseHsl;

  // node_modules/culori/src/hsl/definition.js
  var definition2 = {
    mode: "hsl",
    toMode: {
      rgb: convertHslToRgb
    },
    fromMode: {
      rgb: convertRgbToHsl
    },
    channels: ["h", "s", "l", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHsl_default, parseHslLegacy_default],
    serialize: (c2) => `hsl(${c2.h !== void 0 ? c2.h : "none"} ${c2.s !== void 0 ? c2.s * 100 + "%" : "none"} ${c2.l !== void 0 ? c2.l * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      s: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueSaturation
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default2 = definition2;

  // node_modules/culori/src/hsv/convertHsvToRgb.js
  function convertHsvToRgb({ h, s, v, alpha }) {
    h = normalizeHue_default(h !== void 0 ? h : 0);
    if (s === void 0) s = 0;
    if (v === void 0) v = 0;
    let f2 = Math.abs(h / 60 % 2 - 1);
    let res;
    switch (Math.floor(h / 60)) {
      case 0:
        res = { r: v, g: v * (1 - s * f2), b: v * (1 - s) };
        break;
      case 1:
        res = { r: v * (1 - s * f2), g: v, b: v * (1 - s) };
        break;
      case 2:
        res = { r: v * (1 - s), g: v, b: v * (1 - s * f2) };
        break;
      case 3:
        res = { r: v * (1 - s), g: v * (1 - s * f2), b: v };
        break;
      case 4:
        res = { r: v * (1 - s * f2), g: v * (1 - s), b: v };
        break;
      case 5:
        res = { r: v, g: v * (1 - s), b: v * (1 - s * f2) };
        break;
      default:
        res = { r: v * (1 - s), g: v * (1 - s), b: v * (1 - s) };
    }
    res.mode = "rgb";
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // node_modules/culori/src/hsv/convertRgbToHsv.js
  function convertRgbToHsv({ r, g, b, alpha }) {
    if (r === void 0) r = 0;
    if (g === void 0) g = 0;
    if (b === void 0) b = 0;
    let M = Math.max(r, g, b), m = Math.min(r, g, b);
    let res = {
      mode: "hsv",
      s: M === 0 ? 0 : 1 - m / M,
      v: M
    };
    if (M - m !== 0)
      res.h = (M === r ? (g - b) / (M - m) + (g < b) * 6 : M === g ? (b - r) / (M - m) + 2 : (r - g) / (M - m) + 4) * 60;
    if (alpha !== void 0) res.alpha = alpha;
    return res;
  }

  // node_modules/culori/src/hwb/convertHwbToRgb.js
  function convertHwbToRgb({ h, w, b, alpha }) {
    if (w === void 0) w = 0;
    if (b === void 0) b = 0;
    if (w + b > 1) {
      let s = w + b;
      w /= s;
      b /= s;
    }
    return convertHsvToRgb({
      h,
      s: b === 1 ? 1 : 1 - w / (1 - b),
      v: 1 - b,
      alpha
    });
  }

  // node_modules/culori/src/hwb/convertRgbToHwb.js
  function convertRgbToHwb(rgba) {
    let hsv = convertRgbToHsv(rgba);
    if (hsv === void 0) return void 0;
    let s = hsv.s !== void 0 ? hsv.s : 0;
    let v = hsv.v !== void 0 ? hsv.v : 0;
    let res = {
      mode: "hwb",
      w: (1 - s) * v,
      b: 1 - v
    };
    if (hsv.h !== void 0) res.h = hsv.h;
    if (hsv.alpha !== void 0) res.alpha = hsv.alpha;
    return res;
  }

  // node_modules/culori/src/hwb/parseHwb.js
  function ParseHwb(color, parsed) {
    if (!parsed || parsed[0] !== "hwb") {
      return void 0;
    }
    const res = { mode: "hwb" };
    const [, h, w, b, alpha] = parsed;
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h.value;
    }
    if (w.type !== Tok.None) {
      if (w.type === Tok.Hue) {
        return void 0;
      }
      res.w = w.value / 100;
    }
    if (b.type !== Tok.None) {
      if (b.type === Tok.Hue) {
        return void 0;
      }
      res.b = b.value / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseHwb_default = ParseHwb;

  // node_modules/culori/src/hwb/definition.js
  var definition3 = {
    mode: "hwb",
    toMode: {
      rgb: convertHwbToRgb
    },
    fromMode: {
      rgb: convertRgbToHwb
    },
    channels: ["h", "w", "b", "alpha"],
    ranges: {
      h: [0, 360]
    },
    gamut: "rgb",
    parse: [parseHwb_default],
    serialize: (c2) => `hwb(${c2.h !== void 0 ? c2.h : "none"} ${c2.w !== void 0 ? c2.w * 100 + "%" : "none"} ${c2.b !== void 0 ? c2.b * 100 + "%" : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      w: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueNaive
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default3 = definition3;

  // node_modules/culori/src/xyz50/constants.js
  var k2 = Math.pow(29, 3) / Math.pow(3, 3);
  var e2 = Math.pow(6, 3) / Math.pow(29, 3);

  // node_modules/culori/src/lab/convertLabToXyz50.js
  var fn3 = (v) => Math.pow(v, 3) > e2 ? Math.pow(v, 3) : (116 * v - 16) / k2;
  var convertLabToXyz50 = ({ l, a, b, alpha }) => {
    if (l === void 0) l = 0;
    if (a === void 0) a = 0;
    if (b === void 0) b = 0;
    let fy = (l + 16) / 116;
    let fx = a / 500 + fy;
    let fz = fy - b / 200;
    let res = {
      mode: "xyz50",
      x: fn3(fx) * D50.X,
      y: fn3(fy) * D50.Y,
      z: fn3(fz) * D50.Z
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLabToXyz50_default = convertLabToXyz50;

  // node_modules/culori/src/xyz50/convertXyz50ToRgb.js
  var convertXyz50ToRgb = ({ x, y, z, alpha }) => {
    if (x === void 0) x = 0;
    if (y === void 0) y = 0;
    if (z === void 0) z = 0;
    let res = convertLrgbToRgb_default({
      r: x * 3.1341359569958707 - y * 1.6173863321612538 - 0.4906619460083532 * z,
      g: x * -0.978795502912089 + y * 1.916254567259524 + 0.03344273116131949 * z,
      b: x * 0.07195537988411677 - y * 0.2289768264158322 + 1.405386058324125 * z
    });
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToRgb_default = convertXyz50ToRgb;

  // node_modules/culori/src/lab/convertLabToRgb.js
  var convertLabToRgb = (lab) => convertXyz50ToRgb_default(convertLabToXyz50_default(lab));
  var convertLabToRgb_default = convertLabToRgb;

  // node_modules/culori/src/xyz50/convertRgbToXyz50.js
  var convertRgbToXyz50 = (rgb) => {
    let { r, g, b, alpha } = convertRgbToLrgb_default(rgb);
    let res = {
      mode: "xyz50",
      x: 0.436065742824811 * r + 0.3851514688337912 * g + 0.14307845442264197 * b,
      y: 0.22249319175623702 * r + 0.7168870538238823 * g + 0.06061979053616537 * b,
      z: 0.013923904500943465 * r + 0.09708128566574634 * g + 0.7140993584005155 * b
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertRgbToXyz50_default = convertRgbToXyz50;

  // node_modules/culori/src/lab/convertXyz50ToLab.js
  var f = (value) => value > e2 ? Math.cbrt(value) : (k2 * value + 16) / 116;
  var convertXyz50ToLab = ({ x, y, z, alpha }) => {
    if (x === void 0) x = 0;
    if (y === void 0) y = 0;
    if (z === void 0) z = 0;
    let f0 = f(x / D50.X);
    let f1 = f(y / D50.Y);
    let f2 = f(z / D50.Z);
    let res = {
      mode: "lab",
      l: 116 * f1 - 16,
      a: 500 * (f0 - f1),
      b: 200 * (f1 - f2)
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz50ToLab_default = convertXyz50ToLab;

  // node_modules/culori/src/lab/convertRgbToLab.js
  var convertRgbToLab = (rgb) => {
    let res = convertXyz50ToLab_default(convertRgbToXyz50_default(rgb));
    if (rgb.r === rgb.b && rgb.b === rgb.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToLab_default = convertRgbToLab;

  // node_modules/culori/src/lab/parseLab.js
  function parseLab(color, parsed) {
    if (!parsed || parsed[0] !== "lab") {
      return void 0;
    }
    const res = { mode: "lab" };
    const [, l, a, b, alpha] = parsed;
    if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
      return void 0;
    }
    if (l.type !== Tok.None) {
      res.l = Math.min(Math.max(0, l.value), 100);
    }
    if (a.type !== Tok.None) {
      res.a = a.type === Tok.Number ? a.value : a.value * 125 / 100;
    }
    if (b.type !== Tok.None) {
      res.b = b.type === Tok.Number ? b.value : b.value * 125 / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseLab_default = parseLab;

  // node_modules/culori/src/lab/definition.js
  var definition4 = {
    mode: "lab",
    toMode: {
      xyz50: convertLabToXyz50_default,
      rgb: convertLabToRgb_default
    },
    fromMode: {
      xyz50: convertXyz50ToLab_default,
      rgb: convertRgbToLab_default
    },
    channels: ["l", "a", "b", "alpha"],
    ranges: {
      l: [0, 100],
      a: [-125, 125],
      b: [-125, 125]
    },
    parse: [parseLab_default],
    serialize: (c2) => `lab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
    interpolate: {
      l: interpolatorLinear,
      a: interpolatorLinear,
      b: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    }
  };
  var definition_default4 = definition4;

  // node_modules/culori/src/lch/parseLch.js
  function parseLch(color, parsed) {
    if (!parsed || parsed[0] !== "lch") {
      return void 0;
    }
    const res = { mode: "lch" };
    const [, l, c2, h, alpha] = parsed;
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue) {
        return void 0;
      }
      res.l = Math.min(Math.max(0, l.value), 100);
    }
    if (c2.type !== Tok.None) {
      res.c = Math.max(
        0,
        c2.type === Tok.Number ? c2.value : c2.value * 150 / 100
      );
    }
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h.value;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseLch_default = parseLch;

  // node_modules/culori/src/lch/definition.js
  var definition5 = {
    mode: "lch",
    toMode: {
      lab: convertLchToLab_default,
      rgb: (c2) => convertLabToRgb_default(convertLchToLab_default(c2))
    },
    fromMode: {
      rgb: (c2) => convertLabToLch_default(convertRgbToLab_default(c2)),
      lab: convertLabToLch_default
    },
    channels: ["l", "c", "h", "alpha"],
    ranges: {
      l: [0, 100],
      c: [0, 150],
      h: [0, 360]
    },
    parse: [parseLch_default],
    serialize: (c2) => `lch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
    interpolate: {
      h: { use: interpolatorLinear, fixup: fixupHueShorter },
      c: interpolatorLinear,
      l: interpolatorLinear,
      alpha: { use: interpolatorLinear, fixup: fixupAlpha }
    },
    difference: {
      h: differenceHueChroma
    },
    average: {
      h: averageAngle
    }
  };
  var definition_default5 = definition5;

  // node_modules/culori/src/lrgb/definition.js
  var definition6 = __spreadProps(__spreadValues({}, definition_default), {
    mode: "lrgb",
    toMode: {
      rgb: convertLrgbToRgb_default
    },
    fromMode: {
      rgb: convertRgbToLrgb_default
    },
    parse: ["srgb-linear"],
    serialize: "srgb-linear"
  });
  var definition_default6 = definition6;

  // node_modules/culori/src/oklab/convertLrgbToOklab.js
  var convertLrgbToOklab = ({ r, g, b, alpha }) => {
    if (r === void 0) r = 0;
    if (g === void 0) g = 0;
    if (b === void 0) b = 0;
    let L = Math.cbrt(
      0.412221469470763 * r + 0.5363325372617348 * g + 0.0514459932675022 * b
    );
    let M = Math.cbrt(
      0.2119034958178252 * r + 0.6806995506452344 * g + 0.1073969535369406 * b
    );
    let S = Math.cbrt(
      0.0883024591900564 * r + 0.2817188391361215 * g + 0.6299787016738222 * b
    );
    let res = {
      mode: "oklab",
      l: 0.210454268309314 * L + 0.7936177747023054 * M - 0.0040720430116193 * S,
      a: 1.9779985324311684 * L - 2.42859224204858 * M + 0.450593709617411 * S,
      b: 0.0259040424655478 * L + 0.7827717124575296 * M - 0.8086757549230774 * S
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertLrgbToOklab_default = convertLrgbToOklab;

  // node_modules/culori/src/oklab/convertRgbToOklab.js
  var convertRgbToOklab = (rgb) => {
    let res = convertLrgbToOklab_default(convertRgbToLrgb_default(rgb));
    if (rgb.r === rgb.b && rgb.b === rgb.g) {
      res.a = res.b = 0;
    }
    return res;
  };
  var convertRgbToOklab_default = convertRgbToOklab;

  // node_modules/culori/src/oklab/convertOklabToLrgb.js
  var convertOklabToLrgb = ({ l, a, b, alpha }) => {
    if (l === void 0) l = 0;
    if (a === void 0) a = 0;
    if (b === void 0) b = 0;
    let L = Math.pow(l + 0.3963377773761749 * a + 0.2158037573099136 * b, 3);
    let M = Math.pow(l - 0.1055613458156586 * a - 0.0638541728258133 * b, 3);
    let S = Math.pow(l - 0.0894841775298119 * a - 1.2914855480194092 * b, 3);
    let res = {
      mode: "lrgb",
      r: 4.076741636075957 * L - 3.3077115392580616 * M + 0.2309699031821044 * S,
      g: -1.2684379732850317 * L + 2.6097573492876887 * M - 0.3413193760026573 * S,
      b: -0.0041960761386756 * L - 0.7034186179359362 * M + 1.7076146940746117 * S
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertOklabToLrgb_default = convertOklabToLrgb;

  // node_modules/culori/src/oklab/convertOklabToRgb.js
  var convertOklabToRgb = (c2) => convertLrgbToRgb_default(convertOklabToLrgb_default(c2));
  var convertOklabToRgb_default = convertOklabToRgb;

  // node_modules/culori/src/okhsl/helpers.js
  function toe(x) {
    const k_1 = 0.206;
    const k_2 = 0.03;
    const k_3 = (1 + k_1) / (1 + k_2);
    return 0.5 * (k_3 * x - k_1 + Math.sqrt((k_3 * x - k_1) * (k_3 * x - k_1) + 4 * k_2 * k_3 * x));
  }
  function toe_inv(x) {
    const k_1 = 0.206;
    const k_2 = 0.03;
    const k_3 = (1 + k_1) / (1 + k_2);
    return (x * x + k_1 * x) / (k_3 * (x + k_2));
  }
  function compute_max_saturation(a, b) {
    let k0, k1, k22, k3, k4, wl, wm, ws;
    if (-1.88170328 * a - 0.80936493 * b > 1) {
      k0 = 1.19086277;
      k1 = 1.76576728;
      k22 = 0.59662641;
      k3 = 0.75515197;
      k4 = 0.56771245;
      wl = 4.0767416621;
      wm = -3.3077115913;
      ws = 0.2309699292;
    } else if (1.81444104 * a - 1.19445276 * b > 1) {
      k0 = 0.73956515;
      k1 = -0.45954404;
      k22 = 0.08285427;
      k3 = 0.1254107;
      k4 = 0.14503204;
      wl = -1.2684380046;
      wm = 2.6097574011;
      ws = -0.3413193965;
    } else {
      k0 = 1.35733652;
      k1 = -915799e-8;
      k22 = -1.1513021;
      k3 = -0.50559606;
      k4 = 692167e-8;
      wl = -0.0041960863;
      wm = -0.7034186147;
      ws = 1.707614701;
    }
    let S = k0 + k1 * a + k22 * b + k3 * a * a + k4 * a * b;
    let k_l = 0.3963377774 * a + 0.2158037573 * b;
    let k_m = -0.1055613458 * a - 0.0638541728 * b;
    let k_s = -0.0894841775 * a - 1.291485548 * b;
    {
      let l_ = 1 + S * k_l;
      let m_ = 1 + S * k_m;
      let s_ = 1 + S * k_s;
      let l = l_ * l_ * l_;
      let m = m_ * m_ * m_;
      let s = s_ * s_ * s_;
      let l_dS = 3 * k_l * l_ * l_;
      let m_dS = 3 * k_m * m_ * m_;
      let s_dS = 3 * k_s * s_ * s_;
      let l_dS2 = 6 * k_l * k_l * l_;
      let m_dS2 = 6 * k_m * k_m * m_;
      let s_dS2 = 6 * k_s * k_s * s_;
      let f2 = wl * l + wm * m + ws * s;
      let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
      let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
      S = S - f2 * f1 / (f1 * f1 - 0.5 * f2 * f22);
    }
    return S;
  }
  function find_cusp(a, b) {
    let S_cusp = compute_max_saturation(a, b);
    let rgb = convertOklabToLrgb_default({ l: 1, a: S_cusp * a, b: S_cusp * b });
    let L_cusp = Math.cbrt(1 / Math.max(rgb.r, rgb.g, rgb.b));
    let C_cusp = L_cusp * S_cusp;
    return [L_cusp, C_cusp];
  }
  function find_gamut_intersection(a, b, L1, C1, L0, cusp = null) {
    if (!cusp) {
      cusp = find_cusp(a, b);
    }
    let t;
    if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
      t = cusp[1] * L0 / (C1 * cusp[0] + cusp[1] * (L0 - L1));
    } else {
      t = cusp[1] * (L0 - 1) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
      {
        let dL = L1 - L0;
        let dC = C1;
        let k_l = 0.3963377774 * a + 0.2158037573 * b;
        let k_m = -0.1055613458 * a - 0.0638541728 * b;
        let k_s = -0.0894841775 * a - 1.291485548 * b;
        let l_dt = dL + dC * k_l;
        let m_dt = dL + dC * k_m;
        let s_dt = dL + dC * k_s;
        {
          let L = L0 * (1 - t) + t * L1;
          let C = t * C1;
          let l_ = L + C * k_l;
          let m_ = L + C * k_m;
          let s_ = L + C * k_s;
          let l = l_ * l_ * l_;
          let m = m_ * m_ * m_;
          let s = s_ * s_ * s_;
          let ldt = 3 * l_dt * l_ * l_;
          let mdt = 3 * m_dt * m_ * m_;
          let sdt = 3 * s_dt * s_ * s_;
          let ldt2 = 6 * l_dt * l_dt * l_;
          let mdt2 = 6 * m_dt * m_dt * m_;
          let sdt2 = 6 * s_dt * s_dt * s_;
          let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
          let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
          let r2 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
          let u_r = r1 / (r1 * r1 - 0.5 * r * r2);
          let t_r = -r * u_r;
          let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
          let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
          let g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
          let u_g = g1 / (g1 * g1 - 0.5 * g * g2);
          let t_g = -g * u_g;
          let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1;
          let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
          let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
          let u_b = b1 / (b1 * b1 - 0.5 * b2 * b22);
          let t_b = -b2 * u_b;
          t_r = u_r >= 0 ? t_r : 1e6;
          t_g = u_g >= 0 ? t_g : 1e6;
          t_b = u_b >= 0 ? t_b : 1e6;
          t += Math.min(t_r, Math.min(t_g, t_b));
        }
      }
    }
    return t;
  }
  function get_ST_max(a_, b_, cusp = null) {
    if (!cusp) {
      cusp = find_cusp(a_, b_);
    }
    let L = cusp[0];
    let C = cusp[1];
    return [C / L, C / (1 - L)];
  }
  function get_Cs(L, a_, b_) {
    let cusp = find_cusp(a_, b_);
    let C_max = find_gamut_intersection(a_, b_, L, 1, L, cusp);
    let ST_max = get_ST_max(a_, b_, cusp);
    let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
    let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
    let k3 = C_max / Math.min(L * ST_max[0], (1 - L) * ST_max[1]);
    let C_a = L * S_mid;
    let C_b = (1 - L) * T_mid;
    let C_mid = 0.9 * k3 * Math.sqrt(
      Math.sqrt(
        1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
      )
    );
    C_a = L * 0.4;
    C_b = (1 - L) * 0.8;
    let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
    return [C_0, C_mid, C_max];
  }

  // node_modules/culori/src/okhsl/convertOklabToOkhsl.js
  function convertOklabToOkhsl(lab) {
    const l = lab.l !== void 0 ? lab.l : 0;
    const a = lab.a !== void 0 ? lab.a : 0;
    const b = lab.b !== void 0 ? lab.b : 0;
    const ret = { mode: "okhsl", l: toe(l) };
    if (lab.alpha !== void 0) {
      ret.alpha = lab.alpha;
    }
    let c2 = Math.sqrt(a * a + b * b);
    if (!c2) {
      ret.s = 0;
      return ret;
    }
    let [C_0, C_mid, C_max] = get_Cs(l, a / c2, b / c2);
    let s;
    if (c2 < C_mid) {
      let k_0 = 0;
      let k_1 = 0.8 * C_0;
      let k_2 = 1 - k_1 / C_mid;
      let t = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
      s = t * 0.8;
    } else {
      let k_0 = C_mid;
      let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
      let k_2 = 1 - k_1 / (C_max - C_mid);
      let t = (c2 - k_0) / (k_1 + k_2 * (c2 - k_0));
      s = 0.8 + 0.2 * t;
    }
    if (s) {
      ret.s = s;
      ret.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
    }
    return ret;
  }

  // node_modules/culori/src/okhsl/convertOkhslToOklab.js
  function convertOkhslToOklab(hsl) {
    let h = hsl.h !== void 0 ? hsl.h : 0;
    let s = hsl.s !== void 0 ? hsl.s : 0;
    let l = hsl.l !== void 0 ? hsl.l : 0;
    const ret = { mode: "oklab", l: toe_inv(l) };
    if (hsl.alpha !== void 0) {
      ret.alpha = hsl.alpha;
    }
    if (!s || l === 1) {
      ret.a = ret.b = 0;
      return ret;
    }
    let a_ = Math.cos(h / 180 * Math.PI);
    let b_ = Math.sin(h / 180 * Math.PI);
    let [C_0, C_mid, C_max] = get_Cs(ret.l, a_, b_);
    let t, k_0, k_1, k_2;
    if (s < 0.8) {
      t = 1.25 * s;
      k_0 = 0;
      k_1 = 0.8 * C_0;
      k_2 = 1 - k_1 / C_mid;
    } else {
      t = 5 * (s - 0.8);
      k_0 = C_mid;
      k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
      k_2 = 1 - k_1 / (C_max - C_mid);
    }
    let C = k_0 + t * k_1 / (1 - k_2 * t);
    ret.a = C * a_;
    ret.b = C * b_;
    return ret;
  }

  // node_modules/culori/src/okhsl/modeOkhsl.js
  var modeOkhsl = __spreadProps(__spreadValues({}, definition_default2), {
    mode: "okhsl",
    channels: ["h", "s", "l", "alpha"],
    parse: ["--okhsl"],
    serialize: "--okhsl",
    fromMode: {
      oklab: convertOklabToOkhsl,
      rgb: (c2) => convertOklabToOkhsl(convertRgbToOklab_default(c2))
    },
    toMode: {
      oklab: convertOkhslToOklab,
      rgb: (c2) => convertOklabToRgb_default(convertOkhslToOklab(c2))
    }
  });
  var modeOkhsl_default = modeOkhsl;

  // node_modules/culori/src/oklab/parseOklab.js
  function parseOklab(color, parsed) {
    if (!parsed || parsed[0] !== "oklab") {
      return void 0;
    }
    const res = { mode: "oklab" };
    const [, l, a, b, alpha] = parsed;
    if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
      return void 0;
    }
    if (l.type !== Tok.None) {
      res.l = Math.min(
        Math.max(0, l.type === Tok.Number ? l.value : l.value / 100),
        1
      );
    }
    if (a.type !== Tok.None) {
      res.a = a.type === Tok.Number ? a.value : a.value * 0.4 / 100;
    }
    if (b.type !== Tok.None) {
      res.b = b.type === Tok.Number ? b.value : b.value * 0.4 / 100;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseOklab_default = parseOklab;

  // node_modules/culori/src/oklab/definition.js
  var definition7 = __spreadProps(__spreadValues({}, definition_default4), {
    mode: "oklab",
    toMode: {
      lrgb: convertOklabToLrgb_default,
      rgb: convertOklabToRgb_default
    },
    fromMode: {
      lrgb: convertLrgbToOklab_default,
      rgb: convertRgbToOklab_default
    },
    ranges: {
      l: [0, 1],
      a: [-0.4, 0.4],
      b: [-0.4, 0.4]
    },
    parse: [parseOklab_default],
    serialize: (c2) => `oklab(${c2.l !== void 0 ? c2.l : "none"} ${c2.a !== void 0 ? c2.a : "none"} ${c2.b !== void 0 ? c2.b : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`
  });
  var definition_default7 = definition7;

  // node_modules/culori/src/oklch/parseOklch.js
  function parseOklch(color, parsed) {
    if (!parsed || parsed[0] !== "oklch") {
      return void 0;
    }
    const res = { mode: "oklch" };
    const [, l, c2, h, alpha] = parsed;
    if (l.type !== Tok.None) {
      if (l.type === Tok.Hue) {
        return void 0;
      }
      res.l = Math.min(
        Math.max(0, l.type === Tok.Number ? l.value : l.value / 100),
        1
      );
    }
    if (c2.type !== Tok.None) {
      res.c = Math.max(
        0,
        c2.type === Tok.Number ? c2.value : c2.value * 0.4 / 100
      );
    }
    if (h.type !== Tok.None) {
      if (h.type === Tok.Percentage) {
        return void 0;
      }
      res.h = h.value;
    }
    if (alpha.type !== Tok.None) {
      res.alpha = Math.min(
        1,
        Math.max(
          0,
          alpha.type === Tok.Number ? alpha.value : alpha.value / 100
        )
      );
    }
    return res;
  }
  var parseOklch_default = parseOklch;

  // node_modules/culori/src/oklch/definition.js
  var definition8 = __spreadProps(__spreadValues({}, definition_default5), {
    mode: "oklch",
    toMode: {
      oklab: (c2) => convertLchToLab_default(c2, "oklab"),
      rgb: (c2) => convertOklabToRgb_default(convertLchToLab_default(c2, "oklab"))
    },
    fromMode: {
      rgb: (c2) => convertLabToLch_default(convertRgbToOklab_default(c2), "oklch"),
      oklab: (c2) => convertLabToLch_default(c2, "oklch")
    },
    parse: [parseOklch_default],
    serialize: (c2) => `oklch(${c2.l !== void 0 ? c2.l : "none"} ${c2.c !== void 0 ? c2.c : "none"} ${c2.h !== void 0 ? c2.h : "none"}${c2.alpha < 1 ? ` / ${c2.alpha}` : ""})`,
    ranges: {
      l: [0, 1],
      c: [0, 0.4],
      h: [0, 360]
    }
  });
  var definition_default8 = definition8;

  // node_modules/culori/src/p3/convertP3ToXyz65.js
  var convertP3ToXyz65 = (rgb) => {
    let { r, g, b, alpha } = convertRgbToLrgb_default(rgb);
    let res = {
      mode: "xyz65",
      x: 0.486570948648216 * r + 0.265667693169093 * g + 0.1982172852343625 * b,
      y: 0.2289745640697487 * r + 0.6917385218365062 * g + 0.079286914093745 * b,
      z: 0 * r + 0.0451133818589026 * g + 1.043944368900976 * b
    };
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertP3ToXyz65_default = convertP3ToXyz65;

  // node_modules/culori/src/p3/convertXyz65ToP3.js
  var convertXyz65ToP3 = ({ x, y, z, alpha }) => {
    if (x === void 0) x = 0;
    if (y === void 0) y = 0;
    if (z === void 0) z = 0;
    let res = convertLrgbToRgb_default(
      {
        r: x * 2.4934969119414263 - y * 0.9313836179191242 - 0.402710784450717 * z,
        g: x * -0.8294889695615749 + y * 1.7626640603183465 + 0.0236246858419436 * z,
        b: x * 0.0358458302437845 - y * 0.0761723892680418 + 0.9568845240076871 * z
      },
      "p3"
    );
    if (alpha !== void 0) {
      res.alpha = alpha;
    }
    return res;
  };
  var convertXyz65ToP3_default = convertXyz65ToP3;

  // node_modules/culori/src/p3/definition.js
  var definition9 = __spreadProps(__spreadValues({}, definition_default), {
    mode: "p3",
    parse: ["display-p3"],
    serialize: "display-p3",
    fromMode: {
      rgb: (color) => convertXyz65ToP3_default(convertRgbToXyz65_default(color)),
      xyz65: convertXyz65ToP3_default
    },
    toMode: {
      rgb: (color) => convertXyz65ToRgb_default(convertP3ToXyz65_default(color)),
      xyz65: convertP3ToXyz65_default
    }
  });
  var definition_default9 = definition9;

  // node_modules/culori/src/wcag.js
  function luminance(color) {
    let c2 = converter_default("lrgb")(color);
    return 0.2126 * c2.r + 0.7152 * c2.g + 0.0722 * c2.b;
  }
  function contrast(a, b) {
    let L1 = luminance(a);
    let L2 = luminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  // src/en.js
  var words = {
    black: {
      description: [
        "Black is the absence of light: the deepest, most grounded color there is. It reads as formal, powerful and definitive, and it makes every other color beside it look brighter. Very dark tints of a hue are still black to the eye, with only a faint cast that shows up next to a pure black. In design, black carries weight and authority, from typography and luxury packaging to stage and cinema. Picture black as the velvet backdrop that lets everything else shine."
      ],
      meanings: ["power", "elegance", "formality", "mystery", "authority"],
      effects: [
        "intimidate",
        "signal authority",
        "add contrast",
        "focus attention"
      ],
      usage: ["luxury", "typography", "fashion", "technology", "backgrounds"]
    },
    grey: {
      description: [
        "Grey is a quiet, neutral color that often reads as balanced, practical, and composed. It can feel like overcast skies, polished stone, soft shadows, or pencil graphite\u2014present without demanding attention. In design, grey is a reliable foundation: it supports bright accents, creates contrast without harshness, and fits both minimal and classic palettes. Depending on context, it can suggest calm and sophistication, or distance and restraint. Imagine grey as a gentle haze that smooths edges and lets other colors speak."
      ],
      meanings: [
        "neutrality",
        "balance",
        "calm",
        "restraint",
        "practicality",
        "stability",
        "professionalism",
        "sophistication"
      ],
      effects: ["neutralize", "calm", "recede", "balance"],
      usage: [
        "backgrounds",
        "typography",
        "minimal design",
        "interfaces",
        "product design",
        "architecture"
      ]
    },
    white: {
      description: [
        "White is commonly associated with clarity, simplicity, and cleanliness. It can evoke fresh snow, bright daylight, a blank page, or crisp fabric\u2014space that feels open and breathable. In design, white creates room for content, improves legibility, and helps other colors feel more vivid by contrast. It can communicate honesty and calm, but in excess it may also feel sterile or impersonal. Picture white as a clean, bright backdrop that makes everything around it feel sharper and lighter."
      ],
      meanings: [
        "purity",
        "cleanliness",
        "simplicity",
        "innocence",
        "freshness",
        "light",
        "goodness",
        "virtue",
        "safety",
        "peace",
        "tranquility",
        "wholeness",
        "perfection",
        "honesty",
        "truth",
        "sincerity"
      ],
      effects: ["clarify", "open up space", "clean", "lighten"],
      usage: [
        "health",
        "hospital",
        "sanitary",
        "weddings",
        "bridal",
        "minimalism",
        "dairy",
        "clean beauty",
        "winter themes"
      ]
    },
    pink: {
      description: [
        "Pink often feels warm and kind, associated with care, tenderness, and playful joy. It can evoke blossoms, candy, soft fabric, or sunset clouds\u2014gentle and inviting. In design, pink ranges from subtle and comforting to bright and energetic, depending on saturation. It can communicate affection and approachability, or boldness when pushed toward hot pink. Picture pink as a soft glow that adds friendliness and charm to a scene."
      ],
      meanings: [
        "support",
        "kindness",
        "change",
        "harmony",
        "kink",
        "charm",
        "politeness",
        "sensitivity",
        "tenderness",
        "sweetness",
        "femininity",
        "romance",
        "seductiveness",
        "sexiness"
      ],
      effects: ["soothe", "comfort", "soften", "signal affection"],
      usage: [
        "children's products",
        "erotica",
        "cosmetics",
        "pop culture",
        "fashion",
        "confectionery",
        "romance",
        "floral"
      ]
    },
    red: {
      description: [
        "Red is energetic and attention-grabbing, often linked with passion, heat, and urgency. It can feel like firelight, ripe fruit, warning signs, or a racing heartbeat\u2014immediate and hard to ignore. In design, red is frequently used for calls to action, alerts, and emphasis, because it reads as high-intensity and high-priority. It can communicate love and celebration, but also anger or danger depending on context. Picture red as a bright spark that pulls the eye and raises the emotional volume."
      ],
      meanings: [
        "excitement",
        "energy",
        "passion",
        "courage",
        "attention",
        "lust",
        "power",
        "love",
        "speed",
        "anger",
        "danger",
        "ferocity",
        "violence",
        "fury",
        "vigor",
        "urgency"
      ],
      effects: [
        "stimulate",
        "create urgency",
        "draw attention",
        "encourage",
        "excite",
        "heighten arousal"
      ],
      usage: [
        "caution",
        "food industry",
        "sports",
        "sales",
        "entertainment",
        "romance",
        "emergency services"
      ]
    },
    orange: {
      description: [
        "Orange feels warm, friendly, and optimistic\u2014like sunset light, citrus peel, or autumn leaves. It carries energy without the sharp intensity of red, making it a popular choice for playful brands and welcoming interfaces. In design, orange often signals movement, creativity, and approachability, and it can work well for highlights and calls to action. Depending on saturation, it can read as cheerful and casual or bold and adventurous. Imagine orange as a cozy glow that invites you in."
      ],
      meanings: ["optimism", "independence", "adventure", "creativity", "fun"],
      effects: ["stimulate", "draw attention", "express freedom", "fascinate"],
      usage: [
        "food and beverages",
        "sports",
        "construction safety",
        "youth marketing",
        "autumn themes",
        "Halloween"
      ]
    },
    yellow: {
      description: [
        "Yellow is bright and uplifting, often linked with sunshine, optimism, and alertness. It can feel like morning light, gold, flowers, or caution tape\u2014cheerful but highly noticeable. In design, yellow works well for highlights and friendly emphasis, but large blocks can become visually tiring if too intense. Softer yellows can feel warm and gentle; vivid yellows feel energetic and attention-focused. Imagine yellow as a beam of light that instantly warms a scene."
      ],
      meanings: [
        "enthusiasm",
        "opportunity",
        "spontaneity",
        "happiness",
        "positivity"
      ],
      effects: [
        "stimulate",
        "relax",
        "awake awareness",
        "energize",
        "affect mood",
        "convey competence"
      ],
      usage: ["sale", "cheap", "budget", "construction"]
    },
    olive: {
      description: [
        "Olive is a dark, earthy yellow-green that feels natural and understated. It evokes Mediterranean landscapes, military camouflage, and ripe olive groves\u2014rugged, organic, and grounded. In design, olive works well for outdoor, military, or natural aesthetics, adding warmth without brightness. It can signal durability and practicality, or a connection to the earth. Picture olive as the muted green of sun-dried leaves and weathered canvas."
      ],
      meanings: [
        "nature",
        "earthiness",
        "peace",
        "resilience",
        "tradition",
        "humility"
      ],
      effects: ["ground", "calm", "reassure"],
      usage: [
        "military",
        "outdoor brands",
        "organic products",
        "nature themes",
        "fashion"
      ]
    },
    brown: {
      description: [
        "Brown is earthy and grounded, often associated with wood, soil, leather, and natural materials. It tends to feel steady and dependable, bringing warmth without shouting for attention. In design, brown can signal craft, tradition, and comfort\u2014useful for organic, artisanal, or heritage aesthetics. Lighter browns can feel cozy and approachable, while deeper browns can feel rich and classic. Picture brown as a warm, solid surface you can lean on."
      ],
      meanings: [
        "strength",
        "reliability",
        "resilience",
        "loneliness",
        "sadness",
        "isolation",
        "warmth",
        "comfort",
        "security"
      ],
      effects: ["ground", "reassure", "warm", "steady"],
      usage: [
        "agriculture",
        "legal",
        "food",
        "tobacco",
        "alcohol",
        "coffee",
        "chocolate",
        "craft and artisan",
        "organic products",
        "vintage and retro"
      ]
    },
    beige: {
      description: [
        "Beige is a light and versatile neutral color that subtly blends soft tones of brown and white. This hue is positioned toward the lighter end of the brown spectrum on the color wheel. It resembles a pale cream rather than spanning to darker hues like taupe, and offers a warm, understated elegance."
      ],
      meanings: ["warmth", "elegance", "neutrality", "calm"],
      effects: ["calm", "soften", "recede"],
      usage: [
        "backgrounds",
        "interiors",
        "fashion",
        "neutral accents",
        "cosmetics",
        "luxury packaging",
        "spa and wellness",
        "stationery"
      ]
    },
    lime: {
      description: [
        "Lime is a sharp, zesty green-yellow that feels fresh and high-energy. It can evoke citrus, neon signs, sportswear, or new leaves\u2014bright, youthful, and a little electric. In design, lime is often used to signal novelty, motion, and visibility, especially as an accent or highlight. It can read as playful and modern, but it can also feel loud if overused. Picture lime as a vivid splash that wakes up a palette instantly."
      ],
      meanings: ["growth", "harmony", "fertility", "kindness", "dependability"],
      effects: [
        "restore energy",
        "promote growth",
        "awake awareness",
        "rejuvenate"
      ],
      usage: ["nature", "energy drinks", "sports", "gaming"]
    },
    green: {
      description: [
        'Green is strongly associated with nature, growth, and renewal\u2014grass, forests, and fresh herbs. It often feels restorative and balanced, making it a common choice for wellness, sustainability, and "safe/ok" signals. In design, green can communicate stability and harmony, or wealth and success depending on context. Dark greens can feel serious and grounded; bright greens can feel energetic and modern. Imagine green as a breath of air that resets the mood and steadies the scene.'
      ],
      meanings: ["safety", "harmony", "stability", "reliability", "balance"],
      effects: ["relax", "balance", "revitalize", "encourage"],
      usage: [
        "sustainability",
        "organic and natural",
        "finance",
        "pharmacy",
        "gardening",
        "eco"
      ]
    },
    teal: {
      description: [
        "Teal is a blue-green that feels balanced and sophisticated, often evoking ocean water, tropical lagoons, and polished gemstones. It sits at the intersection of green's natural calm and blue's cool authority. In design, teal is popular for brands seeking a modern, trustworthy look that feels less corporate than pure blue. Depending on lightness, it can read as refreshing and lively or deep and mysterious. Picture teal as the color where water meets sky at the horizon."
      ],
      meanings: [
        "sophistication",
        "clarity",
        "calm",
        "balance",
        "refreshing",
        "trust"
      ],
      effects: ["soothe"],
      usage: [
        "healthcare",
        "wellness",
        "technology",
        "communication",
        "hospitality"
      ]
    },
    blue: {
      description: [
        "Blue often feels calm, steady, and trustworthy\u2014like open sky, deep water, or cool shade. It's widely used in design to communicate reliability and competence, especially in finance, security, and healthcare. Lighter blues can feel airy and friendly; darker blues feel formal and authoritative. Blue can also read as distant or reserved when overused. Imagine blue as a stable horizon line that quiets the noise and brings order."
      ],
      meanings: [
        "trust",
        "responsibility",
        "honesty",
        "loyalty",
        "security",
        "reliability",
        "calmness",
        "control"
      ],
      effects: ["calm", "reassure"],
      usage: [
        "security",
        "finance",
        "technology",
        "healthcare",
        "accounting",
        "social media",
        "government",
        "law enforcement",
        "nautical"
      ]
    },
    purple: {
      description: [
        "Purple is often linked with creativity, luxury, and a sense of the uncommon. It blends the calm of blue with the energy of red, which can make it feel both soothing and expressive. In design, purple can signal premium experiences, artistry, and individuality, and it pairs well with neutrals for a refined look. Lighter purples feel soft and whimsical; deeper purples feel dramatic and regal. Picture purple as a rich fabric draped over a scene\u2014adding depth, mood, and personality."
      ],
      meanings: [
        "spirituality",
        "structure",
        "compassion",
        "sensitivity",
        "mystery",
        "tolerance",
        "integrity",
        "order",
        "wisdom",
        "inspiration"
      ],
      effects: ["inspire", "intrigue", "elevate"],
      usage: [
        "luxury",
        "religion",
        "psychic",
        "royalty",
        "creativity",
        "gaming",
        "confectionery",
        "wine",
        "counterculture"
      ]
    },
    navy: {
      description: [
        "Navy is a dark, authoritative blue that feels professional and dependable. It evokes naval uniforms, deep ocean water, and twilight sky\u2014serious but approachable. In design, navy is a versatile near-neutral that works as a softer alternative to black, lending depth and formality without harshness. It pairs well with almost any accent color and reads as classic and timeless. Picture navy as the deep blue of a clear night sky just after sunset."
      ],
      meanings: [
        "authority",
        "trust",
        "stability",
        "professionalism",
        "tradition",
        "confidence",
        "reliability"
      ],
      effects: ["reassure", "signal authority", "steady"],
      usage: [
        "corporate",
        "finance",
        "uniforms",
        "formal design",
        "nautical themes"
      ]
    },
    maroon: {
      description: [
        "Maroon is a dark, rich red that feels grounded and dignified. It evokes aged wine, dark leather, and autumn foliage\u2014warm but restrained. In design, maroon carries the intensity of red with added depth and formality, making it a popular choice for institutions, luxury branding, and elegant print. It can communicate tradition, confidence, and seriousness without the aggressiveness of brighter reds. Picture maroon as a deep ember that glows with quiet authority."
      ],
      meanings: [
        "strength",
        "courage",
        "warmth",
        "intensity",
        "ambition",
        "confidence",
        "tradition"
      ],
      effects: ["ground", "warm", "signal seriousness"],
      usage: [
        "luxury",
        "academic",
        "formal design",
        "autumn themes",
        "wine branding"
      ]
    },
    gold: {
      description: [
        "Gold and mustard are dark, rich yellows. Gold is the warm, lustrous yellow of the metal and of autumn light; mustard is its earthier, more muted cousin. Both feel warm, confident and a little retro. In design they add richness where plain yellow would feel loud. Picture gold as a brass fixture catching the light, and mustard as a wool scarf in October."
      ],
      meanings: ["wealth", "warmth", "success", "tradition"],
      effects: ["warm", "enrich", "signal value"],
      usage: ["luxury", "autumn", "retro", "packaging"]
    },
    peach: {
      description: [
        "Peach is a soft, light orange with a touch of pink, like the skin of the fruit. It feels gentle, warm and friendly, and is a favourite for skin tones, sunsets and summery pastels. In design it works as a warm neutral or a tender accent that never shouts. Picture peach as late afternoon light on a plastered wall."
      ],
      meanings: ["warmth", "gentleness", "youth", "friendliness"],
      effects: ["soften", "warm", "comfort"],
      usage: ["cosmetics", "wedding", "summer", "food"]
    },
    sand: {
      description: [
        "A light, warm brown: sand, leather, camel hair, a summer beach. It is one of the great quiet neutrals, warmer than grey and softer than a full brown, and it pairs with almost anything. In design it reads as natural, relaxed and a little classic. Picture a worn leather satchel in the sun."
      ],
      meanings: ["nature", "reliability", "comfort", "simplicity"],
      effects: ["ground", "reassure", "warm", "steady"],
      usage: ["fashion", "interiors", "leather goods", "outdoor"]
    },
    salmon: {
      description: [
        "Salmon is a pinkish orange, between coral and peach, named after the flesh of the fish. It feels warm, healthy and appetising, softer than coral and livelier than peach. In design it works well for food, wellness and friendly consumer brands. Picture salmon as a sunset reflected on wet sand."
      ],
      meanings: ["warmth", "health", "appetite", "friendliness"],
      effects: ["warm", "stimulate appetite", "cheer"],
      usage: ["food", "wellness", "summer", "fashion"]
    },
    mauve: {
      description: [
        "Mauve is a greyish pinkish purple, dusty and restrained. It carries a Victorian, slightly faded elegance, and it is one of the few purples that works as a near-neutral. In design it reads as soft, mature and a little nostalgic. Picture mauve as dried rose petals."
      ],
      meanings: ["nostalgia", "elegance", "softness", "maturity"],
      effects: ["soften", "calm", "evoke nostalgia"],
      usage: ["fashion", "interiors", "cosmetics", "stationery"]
    },
    mint: {
      description: [
        "Mint is a pale, fresh green with a hint of blue, like the leaf or the sweet. It feels clean, cool and refreshing, and it is a natural pastel for spring and health themes. In design mint lifts a palette without adding weight. Picture mint as a scoop of ice cream on a hot day."
      ],
      meanings: ["freshness", "cleanliness", "calm", "youth"],
      effects: ["refresh", "cool", "lighten"],
      usage: ["health", "spring", "food", "pastel palettes"]
    },
    turquoise: {
      description: [
        "Turquoise and aqua are bright greenish blues named after the gemstone and after water. They feel tropical, clean and energetic, the colour of shallow seas over sand. In design they suggest holidays, swimming pools and freshness, and they carry more warmth than plain cyan. Picture turquoise as a lagoon seen from above."
      ],
      meanings: ["freshness", "tropics", "clarity", "energy"],
      effects: ["refresh", "energize", "cool"],
      usage: ["travel", "swimwear", "summer", "water"]
    },
    cyan: {
      description: [
        "Cyan is crisp and cool, often evoking clear water, bright skies, and clean air. It tends to feel refreshing and modern\u2014light enough to be friendly, but cool enough to be precise. In design, cyan can suggest clarity, communication, and technology, and it works well for bright accents on dark backgrounds. Depending on context, it can feel playful and youthful or sleek and professional. Picture cyan as a splash of cold water: sharp, energizing, and clean."
      ],
      meanings: [
        "freedom",
        "trust",
        "wisdom",
        "joy",
        "refreshing",
        "consciousness",
        "stimulating"
      ],
      effects: ["self-expression", "refresh"],
      usage: [
        "communication",
        "children's products",
        "technology",
        "aerospace",
        "entertainment",
        "productivity"
      ]
    },
    skyBlue: {
      description: [
        "Sky blue is a light, clear blue, the colour of a cloudless day. It feels open, calm and optimistic, and it is the most universally liked of the blues. In design it reads as friendly and trustworthy without the weight of a dark blue. Picture sky blue as the view from a window in summer."
      ],
      meanings: ["openness", "calm", "optimism", "freedom"],
      effects: ["open up", "calm", "lighten"],
      usage: ["air travel", "childhood", "wellness", "backgrounds"]
    },
    periwinkle: {
      description: [
        "Periwinkle is a soft blue with a touch of lavender, named after the flower. It feels calm, airy and slightly dreamy, sitting exactly where blue turns into purple. In design it is a gentle alternative to sky blue with a little more character. Picture periwinkle as a hazy morning sky."
      ],
      meanings: ["calm", "dreaminess", "gentleness", "serenity"],
      effects: ["calm", "soothe", "soften"],
      usage: ["stationery", "wellness", "pastel palettes", "bedding"]
    },
    indigo: {
      description: [
        "Indigo is deep and contemplative, sitting between blue's steadiness and purple's imagination. It can evoke twilight, ink, denim, and night skies\u2014quiet, thoughtful, and a little mysterious. In design, indigo often feels sophisticated and layered, adding depth without the starkness of pure black. It can suggest introspection, tradition, or spirituality depending on context. Picture indigo as dusk settling in: calm, rich, and full of hidden detail."
      ],
      meanings: ["intuition", "wisdom", "depth", "spirituality", "integrity"],
      effects: ["deepen", "focus", "calm"],
      usage: ["denim", "luxury", "spiritual", "night themes", "print"]
    },
    lavender: {
      description: [
        "Lavender is a soft, light purple that feels gentle and refined. It evokes lavender fields, spring blossoms, and soft fabric\u2014calm, romantic, and slightly whimsical. In design, lavender adds a feminine, soothing touch without the intensity of deeper purples. It works well for wellness brands, cosmetics, and any context that wants to feel approachable and delicate. Picture lavender as a light haze of purple that softens everything it touches."
      ],
      meanings: [
        "grace",
        "elegance",
        "calm",
        "femininity",
        "youth",
        "serenity",
        "refinement"
      ],
      effects: ["relax", "soothe", "soften"],
      usage: [
        "cosmetics",
        "wellness",
        "spring themes",
        "weddings",
        "children's products"
      ]
    },
    violet: {
      description: [
        "Violet is the bluer side of purple, the colour of the flower and the last band of the rainbow. It feels mystical, refined and a little cooler than purple proper. In design it reads as creative and spiritual, and it sits well next to blues. Picture violet as the sky a few minutes after sunset."
      ],
      meanings: ["mystery", "creativity", "spirituality", "refinement"],
      effects: ["intrigue", "inspire", "calm"],
      usage: ["beauty", "spiritual", "creative", "fashion"]
    },
    magenta: {
      description: [
        "Magenta is bold and expressive, often associated with creativity, intensity, and modern flair. It can feel like neon signage, stage lights, or vivid flowers\u2014lively and unapologetic. In design, magenta is often used as a punchy accent to add energy and personality, especially in contemporary or playful palettes. It can read as romantic and warm, but also edgy and unconventional. Imagine magenta as a bright pulse that makes a layout feel instantly more alive."
      ],
      meanings: [
        "creativity",
        "boldness",
        "imagination",
        "transformation",
        "nonconformity"
      ],
      effects: ["energize", "draw attention", "provoke"],
      usage: ["pop culture", "printing", "nightlife", "fashion", "tech branding"]
    },
    plum: {
      description: [
        "Plum is a dark, rich purple with a hint of red, like the skin of the fruit. It feels deep, luxurious and grown-up, warmer than navy and softer than black. In design plum works as a dramatic dark or a moody accent. Picture plum as velvet in low light."
      ],
      meanings: ["luxury", "depth", "maturity", "drama"],
      effects: ["enrich", "ground", "add depth"],
      usage: ["fashion", "wine", "interiors", "cosmetics"]
    }
  };
  var en_default = {
    descriptions: [
      // ===========================
      // Character words (hue-agnostic, from OKLCH lightness and chroma plus
      // okhsl saturation, which is chroma relative to what sRGB can show at
      // that lightness and hue). Entries are in priority order: the first
      // entry that matches gives the first adjective, later matches add
      // secondary words. Every region was judged by eye on the testbench.
      // ===========================
      // -- neutral axis (chroma below 0.012)
      {
        // white
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.012],
            l: [0.97, 1.001]
          }
        },
        descriptive: ["bright", "pure", "clean", "colorless"]
      },
      {
        // light greys
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.012],
            l: [0.65, 0.97]
          }
        },
        descriptive: ["light", "pale", "neutral"]
      },
      {
        // mid greys
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.012],
            l: [0.35, 0.65]
          }
        },
        descriptive: ["neutral", "medium", "colorless"]
      },
      {
        // dark greys
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.012],
            l: [0.22, 0.35]
          }
        },
        descriptive: ["dark", "neutral", "shady"]
      },
      // -- black nouns (the near-black rule in the matcher skips hue entries)
      // Near black. In the survey "black" is the most common answer up to about
      // L 0.32 at low chroma. The matcher skips hue entries in the darkest part.
      __spreadValues({
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.045],
            l: [0, 0.32]
          }
        },
        nouns: ["black"]
      }, words.black),
      // Very dark but slightly more chromatic: black still wins or ties the
      // vote up to L 0.25; the hue noun comes second.
      __spreadValues({
        criteria: {
          oklch: {
            h: null,
            c: [0.045, 0.1],
            l: [0, 0.25]
          }
        },
        nouns: ["black"]
      }, words.black),
      // -- yellows and golds: dark yellow reads as mustard, not as vivid
      {
        criteria: {
          oklch: {
            h: [80, 115],
            c: [0.06, 0.16],
            l: [0.85, 1.001]
          }
        },
        descriptive: ["light", "pastel", "delicate"]
      },
      {
        criteria: {
          oklch: {
            h: [70, 115],
            c: [0.085, 0.5],
            l: [0.55, 0.85]
          },
          okhsl: {
            s: [0.4, 0.75]
          }
        },
        descriptive: ["muted", "mellow", "dull"]
      },
      {
        criteria: {
          oklch: {
            h: [70, 115],
            c: [0.085, 0.5],
            l: [0.55, 0.85]
          },
          okhsl: {
            s: [0.75, 1.01]
          }
        },
        descriptive: ["rich", "golden", "warm"]
      },
      // -- dark
      {
        // black
        criteria: {
          oklch: {
            h: null,
            c: null,
            l: [0, 0.1]
          }
        },
        descriptive: ["pure", "pitch", "deep"]
      },
      {
        // off-black
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.025],
            l: [0.1, 0.28]
          }
        },
        descriptive: ["deep", "inky", "sooty"]
      },
      {
        // dark and colorful: deep red, deep blue
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.25, 0.42]
          },
          okhsl: {
            s: [0.6, 1.01]
          }
        },
        descriptive: ["deep", "rich", "dark"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.15, 0.25]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["deep", "rich", "inky"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: null,
            l: [0, 0.25]
          }
        },
        descriptive: ["very dark", "inky", "gloomy"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: null,
            l: [0.25, 0.4]
          }
        },
        descriptive: ["dark", "dim", "somber"]
      },
      // -- low chroma
      // faint tints read as warm or cool greys: warm grey, cool grey blue
      {
        criteria: {
          oklch: {
            h: [330, 360],
            c: [0.012, 0.05],
            l: [0.4, 0.78]
          }
        },
        descriptive: ["warm", "muted", "greyish", "dusty"]
      },
      {
        criteria: {
          oklch: {
            h: [0, 125],
            c: [0.012, 0.05],
            l: [0.4, 0.78]
          }
        },
        descriptive: ["warm", "muted", "greyish", "dusty"]
      },
      {
        criteria: {
          oklch: {
            h: [125, 330],
            c: [0.012, 0.05],
            l: [0.4, 0.78]
          }
        },
        descriptive: ["cool", "muted", "greyish", "dusty"]
      },
      {
        // pale pink, pale blue
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.06],
            l: [0.78, 1.001]
          }
        },
        descriptive: ["pale", "delicate", "faded"]
      },
      // -- very light
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.1, 0.5],
            l: [0.9, 1.001]
          },
          okhsl: {
            s: [0.75, 1.01]
          }
        },
        descriptive: ["bright", "light", "luminous"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.06, 0.5],
            l: [0.9, 1.001]
          },
          okhsl: {
            s: [0, 0.75]
          }
        },
        descriptive: ["light", "pastel", "delicate"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.06, 0.1],
            l: [0.9, 1.001]
          },
          okhsl: {
            s: [0.75, 1.01]
          }
        },
        descriptive: ["light", "delicate"]
      },
      // -- light
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.11, 0.5],
            l: [0.75, 0.9]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["bright", "vivid", "brilliant", "glowing"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.75, 0.9]
          },
          okhsl: {
            s: [0.62, 1.01]
          }
        },
        descriptive: ["light", "soft", "fresh"]
      },
      {
        // light beiges and sands read as soft rather than pastel
        criteria: {
          oklch: {
            h: [30, 100],
            c: [0.05, 0.5],
            l: [0.75, 0.9]
          },
          okhsl: {
            s: [0, 0.62]
          }
        },
        descriptive: ["soft", "light", "warm"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.75, 0.9]
          },
          okhsl: {
            s: [0, 0.62]
          }
        },
        descriptive: ["pastel", "soft", "light"]
      },
      // -- mid
      // (yellows and golds between 70 and 115 have their own entries above)
      {
        criteria: {
          oklch: {
            h: [0, 70],
            c: [0.05, 0.5],
            l: [0.65, 0.75]
          },
          okhsl: {
            s: [0.7, 1.01]
          }
        },
        descriptive: ["bright", "vivid", "brilliant", "glowing"]
      },
      {
        criteria: {
          oklch: {
            h: [115, 360],
            c: [0.05, 0.5],
            l: [0.65, 0.75]
          },
          okhsl: {
            s: [0.7, 1.01]
          }
        },
        descriptive: ["bright", "vivid", "brilliant", "glowing"]
      },
      // browns and olives at full saturation are rich, never vivid
      {
        criteria: {
          oklch: {
            h: [20, 90],
            c: [0.05, 0.5],
            l: [0.4, 0.6]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["rich", "strong", "warm"]
      },
      {
        criteria: {
          oklch: {
            h: [88, 135],
            c: [0.05, 0.5],
            l: [0.4, 0.65]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["rich", "strong", "full"]
      },
      // (browns 20-88 below L 0.6 and olives 88-135 are covered above)
      {
        criteria: {
          oklch: {
            h: [0, 20],
            c: [0.05, 0.5],
            l: [0.4, 0.65]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["vivid", "vibrant", "strong", "bold", "saturated"]
      },
      {
        criteria: {
          oklch: {
            h: [20, 88],
            c: [0.05, 0.5],
            l: [0.6, 0.65]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["vivid", "vibrant", "strong", "bold", "saturated"]
      },
      {
        criteria: {
          oklch: {
            h: [135, 360],
            c: [0.05, 0.5],
            l: [0.4, 0.65]
          },
          okhsl: {
            s: [0.8, 1.01]
          }
        },
        descriptive: ["vivid", "vibrant", "strong", "bold", "saturated"]
      },
      // (yellows and golds between 70 and 115 have their own entries above)
      {
        criteria: {
          oklch: {
            h: [0, 70],
            c: [0.05, 0.5],
            l: [0.4, 0.75]
          },
          okhsl: {
            s: [0.62, 0.8]
          }
        },
        descriptive: ["rich", "full", "medium"]
      },
      {
        criteria: {
          oklch: {
            h: [115, 360],
            c: [0.05, 0.5],
            l: [0.4, 0.75]
          },
          okhsl: {
            s: [0.62, 0.8]
          }
        },
        descriptive: ["rich", "full", "medium"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.62, 0.75]
          },
          okhsl: {
            s: [0.45, 0.62]
          }
        },
        descriptive: ["soft", "light", "fresh"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.4, 0.62]
          },
          okhsl: {
            s: [0.45, 0.62]
          }
        },
        descriptive: ["medium", "moderate"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.05, 0.5],
            l: [0.4, 0.75]
          },
          okhsl: {
            s: [0, 0.45]
          }
        },
        descriptive: ["muted", "dull", "matte", "soft"]
      },
      // -- secondary words
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.2, 0.5],
            l: [0.75, 0.95]
          }
        },
        descriptive: ["neon", "fluorescent"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.02, 0.5],
            l: [0.92, 1]
          }
        },
        descriptive: ["luminous"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.1],
            l: [0, 0.5]
          },
          okhsl: {
            s: [0, 0.6]
          }
        },
        descriptive: ["dim", "gloomy", "dull"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.12],
            l: [0.25, 0.65]
          },
          okhsl: {
            s: [0, 0.55]
          }
        },
        descriptive: ["matte", "dusty", "ashy"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.15, 0.5],
            l: [0.55, 0.85]
          }
        },
        descriptive: ["fresh", "sparkling"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.01, 0.035],
            l: [0.22, 0.99]
          }
        },
        descriptive: ["almost grey"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0, 0.3]
          }
        },
        descriptive: ["very unsaturated"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0.3, 0.45]
          }
        },
        descriptive: ["unsaturated"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0.45, 0.6]
          }
        },
        descriptive: ["rather unsaturated"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.012, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0.6, 0.75]
          }
        },
        descriptive: ["fairly saturated"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.1, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0.75, 0.9]
          }
        },
        descriptive: ["saturated"]
      },
      {
        criteria: {
          oklch: {
            h: null,
            c: [0.14, 0.5],
            l: [0.22, 0.99]
          },
          okhsl: {
            s: [0.9, 1.01]
          }
        },
        descriptive: ["highly saturated"]
      },
      __spreadValues({
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.012],
            l: [0.15, 0.98]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      __spreadValues({
        criteria: {
          oklch: {
            h: [80, 345],
            c: [0.012, 0.045],
            l: [0.32, 0.92]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.012, 0.025],
            l: [0.32, 0.92]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 80],
            c: [0.012, 0.025],
            l: [0.32, 0.92]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.025, 0.045],
            l: [0.45, 0.92]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 80],
            c: [0.025, 0.045],
            l: [0.45, 0.92]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      {
        criteria: {
          oklch: {
            h: [0, 120],
            c: [0.05, 0.5],
            l: [0.15, 1]
          }
        },
        descriptive: ["warm", "mellow"]
      },
      {
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.05, 0.5],
            l: [0.15, 1]
          }
        },
        descriptive: ["warm", "mellow"]
      },
      {
        criteria: {
          oklch: {
            h: [163, 327],
            c: [0.05, 0.5],
            l: [0.15, 1]
          }
        },
        descriptive: ["cold", "cool"]
      },
      // ===========================
      // White & Black nouns
      // ===========================
      __spreadValues({
        criteria: {
          oklch: {
            h: null,
            c: null,
            l: [0.97, 1.001]
          }
        },
        nouns: ["white"]
      }, words.white),
      __spreadValues({
        // off-white: too faint a tint to be called anything but white
        criteria: {
          oklch: {
            h: null,
            c: [0, 0.025],
            l: [0.9, 0.97]
          }
        },
        nouns: ["white"]
      }, words.white),
      __spreadValues({
        criteria: {
          oklch: {
            h: null,
            c: null,
            l: [0, 0.15]
          }
        },
        nouns: ["black"]
      }, words.black),
      // ===========================
      // Greyish blues and blue-violets (hue 250–300) are grey as well up to C 0.07.
      __spreadValues({
        criteria: {
          oklch: {
            h: [250, 300],
            c: [0.045, 0.07],
            l: [0.45, 0.85]
          }
        },
        nouns: ["grey"]
      }, words.grey),
      // Hue names — fitted to the survey data (Kim et al. 2019)
      // Hue boundaries: midpoints between term centroids. Lightness and chroma
      // limits: the region where the term is the most common answer among the
      // nearest survey responses (see tools/survey-finemap.mjs). Hue ranges are
      // half-open; L and C ranges are inclusive and overlap on purpose.
      // ===========================
      // Pink — wins from L 0.55 up across the pink hues, any chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.075, 0.5],
            l: [0.55, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 12],
            c: [0.075, 0.5],
            l: [0.55, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Towards red, pink needs more lightness (crimson is red).
      __spreadValues({
        criteria: {
          oklch: {
            h: [12, 25],
            c: [0.075, 0.5],
            l: [0.62, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Dusty rose between pink and red (hue 12–25, mid chroma) is pink.
      __spreadValues({
        criteria: {
          oklch: {
            h: [12, 25],
            c: [0.095, 0.115],
            l: [0.52, 0.62]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Saturated magenta hues are pink from L 0.65; below that purple or magenta.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 345],
            c: [0.075, 0.5],
            l: [0.65, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Greyish pinks only from L 0.65; below that they are brown and mauve.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.045, 0.075],
            l: [0.65, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 12],
            c: [0.045, 0.075],
            l: [0.65, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Very pale lilac-pinks.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 325],
            c: [0.02, 0.075],
            l: [0.85, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Pale greyish magenta hues above L 0.72 are pink (the survey is 60–90%
      // sure); below that they are grey purple.
      __spreadValues({
        criteria: {
          oklch: {
            h: [325, 345],
            c: [0.02, 0.075],
            l: [0.72, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      __spreadValues({
        criteria: {
          oklch: {
            h: [12, 25],
            c: [0.02, 0.075],
            l: [0.72, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Very pale greyish pinks around hue 0.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.02, 0.045],
            l: [0.78, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 12],
            c: [0.02, 0.045],
            l: [0.78, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Pink reaches a little lower around hue 0 (raspberry, dusky rose).
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 12],
            c: [0.1, 0.5],
            l: [0.48, 0.55]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Vivid dusky pinks (raspberry) just below L 0.55 on the magenta side.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.1, 0.5],
            l: [0.48, 0.55]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Light salmon and peachy pinks.
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 35],
            c: [0.05, 0.5],
            l: [0.68, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Very pale warm pinks.
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 38],
            c: [0.02, 0.06],
            l: [0.85, 0.99]
          }
        },
        nouns: ["pink"]
      }, words.pink),
      // Red — only mid-light and saturated (C ≥ 0.135). Lighter is pink, darker is
      // maroon, muted is brown.
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 20],
            c: [0.115, 0.5],
            l: [0.42, 0.68]
          }
        },
        descriptive: ["reddish"],
        nouns: ["red"]
      }, words.red),
      __spreadValues({
        criteria: {
          oklch: {
            h: [20, 40],
            c: [0.115, 0.5],
            l: [0.38, 0.68]
          }
        },
        descriptive: ["reddish"],
        nouns: ["red"]
      }, words.red),
      // Vivid light pinks near red (coral) are red as well.
      __spreadValues({
        criteria: {
          oklch: {
            h: [5, 25],
            c: [0.15, 0.5],
            l: [0.65, 0.75]
          }
        },
        descriptive: ["reddish"],
        nouns: ["red"]
      }, words.red),
      // Orange — mid-light and saturated. Red-oranges need more chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [35, 50],
            c: [0.135, 0.5],
            l: [0.55, 0.86]
          }
        },
        nouns: ["orange"]
      }, words.orange),
      __spreadValues({
        criteria: {
          oklch: {
            h: [50, 78],
            c: [0.1, 0.5],
            l: [0.58, 0.85]
          }
        },
        nouns: ["orange"]
      }, words.orange),
      // Light red-oranges (coral orange) at slightly lower chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [35, 50],
            c: [0.11, 0.135],
            l: [0.68, 0.86]
          }
        },
        nouns: ["orange"]
      }, words.orange),
      // Amber (hue 78–85) is orange only when light; darker it is gold or brown.
      __spreadValues({
        criteria: {
          oklch: {
            h: [78, 85],
            c: [0.1, 0.5],
            l: [0.74, 0.85]
          }
        },
        nouns: ["orange"]
      }, words.orange),
      // Amber at hue 76–83 is yellow as well as orange.
      __spreadValues({
        criteria: {
          oklch: {
            h: [76, 83],
            c: [0.12, 0.5],
            l: [0.76, 0.99]
          }
        },
        nouns: ["yellow"]
      }, words.yellow),
      // Olive — muted yellow-greens from dark to mid-light. Placed before brown
      // and green so it leads where it applies (olive brown, olive green).
      __spreadValues({
        criteria: {
          oklch: {
            h: [88, 125],
            c: [0.045, 0.16],
            l: [0.28, 0.72]
          }
        },
        nouns: ["olive"]
      }, words.olive),
      __spreadValues({
        criteria: {
          oklch: {
            h: [125, 135],
            c: [0.045, 0.15],
            l: [0.4, 0.7]
          }
        },
        nouns: ["olive"]
      }, words.olive),
      __spreadValues({
        criteria: {
          oklch: {
            h: [105, 125],
            c: [0.08, 0.16],
            l: [0.72, 0.85]
          }
        },
        nouns: ["olive"]
      }, words.olive),
      // Brown — the whole warm half of the wheel below L 0.72 at low chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [15, 25],
            c: [0.02, 0.1],
            l: [0.15, 0.45]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 88],
            c: [0.045, 0.1],
            l: [0.15, 0.68]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 45],
            c: [0.02, 0.045],
            l: [0.15, 0.45]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [45, 75],
            c: [0.02, 0.045],
            l: [0.15, 0.52]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [88, 105],
            c: [0.045, 0.1],
            l: [0.15, 0.68]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [75, 105],
            c: [0.02, 0.045],
            l: [0.15, 0.45]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [15, 25],
            c: [0.045, 0.075],
            l: [0.45, 0.55]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Above L 0.55 the pink hues are brown only when greyish.
      __spreadValues({
        criteria: {
          oklch: {
            h: [15, 25],
            c: [0.045, 0.095],
            l: [0.55, 0.66]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Muted mid-light oranges and ochres carry brown as a second name.
      __spreadValues({
        criteria: {
          oklch: {
            h: [45, 90],
            c: [0.08, 0.135],
            l: [0.65, 0.74]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Rust, chocolate, cinnamon and dark ochre: mid-chroma dark oranges and
      // yellows are brown.
      __spreadValues({
        criteria: {
          oklch: {
            h: [30, 105],
            c: [0.1, 0.16],
            l: [0.15, 0.55]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [30, 45],
            c: [0.1, 0.135],
            l: [0.55, 0.62]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      __spreadValues({
        criteria: {
          oklch: {
            h: [45, 105],
            c: [0.1, 0.16],
            l: [0.55, 0.65]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Muted mid-light red-oranges (caramel) are brown, not orange.
      __spreadValues({
        criteria: {
          oklch: {
            h: [30, 50],
            c: [0.1, 0.135],
            l: [0.62, 0.68]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Pink hues (345–15) are brown only when nearly grey; the dusky ones are
      // plum, mauve and maroon.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.02, 0.045],
            l: [0.25, 0.45]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Faint pinkish beige (hue 25–35) at very low chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 35],
            c: [0.02, 0.05],
            l: [0.68, 0.85]
          }
        },
        nouns: ["beige"]
      }, words.beige),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 15],
            c: [0.02, 0.045],
            l: [0.15, 0.45]
          }
        },
        nouns: ["brown"]
      }, words.brown),
      // Beige — light, low-chroma warm hues (sand, cream, khaki).
      __spreadValues({
        criteria: {
          oklch: {
            h: [35, 100],
            c: [0.045, 0.1],
            l: [0.68, 0.99]
          }
        },
        nouns: ["beige"]
      }, words.beige),
      __spreadValues({
        criteria: {
          oklch: {
            h: [100, 115],
            c: [0.045, 0.095],
            l: [0.68, 0.99]
          }
        },
        nouns: ["beige"]
      }, words.beige),
      __spreadValues({
        criteria: {
          oklch: {
            h: [35, 115],
            c: [0.02, 0.045],
            l: [0.78, 0.99]
          }
        },
        nouns: ["beige"]
      }, words.beige),
      // Yellow — only light (L ≥ 0.74). Darker yellows are gold, mustard or olive.
      __spreadValues({
        criteria: {
          oklch: {
            h: [83, 120],
            c: [0.07, 0.5],
            l: [0.88, 0.99]
          }
        },
        nouns: ["yellow"]
      }, words.yellow),
      // Mid-light yellow needs a little more chroma; below it is beige or tan.
      __spreadValues({
        criteria: {
          oklch: {
            h: [83, 120],
            c: [0.1, 0.5],
            l: [0.74, 0.88]
          }
        },
        nouns: ["yellow"]
      }, words.yellow),
      __spreadValues({
        criteria: {
          oklch: {
            h: [95, 120],
            c: [0.08, 0.1],
            l: [0.74, 0.88]
          }
        },
        nouns: ["yellow"]
      }, words.yellow),
      // Lime — light and vivid yellow-greens only.
      __spreadValues({
        criteria: {
          oklch: {
            h: [108, 135],
            c: [0.12, 0.5],
            l: [0.76, 0.99]
          }
        },
        nouns: ["lime"]
      }, words.lime),
      // Green — from yellow-green to blue-green, any lightness above near-black.
      __spreadValues({
        criteria: {
          oklch: {
            h: [113, 185],
            c: [0.02, 0.09],
            l: [0.15, 0.78]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      __spreadValues({
        criteria: {
          oklch: {
            h: [113, 178],
            c: [0.02, 0.09],
            l: [0.78, 0.99]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      // Faint light yellow-greens (hue 105–113) are grey green.
      __spreadValues({
        criteria: {
          oklch: {
            h: [105, 113],
            c: [0.02, 0.045],
            l: [0.66, 0.92]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      // Saturated olive-yellows (hue 105–113) are green as well as olive.
      __spreadValues({
        criteria: {
          oklch: {
            h: [105, 113],
            c: [0.08, 0.5],
            l: [0.66, 0.9]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      // Saturated blue-greens past hue 178 are teal and turquoise, not green.
      __spreadValues({
        criteria: {
          oklch: {
            h: [113, 178],
            c: [0.09, 0.5],
            l: [0.15, 0.99]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      // Muted yellow-greens read as green (survey), not olive, unless mid-toned.
      __spreadValues({
        criteria: {
          oklch: {
            h: [105, 113],
            c: [0.02, 0.15],
            l: [0.15, 0.66]
          }
        },
        descriptive: ["greenish"],
        nouns: ["green"]
      }, words.green),
      // Teal — bluish greens; at hue 165–180 only when light and saturated.
      __spreadValues({
        criteria: {
          oklch: {
            h: [165, 180],
            c: [0.07, 0.18],
            l: [0.6, 0.78]
          }
        },
        nouns: ["teal"]
      }, words.teal),
      __spreadValues({
        criteria: {
          oklch: {
            h: [180, 200],
            c: [0.02, 0.15],
            l: [0.15, 0.78]
          }
        },
        nouns: ["teal"]
      }, words.teal),
      __spreadValues({
        criteria: {
          oklch: {
            h: [200, 215],
            c: [0.02, 0.15],
            l: [0.15, 0.72]
          }
        },
        nouns: ["teal"]
      }, words.teal),
      // Muted blue-greens just before hue 180 are teal too.
      __spreadValues({
        criteria: {
          oklch: {
            h: [172, 180],
            c: [0.05, 0.15],
            l: [0.35, 0.65]
          }
        },
        nouns: ["teal"]
      }, words.teal),
      // Dark muted blues around hue 215–228 read as teal (petrol).
      __spreadValues({
        criteria: {
          oklch: {
            h: [215, 228],
            c: [0.02, 0.11],
            l: [0.15, 0.66]
          }
        },
        nouns: ["teal"]
      }, words.teal),
      // Blue — light greenish blues (hue 185–215) are blue to most people.
      __spreadValues({
        criteria: {
          oklch: {
            h: [185, 205],
            c: [0.02, 0.5],
            l: [0.75, 0.99]
          }
        },
        descriptive: ["blueish"],
        nouns: ["blue"]
      }, words.blue),
      __spreadValues({
        criteria: {
          oklch: {
            h: [215, 225],
            c: [0.02, 0.5],
            l: [0.48, 0.99]
          }
        },
        descriptive: ["blueish"],
        nouns: ["blue"]
      }, words.blue),
      // Very light aqua (hue 178–185) is blue to many people.
      __spreadValues({
        criteria: {
          oklch: {
            h: [178, 185],
            c: [0.02, 0.12],
            l: [0.85, 0.99]
          }
        },
        descriptive: ["blueish"],
        nouns: ["blue"]
      }, words.blue),
      __spreadValues({
        criteria: {
          oklch: {
            h: [205, 215],
            c: [0.02, 0.5],
            l: [0.68, 0.99]
          }
        },
        descriptive: ["blueish"],
        nouns: ["blue"]
      }, words.blue),
      // Blue proper, through to the purple boundary.
      __spreadValues({
        criteria: {
          oklch: {
            h: [225, 288],
            c: [0.02, 0.5],
            l: [0.15, 0.99]
          }
        },
        descriptive: ["blueish"],
        nouns: ["blue"]
      }, words.blue),
      // Purple — from the blue boundary to the pink boundary.
      __spreadValues({
        criteria: {
          oklch: {
            h: [295, 318],
            c: [0.02, 0.5],
            l: [0.15, 0.92]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // At the blue boundary (285–295) purple only below L 0.62; lighter is periwinkle and lavender.
      __spreadValues({
        criteria: {
          oklch: {
            h: [285, 295],
            c: [0.02, 0.5],
            l: [0.15, 0.62]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // Near the pink boundary, light tones are pink and lilac, not purple.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 325],
            c: [0.02, 0.14],
            l: [0.15, 0.75]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // Magenta hues below L 0.72 read as purple.
      __spreadValues({
        criteria: {
          oklch: {
            h: [325, 345],
            c: [0.02, 0.14],
            l: [0.15, 0.72]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // Vivid magenta hues are purple only when darker.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 345],
            c: [0.14, 0.5],
            l: [0.15, 0.65]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // Dark greyish pink hues read as purple (the rest are plum or maroon).
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.02, 0.05],
            l: [0.22, 0.45]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 15],
            c: [0.02, 0.05],
            l: [0.22, 0.45]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      // Navy — dark blues, not too vivid.
      __spreadValues({
        criteria: {
          oklch: {
            h: [225, 288],
            c: [0.02, 0.145],
            l: [0.18, 0.45]
          }
        },
        nouns: ["navy"]
      }, words.navy),
      // Vivid dark blues are navy only when very dark.
      __spreadValues({
        criteria: {
          oklch: {
            h: [225, 288],
            c: [0.145, 0.22],
            l: [0.18, 0.34]
          }
        },
        nouns: ["navy"]
      }, words.navy),
      // Muted mid blues just above the navy box still read as navy.
      __spreadValues({
        criteria: {
          oklch: {
            h: [235, 288],
            c: [0.045, 0.1],
            l: [0.45, 0.52]
          }
        },
        nouns: ["navy"]
      }, words.navy),
      // Maroon / burgundy — dark reds and dark pinks.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.07, 0.18],
            l: [0.22, 0.48]
          }
        },
        descriptive: ["burgundy"],
        nouns: ["maroon"]
      }, words.maroon),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 32],
            c: [0.07, 0.18],
            l: [0.22, 0.48]
          }
        },
        descriptive: ["burgundy"],
        nouns: ["maroon"]
      }, words.maroon),
      // Maroon reaches L 0.52 when not vivid.
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 30],
            c: [0.07, 0.145],
            l: [0.48, 0.52]
          }
        },
        descriptive: ["burgundy"],
        nouns: ["maroon"]
      }, words.maroon),
      // --- Secondary names: returned after the primary name of their region ---
      // Gold and mustard: dark yellows.
      __spreadValues({
        criteria: {
          oklch: {
            h: [78, 110],
            c: [0.08, 0.18],
            l: [0.55, 0.74]
          }
        },
        descriptive: ["mustard"],
        nouns: ["gold"]
      }, words.gold),
      // Light saturated yellows are also gold.
      __spreadValues({
        criteria: {
          oklch: {
            h: [85, 110],
            c: [0.12, 0.18],
            l: [0.74, 0.82]
          }
        },
        descriptive: ["mustard"],
        nouns: ["gold"]
      }, words.gold),
      // Peach: light soft oranges.
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 70],
            c: [0.04, 0.14],
            l: [0.75, 0.93]
          }
        },
        nouns: ["peach"]
      }, words.peach),
      __spreadValues({
        criteria: {
          oklch: {
            h: [25, 70],
            c: [0.1, 0.14],
            l: [0.68, 0.75]
          }
        },
        nouns: ["peach"]
      }, words.peach),
      // Pale butter tones at hue 70–85 read as peach.
      __spreadValues({
        criteria: {
          oklch: {
            h: [70, 85],
            c: [0.04, 0.12],
            l: [0.85, 0.93]
          }
        },
        nouns: ["peach"]
      }, words.peach),
      // Tan: light warm brown.
      __spreadValues({
        criteria: {
          oklch: {
            h: [40, 88],
            c: [0.04, 0.11],
            l: [0.66, 0.78]
          }
        },
        descriptive: ["sandy"],
        nouns: ["brown"]
      }, words.sand),
      // Salmon: light pink-oranges.
      __spreadValues({
        criteria: {
          oklch: {
            h: [15, 40],
            c: [0.09, 0.2],
            l: [0.65, 0.78]
          }
        },
        nouns: ["salmon"]
      }, words.salmon),
      // Mauve: greyish and dusky pinks, down to L 0.45.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 360],
            c: [0.02, 0.1],
            l: [0.45, 0.72]
          }
        },
        nouns: ["mauve"]
      }, words.mauve),
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 360],
            c: [0.02, 0.06],
            l: [0.72, 0.85]
          }
        },
        nouns: ["mauve"]
      }, words.mauve),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 35],
            c: [0.02, 0.1],
            l: [0.45, 0.72]
          }
        },
        nouns: ["mauve"]
      }, words.mauve),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 25],
            c: [0.02, 0.06],
            l: [0.72, 0.85]
          }
        },
        nouns: ["mauve"]
      }, words.mauve),
      // Mint: pale fresh greens.
      __spreadValues({
        criteria: {
          oklch: {
            h: [140, 182],
            c: [0.025, 0.18],
            l: [0.78, 0.97]
          }
        },
        nouns: ["mint"]
      }, words.mint),
      // Turquoise / aqua: light vivid blue-greens.
      __spreadValues({
        criteria: {
          oklch: {
            h: [172, 215],
            c: [0.05, 0.18],
            l: [0.7, 0.86]
          }
        },
        descriptive: ["aqua"],
        nouns: ["turquoise"]
      }, words.turquoise),
      // Cyan: only light and vivid; most people say blue or turquoise.
      __spreadValues({
        criteria: {
          oklch: {
            h: [178, 225],
            c: [0.13, 0.5],
            l: [0.68, 0.99]
          }
        },
        nouns: ["cyan"]
      }, words.cyan),
      // Very light aquas are cyan at lower chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [178, 225],
            c: [0.06, 0.13],
            l: [0.86, 0.99]
          }
        },
        nouns: ["cyan"]
      }, words.cyan),
      // Sky blue: light blues.
      __spreadValues({
        criteria: {
          oklch: {
            h: [215, 265],
            c: [0.08, 0.16],
            l: [0.7, 0.85]
          }
        },
        nouns: ["sky blue"]
      }, words.skyBlue),
      // Very light blues take sky blue at lower chroma.
      __spreadValues({
        criteria: {
          oklch: {
            h: [215, 265],
            c: [0.05, 0.16],
            l: [0.85, 0.96]
          }
        },
        nouns: ["sky blue"]
      }, words.skyBlue),
      // Periwinkle: light blue-violets.
      __spreadValues({
        criteria: {
          oklch: {
            h: [265, 295],
            c: [0.06, 0.5],
            l: [0.55, 0.85]
          }
        },
        nouns: ["periwinkle"]
      }, words.periwinkle),
      // Indigo: never the majority term; a secondary name for vivid dark blue-violets.
      __spreadValues({
        criteria: {
          oklch: {
            h: [278, 295],
            c: [0.12, 0.5],
            l: [0.28, 0.55]
          }
        },
        nouns: ["indigo"]
      }, words.indigo),
      // Lavender / lilac: light purples.
      __spreadValues({
        criteria: {
          oklch: {
            h: [285, 325],
            c: [0.02, 0.13],
            l: [0.62, 0.95]
          }
        },
        descriptive: ["lilac"],
        nouns: ["lavender"]
      }, words.lavender),
      // Violet: the bluer, saturated purples.
      __spreadValues({
        criteria: {
          oklch: {
            h: [295, 318],
            c: [0.13, 0.5],
            l: [0.3, 0.75]
          }
        },
        nouns: ["violet"]
      }, words.violet),
      // Vivid blue-violets at the blue boundary are violet as well.
      __spreadValues({
        criteria: {
          oklch: {
            h: [285, 295],
            c: [0.18, 0.5],
            l: [0.55, 0.8]
          }
        },
        nouns: ["violet"]
      }, words.violet),
      // Magenta / fuchsia: only vivid; muted magenta hues are pink or purple.
      __spreadValues({
        criteria: {
          oklch: {
            h: [318, 360],
            c: [0.14, 0.5],
            l: [0.42, 0.72]
          }
        },
        descriptive: ["fuchsia"],
        nouns: ["magenta"]
      }, words.magenta),
      // Plum: dark reddish purples.
      __spreadValues({
        criteria: {
          oklch: {
            h: [325, 345],
            c: [0.05, 0.18],
            l: [0.25, 0.5]
          }
        },
        nouns: ["plum"]
      }, words.plum),
      // Dark dusky pink hues (wine, plum) are plum.
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.05, 0.16],
            l: [0.24, 0.45]
          }
        },
        nouns: ["plum"]
      }, words.plum),
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.05, 0.12],
            l: [0.45, 0.52]
          }
        },
        nouns: ["plum"]
      }, words.plum),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 15],
            c: [0.05, 0.16],
            l: [0.24, 0.48]
          }
        },
        nouns: ["plum"]
      }, words.plum),
      // Dusky wines and plums around hue 0 carry a purple cast (second name).
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.05, 0.16],
            l: [0.28, 0.5]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      __spreadValues({
        criteria: {
          oklch: {
            h: [345, 360],
            c: [0.05, 0.1],
            l: [0.5, 0.53]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 10],
            c: [0.05, 0.16],
            l: [0.28, 0.5]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple),
      __spreadValues({
        criteria: {
          oklch: {
            h: [0, 10],
            c: [0.05, 0.1],
            l: [0.5, 0.53]
          }
        },
        descriptive: ["purplish"],
        nouns: ["purple"]
      }, words.purple)
    ],
    temperatures: [
      {
        value: 1800,
        descriptive: ["ultra warm"]
      },
      {
        value: 2400,
        descriptive: ["very warm"]
      },
      {
        value: 2700,
        descriptive: ["warm"]
      },
      {
        value: 3e3,
        descriptive: ["warm white"]
      },
      {
        value: 4e3,
        descriptive: ["neutral white"]
      },
      {
        value: 5e3,
        descriptive: ["cool white"]
      },
      {
        value: 6500,
        descriptive: ["cool daylight"]
      },
      {
        value: 1e4,
        descriptive: ["very cool"]
      }
    ],
    percentWords: [
      {
        maxPercentile: 0.06,
        word: "a dash of"
      },
      {
        maxPercentile: 0.16,
        word: "a little bit of"
      },
      {
        maxPercentile: 0.31,
        word: "some"
      },
      {
        maxPercentile: 0.56,
        word: "a good bit of"
      },
      {
        maxPercentile: 0.71,
        word: "a lot of"
      },
      {
        maxPercentile: 0.86,
        word: "a whole lot of"
      },
      {
        maxPercentile: 0.99,
        word: "nearly entirely"
      },
      {
        maxPercentile: 1,
        word: "entirely"
      }
    ]
  };

  // src/index.js
  [
    definition_default,
    definition_default6,
    definition_default2,
    definition_default3,
    definition_default4,
    definition_default5,
    definition_default7,
    definition_default8,
    modeOkhsl_default,
    definition_default9
  ].forEach(useMode);
  var converters2 = {
    rgb: converter_default("rgb"),
    hsl: converter_default("hsl"),
    oklch: converter_default("oklch"),
    okhsl: converter_default("okhsl")
  };
  var formatComponents = {
    rgb: ["r", "g", "b"],
    cmyk: ["c", "m", "y", "k"],
    hsl: ["h", "s", "l"]
  };
  var _ColorDescription_instances, parseColor_fn, getWords_fn;
  var ColorDescription = class {
    constructor(color, words2 = en_default) {
      __privateAdd(this, _ColorDescription_instances);
      __publicField(this, "formats", {});
      __publicField(this, "currentColor", null);
      this.color = color;
      this.descriptions = words2.descriptions;
      this.temperatures = words2.temperatures;
      this.percentWords = words2.percentWords ? [...words2.percentWords].sort(
        (a, b) => a.maxPercentile - b.maxPercentile
      ) : [];
    }
    set color(color) {
      this.currentColor = __privateMethod(this, _ColorDescription_instances, parseColor_fn).call(this, color);
      const rgb = converters2["rgb"](this.currentColor);
      this.formats.rgb = rgb;
      this.formats.hsl = converters2["hsl"](this.currentColor);
      this.formats.oklch = converters2["oklch"](this.currentColor);
      this.formats.okhsl = converters2["okhsl"](this.currentColor);
      if (this.formats.okhsl && this.formats.okhsl.s > 1) {
        this.formats.okhsl.s = 1;
      }
      this.formats.cmyk = rgbToCMYK(rgb);
    }
    get color() {
      return this.currentColor;
    }
    /**
     * @returns {{value: number, descriptive?: string[]}} closest color temperature bucket
     */
    get temperatureWords() {
      const goal = rgb2temperature(this.formats.rgb);
      return this.temperatures.reduce(
        (prev, curr) => Math.abs(curr.value - goal) < Math.abs(prev.value - goal) ? curr : prev,
        { value: 0 }
      );
    }
    /**
     * @param {string} model color model in which the components are measured
     *                 possible values: "rgb", "cmyk"
     * @returns {Array} color component mix in percent
     */
    percentages(model = "rgb") {
      if (!["rgb", "cmyk"].includes(model)) {
        throw new TypeError(
          'Invalid color model. Use "rgb" or "cmyk" for percentages.'
        );
      }
      if (!this.formats[model]) {
        throw new TypeError(
          `Color format "${model}" is not available. Ensure color is set.`
        );
      }
      const color = this.formats[model];
      const props = formatComponents[model].map((c2) => color[c2]);
      const total = props.reduce((r, d) => r + d, 0);
      return props.map((c2) => total ? c2 / total : 0);
    }
    /**
     * @param {string} model color model in which the components are measured
     * @returns {Array} descriptive words for color percentages
     */
    percentageWords(model = "rgb") {
      return this.percentages(model).map((component) => {
        const found = this.percentWords.find(
          (words2) => words2.maxPercentile >= component
        );
        return found ? found.word : "entirely";
      });
    }
    get descriptiveWords() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "descriptive");
    }
    get nouns() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "nouns");
    }
    get meanings() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "meanings");
    }
    get effects() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "effects");
    }
    get usage() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "usage");
    }
    /**
     * @returns {Array<string>} an array of descriptions for the color
     */
    get description() {
      return __privateMethod(this, _ColorDescription_instances, getWords_fn).call(this, "description");
    }
    get bestContrast() {
      return contrast(this.color, "black") > contrast(this.color, "white") ? "black" : "white";
    }
    /**
     * @param {boolean} random - if true, randomizes the order of descriptive words
     * @param {number} limit - maximum number of descriptive words to return (optional)
     * @returns {string} a formatted string of descriptive words joined with commas and "and"
     */
    getDescriptiveList(random2, limit) {
      let arr = [...this.descriptiveWords];
      if (random2) {
        arr = randomizeArr(arr);
      }
      if (limit) {
        arr = arr.slice(0, limit);
      }
      if (arr.length === 0) {
        return "";
      }
      if (arr.length > 1) {
        const last = arr.pop();
        return `${arr.join(", ")} and ${last}`;
      } else {
        return arr[0];
      }
    }
  };
  _ColorDescription_instances = new WeakSet();
  /**
   * @param {string} color culori-js compatible color string
   * @returns {object} culori-js instance
   * @throws {TypeError} if the color is not valid
   */
  parseColor_fn = function(color) {
    const parsed = parse_default(color);
    if (!parsed) {
      throw new TypeError(
        `Invalid color: "${color}". Check the culori documentation.`
      );
    }
    return parsed;
  };
  /**
   * @param {string} scope the scope of words to retrieve
   * @param {boolean} randomize whether to randomize the words
   * @param {number} wordLimit the maximum number of words to retrieve
   * @returns {Array} words matching the criteria
   * @note null criteria values are treated as wildcards (match any value)
   */
  getWords_fn = function(scope = "descriptive", randomize = false, wordLimit) {
    const oklch = this.formats.oklch;
    const nearBlack = oklch && oklch.l < 0.28 && oklch.c < 0.025;
    const words2 = this.descriptions.reduce((rem, current) => {
      var _a;
      if (!current.hasOwnProperty(scope)) {
        return rem;
      }
      if (nearBlack && ((_a = current.criteria.oklch) == null ? void 0 : _a.h) != null) {
        return rem;
      }
      const scopeWords = current[scope].filter(
        (w) => typeof w === "string" && w.trim().length > 0
      );
      const colorModels = Object.keys(current.criteria);
      const matchesEveryCriteria = colorModels.every((colorModel) => {
        const colorAsModel = this.formats[colorModel];
        if (!colorAsModel) {
          return false;
        }
        return Object.entries(current.criteria[colorModel]).every(
          ([key, criterium]) => {
            if (criterium === null) return true;
            if (!(key in colorAsModel) || colorAsModel[key] === void 0 || colorAsModel[key] === null)
              return false;
            let value = colorAsModel[key];
            if (key === "h") {
              value = Math.round(value) % 360;
            }
            if (Array.isArray(criterium)) {
              if (key === "h") {
                return value >= criterium[0] && value < criterium[1];
              }
              return isInRange(value, criterium[0], criterium[1]);
            } else if (!isNaN(criterium)) {
              return value === criterium;
            } else {
              return false;
            }
          }
        );
      });
      if (matchesEveryCriteria) {
        return [.../* @__PURE__ */ new Set([...rem, ...scopeWords])];
      } else {
        return rem;
      }
    }, []);
    if (randomize) {
      return randomizeArr(words2).slice(0, wordLimit);
    }
    return words2.slice(0, wordLimit);
  };
  var src_default = ColorDescription;
  return __toCommonJS(src_exports);
})();
