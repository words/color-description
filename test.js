import ColorDescription from '.';

test('parses color corectly', () => {
  const cd = new ColorDescription('red');

  expect(cd).toHaveProperty('color');
  expect(cd.color.hex()).toBe('#ff0000');
});

/* find a way to test that */
/*
test('does not like funky colors', () => {
  const cd = new ColorDescription('redrum');

  const t = () => {
    throw new TypeError();
  };

  expect(cd).toThrow(TypeError);
});
*/

test('get adjectives for color temperature', () => {
  const cd = new ColorDescription('red');

  expect(cd).toHaveProperty('temeratureAdjectives');
  expect(cd.temeratureAdjectives.adjecives[0]).toBe('ultra warm');
});

test('gets fancy HSL Adjectives', () => {
  const cd = new ColorDescription('white');

  expect(cd).toHaveProperty('adjectives');
  expect(cd.adjectives.length).toBeGreaterThan(0);
});


test('getting RGB in percentage of the whole color', () => {
  const cd = new ColorDescription('#ffffff');

  expect(cd).toHaveProperty('rgbPercentages');
  expect(cd.rgbPercentages[0]).toBeGreaterThan(0.3);
  expect(cd.rgbPercentages[1]).toBeGreaterThan(0.3);
  expect(cd.rgbPercentages[2]).toBeGreaterThan(0.3);

  console.log(cd.adjectivesList)

  cd.color = '#ff0000';
  expect(cd.rgbPercentages[0]).toBe(1);
});