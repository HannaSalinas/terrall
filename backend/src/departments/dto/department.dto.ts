import { ApiProperty } from '@nestjs/swagger';

export class DepartmentSummaryDto {
  @ApiProperty({ example: '05' })
  code!: string;

  @ApiProperty({ example: 'ANTIOQUIA' })
  name!: string;

  @ApiProperty({
    description: 'Establecimientos turísticos activos en el RNT',
    nullable: true,
    type: Number,
    example: 122771,
  })
  tourismTotal!: number | null;
}

export class TopicDto {
  @ApiProperty()
  description!: string;

  @ApiProperty({ type: [String] })
  items!: string[];

  @ApiProperty({ nullable: true, type: String })
  mainTerminal!: string | null;

  @ApiProperty({
    description:
      'true si el contenido es de ejemplo y no de una fuente oficial',
  })
  isSample!: boolean;
}

export class TopicsDto {
  @ApiProperty({ type: TopicDto })
  transporte!: TopicDto;

  @ApiProperty({ type: TopicDto })
  turismo!: TopicDto;

  @ApiProperty({ type: TopicDto })
  educacion!: TopicDto;

  @ApiProperty({ type: TopicDto })
  economia!: TopicDto;
}

export class DepartmentDetailDto {
  @ApiProperty({ example: '05' })
  code!: string;

  @ApiProperty({ example: 'ANTIOQUIA' })
  name!: string;

  @ApiProperty({ type: TopicsDto })
  topics!: TopicsDto;
}
