import { Module } from '@nestjs/common';
import { OrdrsService } from './ordrs.service';
import { OrdrsController } from './ordrs.controller';

@Module({
  controllers: [OrdrsController],
  providers: [OrdrsService],
})
export class OrdrsModule {}
