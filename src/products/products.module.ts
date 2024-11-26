import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { PRODUCT_SERVICES } from 'src/config/services';
import { ProductsController } from './products.controller';
import { envVariable } from 'src/config/env';

@Module({
  controllers: [ProductsController],
  imports:[
    ClientsModule.register([
      {
        name: PRODUCT_SERVICES,
        transport: Transport.TCP,
        options:{
          host: envVariable.productMicroserviceHost,
          port: envVariable.productMicroservicePort
        }
      }
    ])
  ]
})
export class ProductsModule {}
