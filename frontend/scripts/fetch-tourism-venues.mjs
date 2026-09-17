// Trae una muestra de establecimientos turísticos NOMBRADOS y reales por
// departamento (hoteles, agencias de viajes, restaurantes, parques
// temáticos) para poder linkearlos a Google Maps. Se excluyen categorías
// sin nombre comercial reconocible (viviendas turísticas, oficinas, etc.)
// porque casi nunca resuelven en una búsqueda de Maps.
//
// Fuente: Registro Nacional de Turismo (RNT), datos.gov.co, dataset thwd-ivmp
// Uso: node scripts/fetch-tourism-venues.mjs

import { writeFileSync } from 'fs'
import { toTitleCase } from './lib/text.mjs'

const SOURCE_URL = 'https://www.datos.gov.co/resource/thwd-ivmp.json'

const LINKABLE_CATEGORIES = [
  'ESTABLECIMIENTOS DE ALOJAMIENTO TURÍSTICO',
  'AGENCIAS DE VIAJES',
  'ESTABLECIMIENTOS DE GASTRONOMÍA Y SIMILARES',
  'PARQUES TEMÁTICOS',
]

// Mismo mapeo que fetch-tourism-data.mjs, pero en sentido inverso
// (de la clave del mapa al nombre que usa el dataset del RNT).
const TO_RNT_DEPARTMENT = {
  'SANTAFE DE BOGOTA D.C': 'BOGOTA',
  'LA GUAJIRA': 'GUAJIRA',
  'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': 'SAN ANDRES Y PROVIDENCIA',
}

const VENUES_PER_DEPARTMENT = 6

async function fetchDepartmentVenues(mapDeptName) {
  const rntDept = TO_RNT_DEPARTMENT[mapDeptName] || mapDeptName
  const categoriesClause = LINKABLE_CATEGORIES.map(c => `'${c.replace(/'/g, "''")}'`).join(',')
  const where = `departamento='${rntDept.replace(/'/g, "''")}' AND categoria in(${categoriesClause})`
  const query = new URLSearchParams({
    '$select': 'razon_social_establecimiento, municipio, categoria',
    '$where': where,
    '$order': 'num_emp1 DESC',
    '$limit': '60', // se dedupea después; 60 alcanza para sacar 6 nombres únicos
  })
  const res = await fetch(`${SOURCE_URL}?${query}`)
  if (!res.ok) throw new Error(`Socrata request failed for ${mapDeptName}: ${res.status}`)
  const rows = await res.json()

  const seen = new Set()
  const venues = []
  for (const row of rows) {
    const key = `${row.razon_social_establecimiento}|${row.municipio}`
    if (seen.has(key)) continue
    seen.add(key)
    venues.push({
      name: toTitleCase(row.razon_social_establecimiento),
      municipio: toTitleCase(row.municipio),
      categoria: toTitleCase(row.categoria),
    })
    if (venues.length >= VENUES_PER_DEPARTMENT) break
  }
  return venues
}

async function main() {
  const geoModule = await import('node:fs')
  const geo = JSON.parse(geoModule.readFileSync(new URL('../public/geo/colombia.geojson', import.meta.url)))
  const departments = [...new Set(geo.features.map(f => f.properties.NOMBRE_DPT))].sort()

  const result = {}
  for (const dept of departments) {
    process.stdout.write(`Consultando ${dept}... `)
    result[dept] = await fetchDepartmentVenues(dept)
    console.log(`${result[dept].length} establecimientos`)
  }

  const fetchedAt = new Date().toISOString().slice(0, 10)
  const fileContent = `// GENERADO por scripts/fetch-tourism-venues.mjs — no editar a mano.
// Fuente: Registro Nacional de Turismo (RNT), datos.gov.co (dataset thwd-ivmp)
// Muestra de establecimientos con nombre comercial reconocible, para
// enlazar a Google Maps por búsqueda de texto (nombre + municipio).
// Última actualización de este archivo: ${fetchedAt}
export const TOURISM_VENUES = ${JSON.stringify(result, null, 2)}
`
  writeFileSync(new URL('../src/data/tourismVenues.js', import.meta.url), fileContent)
  console.log(`\nEscrito src/data/tourismVenues.js con ${Object.keys(result).length} departamentos.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
