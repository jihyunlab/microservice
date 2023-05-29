import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProducerService } from './producer.service';

@ApiTags('RMQ')
@Controller('/rmq')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async message(@Res() res: Response) {
    this.producerService.message();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get('/event')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event(@Res() res: Response) {
    this.producerService.event();
    res.status(HttpStatus.ACCEPTED).send();
  }
}