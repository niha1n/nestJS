import { IsEmail, IsString } from "class-validator";

export class CreateuserDto{
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;

}