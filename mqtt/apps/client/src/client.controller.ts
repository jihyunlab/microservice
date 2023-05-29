import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientService } from './client.service';

@ApiTags('MQTT')
@Controller('/mqtt')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  async message(@Res({ passthrough: true }) res: Response) {
    const response = this.clientService.message();
    res.status(HttpStatus.OK);
    return response;
  }

  @Get('/event')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event(@Res() res: Response) {
    res.status(HttpStatus.ACCEPTED).send();
    this.clientService.event();
  }
}
