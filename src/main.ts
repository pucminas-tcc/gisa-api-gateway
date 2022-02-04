import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('GISA API Gateway')
    .setDescription('Swagger documentation for the GISA API Gateway ')
    .setVersion('1.0.0')
    .build();

  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(compression());
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080, async () =>
    logger.log(`API Gateway Service UP at ${await app.getUrl()}`),
  );
}
bootstrap();
