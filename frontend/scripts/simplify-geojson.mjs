// Simplifica los anillos del geojson de Colombia con Ramer-Douglas-Peucker
// para reducir el número de puntos (y por lo tanto el costo de construir
// ExtrudeGeometry/EdgesGeometry en el navegador). Sin dependencias nuevas.
//
// Uso: node scripts/simplify-geojson.mjs [epsilon]
// epsilon en grados (default 0.004, ~440m). Sobreescribe public/geo/colombia.geojson
// (guarda una copia sin simplificar en public/geo/colombia.full.geojson la
// primera vez, para poder comparar o revertir).

import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs'

const SRC = new URL('../public/geo/colombia.geojson', import.meta.url)
const BACKUP = new URL('../public/geo/colombia.full.geojson', import.meta.url)
const epsilon = parseFloat(process.argv[2] || '0.004')

function perpendicularDistance(point, lineStart, lineEnd) {
  const [x, y] = point
  const [x1, y1] = lineStart
  const [x2, y2] = lineEnd
  const dx = x2 - x1
  const dy = y2 - y1
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1)
  const t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
  const projX = x1 + t * dx
  const projY = y1 + t * dy
  return Math.hypot(x - projX, y - projY)
}

function rdp(points, eps) {
  if (points.length < 3) return points
  let maxDist = 0
  let maxIndex = 0
  const first = points[0]
  const last = points[points.length - 1]
  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], first, last)
    if (dist > maxDist) { maxDist = dist; maxIndex = i }
  }
  if (maxDist > eps) {
    const left = rdp(points.slice(0, maxIndex + 1), eps)
    const right = rdp(points.slice(maxIndex), eps)
    return [...left.slice(0, -1), ...right]
  }
  return [first, last]
}

function simplifyRing(ring, eps) {
  if (ring.length <= 4) return ring
  const simplified = rdp(ring, eps)
  // Garantizar anillo cerrado y con al menos 4 puntos (mínimo para un polígono válido)
  if (simplified.length < 4) return ring
  const first = simplified[0]
  const last = simplified[simplified.length - 1]
  if (first[0] !== last[0] || first[1] !== last[1]) simplified.push(first)
  return simplified
}

function main() {
  if (!existsSync(BACKUP)) {
    copyFileSync(SRC, BACKUP)
    console.log('Backup del geojson original guardado en public/geo/colombia.full.geojson')
  }

  const geo = JSON.parse(readFileSync(BACKUP, 'utf8')) // siempre simplificar desde el original

  let pointsBefore = 0
  let pointsAfter = 0

  geo.features.forEach(feature => {
    const { type, coordinates } = feature.geometry
    const polygons = type === 'Polygon' ? [coordinates] : coordinates
    const newPolygons = polygons.map(polygon =>
      polygon.map(ring => {
        pointsBefore += ring.length
        const simplified = simplifyRing(ring, epsilon)
        pointsAfter += simplified.length
        return simplified
      })
    )
    feature.geometry.coordinates = type === 'Polygon' ? newPolygons[0] : newPolygons
  })

  writeFileSync(new URL(SRC), JSON.stringify(geo))

  const reduction = (100 * (1 - pointsAfter / pointsBefore)).toFixed(1)
  console.log(`Puntos: ${pointsBefore} -> ${pointsAfter} (-${reduction}%), epsilon=${epsilon}`)
}

main()
