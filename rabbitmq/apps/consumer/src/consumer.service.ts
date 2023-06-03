import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsumerService {
  async message() {
    console.log('message()');
    return { code: 0, message: 'success' };
  }

  async event() {
    console.log('event()');
  }
}
