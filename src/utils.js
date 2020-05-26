// -------------------------------------------------
// ---------------- Text formatting ----------------
// -------------------------------------------------

export function toSnake(str) {
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\-\–\—]/g, '_').toLowerCase()
}

export function toKebab(str) {
  if (typeof str !== 'string') return ""
  return str.replace(/[\ \\\/\_]/g, '-').toLowerCase()
}

export function toCamel(str) {
  if (typeof str !== 'string') return ""
  str = str.toLowerCase().split(/[\ \\\/\_\-\–\—]/g)
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join('');
}