import 'dotenv/config'

import * as joi from 'joi'

interface env{
    PORT:number,
    PRODUCT_MICROSERVICE_HOST: string,
    PRODUCT_MICROSERVICE_PORT:  number,
    ORDERS_MICROSERVICES_PORT: number,
    ORDERS_MICROSERVICES_HOST: string
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCT_MICROSERVICE_HOST: joi.string().required(),
    PRODUCT_MICROSERVICE_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required()
}).unknown(true)


const {error,value} = envSchema.validate(process.env)

if(error)
    throw new Error(`Config validation error ${error}`)

const envsVars:env = value


export const envVariable = {
    port: envsVars.PORT,
    productMicroserviceHost: envsVars.PRODUCT_MICROSERVICE_HOST,
    productMicroservicePort: envsVars.PRODUCT_MICROSERVICE_PORT,
    ordersMicroservicesPort: envsVars.ORDERS_MICROSERVICES_PORT,
    ordersMicroservicesHost: envsVars.ORDERS_MICROSERVICES_HOST
}