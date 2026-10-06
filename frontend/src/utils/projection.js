import { geoMercator } from 'd3-geo'

// Proyección compartida por el mapa y la capa de ciudades
export const projection = geoMercator()
  .center([-74.3, 4.5])
  .scale(1200)
  .translate([0, 0])
