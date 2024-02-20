import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { UserService } from './user.service';
  import { UpdateUserDto } from './dto/updateUser.dto';
  import { CreateuserDto } from './dto/createUser.dto';
  import { Roles } from 'src/roles/roles.decorator';
  import { Role } from 'src/roles/role.enum';
  
  @Controller('user')
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Get('')
    getUsers() {
      //   return { name: 'Nihal', email: 'nihalnrasiya@gmail.com' }
      return this.userService.get();
    }
  
    @Post('')
    
    store(@Body() createUserDto: CreateuserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Patch('/:userId')
    update(
      @Body() updateUserDto: UpdateUserDto,
      @Param('userId', ParseIntPipe) userId: number,
    ) {
      return this.userService.update(updateUserDto, userId);
    }
  
    @Get('/:userId')
    getUser(@Param('userId', ParseIntPipe) userId: number) {
      return this.userService.show(userId);
    }
    @Delete('/:userId')
    deletetUser(@Param('userId', ParseIntPipe)  userId: number ) {
      return this.userService.delete(userId);
    }
  }
  