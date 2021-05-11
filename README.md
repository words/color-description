# color-description
Get textual description for a given color.

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

import ColorDescription from 'colordescription';

const cd = new ColorDescription('red');

console.log(cd.description) 
/**
 * red is a color that is saturated, vivid and strong. 
 * It suggests excitement, energy, passion, currage and attention and is often
 * used to stimulate, create urgency, draw attention, caution or encurrage. 
 * 
 * A pixel that shines in that color would need to be 100% Red, 0% Green and 0 Blue.
 **/
```