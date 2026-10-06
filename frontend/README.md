# Terrall · frontend

Aplicación React + Vite con el mapa 3D de Colombia. La documentación completa del proyecto está en el [README principal](../README.md).

```bash
npm ci
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run lint      # ESLint
npm run build     # build de producción en dist/
npm run preview   # sirve el build localmente
```

## Scripts de datos

| Script | Qué hace |
|---|---|
| `scripts/fetch-tourism-data.mjs` | Descarga del RNT (datos.gov.co) el total de establecimientos por departamento y categoría y genera `src/data/tourismStats.js` |
| `scripts/fetch-tourism-venues.mjs` | Descarga una muestra de establecimientos con nombre comercial y genera `src/data/tourismVenues.js` |
| `scripts/simplify-geojson.mjs [epsilon]` | Simplifica `public/geo/colombia.geojson` con Ramer-Douglas-Peucker (por defecto ε = 0,004°) |
