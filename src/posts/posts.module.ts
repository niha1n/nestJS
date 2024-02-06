import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constant';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  }),TypeOrmModule.forFeature([Post]), UserModule],
  providers: [PostsService,AuthService, // Provide AuthService here
  RolesGuard,
  UserService,],
  controllers: [PostsController]
})
export class PostsModule {}
