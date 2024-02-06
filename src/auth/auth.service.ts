import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      // console.log("authServiceValidate:",user)
      return user;
    }
    return null;
  }
  async login(user:any){
    const payload = {email:user.email,password:user.password}
    // console.log("authServiceLogin:",payload)
    return {
    access_token:this.jwtService.sign(payload),
}
  }
}
