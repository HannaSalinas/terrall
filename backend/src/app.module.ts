import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CitiesModule } from './cities/cities.module';
import { DepartmentsModule } from './departments/departments.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DepartmentsModule,
    CitiesModule,
    HealthModule,
  ],
})
export class AppModule {}
