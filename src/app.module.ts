import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/auth.constant';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/posts.entity';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/entity/message.entity';


@Module({
  controllers: [AppController, ProfileController],
  
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:`root`,
      password: `nihal132`,
      database: 'nestjs',
      entities: [User,Post,Message],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    PostsModule,
    EventsModule,
    MessagesModule,
    
    
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService
  ],
  
})
export class AppModule {}
