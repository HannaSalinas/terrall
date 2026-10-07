import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DepartmentsService } from './departments.service';
import { DepartmentCodeParam } from './dto/department-code.param';
import {
  DepartmentDetailDto,
  DepartmentSummaryDto,
} from './dto/department.dto';
import { PaginationQuery } from './dto/pagination.query';
import { TourismDto } from './dto/tourism.dto';

@ApiTags('departamentos')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departments: DepartmentsService) {}

  @Get()
  @ApiOkResponse({ type: [DepartmentSummaryDto] })
  findAll(): Promise<DepartmentSummaryDto[]> {
    return this.departments.findAll();
  }

  @Get(':code')
  @ApiOkResponse({ type: DepartmentDetailDto })
  @ApiBadRequestResponse({ description: 'Código con formato inválido' })
  @ApiNotFoundResponse({ description: 'Departamento inexistente' })
  findOne(
    @Param() { code }: DepartmentCodeParam,
  ): Promise<DepartmentDetailDto> {
    return this.departments.findOne(code);
  }

  @Get(':code/tourism')
  @ApiOkResponse({ type: TourismDto })
  @ApiBadRequestResponse({ description: 'Código o paginación inválidos' })
  @ApiNotFoundResponse({ description: 'Departamento inexistente' })
  findTourism(
    @Param() { code }: DepartmentCodeParam,
    @Query() { page, limit }: PaginationQuery,
  ): Promise<TourismDto> {
    return this.departments.findTourism(code, page, limit);
  }
}
