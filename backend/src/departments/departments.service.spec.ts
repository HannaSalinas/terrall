import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Topic } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  const prisma = {
    department: { findMany: jest.fn(), findUnique: jest.fn() },
    tourismStat: { findUnique: jest.fn() },
    tourismVenue: { findMany: jest.fn(), count: jest.fn() },
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();
    service = moduleRef.get(DepartmentsService);
  });

  it('lista departamentos con el total de turismo o null si no hay datos', async () => {
    prisma.department.findMany.mockResolvedValue([
      { code: '05', name: 'ANTIOQUIA', tourismStat: { total: 120 } },
      { code: '97', name: 'VAUPES', tourismStat: null },
    ]);

    await expect(service.findAll()).resolves.toEqual([
      { code: '05', name: 'ANTIOQUIA', tourismTotal: 120 },
      { code: '97', name: 'VAUPES', tourismTotal: null },
    ]);
  });

  it('agrupa los temas por clave en el detalle', async () => {
    const topic = (t: Topic) => ({
      topic: t,
      description: `desc ${t}`,
      items: ['a'],
      mainTerminal: t === Topic.TRANSPORTE ? 'Terminal' : null,
      isSample: true,
    });
    prisma.department.findUnique.mockResolvedValue({
      code: '05',
      name: 'ANTIOQUIA',
      topics: [
        Topic.TRANSPORTE,
        Topic.TURISMO,
        Topic.EDUCACION,
        Topic.ECONOMIA,
      ].map(topic),
    });

    const detail = await service.findOne('05');

    expect(Object.keys(detail.topics).sort()).toEqual([
      'economia',
      'educacion',
      'transporte',
      'turismo',
    ]);
    expect(detail.topics.transporte.mainTerminal).toBe('Terminal');
    expect(detail.topics.turismo.isSample).toBe(true);
  });

  it('lanza 404 si el departamento no existe', async () => {
    prisma.department.findUnique.mockResolvedValue(null);
    await expect(service.findOne('00')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('pagina los establecimientos con skip y take', async () => {
    prisma.tourismStat.findUnique.mockResolvedValue({
      total: 500,
      source: 'RNT',
      updatedOn: new Date('2026-09-17T00:00:00Z'),
      categories: [{ category: 'Hoteles', count: 300 }],
    });
    prisma.tourismVenue.findMany.mockResolvedValue([
      { name: 'Hotel', municipality: 'Medellín', category: 'Hoteles' },
    ]);
    prisma.tourismVenue.count.mockResolvedValue(11);

    const tourism = await service.findTourism('05', 3, 5);

    expect(prisma.tourismVenue.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 10, take: 5 }),
    );
    expect(tourism.updatedOn).toBe('2026-09-17');
    expect(tourism.topCategories).toEqual([
      { category: 'Hoteles', count: 300 },
    ]);
    expect(tourism.venues).toEqual({
      items: [{ name: 'Hotel', municipality: 'Medellín', category: 'Hoteles' }],
      page: 3,
      limit: 5,
      total: 11,
    });
  });

  it('lanza 404 en turismo si no hay estadísticas del departamento', async () => {
    prisma.tourismStat.findUnique.mockResolvedValue(null);
    await expect(service.findTourism('00', 1, 10)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
