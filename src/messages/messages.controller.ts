import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessagesService } from './messages.service';
import { Message } from './entity/message.entity';
import { Request } from 'express';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto,@Req() req: Request): Promise<Message> {
    return this.messagesService.create(createMessageDto,req);
  }

  @Get()
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.messagesService.remove(id);
  }
}
