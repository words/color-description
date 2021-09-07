import ColorDescription from './dist/index.node';

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
  expect(cd.temeratureAdjectives.adjectives[0]).toBe('ultra warm');
});

test('gets fancy HSL Adjectives', () => {
  const cd = new ColorDescription('white');

  expect(cd).toHaveProperty('adjectives');
  expect(cd.adjectives.length).toBeGreaterThan(0);
});


test('getting RGB in percentage of the whole color', () => {
  const cd = new ColorDescription('#ffffff');

  expect(cd).toHaveProperty('percentages');
  expect(cd.percentages()[0]).toBeGreaterThan(0.3);
  expect(cd.percentages()[1]).toBeGreaterThan(0.3);
  expect(cd.percentages()[2]).toBeGreaterThan(0.3);

  cd.color = '#ff0000';
  expect(cd.percentages()[0]).toBe(1);
});

test('get general color adjectives', () => {
  const cd = new ColorDescription('#ffffff');

  expect(cd).toHaveProperty('percentages');
  expect(cd.percentages()[0]).toBeGreaterThan(0.3);
  expect(cd.percentages()[1]).toBeGreaterThan(0.3);
  expect(cd.percentages()[2]).toBeGreaterThan(0.3);

  cd.color = '#ff0000';
  expect(cd.percentages()[0]).toBe(1);
});

test('get best contrast color, using WCAG formula', () => {
  // test data from https://webaim.org/resources/contrastchecker/
  const cd = new ColorDescription('#0000ff');

  expect(cd).toHaveProperty('bestContrast');
  expect(cd.bestContrast).toBe('white');
});