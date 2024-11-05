import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdrDto } from './create-ordr.dto';

export class UpdateOrdrDto extends PartialType(CreateOrdrDto) {}
