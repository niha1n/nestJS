import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { jwtConstants } from 'src/auth/auth.constant';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers:[ProfileController],
    imports:[JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1h' },
      }),
    UserModule],
    providers: [
        AuthService, // Provide AuthService here
        RolesGuard,
        UserService,
      ],
})
export class ProfileModule {}
