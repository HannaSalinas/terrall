import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class DepartmentCodeParam {
  @ApiProperty({ description: 'Código DANE de dos dígitos', example: '05' })
  @Matches(/^\d{2}$/, {
    message: 'code debe ser el código DANE de dos dígitos, por ejemplo 05',
  })
  code!: string;
}
