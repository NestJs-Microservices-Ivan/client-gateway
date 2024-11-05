import { Injectable } from '@nestjs/common';
import { CreateOrdrDto } from './dto/create-ordr.dto';
import { UpdateOrdrDto } from './dto/update-ordr.dto';

@Injectable()
export class OrdrsService {
  create(createOrdrDto: CreateOrdrDto) {
    return 'This action adds a new ordr';
  }

  findAll() {
    return `This action returns all ordrs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordr`;
  }

  update(id: number, updateOrdrDto: UpdateOrdrDto) {
    return `This action updates a #${id} ordr`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordr`;
  }
}
