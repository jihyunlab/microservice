import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ServerModule } from './server.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ServerModule, {
    transport: Transport.MQTT,
    options: {
      host: '127.0.0.1',
      port: 1883,
    },
  });
  await app.listen();
}
bootstrap();
