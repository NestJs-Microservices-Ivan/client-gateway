import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICES } from 'src/config/services';
import { Pagination } from './../common/pagination.dto';
import { catchError, firstValueFrom, pipe } from 'rxjs';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dtos';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICES) private readonly clientProducts : ClientProxy
  ) {}

  @Post()
  createProduct(
    @Body() createProductDto:CreateProductDto
  ){
    return this.clientProducts.send({cmd:'create_product'},createProductDto)
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }

  //!ATENCION: SIEMPRE LO QUE SE VA A PASAR POR EL PAYLOAD TIENE QUE TENER EL MISMO NOMBRE QUE EL QUE SE RECIBE EN EL MICROSERVICIO
  @Get()
  getProducts(@Query() pagination: Pagination) {
  return this.clientProducts.send({cmd:"find_all"},pagination)
  .pipe(
    catchError((err) => {throw new RpcException(err)})
  )
}


  @Get(':id')
  async findOneProduct(
    @Param('id') id:number
  ){

    //* Hay dos maneras de usar RpcException

    // return this.clientProducts.send({cmd:'find_one_product'},{id})
    // .pipe(
    //   catchError((err) => {throw new RpcException(err)})
    // )
    
    try {
      return await firstValueFrom(
        this.clientProducts.send({cmd:'find_one_product'},{id})
      )
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  updateProduct(
    @Param("id",ParseIntPipe) id:number,
    @Body() updateProductDto:UpdateProductDto
  ){
    return this.clientProducts.send({cmd: 'update_product'},{
      id,
      ...updateProductDto,
    })
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }

  @Delete(':id')
  deleteProduct(
    @Param('id',ParseIntPipe) id:number
  ){
    return this.clientProducts.send({cmd:"delete_product"},{id})
    .pipe(
      catchError((err) => {throw new RpcException(err)})
    )
  }


}
