import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { take, timeout } from 'rxjs';

@Injectable()
export class ClientService {
  constructor(@Inject('REDIS') private readonly client: ClientProxy) {}

  async message() {
    try {
      let response;
      const observable = this.client.send('/redis/message', {}).pipe(take(1)).pipe(timeout(3000));

      await observable.forEach((res) => {
        response = res;
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async event() {
    try {
      this.client.emit('/redis/event', {});
    } catch (error) {
      console.log(error);
    }
  }
}
