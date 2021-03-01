import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV } from './utils/constants';
import { databaseConfig } from './config/database';
import { UniqueDB } from './utils/unique.validator';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CatModule } from './cat/cat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/.env.${ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConfig
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    UserModule,
    AuthModule,
    CatModule
  ],
  controllers: [AppController],
  providers: [AppService,UniqueDB],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
