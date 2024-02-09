import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { EventsGateway } from 'src/events/events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { EventsModule } from 'src/events/events.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[EventsModule,TypeOrmModule.forFeature([Message]),AuthModule],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {

}
