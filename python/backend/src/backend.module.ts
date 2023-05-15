import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'MQTT',
        transport: Transport.MQTT,
        options: {
          host: '127.0.0.1',
          port: 1883,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'GRPC_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:50051',
          package: 'grpc',
          protoPath: join(__dirname, 'protos/grpc.proto'),
        },
      },
    ]),
  ],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
