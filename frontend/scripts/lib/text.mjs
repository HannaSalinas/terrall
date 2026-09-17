// Helpers de texto para limpiar los datos crudos del RNT (datos.gov.co).

// El RNT tiene filas con texto doble-codificado (UTF-8 leído como
// Windows-1252 y vuelto a guardar como UTF-8), ej: "PUERTO CARREÃ‘O" en
// vez de "PUERTO CARREÑO". Esto revierte ese doble-encoding reconstruyendo
// los bytes originales a partir de la tabla Windows-1252 y decodificándolos
// de nuevo como UTF-8.
const WIN1252_HIGH_TO_UNICODE = {
  0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026,
  0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160,
  0x8B: 0x2039, 0x8C: 0x0152, 0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019,
  0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
  0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A, 0x9C: 0x0153,
  0x9E: 0x017E, 0x9F: 0x0178,
}
const UNICODE_TO_WIN1252_BYTE = Object.fromEntries(
  Object.entries(WIN1252_HIGH_TO_UNICODE).map(([byte, unicode]) => [unicode, Number(byte)])
)

export function fixMojibake(str) {
  if (!str) return str
  // 'Ã' (U+00C3) es la marca reveladora de este patrón: es el primer byte
  // UTF-8 de CUALQUIER vocal acentuada/ñ en español (rango U+00C0-U+00FF),
  // reinterpretado como carácter. Un string ya bien codificado no la tiene
  // sola (fuera de una palabra con "Ã" real, rarísimo en español), así que
  // solo intentamos la reconstrucción si aparece — si no, lo dejamos intacto
  // para no corromper texto que ya estaba bien.
  if (!str.includes('Ã')) return str

  const bytes = []
  for (const ch of str) {
    const code = ch.codePointAt(0)
    if (code > 0xFF && !(code in UNICODE_TO_WIN1252_BYTE)) return str // patrón inesperado, no tocar
    bytes.push(code in UNICODE_TO_WIN1252_BYTE ? UNICODE_TO_WIN1252_BYTE[code] : code)
  }
  try {
    const fixed = Buffer.from(bytes).toString('utf8')
    return fixed.includes('�') ? str : fixed // si igual quedó roto, mejor el original
  } catch {
    return str
  }
}

export function toTitleCase(str) {
  return fixMojibake(str)
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      // Conectores en minúscula salvo que sean la primera palabra
      if (i > 0 && ['de', 'del', 'la', 'las', 'el', 'los', 'y', 'en'].includes(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
