import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern('/mqtt/message')
  async message(@Payload() payload, @Ctx() context: MqttContext) {
    console.log(JSON.stringify(payload), context.getTopic());
    this.serverService.message();
    return { code: 0, message: 'success' };
  }

  @EventPattern('/mqtt/event')
  async event() {
    this.serverService.event();
  }
}
