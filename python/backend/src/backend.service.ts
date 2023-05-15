import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable, take } from 'rxjs';

interface GrpcService {
  grpc: ({}) => Observable<{ code: number; message: string }>;
}

@Injectable()
export class BackendService {
  private grpcService: GrpcService;

  constructor(
    private readonly httpService: HttpService,
    @Inject('MQTT') private readonly clientProxy: ClientProxy,
    @Inject('GRPC_PACKAGE') private clientGrpc: ClientGrpc
  ) {}

  onModuleInit() {
    this.grpcService = this.clientGrpc.getService<GrpcService>('GrpcService');
  }

  async http() {
    console.log('http()');

    this.httpService
      .get('http://127.0.0.1:8000/microservice/http')
      .pipe(take(1))
      .subscribe((res) => {
        console.log(`http(): ${JSON.stringify(res.data)}`);
      });
  }

  async mqtt() {
    console.log('mqtt()');

    this.clientProxy
      .send('/microservice/mqtt', {})
      .pipe(take(1))
      .subscribe((res) => {
        console.log(`mqtt(): ${JSON.stringify(res)}`);
      });
  }

  async grpc() {
    console.log('grpc()');

    const observable = this.grpcService.grpc({});

    observable.subscribe((res) => {
      console.log(`grpc(): ${JSON.stringify(res)}`);
    });
  }
}
