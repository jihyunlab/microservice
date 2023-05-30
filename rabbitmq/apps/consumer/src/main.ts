import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ConsumerModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://jihyunlab:password@127.0.0.1:5672'],
      queue: 'QUEUE',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
