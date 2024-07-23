import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService,
    
  ) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    const user = req.user;
    const payload = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    return { token: this.jwtService.sign(payload) };
  }
}
