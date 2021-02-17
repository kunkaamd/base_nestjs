import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { SECRET_KEY } from "src/config";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  update(id :string, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return user
  }
}
