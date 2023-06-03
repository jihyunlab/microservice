import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProducerService } from './producer.service';

@ApiTags('RMQ')
@Controller('/rmq')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  async message() {
    return this.producerService.message();
  }

  @Get('/event')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event() {
    this.producerService.event();
  }
}
