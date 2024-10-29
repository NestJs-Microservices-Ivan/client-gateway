import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICES } from 'src/config/services';
import { Pagination } from './../common/pagination.dto';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICES) private readonly clientProducts : ClientProxy
  ) {}

  @Post()
  createProduct(){
    return 'crea un producto'
  }

  //!ATENCION: SIEMPRE LO QUE SE VA A PASAR POR EL PAYLOAD TIENE QUE TENER EL MISMO NOMBRE QUE EL QUE SE RECIBE EN EL MICROSERVICIO
  @Get()
  getProducts(@Query() pagination: Pagination) {
  return this.clientProducts.send({cmd:"find_all"},pagination)
}


  @Get(':id')
  async findOneProduct(
    @Param('id') id:number
  ){
    try {
      return await firstValueFrom(
        this.clientProducts.send({cmd:'find_one_product'},{id})
      )
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  updateProduct(
    @Param("id") id:string,
    @Body() body:any
  ){
    return 'producto actualizado' +id
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id:string
  ){
    return 'producto eliminado' +id
  }


}
