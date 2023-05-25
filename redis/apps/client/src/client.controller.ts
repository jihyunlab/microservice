import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ClientService } from './client.service';

@ApiTags('Redis')
@Controller('/redis')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('/message')
  @ApiResponse({ status: HttpStatus.OK, description: 'OK' })
  async message(@Res() res: Response) {
    const response = await this.clientService.message();
    res.status(HttpStatus.OK).send(response);
  }

  @Get('/event')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async event(@Res() res: Response) {
    this.clientService.event();
    res.status(HttpStatus.OK).send();
  }
}
