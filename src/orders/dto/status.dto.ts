import { IsEnum, IsOptional } from "class-validator";
import { orderStatus, orderStatusList } from "../enum/orderStauts.enum";

export class StatusDto{
    @IsOptional()
    @IsEnum(
        orderStatusList,
        {message:`Orders status availables are ${orderStatusList}`}
    )
    status: orderStatus
}