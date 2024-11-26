import { IsBoolean, IsDate, IsEnum, IsNumber, IsPositive, Min } from "class-validator";
import { orderStatus, orderStatusList } from "../enum/orderStauts.enum";

import { Type } from "class-transformer";

export class CreateOrderDto {

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsPositive()
    totalAmount: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsPositive()
    totalItems: number;

    @IsEnum(orderStatusList,{
            message: 'some of these statuses do not exist in the order status'    
        }
    )
    status: orderStatus = orderStatus.PENDING

    @IsBoolean()
    paid: boolean = false

}