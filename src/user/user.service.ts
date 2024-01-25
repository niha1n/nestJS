import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateuserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  get() {
    return {
      name: 'Nihal',
      email: 'nihalnrasiya@gmail.com',
    };
  }
  create(createUserDto: CreateuserDto) {
    return createUserDto;
  }
  update(updateUserDto: UpdateUserDto, userId: number ) {
    return { body: updateUserDto, userId };
  }
  show(userId: number ) {
    return {userId};
  }
  delete(userId: number ) {
    return {userId};
  }
}
