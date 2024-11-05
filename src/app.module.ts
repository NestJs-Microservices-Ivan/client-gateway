import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrdrsModule } from './ordrs/ordrs.module';

@Module({
  imports: [ProductsModule, OrdersModule, OrdrsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
