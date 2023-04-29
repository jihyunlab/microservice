import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout as rxjsTimeout } from 'rxjs';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS') private client: ClientProxy) {}

  async send(patten: any, data: any, timeout?: number) {
    try {
      const observable = this.client.send(patten, data).pipe(rxjsTimeout(timeout || 3000));

      let receive: any;

      await observable.forEach((res) => {
        receive = res;
        return;
      });

      return receive;
    } catch (e) {
      return null;
    }
  }
}
