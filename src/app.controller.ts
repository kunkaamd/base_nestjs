import { Body, Controller, Get, Post , Render, Request, UseGuards} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WebSocketServer } from '@nestjs/websockets';
import { Request as ExpressRequest } from 'express';
import { Server } from 'socket.io';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('socket')
  @Render('socket')
  getSocket() {
    return {title: "Test socket io"};
  }

  @Get('webrtc')
  @Render('webrtc')
  getRTC() {
    return {title: "Test WebRTC"};
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: LoginUserDto, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()//this for swagger
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
