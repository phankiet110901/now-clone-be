import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Now-clone')
    .setDescription('The now clone api description')
    .setVersion('1.0')
    .addTag('admin')
    .addTag('auth')
    .addTag('user')
    .addTag('store')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
