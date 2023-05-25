import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { from } from 'rxjs';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern('/redis/message')
  async message(@Payload() payload, @Ctx() context: RedisContext) {
    console.log(JSON.stringify(payload), context.getChannel());
    await this.serverService.message();
    return from([{ code: 0, message: 'success' }]);
  }

  @EventPattern('/redis/event')
  async event() {
    await this.serverService.event();
  }
}
