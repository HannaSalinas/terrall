import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CityDto } from './dto/city.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<CityDto[]> {
    return this.prisma.city.findMany({
      orderBy: { population: 'desc' },
      select: { name: true, lat: true, lng: true, population: true },
    });
  }
}
