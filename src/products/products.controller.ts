import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCT_SERVICES } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Pagination } from 'src/common/pagination.dto';
import { catchError, pipe } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICES) private readonly clientProduct: ClientProxy
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.clientProduct.send({cmd:"create_product"},createProductDto)
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }

  @Get()
  findAll(@Query() pagination:Pagination) {
    return this.clientProduct.send({cmd:'find_all_products'},pagination)
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.clientProduct.send({cmd:'find_one_product'},{id})
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.clientProduct.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientProduct.remove(+id);
  // }
}
