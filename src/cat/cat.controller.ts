import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/user/user.decorator';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('/api/v1/cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCatDto: CreateCatDto,@User() user: UserEntity) {
    return this.catService.create(createCatDto, user.id);
  }
}
