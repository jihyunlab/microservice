import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ProducerService } from './producer.service';

@ApiTags('Bull')
@Controller('/bull')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get('/produce')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async produce(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).send();
    this.producerService.produce();
  }
}
