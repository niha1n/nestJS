import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    // console.log("auth controller:",req.user)
    return this.authService.login(req.user);
  }
}
