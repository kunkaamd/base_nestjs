import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RolesGuard } from './auth/roles.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServeStaticOptions } from '@nestjs/platform-express/interfaces/serve-static-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //Validator
  app.useGlobalPipes(new ValidationPipe());

  //Security
  app.use(helmet.contentSecurityPolicy({
    directives:{
      defaultSrc:["'self'"],
      scriptSrc:["'self'",'cdnjs.cloudflare.com',"maxcdn.bootstrapcdn.com 'unsafe-inline'"],
      styleSrc:["'self'","cdn.jsdelivr.net 'unsafe-inline'"],
      fontSrc:["'self'",'maxcdn.bootstrapcdn.com'],
      imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
    }}));

  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //   })
  // );

  //folder public
  app.useStaticAssets(join(__dirname, '../..', 'public'),{
    prefix: "/public"
  } as ServeStaticOptions);

  //setup views engine
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');

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
