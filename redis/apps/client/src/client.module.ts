import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS',
        transport: Transport.REDIS,
        options: {
          host: '127.0.0.1',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
