import {toSnake, toKebab, toCamel, toPascal} from './utils'

test('toSnake', () => {
  expect(toSnake('Icon/Arrow/Left')).toBe('icon_arrow_left');
  expect(toSnake('Icon/ArrowLeft')).toBe('icon_arrowleft');
  expect(toSnake('Icon / Arrow / Left')).toBe('icon_arrow_left');
  expect(toSnake(' Icon/ Arrow /Left ')).toBe('icon_arrow_left');
});

test('toKebab', () => {
  expect(toKebab('Icon/Arrow/Left')).toBe('icon-arrow-left');
  expect(toKebab('Icon/ArrowLeft')).toBe('icon-arrowleft');
  expect(toKebab('Icon / Arrow / Left')).toBe('icon-arrow-left');
  expect(toKebab(' Icon/ Arrow /Left ')).toBe('icon-arrow-left');
});

test('toCamel', () => {
  expect(toCamel('Icon/Arrow/Left')).toBe('iconArrowLeft');
  expect(toCamel('Icon/ArrowLeft')).toBe('iconArrowleft');
  expect(toCamel('Icon / Arrow / Left')).toBe('iconArrowLeft');
  expect(toCamel(' Icon/ Arrow /Left ')).toBe('iconArrowLeft');
});

test('toPascal', () => {
  expect(toPascal('Icon/Arrow/Left')).toBe('IconArrowLeft');
  expect(toPascal('Icon/ArrowLeft')).toBe('IconArrowleft');
  expect(toPascal('Icon / Arrow / Left')).toBe('IconArrowLeft');
  expect(toPascal(' Icon/ Arrow /Left ')).toBe('IconArrowLeft');
});
