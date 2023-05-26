import { Module } from '@nestjs/common';
import { ConsumerProcessor } from './consumer.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'QUEUE',
    }),
  ],
  providers: [ConsumerProcessor],
})
export class ConsumerModule {}
