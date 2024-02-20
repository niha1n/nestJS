import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entity/user.entity';
import { CreateuserDto } from './dto/createUser.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            get: jest.fn().mockResolvedValue([new User()]),
            create: jest.fn().mockResolvedValue(new User()),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            show: jest.fn().mockResolvedValue(new User()),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getUsers should return an array of users', async () => {
    await expect(controller.getUsers()).resolves.toEqual([new User()]);
    expect(service.get).toHaveBeenCalled();
  });

  it('store should create a user', async () => {
    const createUserDto = new CreateuserDto;
    await expect(controller.store(createUserDto)).resolves.toBeInstanceOf(User);
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('update should modify a user', async () => {
    const updateUserDto = new UpdateUserDto();
    const userId = 1;
    await expect(controller.update(updateUserDto, userId)).resolves.toEqual({ affected: 1 });
    expect(service.update).toHaveBeenCalledWith(updateUserDto, userId);
  });

  it('getUser should return a user by id', async () => {
    const userId = 1;
    await expect(controller.getUser(userId)).resolves.toBeInstanceOf(User);
    expect(service.show).toHaveBeenCalledWith(userId);
  });

  it('deletetUser should remove a user by id', async () => {
    const userId = 1;
    await expect(controller.deletetUser(userId)).resolves.toEqual({ affected: 1 });
    expect(service.delete).toHaveBeenCalledWith(userId);
  });
});
