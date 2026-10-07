import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './app.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  configureApp(app);

  const config = app.get(ConfigService);
  const origins = config
    .get<string>('CORS_ORIGINS', '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({ origin: origins, methods: ['GET'] });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Terrall API')
      .setDescription(
        'Datos por departamento de Colombia: temas, turismo (RNT) y ciudades.',
      )
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config.get<number>('PORT', 3000));
}

void bootstrap();
