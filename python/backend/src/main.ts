import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BackendModule } from './backend.module';

async function bootstrap() {
  const app = await NestFactory.create(BackendModule, { cors: true });
  const config = new DocumentBuilder().setTitle('JihyunLab Native Microservice').setVersion('1.0').build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));
  await app.listen(3001);
}
bootstrap();
