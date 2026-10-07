// Carga en PostgreSQL los datos que hoy usa el frontend (frontend/src/data y
// el GeoJSON). Es idempotente: borra y vuelve a insertar todo en una transacción.
// Uso: npx prisma db seed
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PrismaClient, Topic } from '@prisma/client';
import { DEPARTMENTS } from '../../frontend/src/data/departments.js';
import { TOURISM_STATS } from '../../frontend/src/data/tourismStats.js';
import { TOURISM_VENUES } from '../../frontend/src/data/tourismVenues.js';
import { CITIES } from '../../frontend/src/data/cities.js';

const FRONTEND = join(__dirname, '..', '..', 'frontend');
const RNT_SOURCE =
  'Registro Nacional de Turismo (RNT), datos.gov.co, dataset thwd-ivmp';

// Campo con la lista de cada tema en frontend/src/data/departments.js
const TOPICS = {
  transporte: { topic: Topic.TRANSPORTE, listField: 'routes' },
  turismo: { topic: Topic.TURISMO, listField: 'topDestinations' },
  educacion: { topic: Topic.EDUCACION, listField: 'universities' },
  economia: { topic: Topic.ECONOMIA, listField: 'mainActivities' },
} as const;

interface GeoJson {
  features: { properties: { DPTO: string; NOMBRE_DPT: string } }[];
}

function readDepartmentCodes(): Map<string, string> {
  const raw = readFileSync(
    join(FRONTEND, 'public', 'geo', 'colombia.geojson'),
    'utf-8',
  );
  const geo = JSON.parse(raw) as GeoJson;
  const codes = new Map<string, string>();
  for (const { properties } of geo.features) {
    codes.set(properties.NOMBRE_DPT, properties.DPTO);
  }
  return codes;
}

// La fecha de actualización está en la cabecera del archivo generado
function readTourismUpdatedOn(): Date {
  const header = readFileSync(
    join(FRONTEND, 'src', 'data', 'tourismStats.js'),
    'utf-8',
  );
  const match = header.match(
    /Última actualización de este archivo: (\d{4}-\d{2}-\d{2})/,
  );
  if (!match)
    throw new Error('No se encontró la fecha de actualización del RNT');
  return new Date(`${match[1]}T00:00:00Z`);
}

async function main() {
  const prisma = new PrismaClient();
  const codes = readDepartmentCodes();
  const updatedOn = readTourismUpdatedOn();

  const codeOf = (name: string): string => {
    const code = codes.get(name);
    if (!code)
      throw new Error(`Departamento sin código DANE en el GeoJSON: ${name}`);
    return code;
  };

  try {
    await prisma.$transaction(async (tx) => {
      // El borrado en cascada limpia temas, turismo y establecimientos
      await tx.department.deleteMany();
      await tx.city.deleteMany();

      await tx.department.createMany({
        data: Object.keys(DEPARTMENTS).map((name) => ({
          code: codeOf(name),
          name,
        })),
      });

      await tx.departmentTopic.createMany({
        data: Object.entries(DEPARTMENTS).flatMap(([name, topics]) =>
          Object.entries(TOPICS).map(([key, { topic, listField }]) => {
            const info = topics[key as keyof typeof TOPICS];
            return {
              departmentCode: codeOf(name),
              topic,
              description: info.description,
              items: info[listField] ?? [],
              mainTerminal: info.mainTerminal ?? null,
              // departments.js contiene datos de ejemplo, no oficiales
              isSample: true,
            };
          }),
        ),
      });

      await tx.tourismStat.createMany({
        data: Object.entries(TOURISM_STATS).map(([name, stat]) => ({
          departmentCode: codeOf(name),
          total: stat.total,
          source: RNT_SOURCE,
          updatedOn,
        })),
      });

      await tx.tourismCategory.createMany({
        data: Object.entries(TOURISM_STATS).flatMap(([name, stat]) =>
          stat.topCategories.map((c, i) => ({
            departmentCode: codeOf(name),
            category: c.categoria,
            count: c.count,
            rank: i + 1,
          })),
        ),
      });

      await tx.tourismVenue.createMany({
        data: Object.entries(TOURISM_VENUES).flatMap(([name, venues]) =>
          venues.map((v) => ({
            departmentCode: codeOf(name),
            name: v.name,
            municipality: v.municipio,
            category: v.categoria,
          })),
        ),
      });

      await tx.city.createMany({ data: CITIES });
    });

    const [departments, venues, cities] = await Promise.all([
      prisma.department.count(),
      prisma.tourismVenue.count(),
      prisma.city.count(),
    ]);
    console.log(
      `Seed completo: ${departments} departamentos, ${venues} establecimientos, ${cities} ciudades.`,
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
