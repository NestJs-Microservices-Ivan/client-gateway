import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { envVariable } from './config/env';

async function bootstrap() {
  const logger = new Logger('main-gateway')
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true  
  }))

  logger.log(`main-gateway running on port ${envVariable.port}`)
  await app.listen(envVariable.port);


}
bootstrap();
