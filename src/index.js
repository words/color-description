const cd = new ColorDescription("#b40404");
const $result = document.querySelector("[data-result]");
const $currentColor = document.querySelector(".currentColor");
const $input = document.querySelector("input");
const $randomButton = document.querySelector("[data-random]");
const $code = document.querySelector("[data-code]");
const $body = document.documentElement;

let timer;

function colorFetch(color) {
  const apiURL = new URL("https://api.color.pizza/v1/");

  const params = {
    values: [color.replace("#", "")],
    goodnamesonly: true,
    noduplicates: true,
  };

  apiURL.search = new URLSearchParams(params).toString();

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        "h2"
      ).innerHTML = `<span>Color Name:</span> ${data.colors[0].name}`;
    })
    .catch((error) => {
      throw new Error(`API ${error}`);
    });
}

function setColor(e) {
  const value = e ? e.target.value : "#b40404";
  cd.color = value;
  $input.value = value;
  const glPercentages = cd.percentageWords("gl");
  const cmykPercentageWords = cd.percentageWords("cmyk");
  $code.innerHTML = `const cd = new ColorDescription('<i>${value}</i>');
cd.getAdjectivesList();`;
  const temparature = cd.temeratureAdjectives;
  const emotions = cd.emotions;
  const usage = cd.usage;

  $body.style.setProperty("--color", value);

  $result.innerHTML = `
        <h3>Adjectives</h3>
        <p>${cd.getAdjectivesList()}</p>
        
        ${
          emotions.length
            ? `<h3>Emotions</h3><p>${emotions.join(", ")}</p>`
            : ""
        }

        ${usage.length ? `<h3>Usage</h3><p>${usage.join(", ")}</p>` : ""}

        <h3>Contrast Information</h3>
        <p>If used as background ${
          cd.bestContrast
        } would be the most readable text color.</p>
        

        <h3>Light Temparature</h3>
        <p>It has a temperature of <strong>${
          temparature.value
        }</strong><abbr title="kelvin">K</abbr> this is considered to be ${temparature.adjectives.join(
    ", "
  )}</p>
        
        <h3>RGB Mix</h3>
        <p>An LCD screen needs ${glPercentages[0]} red, ${
    glPercentages[1]
  } green and ${glPercentages[2]} blue to produce this color.</p>
        
        <h3>CMYK Mix</h3>
        <p>To print this color you would could mix ${
          cmykPercentageWords[0]
        } cyan, ${cmykPercentageWords[1]} magenta, ${
    cmykPercentageWords[2]
  } yellow and ${cmykPercentageWords[3]} black.</p>
        <br />
        <small data-label="HSL color representation">${chroma(value).css(
          "hsl"
        )}</small>
      `;

  $currentColor.style.backgroundColor = value;
  $currentColor.style.color = cd.bestContrast;

  document.querySelector("h2").innerHTML = "…";
  clearTimeout(timer);
  timer = setTimeout(() => colorFetch(value), 500);
}

setColor();

const colorPicker = new iro.ColorPicker("#picker", { borderWidth: 8 });

colorPicker.on(["color:init", "color:change"], function (color) {
  setColor({ target: { value: color.hexString } });
});

$input.addEventListener("input", setColor);

$randomButton.addEventListener("click", (e) => {
  setColor({ target: { value: chroma.random().hex() } });
});

document.documentElement.addEventListener('click', e => {
  if( e.target.matches('[data-setcolor]')  ) {
    setColor({ target: { value: e.target.dataset.setcolor } });
  }
})
