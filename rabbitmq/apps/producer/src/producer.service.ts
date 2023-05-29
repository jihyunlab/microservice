import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ProducerService {
  constructor(@Inject('RMQ') private readonly client: ClientProxy) {}

  async message() {
    try {
      const response = firstValueFrom(
        this.client.send('/rmq/message', new RmqRecordBuilder({}).build()).pipe(timeout(3000))
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async event() {
    try {
      this.client.emit('/rmq/event', new RmqRecordBuilder({}).build());
    } catch (error) {
      console.log(error);
    }
  }
}
