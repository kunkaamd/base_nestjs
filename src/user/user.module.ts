import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
// import { AuthMiddleware } from './user.auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UsersController],
  providers: [UserService]
})
export class UserModule{
  constructor() {}
}

// export class UsersModule implements NestModule{

//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes({
//       path: 'user', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT
//     })
//   }

// }
