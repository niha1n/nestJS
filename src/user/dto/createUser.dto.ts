import { IsNumber, IsString } from "class-validator";

export class CreateuserDto{
    @IsString()
    name:string;

    @IsNumber()
    age:number;

}