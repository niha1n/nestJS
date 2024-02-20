import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WsJwtGuard } from 'src/auth/ws-jwt/ws-jwt.guard';
import { Server } from 'socket.io';

const mockServer: () => Partial<Server> = () => ({
  emit: jest.fn(),
});

describe('EventsGateway', () => {
  let gateway: EventsGateway;
  let app: INestApplication;
  let server: Partial<Server>;

  beforeEach(async () => {
    server = mockServer();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsGateway,
      ],
    })
    .overrideGuard(WsJwtGuard)
    .useValue({ canActivate: () => true }) 
    .compile();

    app = module.createNestApplication();
    await app.init();

    gateway = module.get<EventsGateway>(EventsGateway);
    gateway.server = server as any; 
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('WebSocket server initialization', () => {
    it('should have a WebSocket server instance', () => {
      expect(gateway.server).toBeDefined();
    });
  });

  describe('handleMessage', () => {
    it('should return "hello world" when handling a message', () => {
      const clientMock: any = {}; 
      const payload = 'Test payload';
      expect(gateway.handleMessage(clientMock, payload)).toEqual('hello world');
    });
  });

  describe('sendMessage', () => {
    it('should emit a newMessage event with a message payload', () => {
      const messagePayload = { content: 'Hello World', author: 'User' }; // Adjust based on your Message entity
      gateway.sendMessage(messagePayload as any); 

      expect(server.emit).toHaveBeenCalledWith('newMessage', messagePayload);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
