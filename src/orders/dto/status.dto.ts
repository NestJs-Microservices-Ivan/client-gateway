import { IsEnum, IsOptional } from "class-validator";
import { orderStatus, orderStatusList } from "../enum/orderStauts.enum";

export class Status{
    @IsOptional()
    @IsEnum(
        orderStatusList,
        {message:`Orders status availables are ${orderStatusList}`}
    )
    status: orderStatus
}