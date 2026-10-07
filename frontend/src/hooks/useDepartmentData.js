import { useEffect, useState } from 'react'
import { DEPARTMENTS } from '../data/departments'
import { TOURISM_STATS } from '../data/tourismStats'
import { TOURISM_VENUES } from '../data/tourismVenues'
import { fetchDepartmentData, isApiEnabled } from '../services/api'

function staticData(name) {
  if (!name) return null
  return {
    info: DEPARTMENTS[name] ?? null,
    tourismStats: TOURISM_STATS[name] ?? null,
    tourismVenues: TOURISM_VENUES[name] ?? [],
  }
}

// Datos de un departamento: muestra de inmediato los estáticos y, si hay API
// configurada, los reemplaza por los de la API. Si la API falla, se quedan
// los estáticos.
export function useDepartmentData(name) {
  const [apiData, setApiData] = useState({ name: null, data: null })

  useEffect(() => {
    if (!name || !isApiEnabled) return
    const controller = new AbortController()
    fetchDepartmentData(name, controller.signal)
      .then(data => setApiData({ name, data }))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.warn('No se pudo usar la API; se muestran los datos estáticos.', error)
        }
      })
    return () => controller.abort()
  }, [name])

  return apiData.name === name && apiData.data ? apiData.data : staticData(name)
}
