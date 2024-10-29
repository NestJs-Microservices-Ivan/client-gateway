import { IsNumber, IsPositive } from "class-validator"

import { Type } from "class-transformer"

export class Pagination{

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    skip?: number

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    take?: number
}