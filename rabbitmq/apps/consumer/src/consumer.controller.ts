import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, RmqContext, Payload } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('/rmq/message')
  async message(@Payload() payload, @Ctx() context: RmqContext) {
    console.log(JSON.stringify(payload), context.getMessage());
    await this.consumerService.message();
    return { code: 0, message: 'success' };
  }

  @EventPattern('/rmq/event')
  async event() {
    this.consumerService.event();
  }
}
