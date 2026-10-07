// Cliente de la API de Terrall (backend/). Si VITE_API_URL no está definida,
// como en la demo de GitHub Pages, el mapa trabaja solo con los datos estáticos.
const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

export const isApiEnabled = Boolean(API_URL)

// Campo con la lista de cada tema en los datos estáticos (src/data/departments.js)
const LIST_FIELD = {
  transporte: 'routes',
  turismo: 'topDestinations',
  educacion: 'universities',
  economia: 'mainActivities',
}

// Los establecimientos por departamento son pocos; se piden en una sola página
const VENUES_LIMIT = 50

let codesByName = null

async function getJson(path, signal) {
  const res = await fetch(`${API_URL}${path}`, { signal })
  if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`)
  return res.json()
}

// La API identifica los departamentos por código DANE; el mapa, por nombre
async function departmentCode(name, signal) {
  if (!codesByName) {
    const list = await getJson('/departments', signal)
    codesByName = new Map(list.map(d => [d.name, d.code]))
  }
  const code = codesByName.get(name)
  if (!code) throw new Error(`La API no conoce el departamento ${name}`)
  return code
}

// Devuelve los datos de un departamento con la misma forma que los estáticos
export async function fetchDepartmentData(name, signal) {
  const code = await departmentCode(name, signal)
  const [detail, tourism] = await Promise.all([
    getJson(`/departments/${code}`, signal),
    getJson(`/departments/${code}/tourism?limit=${VENUES_LIMIT}`, signal),
  ])

  const info = {}
  for (const [key, topic] of Object.entries(detail.topics)) {
    info[key] = {
      description: topic.description,
      [LIST_FIELD[key]]: topic.items,
      ...(topic.mainTerminal ? { mainTerminal: topic.mainTerminal } : {}),
    }
  }

  return {
    info,
    tourismStats: {
      total: tourism.total,
      topCategories: tourism.topCategories.map(c => ({ categoria: c.category, count: c.count })),
    },
    tourismVenues: tourism.venues.items.map(v => ({
      name: v.name,
      municipio: v.municipality,
      categoria: v.category,
    })),
  }
}
