import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user.data.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.data.id, username: user.data.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}