import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, pasword: string): Promise<User> {
    const user: User = await this.userService.findUserByEmail(email);
    if (user && user.password === pasword) return user;
    if (user === undefined)
      throw new UnauthorizedException('User Not Found : ' + email);
    if (user.password !== pasword)
      throw new UnauthorizedException('Invalid Password');
  }
}
