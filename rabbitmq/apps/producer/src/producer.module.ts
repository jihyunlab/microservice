import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://jihyunlab:password@127.0.0.1:5672'],
          queue: 'QUEUE',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
