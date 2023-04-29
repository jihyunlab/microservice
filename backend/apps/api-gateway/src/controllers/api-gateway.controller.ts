import { All, Body, Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @All('*')
  async processForwarding(@Req() req: Request, @Body() body: any, @Res() res: Response) {
    const response = await this.apiGatewayService.processForwarding(req, body);

    if (!response) {
      return res
        .status(HttpStatus.GATEWAY_TIMEOUT)
        .send({ code: -1, message: 'Api-Gateway did not receive a response' });
    }

    return res.status(response.status).send(response.body);
  }
}
