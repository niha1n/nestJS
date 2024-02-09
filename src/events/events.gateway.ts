import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from './types/events';
import { EVENT_NAME, EventType, NewMessageEvent } from './dto/events';
import { Logger, UseGuards } from '@nestjs/common';
import { Message } from 'src/messages/entity/message.entity';
import { WsJwtGuard } from 'src/auth/ws-jwt/ws-jwt.guard';
import { SocketAuthMiddleware } from 'src/auth/ws-jwt/ws.mw';

@WebSocketGateway({ namespace: 'events' })
@UseGuards(WsJwtGuard)
export class EventsGateway {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>; // Server<client to server, server to client>

  afterInit(client: Socket){
    client.use(SocketAuthMiddleware() as any )
    Logger.log('after Init')
  }

  @SubscribeMessage('message')
  handleMessage(client:any,  payload: string): string {
    return 'hello world'
  }

  sendMessage(message: Message) {
    this.server.emit('newMessage', message );
  }

}


