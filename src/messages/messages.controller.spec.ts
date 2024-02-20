import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { Message } from './entity/message.entity';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const mockMessagesService = {
      create: jest.fn((dto, req) => {
        return {
          id: Date.now().toString(),
          ...dto,
        };
      }),
      findAll: jest.fn(() => {
        return [];
      }),
      remove: jest.fn((id) => {
        return;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: mockMessagesService,
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const req = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    const createMessageDto: CreateMessageDto = { conversationId: '1', message: 'Hello World' };
    expect(await controller.create(createMessageDto, req as any)).toEqual({
      id: expect.any(String),
      ...createMessageDto,
    });
    expect(service.create).toHaveBeenCalledWith(createMessageDto, expect.anything());
  });

  it('should find all messages', async () => {
    expect(await controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should remove a message', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
