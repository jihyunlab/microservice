import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { RedirectService } from './redirect.service';
import { RedisService } from './redis.service';
import { MqttService } from './mqtt.service';

@Injectable()
export class ApiGatewayService {
  constructor(
    private readonly configService: ConfigService,
    private readonly redirectService: RedirectService,
    private readonly redisService: RedisService,
    private readonly mqttService: MqttService
  ) {}

  async processForwarding(url: string, req: Request, res: Response) {
    try {
      const apis = this.configService.get('apis');

      if (!apis) {
        return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: { code: -2000, message: 'Configuration not found' } };
      }

      const api = apis[url];

      if (!api) {
        return { status: HttpStatus.BAD_REQUEST, body: { code: -2001, message: 'Unregistered request URL' } };
      }

      if (api['security'] === 'JWT' && api['outgoing'] !== '/auth/validate') {
        const result = await this.processForwarding('/auth/validate', req, res);

        if (typeof result !== 'object') {
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: { code: -2002, message: 'Authentication cannot proceed' },
          };
        }

        if (result.body['code'] !== 0) {
          return result;
        }
      }

      let receive: any;

      switch (api['transport']) {
        case 'REDIRECT':
          receive = await this.redirectService.send(api.outgoing, res);
          break;
        case 'REDIS':
          receive = await this.redisService.transmit(
            api['outgoing'],
            api['method'],
            req,
            api['preresponse'],
            Number(process.env.MICROSERVICE_REQUEST_TIMEOUT)
          );
          break;
        case 'MQTT':
          receive = await this.mqttService.transmit(
            api['outgoing'],
            api['method'],
            req,
            api['preresponse'],
            Number(process.env.MICROSERVICE_REQUEST_TIMEOUT)
          );
          break;
      }

      receive['transport'] = api['transport'];
      return receive;
    } catch (error) {
      console.log(error);
      return { status: HttpStatus.INTERNAL_SERVER_ERROR, body: { code: -2003, message: error } };
    }
  }
}
