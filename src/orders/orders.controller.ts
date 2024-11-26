import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICES } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICES) private readonly clientOrders: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.clientOrders.send('createOrder',createOrderDto);
  }

  @Get()
  findAll() {
    return this.clientOrders.send('findAllOrders',{});
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientOrders.send('findOneOrder',id);
  }


}
