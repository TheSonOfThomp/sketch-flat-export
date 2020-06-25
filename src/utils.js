// -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------

export function toSnake(str) {
  const delimiter = '_'
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\-\–\—]/g, delimiter)
    .split(delimiter)
    .filter(chunk => chunk.length !== 0)
    .join(delimiter)
    .toLowerCase()
}

export function toKebab(str) {
  const delimiter = '-'
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\_]/g, delimiter)
    .split(delimiter)
    .filter(chunk => chunk.length !== 0)
    .join(delimiter)
    .toLowerCase()
}

export function toCamel(str) {
  if (typeof str !== 'string') return ""
  str = str.toLowerCase().split(/[\ \\\/\_\-\–\—]/g)
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join('');
}