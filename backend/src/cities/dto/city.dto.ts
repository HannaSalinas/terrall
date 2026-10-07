import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty({ example: 'Bogotá' })
  name!: string;

  @ApiProperty({ example: 4.711 })
  lat!: number;

  @ApiProperty({ example: -74.0721 })
  lng!: number;

  @ApiProperty({ example: 8000000 })
  population!: number;
}
