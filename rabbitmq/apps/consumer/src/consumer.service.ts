import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  async message() {
    console.log('message()');
  }

  async event() {
    console.log('event()');
  }
}
