import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RedisService } from './redis.service';

@Injectable()
export class ApiGatewayService {
  constructor(private redisService: RedisService) {}

  async processForwarding(req: Request, body: any) {
    try {
      const receive = await this.redisService.send({ cmd: req.originalUrl }, body);
      return receive;
    } catch (e) {
      return null;
    }
  }
}
