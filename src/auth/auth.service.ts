import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUsername(username);
    console.log(user);
    if (!user.verifyPassword(password)) return null;
    return user;
  }

  async login({ username, password }: any) {
    const user: User = await this.validateUser(username, password);
    delete user.password;
    delete user.salt;
    const payload = { user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
