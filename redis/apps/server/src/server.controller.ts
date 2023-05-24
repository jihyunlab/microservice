import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { ServerService } from './server.service';

@Controller()
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @MessagePattern({ cmd: '/redis/message' })
  async message() {
    await this.serverService.message();
    return from([{ code: 0, message: 'success' }]);
  }

  @EventPattern({ cmd: '/redis/event' })
  async event() {
    await this.serverService.event();
  }
}
