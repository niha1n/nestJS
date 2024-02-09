import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { EventsGateway } from 'src/events/events.gateway';
import { UpdateMessageDto } from './dto/updatemessage.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtModule } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/auth.constant';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private eventsGateway: EventsGateway,
    private authService: AuthService,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    @Req() req: Request,
  ): Promise<Message> {
    const { conversationId, message } = createMessageDto;
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken: any = verify(token, jwtConstants.secret);
    console.log(decodedToken);
    const user: any = await this.authService.validateUser(
      decodedToken.email,
      decodedToken.password,
    );

    const userId: number = user.id;
    // const createdBy = await this.authService.verifyTokenAndGetUserId(token)

    const createdMessage = this.messageRepository.create({
      message,
      userId: user.id,
      username: user.name, 
      conversationId,
    });
    await this.messageRepository.save(createdMessage);
    this.eventsGateway.sendMessage(createdMessage);
    return createdMessage;
  }

  findAll(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Message not found');
    }
  }
}
