import { Module } from "@nestjs/common";
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from './user.controller';

@Module({
    controllers:[UserController],
    providers: [UserService],
    exports:[UserService,TypeOrmModule],
    imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {

}