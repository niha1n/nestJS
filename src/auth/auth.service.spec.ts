import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({ id: '1', email: 'test@example.com', password: 'password' }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
            verifyAsync: jest.fn().mockResolvedValue({ id: '1' }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser should return user if valid', async () => {
    const user = await service.validateUser('test@example.com', 'password');
    expect(user).toEqual({ id: '1', email: 'test@example.com', password: 'password' });
  });

  it('validateUser should return null if invalid', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValueOnce(null);
    const user = await service.validateUser('wrong@example.com', 'wrong');
    expect(user).toBeNull();
  });

  it('login should return an access token', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };
    const token = await service.login(mockUser);
    expect(token).toEqual({ access_token: 'mockToken' });
  });

  it('verifyTokenAndGetUserId should return user id', async () => {
    const userId = await service.verifyTokenAndGetUserId('validToken');
    expect(userId).toBe('1');
  });

  it('verifyTokenAndGetUserId should throw if token is invalid', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error('Invalid token'));
    await expect(service.verifyTokenAndGetUserId('invalidToken')).rejects.toThrow('Invalid token');
  });
});
