import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientService } from './client.service';

@ApiTags('MQTT')
@Controller('/mqtt')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async message(@Res() res: Response) {
    await this.clientService.message();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get('/event')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event(@Res() res: Response) {
    this.clientService.event();
    res.status(HttpStatus.ACCEPTED).send();
  }
}
