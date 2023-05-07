import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MqttRecordBuilder } from '@nestjs/microservices';
import { timeout as rxjsTimeout } from 'rxjs';

@Injectable()
export class MqttService {
  constructor(@Inject('MQTT') private readonly client: ClientProxy) {}

  async send(outgoing: string, req: any, timeout?: number) {
    try {
      const observable = this.client
        .send({ cmd: outgoing }, new MqttRecordBuilder({ headers: req.headers, body: req.body }).build())
        .pipe(rxjsTimeout(timeout || 3000));

      let receive: any;

      await observable.forEach((res) => {
        receive = res;
        return;
      });

      return receive;
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: { code: -3000, message: error },
      };
    }
  }

  async emit(outgoing: string, req: any) {
    try {
      this.client.emit({ cmd: outgoing }, { headers: req.headers, body: req.body });
    } catch (error) {
      console.log(error);
    }
  }
}
