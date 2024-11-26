import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICES, PRODUCT_SERVICES } from 'src/config/services';

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envVariable } from 'src/config/env';

@Module({
  controllers: [OrdersController],
  imports:[
    ClientsModule.register([
      {
        name: ORDERS_SERVICES,
        transport: Transport.TCP,
        options:{
          host: envVariable.ordersMicroservicesHost,
          port: envVariable.ordersMicroservicesPort
        }
      }
    ])
  ]
})
export class OrdersModule {}
