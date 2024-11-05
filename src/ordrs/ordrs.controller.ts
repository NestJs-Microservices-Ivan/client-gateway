import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdrsService } from './ordrs.service';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';

@Controller('ordrs')
export class OrdrsController {
  constructor(private readonly ordrsService: OrdrsService) {}

  @Post()
  create(@Body() createOrdrDto: CreateOrdrDto) {
    return this.ordrsService.create(createOrdrDto);
  }

  @Get()
  findAll() {
    return this.ordrsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordrsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdrDto: UpdateOrdrDto) {
    return this.ordrsService.update(+id, updateOrdrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordrsService.remove(+id);
  }
}
