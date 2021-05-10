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