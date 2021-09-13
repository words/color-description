import ColorDescription from './src/index';
import wordsEN from './src/en';

test('parses color corectly', () => {
  const cd = new ColorDescription('red');

  expect(cd).toHaveProperty('color');
  expect(cd.color.hex()).toBe('#ff0000');
});

test('get adjectives for color temperature', () => {
  const cd = new ColorDescription('red');

  expect(cd).toHaveProperty('temeratureWords');
  expect(cd.temeratureWords.descriptive[0]).toBe('ultra warm');
});

test('gets fancy HSL Descriptions', () => {
  const cd = new ColorDescription('white');

  expect(cd).toHaveProperty('descriptiveWords');
  expect(cd.descriptiveWords.length).toBeGreaterThan(0);
});

test('gets a maximum of 2 Descriptions', () => {
  const cd = new ColorDescription('white');

  expect(cd).toHaveProperty('getDescriptiveList');
  expect(cd.getDescriptiveList(false, 2).length).toBeGreaterThan(0);
  expect(cd.getDescriptiveList(false, 2).split(' and ').length).toBe(2);
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