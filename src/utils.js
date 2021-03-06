// -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------

const allDelimiters = /[\ \\\/\_\-\–\—]/g

export function delimitString(str, delimiter) {
  return str.replace(allDelimiters, delimiter)
    .split(delimiter)
    .filter(chunk => chunk.length !== 0)
    .join(delimiter)
    .toLowerCase()
}

export function toSnake(str) {
  const delimiter = '_'
  if (typeof str !== 'string') return ""
  return delimitString(str, delimiter)
}

export function toKebab(str) {
  const delimiter = '-'
  if (typeof str !== 'string') return ""
  return delimitString(str, delimiter)
}

export function toCamel(str) {
  if (typeof str !== 'string') return ""
  str = delimitString(str, ' ').split(allDelimiters)
  if(str.length > 1) {
    for (var i = 1; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
  }
  return str.join('');
}

export function toPascal(str) {
  const camel = toCamel(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}