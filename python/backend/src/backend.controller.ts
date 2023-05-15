import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BackendService } from './backend.service';

@Controller('/backend')
@ApiTags('Backend')
export class BackendController {
  constructor(private readonly backendService: BackendService) {}

  @Get('/http')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async http(@Res() res: Response) {
    this.backendService.http();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get('/mqtt')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async mqtt(@Res() res: Response) {
    this.backendService.mqtt();
    res.status(HttpStatus.ACCEPTED).send();
  }

  @Get('/grpc')
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Accepted' })
  async grpc(@Res() res: Response) {
    this.backendService.grpc();
    res.status(HttpStatus.ACCEPTED).send();
  }
}
