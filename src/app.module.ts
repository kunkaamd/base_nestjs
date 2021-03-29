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
import { AppGateway } from './socket/event.gateway';


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
    UserModule,
    AuthModule,
    CatModule
  ],
  controllers: [AppController],
  providers: [AppService,UniqueDB,AppGateway],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
