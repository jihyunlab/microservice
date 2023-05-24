import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule, { cors: true });
  const config = new DocumentBuilder().setTitle('JihyunLab Redis Microservice').setVersion('1.0').build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));
  await app.listen(3001);
}
bootstrap();
