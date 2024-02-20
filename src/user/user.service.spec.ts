import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([new User()]),
      save: jest.fn().mockResolvedValue(new User()),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      findOne: jest.fn().mockResolvedValue(new User()),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get should return an array of users', async () => {
    await expect(service.get()).resolves.toEqual([new User()]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('create should save a user', async () => {
    const createUserDto = new User(); 
    await expect(service.create(createUserDto)).resolves.toBeInstanceOf(User);
    expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
  });

  it('update should modify a user', async () => {
    const updateUserDto = new User(); 
    const userId = 1;
    await expect(service.update(updateUserDto, userId)).resolves.toEqual({ affected: 1 });
    expect(mockRepository.update).toHaveBeenCalledWith(userId, updateUserDto);
  });

  it('show should return a user by id', async () => {
    const userId = 1;
    await expect(service.show(userId)).resolves.toBeInstanceOf(User);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
  });

  it('delete should remove a user by id', async () => {
    const userId = 1;
    await expect(service.delete(userId)).resolves.toEqual({ affected: 1 });
    expect(mockRepository.delete).toHaveBeenCalledWith(userId);
  });
});
