import { IsArray, IsEmail, IsString } from "class-validator";
import { Role } from "src/roles/role.enum";

export class CreateuserDto{
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsArray()
    roles: Role[];
    
}