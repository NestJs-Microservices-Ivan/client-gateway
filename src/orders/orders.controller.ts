import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICES } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Pagination } from 'src/common/pagination.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { Status } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICES) private readonly clientOrders: ClientProxy
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.clientOrders.send('createOrder',createOrderDto)
    .pipe(catchError((err) => {throw new RpcException(err)}));
  }

  @Get()
  findAll(@Query() paginationDto:OrderPaginationDto) {
    return this.clientOrders.send('findAllOrders',paginationDto);
  }

  @Get('id/:id')
  findOneById(@Param('id',ParseUUIDPipe) id: string) {
    return this.clientOrders.send('findOneOrder',{id})
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    );
  }

  @Get(':status')
  findOneByStatus(
    @Param() statusDto: Status,
    @Query() paginationDto: Pagination
  ) {
    return this.clientOrders.send('findAllOrders',{
      ...paginationDto,
      status: statusDto.status
    })
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    );
  }


}
