import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { ConsumerService } from './consumer.service';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @MessagePattern('/rmq/message')
  async message() {
    return this.consumerService.message();
  }

  @EventPattern('/rmq/event')
  async event() {
    this.consumerService.event();
  }
}
