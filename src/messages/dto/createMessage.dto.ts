import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsString()
  conversationId: string;
}
