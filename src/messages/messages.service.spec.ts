import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EventsGateway } from 'src/events/events.gateway';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ userId: 1, email: 'test@example.com', name: 'Test User' }),
}));

describe('MessagesService', () => {
  let service: MessagesService;
  let mockRepository: Partial<Record<keyof Repository<Message>, jest.Mock>>;
  let mockEventsGateway: Partial<EventsGateway>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((entity) => Promise.resolve({ id: Date.now(), ...entity })),
      find: jest.fn().mockResolvedValue([]),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };



    mockEventsGateway = {
      sendMessage: jest.fn(),
    };

    mockAuthService = {
      validateUser: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com', name: 'Test User' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: mockRepository,
        },
        {
          provide: EventsGateway,
          useValue: mockEventsGateway,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const req = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    const createMessageDto = { conversationId: '1', message: 'Hello World' };
    const result = await service.create(createMessageDto, req as any);
    expect(result).toEqual(expect.objectContaining(createMessageDto));
    expect(mockRepository.create).toHaveBeenCalledWith(expect.anything());
    expect(mockRepository.save).toHaveBeenCalledWith(expect.anything());
    expect(mockEventsGateway.sendMessage).toHaveBeenCalledWith(expect.anything());
  });

  it('should find all messages', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should remove a message', async () => {
    const id = '1';
    await expect(service.remove(id)).resolves.toBeUndefined();
    expect(mockRepository.delete).toHaveBeenCalledWith(id);
  });
});
