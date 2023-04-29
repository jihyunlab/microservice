import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './controllers/api-gateway.controller';
import { ApiGatewayService } from './services/api-gateway.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`${process.cwd()}/apps/api-gateway/.env`], isGlobal: true }),
    ClientsModule.register([
      {
        name: 'REDIS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, RedisService],
})
export class ApiGatewayModule {}
