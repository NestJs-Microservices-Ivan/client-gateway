import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { envVariable } from './config/env';

async function bootstrap() {
  const logger = new Logger('main-gateway')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true  
  }))

  app.useGlobalFilters(new RpcCustomExceptionFilter)

  logger.log(`main-gateway running on port ${envVariable.port}`)
  await app.listen(envVariable.port);


}
bootstrap();
