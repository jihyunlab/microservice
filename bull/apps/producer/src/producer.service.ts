import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProducerService {
  constructor(@InjectQueue('QUEUE') private userQueue: Queue) {}

  async produce() {
    try {
      const message = String(Math.floor(Math.random() * (1000 - 1)) + 1);
      this.userQueue.add('job', { message: message });

      console.log(`produce: ${message}`);
    } catch (error) {
      console.log(error);
    }
  }
}
