import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  //APP GLOBAL PIPES and FILTER
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  //SWAGGER DOCS
  const config = new DocumentBuilder().setTitle('Sample API Open API Documentation').setVersion('1.0').addBearerAuth().build();

  const titleOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Sample API Documentation',
  };


    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
    });
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, titleOptions);

  await app.listen(8000);

}
bootstrap();
