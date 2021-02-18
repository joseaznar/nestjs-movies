import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const microservicePort = process.env.MICROSERVICE_PORT ? Number(process.env.MICROSERVICE_PORT) : 4000;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: microservicePort
    }
  })

  await app.startAllMicroservicesAsync();
  await app.listen(port);
  Logger.log('Auth microservice running');
}
bootstrap();
