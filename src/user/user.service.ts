import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateuserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  get(): Promise<User[]> {
    return this.userRepository.find();
  }
  create(createUserDto: CreateuserDto) {
    return this.userRepository.save(createUserDto);
  }
  update(updateUserDto: UpdateUserDto, userId: number) {
    return this.userRepository.update(userId, updateUserDto);
  }
  show(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  delete(userId: number) {
    return this.userRepository.delete(userId);
  }
}
