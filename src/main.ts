import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Validator
  app.useGlobalPipes(new ValidationPipe());

  //Security
  app.use(helmet());

  //Roles guard
  // const reflector = app.get( Reflector );
  // app.useGlobalGuards(new RolesGuard(reflector));

  //Run App
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Setting Swagger
  const config = new DocumentBuilder()
    .setTitle('Loc is handsome')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
