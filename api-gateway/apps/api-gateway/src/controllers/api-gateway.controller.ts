import { All, Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiGatewayService } from '../services/api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @All('/*')
  async processForwarding(@Req() req: Request, @Res() res: Response) {
    const response = await this.apiGatewayService.processForwarding(req.originalUrl, req, res);

    if (response['transport'] === 'REDIRECT') {
      return;
    }

    if (!response || !response['status'] || !response['body']) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ code: -1000, message: 'Api-Gateway did not receive a response' });
    }

    return res.status(response['status']).send(response['body']);
  }
}
