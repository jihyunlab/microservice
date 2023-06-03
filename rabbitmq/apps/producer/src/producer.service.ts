import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Injectable()
export class ProducerService {
  constructor(@Inject('RMQ') private readonly client: ClientProxy) {}

  async message() {
    try {
      return this.client.send('/rmq/message', new RmqRecordBuilder({}).build());
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
