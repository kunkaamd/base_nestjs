import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);    
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
      return null;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = Object.assign(user);
    delete payload.password;
    return {
      access_token: this.jwtService.sign({...payload}),
    };
  }
}
