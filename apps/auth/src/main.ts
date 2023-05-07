import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      host: process.env.MQTT_HOST,
      port: Number(process.env.MQTT_PORT),
    },
  });

  app.startAllMicroservices();
  await app.listen(Number(process.env.SERVER_PORT));
}
bootstrap();
