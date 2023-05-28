import { Injectable } from '@nestjs/common';

@Injectable()
export class ServerService {
  async message() {
    console.log('message()');
  }

  async event() {
    console.log('event()');
  }
}
