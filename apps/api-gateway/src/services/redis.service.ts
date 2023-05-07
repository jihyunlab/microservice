import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout as rxjsTimeout } from 'rxjs';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS') private readonly client: ClientProxy) {}

  async transmit(outgoing: string, method: string, req: any, preresponse: any, timeout?: number) {
    if (method === 'MESSAGE') {
      return this.send(outgoing, req, timeout);
    } else if (method === 'EVENT') {
      this.emit(outgoing, req);
      return preresponse;
    }
  }

  async send(outgoing: string, req: any, timeout?: number) {
    try {
      const observable = this.client
        .send({ cmd: outgoing }, { headers: req.headers, body: req.body })
        .pipe(rxjsTimeout(timeout || 3000));

      let receive: any;

      await observable.forEach((res) => {
        receive = res;
        return;
      });

      return receive;
    } catch (error) {
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
