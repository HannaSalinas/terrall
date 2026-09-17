// Ingesta de datos reales del Registro Nacional de Turismo (RNT)
// Fuente: datos.gov.co, dataset thwd-ivmp (Socrata Open Data API)
// Uso: node scripts/fetch-tourism-data.mjs
//
// Trae el conteo de establecimientos turísticos activos agrupados por
// departamento y categoría, y escribe src/data/tourismStats.js con un
// resumen por departamento (total + top categorías).

import { writeFileSync } from 'fs'

const SOURCE_URL = 'https://www.datos.gov.co/resource/thwd-ivmp.json'
const DATASET_PAGE = 'https://www.datos.gov.co/Comercio-Industria-y-Turismo/Registro-Nacional-de-Turismo-RNT/thwd-ivmp'

// El dataset usa nombres de departamento distintos a los del geojson (NOMBRE_DPT).
// Mapeo a las claves reales que usa el mapa; null = descartar (registros sin depto).
const DEPARTMENT_ALIASES = {
  'BOGOTA': 'SANTAFE DE BOGOTA D.C',
  'GUAJIRA': 'LA GUAJIRA',
  'SAN ANDRES Y PROVIDENCIA': 'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA',
  'NO DETERMINADO': null,
}

async function fetchGrouped() {
  const query = new URLSearchParams({
    '$select': 'departamento, categoria, count(*) as total',
    '$group': 'departamento, categoria',
    '$limit': '5000',
  })
  const res = await fetch(`${SOURCE_URL}?${query}`)
  if (!res.ok) throw new Error(`Socrata request failed: ${res.status}`)
  return res.json()
}

function normalizeDept(raw) {
  if (raw in DEPARTMENT_ALIASES) return DEPARTMENT_ALIASES[raw]
  return raw
}

async function main() {
  const rows = await fetchGrouped()
  const byDept = {}

  for (const row of rows) {
    const dept = normalizeDept(row.departamento)
    if (!dept) continue
    const count = parseInt(row.total, 10)
    if (!byDept[dept]) byDept[dept] = { total: 0, categories: {} }
    byDept[dept].total += count
    byDept[dept].categories[row.categoria] = (byDept[dept].categories[row.categoria] || 0) + count
  }

  const summary = {}
  for (const [dept, data] of Object.entries(byDept)) {
    const topCategories = Object.entries(data.categories)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([categoria, count]) => ({ categoria: toTitleCase(categoria), count }))
    summary[dept] = { total: data.total, topCategories }
  }

  const fetchedAt = new Date().toISOString().slice(0, 10)
  const fileContent = `// GENERADO por scripts/fetch-tourism-data.mjs — no editar a mano.
// Fuente: Registro Nacional de Turismo (RNT), datos.gov.co (dataset thwd-ivmp)
// ${DATASET_PAGE}
// Última actualización de este archivo: ${fetchedAt}
export const TOURISM_STATS = ${JSON.stringify(summary, null, 2)}
`

  writeFileSync(new URL('../src/data/tourismStats.js', import.meta.url), fileContent)
  console.log(`Escrito src/data/tourismStats.js con ${Object.keys(summary).length} departamentos.`)
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.length > 3 ? w.charAt(0).toUpperCase() + w.slice(1) : w)
    .join(' ')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
