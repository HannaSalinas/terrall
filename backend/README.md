# Terrall · API

API REST de Terrall: sirve por departamento la información que muestra el mapa (temas, turismo del RNT) y las ciudades principales.

**Stack:** NestJS 11 · TypeScript · PostgreSQL 16 · Prisma · Swagger · Jest

**En producción:** https://terrall-api.onrender.com/api · [documentación](https://terrall-api.onrender.com/api/docs)

## Endpoints

| Método y ruta | Descripción |
|---|---|
| `GET /api/health` | Estado de la API y de la base de datos (503 si la base no responde) |
| `GET /api/departments` | Los 33 departamentos con su código DANE y el total de establecimientos turísticos |
| `GET /api/departments/:code` | Detalle por temas: transporte, turismo, educación y economía |
| `GET /api/departments/:code/tourism?page=1&limit=10` | Estadísticas del RNT y establecimientos paginados (`limit` máximo 50) |
| `GET /api/cities` | Ciudades principales ordenadas por población |

`:code` es el código DANE de dos dígitos (por ejemplo `05` para Antioquia). Un código con otro formato responde **400** y uno inexistente, **404**. La documentación interactiva está en `/api/docs`.

Ejemplo:

```bash
curl http://localhost:3000/api/departments/05/tourism?limit=2
```

```json
{
  "departmentCode": "05",
  "total": 122771,
  "source": "Registro Nacional de Turismo (RNT), datos.gov.co, dataset thwd-ivmp",
  "updatedOn": "2026-09-17",
  "topCategories": [{ "category": "Viviendas Turísticas", "count": 72751 }, "..."],
  "venues": { "items": ["..."], "page": 1, "limit": 2, "total": 6 }
}
```

## Datos

El seed (`prisma/seed.ts`) carga en PostgreSQL los mismos datos que usa el frontend: los códigos DANE del GeoJSON, las estadísticas y establecimientos del Registro Nacional de Turismo y las ciudades. Los textos de transporte, turismo, educación y economía son **datos de ejemplo** y la API lo indica con `isSample: true`.

## Ejecutar con Docker

Desde esta carpeta, un solo comando levanta PostgreSQL y la API, aplica las migraciones y carga los datos:

```bash
docker compose up --build
```

La API queda en `http://localhost:3000/api` y la documentación en `http://localhost:3000/api/docs`.

## Ejecutar en local (sin Docker para la API)

Requisitos: Node.js 22 y Docker (solo para PostgreSQL).

```bash
cp .env.example .env
docker compose up -d db
npm ci
npm run db:migrate
npm run db:seed
npm run build && npm run start:prod   # o npm run start:dev
```

## Pruebas

```bash
npm run lint        # ESLint sin advertencias
npm test            # pruebas unitarias (Prisma simulado)
npm run test:e2e    # pruebas end-to-end; requieren la base con migraciones y seed
```

GitHub Actions ejecuta lint, build, pruebas unitarias y e2e con un PostgreSQL de servicio en cada cambio del backend.

## Despliegue

La API está desplegada en **Render** (plan gratuito, con Docker) y la base de datos en **Neon** (PostgreSQL), ambas en la costa este de EE. UU. La configuración está en [`render.yaml`](../render.yaml):

- Render construye la imagen con `backend/Dockerfile` desde `develop` cuando pasan los checks de GitHub.
- Al iniciar, el contenedor aplica las migraciones y carga el seed solo si la base está vacía.
- `DATABASE_URL` se configura en Render y no se guarda en el repositorio; `CORS_ORIGINS` permite solo la demo en GitHub Pages.
- En el plan gratuito el servicio se suspende tras 15 minutos sin uso; la primera petición después de eso tarda cerca de un minuto.

Para recargar los datos (por ejemplo, tras actualizar el RNT), ejecuta el seed completo contra la base de producción desde tu equipo: `DATABASE_URL="<cadena de Neon>" npm run db:seed`.

## Decisiones técnicas

- **Código DANE como identificador.** Es el código oficial y estable; el nombre en mayúsculas del GeoJSON se mantiene como campo único para que el mapa pueda buscar por nombre.
- **Prisma** para tener el esquema versionado en migraciones y tipos generados que el compilador verifica.
- **Datos de ejemplo marcados en la base** (`is_sample`), para que la API nunca presente como oficial algo que no lo es.
- **Validación en el borde** con `class-validator`: el código DANE y la paginación se validan antes de llegar a la base, con mensajes en español.
- **Solo lectura y CORS restringido** a los orígenes configurados en `CORS_ORIGINS`, porque por ahora la API solo alimenta al mapa.
- **Seed idempotente** en una transacción: se puede correr varias veces sin duplicar datos.
