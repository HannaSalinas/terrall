# Imagen de desarrollo de la API. El contexto de build es la raíz del repositorio
# porque el seed lee los datos de frontend/ (ver docker-compose.yml).
FROM node:22-bookworm-slim AS build
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
COPY backend/prisma ./prisma
RUN npm ci --no-audit --no-fund --fetch-timeout=60000 --fetch-retries=5
COPY backend/ ./
RUN npm run build

FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
WORKDIR /app
# Datos que usa el seed
COPY frontend/src/data ./frontend/src/data
COPY frontend/public/geo ./frontend/public/geo
WORKDIR /app/backend
# node_modules completo: el contenedor aplica migraciones y, si la base está vacía, el seed al iniciar (Prisma CLI y tsx)
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/prisma ./prisma
COPY --from=build /app/backend/package.json ./
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed -- --if-empty && node dist/main"]
