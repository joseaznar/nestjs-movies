import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 3010;
  const authMicroservicePort = process.env.MICROSERVICE_PORT ? Number(process.env.MICROSERVICE_PORT) : 4010;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: authMicroservicePort
    }
  });

  app.startAllMicroservicesAsync();
  await app.listen(port);

}
bootstrap();
