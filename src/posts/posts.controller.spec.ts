import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { Reflector } from '@nestjs/core';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

jest.mock('src/roles/roles.guard', () => ({
  RolesGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const mockPostsService = {
      get: jest.fn().mockResolvedValue([]),
      create: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
        {
          provide: Reflector,
          useValue: {},
        },
        // If you have other dependencies, mock them here
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPosts should return an array of posts', async () => {
    await expect(controller.getPosts()).resolves.toEqual([]);
    expect(service.get).toHaveBeenCalled();
  });

  it('store should create a post', async () => {
    const createPostDto: CreatePostDto = { title: 'Test', content: 'Test content' };
    await controller.store(createPostDto);
    expect(service.create).toHaveBeenCalledWith(createPostDto);
  });

  it('update should modify a post', async () => {
    const updatePostDto: UpdatePostDto = { title: 'Updated Test', content: 'Updated content' };
    const postId = 1;
    await controller.update(updatePostDto, postId);
    expect(service.update).toHaveBeenCalledWith(updatePostDto, postId);
  });

  it('delete should remove a post', async () => {
    const postId = 1;
    await controller.delete(postId);
    expect(service.delete).toHaveBeenCalledWith(postId);
  });
});
