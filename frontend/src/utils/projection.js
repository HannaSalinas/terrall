import { geoMercator } from 'd3-geo'

// Proyección compartida por el mapa y la capa de ciudades.
// Con esta escala el país mide ~8 unidades de ancho en la escena.
export const projection = geoMercator()
  .center([-74.3, 4.5])
  .scale(30)
  .translate([0, 0])
