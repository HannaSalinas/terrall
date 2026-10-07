import { Injectable, NotFoundException } from '@nestjs/common';
import { Topic } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  DepartmentDetailDto,
  DepartmentSummaryDto,
  TopicDto,
  TopicsDto,
} from './dto/department.dto';
import { TourismDto } from './dto/tourism.dto';

const TOPIC_KEYS: Record<Topic, keyof TopicsDto> = {
  [Topic.TRANSPORTE]: 'transporte',
  [Topic.TURISMO]: 'turismo',
  [Topic.EDUCACION]: 'educacion',
  [Topic.ECONOMIA]: 'economia',
};

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<DepartmentSummaryDto[]> {
    const departments = await this.prisma.department.findMany({
      orderBy: { code: 'asc' },
      include: { tourismStat: { select: { total: true } } },
    });
    return departments.map((d) => ({
      code: d.code,
      name: d.name,
      tourismTotal: d.tourismStat?.total ?? null,
    }));
  }

  async findOne(code: string): Promise<DepartmentDetailDto> {
    const department = await this.prisma.department.findUnique({
      where: { code },
      include: { topics: true },
    });
    if (!department) throw this.notFound(code);

    const topics = {} as TopicsDto;
    for (const t of department.topics) {
      const topic: TopicDto = {
        description: t.description,
        items: t.items,
        mainTerminal: t.mainTerminal,
        isSample: t.isSample,
      };
      topics[TOPIC_KEYS[t.topic]] = topic;
    }
    return { code: department.code, name: department.name, topics };
  }

  async findTourism(
    code: string,
    page: number,
    limit: number,
  ): Promise<TourismDto> {
    const stat = await this.prisma.tourismStat.findUnique({
      where: { departmentCode: code },
      include: { categories: { orderBy: { rank: 'asc' } } },
    });
    if (!stat) throw this.notFound(code);

    const where = { departmentCode: code };
    const [items, total] = await Promise.all([
      this.prisma.tourismVenue.findMany({
        where,
        orderBy: { id: 'asc' },
        skip: (page - 1) * limit,
        take: limit,
        select: { name: true, municipality: true, category: true },
      }),
      this.prisma.tourismVenue.count({ where }),
    ]);

    return {
      departmentCode: code,
      total: stat.total,
      source: stat.source,
      updatedOn: stat.updatedOn.toISOString().slice(0, 10),
      topCategories: stat.categories.map((c) => ({
        category: c.category,
        count: c.count,
      })),
      venues: { items, page, limit, total },
    };
  }

  private notFound(code: string): NotFoundException {
    return new NotFoundException(
      `No existe un departamento con código ${code}`,
    );
  }
}
