import { INestApplication, ValidationPipe } from '@nestjs/common';

// Configuración compartida por la aplicación y las pruebas e2e
export function configureApp(app: INestApplication): void {
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
