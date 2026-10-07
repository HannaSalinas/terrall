import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CityDto } from './dto/city.dto';

@ApiTags('ciudades')
@Controller('cities')
export class CitiesController {
  constructor(private readonly cities: CitiesService) {}

  @Get()
  @ApiOkResponse({ type: [CityDto] })
  findAll(): Promise<CityDto[]> {
    return this.cities.findAll();
  }
}
