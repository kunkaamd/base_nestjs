import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private catRepository: Repository<CatEntity>,
    private configService: ConfigService
  ) {}
  
  create(dto: CreateCatDto, userId: number) : Promise<CatEntity>{
    let cat = new CatEntity();
    cat = plainToClass(CatEntity,dto);
    cat.user = <any>{id: userId};
    return this.catRepository.save(cat);
  }

  findAll() {
    return `This action returns all cat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
