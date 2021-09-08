"use strict";

var cd = new ColorDescription("#b40404");
var $result = document.querySelector("[data-result]");
var $currentColor = document.querySelector(".currentColor");
var $input = document.querySelector("input");
var $randomButton = document.querySelector("[data-random]");
var $code = document.querySelector("[data-code]");
var $body = document.documentElement;
var timer;

function colorFetch(color) {
  var apiURL = new URL("https://api.color.pizza/v1/");
  var params = {
    values: [color.replace("#", "")],
    goodnamesonly: true,
    noduplicates: true
  };
  apiURL.search = new URLSearchParams(params).toString();
  fetch(apiURL).then(function (response) {
    return response.json();
  }).then(function (data) {
    document.querySelector("h2").innerHTML = "<span>Color Name:</span> ".concat(data.colors[0].name);
  })["catch"](function (error) {
    throw new Error("API ".concat(error));
  });
}

function setColor(e) {
  var value = e ? e.target.value : "#b40404";
  cd.color = value;
  $input.value = value;
  var glPercentages = cd.percentageWords("gl");
  var cmykPercentageWords = cd.percentageWords("cmyk");
  $code.innerHTML = "const cd = new ColorDescription('<i>".concat(value, "</i>');\ncd.getAdjectivesList();");
  var temparature = cd.temeratureAdjectives;
  var emotions = cd.emotions;
  var usage = cd.usage;
  $body.style.setProperty("--color", value);
  $result.innerHTML = "\n        <h3>Adjectives</h3>\n        <p>".concat(cd.getAdjectivesList(), "</p>\n        \n        ").concat(emotions.length ? "<h3>Emotions</h3><p>".concat(emotions.join(", "), "</p>") : "", "\n\n        ").concat(usage.length ? "<h3>Usage</h3><p>".concat(usage.join(", "), "</p>") : "", "\n\n        <h3>Contrast Information</h3>\n        <p>If used as background ").concat(cd.bestContrast, " would be the most readable text color.</p>\n        \n\n        <h3>Light Temparature</h3>\n        <p>It has a temperature of <strong>").concat(temparature.value, "</strong><abbr title=\"kelvin\">K</abbr> this is considered to be ").concat(temparature.adjectives.join(", "), "</p>\n        \n        <h3>RGB Mix</h3>\n        <p>An LCD screen needs ").concat(glPercentages[0], " red, ").concat(glPercentages[1], " green and ").concat(glPercentages[2], " blue to produce this color.</p>\n        \n        <h3>CMYK Mix</h3>\n        <p>To print this color you would could mix ").concat(cmykPercentageWords[0], " cyan, ").concat(cmykPercentageWords[1], " magenta, ").concat(cmykPercentageWords[2], " yellow and ").concat(cmykPercentageWords[3], " black.</p>\n        <br />\n        <small data-label=\"HSL color representation\">").concat(chroma(value).css("hsl"), "</small>\n      ");
  $currentColor.style.backgroundColor = value;
  $currentColor.style.color = cd.bestContrast;
  document.querySelector("h2").innerHTML = "…";
  clearTimeout(timer);
  timer = setTimeout(function () {
    return colorFetch(value);
  }, 500);
}

setColor();
var colorPicker = new iro.ColorPicker("#picker", {
  borderWidth: 8
});
colorPicker.on(["color:init", "color:change"], function (color) {
  setColor({
    target: {
      value: color.hexString
    }
  });
});
$input.addEventListener("input", setColor);
$randomButton.addEventListener("click", function (e) {
  setColor({
    target: {
      value: chroma.random().hex()
    }
  });
});
document.documentElement.addEventListener('click', function (e) {
  if (e.target.matches('[data-setcolor]')) {
    setColor({
      target: {
        value: e.target.dataset.setcolor
      }
    });
  }
});