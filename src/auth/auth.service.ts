import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    access_token: string;
    id: string;
    name: string;
    email: string;
  }> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.data.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.data.id, username: user.data.name };
    return {
      id: user.data.id,
      name: user.data.name,
      email: user.data.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
