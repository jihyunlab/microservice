import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProducerService } from './producer.service';

@ApiTags('RMQ')
@Controller('/rmq')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  async message(@Res({ passthrough: true }) res: Response) {
    const response = this.producerService.message();
    res.status(HttpStatus.OK);
    return response;
  }

  @Get('/event')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).send();
    this.producerService.event();
  }
}
