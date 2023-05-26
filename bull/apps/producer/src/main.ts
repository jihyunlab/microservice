import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducerModule, { cors: true });
  const config = new DocumentBuilder().setTitle('JihyunLab Redis Microservice').setVersion('1.0').build();

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, config));
  await app.listen(3001);
}
bootstrap();
