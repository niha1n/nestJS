import { IsArray, IsEmail, IsString } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class UpdateMessageDto {
  @IsString()
  message: string;

  @IsString()
  userId: string;

}
