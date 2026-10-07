// Pruebas de extremo a extremo contra un PostgreSQL real con el seed cargado.
// Requieren DATABASE_URL (ver README): npm run test:e2e
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

interface Department {
  code: string;
  name: string;
  tourismTotal: number | null;
}

describe('Terrall API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health', () =>
    request(app.getHttpServer())
      .get('/api/health')
      .expect(200, { status: 'ok', database: 'up' }));

  it('GET /api/departments devuelve los 33 departamentos', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/departments')
      .expect(200);
    const body = res.body as Department[];
    expect(body).toHaveLength(33);
    expect(body[0]).toEqual(
      expect.objectContaining({ code: '05', name: 'ANTIOQUIA' }),
    );
  });

  it('GET /api/departments/05 marca los temas como datos de ejemplo', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/departments/05')
      .expect(200);
    expect(res.body).toMatchObject({
      code: '05',
      topics: { transporte: { isSample: true }, turismo: { isSample: true } },
    });
  });

  it('GET /api/departments/00 responde 404', () =>
    request(app.getHttpServer()).get('/api/departments/00').expect(404));

  it('GET /api/departments/abc responde 400', () =>
    request(app.getHttpServer()).get('/api/departments/abc').expect(400));

  it('GET /api/departments/05/tourism pagina los establecimientos', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/departments/05/tourism?page=2&limit=2')
      .expect(200);
    expect(res.body).toMatchObject({
      departmentCode: '05',
      venues: { page: 2, limit: 2 },
    });
    expect(
      (res.body as { venues: { items: unknown[] } }).venues.items,
    ).toHaveLength(2);
  });

  it('GET /api/departments/05/tourism rechaza limit mayor a 50', () =>
    request(app.getHttpServer())
      .get('/api/departments/05/tourism?limit=100')
      .expect(400));

  it('GET /api/cities devuelve las ciudades ordenadas por población', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/cities')
      .expect(200);
    const cities = res.body as { name: string; population: number }[];
    expect(cities).toHaveLength(12);
    expect(cities[0].name).toBe('Bogotá');
  });
});
