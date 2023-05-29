import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { timeout, firstValueFrom } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(@Inject('MQTT') private readonly client: ClientProxy) {}

  async message() {
    try {
      const response = firstValueFrom(
        this.client.send('/mqtt/message', new MqttRecordBuilder({}).setQoS(0).build()).pipe(timeout(3000))
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async event() {
    try {
      this.client.emit('/mqtt/event', new MqttRecordBuilder({}).setQoS(0).build());
    } catch (error) {
      console.log(error);
    }
  }
}
