import { IsNumber, IsPositive } from "class-validator"

import { Type } from "class-transformer"

export class Pagination{

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    skip?: number = 1

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    take?: number = 10
}