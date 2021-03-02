import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe, UsePipes, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUrl, imageFileConfig } from 'src/utils/file.config';
import { ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('/api/v1/user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar',imageFileConfig))
  // @ApiResponse({ status: 201, type: UserEntity})
  @UseInterceptors(ClassSerializerInterceptor)//this need to class transformer response (example remove password field in resposne)
  create(@Body() createUserDto: CreateUserDto,@UploadedFile() avatar, @FileUrl() fileUrl) {
    return this.userService.create(createUserDto, avatar.path, fileUrl);
  }

  /*@Get()
  findAll() {
    return this.userService.findAll();
  }*/

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar',imageFileConfig))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  
  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }*/
}
