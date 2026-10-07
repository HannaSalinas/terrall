import { ApiProperty } from '@nestjs/swagger';

export class TourismCategoryDto {
  @ApiProperty({ example: 'Agencias de Viajes' })
  category!: string;

  @ApiProperty({ example: 17105 })
  count!: number;
}

export class TourismVenueDto {
  @ApiProperty()
  name!: string;

  @ApiProperty()
  municipality!: string;

  @ApiProperty()
  category!: string;
}

export class TourismVenuePageDto {
  @ApiProperty({ type: [TourismVenueDto] })
  items!: TourismVenueDto[];

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  total!: number;
}

export class TourismDto {
  @ApiProperty({ example: '05' })
  departmentCode!: string;

  @ApiProperty({ example: 122771 })
  total!: number;

  @ApiProperty()
  source!: string;

  @ApiProperty({ example: '2026-09-17' })
  updatedOn!: string;

  @ApiProperty({ type: [TourismCategoryDto] })
  topCategories!: TourismCategoryDto[];

  @ApiProperty({ type: TourismVenuePageDto })
  venues!: TourismVenuePageDto;
}
