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

@Module({
  controllers: [AppController, ProfileController],
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username:`${process.env.DATABASE_USERNAME}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: 'nestjs',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
