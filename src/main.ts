import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('GLS API Gateway')
    .setDescription('Swagger documentation for the GLS API Gateway ')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1');
  // app.use(csurf());
  app.use(helmet());
  app.use(compression());

  await app.listen(8080, async () =>
    logger.log(`API Gateway Service UP at ${await app.getUrl()}`),
  );
}
bootstrap();
