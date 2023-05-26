import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('QUEUE')
export class ConsumerProcessor {
  constructor() {}

  @Process('job')
  async job(job: Job) {
    try {
      console.log(`process: ${JSON.stringify(job)}`);
    } catch (error) {
      console.log(error);
    }
  }
}
