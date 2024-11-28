import { IsEnum, IsOptional, IsString } from "class-validator";
import { orderStatus, orderStatusList } from "../enum/orderStauts.enum";

import { Pagination } from "src/common/pagination.dto";

export class OrderPaginationDto extends Pagination{

    @IsString()
    @IsEnum(orderStatusList,{message: `orders availables are ${orderStatusList}`})
    @IsOptional()
    status?: orderStatus
}