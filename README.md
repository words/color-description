# color-description
Describes color attributes using words instead of coordinates in a model.

## Installation
`npm install colordescription`
## Usage

```js
import ColorDescription from 'colordescription';

const cd = new ColorDescription('#ffffff');

console.log(cd.description) 
/**
 * #ffffff is a color that is colorless, bright, briliant and elegant. 
 * It suggests hope, simlicity, purity, goodness
 * 
 * A pixel that shines in that color would need to be 33.33% Red, 33.33% Green and * 33.33% Blue.
 **/

const cd.color = 'red';

console.log(cd.description) 
/**
 * red is a color that is saturated, vivid and strong. 
 * It suggests excitement, energy, passion, currage and attention and is often
 * used to stimulate, create urgency, draw attention, caution or encurrage. 
 * 
 * A pixel that shines in that color would need to be 100% Red, 0% Green and 0 Blue.
 **/
```

## Data Sources

### Color Psychology

- [colorpsychology.org](https://www.colorpsychology.org/)
- [Color Poster](https://graf1x.com/color-psychology-emotion-meaning-poster/)
- [Wikipedia](https://en.wikipedia.org/wiki/Color_psychology#:~:text=Color%20psychology%20is%20the%20study,as%20the%20taste%20of%20food.&text=Colors%20can%20also%20enhance%20the,are%20generally%20used%20as%20stimulants.)
  
### Named Primary, Secondary and Tertiary Colors

- [Named color wheel](https://en.wikipedia.org/wiki/Hue#24_hues_of_HSL/HSV)
- [Named color wheel](https://www.color-meanings.com/primary-secondary-tertiary-colors/)

### Color Adjectives

- [Adjective List](https://grammar.yourdictionary.com/grammar/word-lists/list-of-words-to-describe-colors.html)
- [Human Colors](https://github.com/vasilisvg/human-colours/blob/master/js/human-colours-en-gb.js)
