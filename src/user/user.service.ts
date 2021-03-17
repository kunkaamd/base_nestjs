import { HttpException, Injectable, SerializeOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  create(dto: CreateUserDto,image: string, fileUrl: string): Promise<UserEntity> {
    let user:UserEntity = new UserEntity();
    user = plainToClass(UserEntity,dto);
    user.image = fileUrl;
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  update(id :string, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id,{relations: ['cats']});
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({email: email});
  }
}
