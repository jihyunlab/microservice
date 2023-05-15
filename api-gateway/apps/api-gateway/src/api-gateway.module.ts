import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayController } from './controllers/api-gateway.controller';
import { ApiGatewayService } from './services/api-gateway.service';
import { RedirectService } from './services/redirect.service';
import { RedisService } from './services/redis.service';
import { MqttService } from './services/mqtt.service';
import config from './configs/api-gateway.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/apps/api-gateway/.env`],
      load: [config],
      isGlobal: true,
    }),
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
    ClientsModule.register([
      {
        name: 'MQTT',
        transport: Transport.MQTT,
        options: {
          host: process.env.MQTT_HOST,
          port: Number(process.env.MQTT_PORT),
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, RedirectService, RedisService, MqttService],
})
export class ApiGatewayModule {}
