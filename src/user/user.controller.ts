import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileConfig } from 'src/utils/file.storage';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar',imageFileConfig))
  create(@Body() createUserDto: CreateUserDto,@UploadedFile() avatar) {
    return this.userService.create(createUserDto, avatar.path);
  }

  /*@Get()
  findAll() {
    return this.userService.findAll();
  }*/

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }*/
}
