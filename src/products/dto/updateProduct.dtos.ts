import { IsNumber, IsPositive } from "class-validator";

import { CreateProductDto } from "./createProduct.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateProductDto extends PartialType(CreateProductDto){}