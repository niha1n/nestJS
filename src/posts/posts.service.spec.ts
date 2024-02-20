import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';

describe('PostsService', () => {
  let service: PostsService;
  let mockRepository: Partial<Repository<Post>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([]),
      save: jest.fn().mockResolvedValue({}),
      update: jest.fn().mockResolvedValue({}),
      delete: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get should return an array of posts', async () => {
    await expect(service.get()).resolves.toEqual([]);
  });

  it('create should save a post', async () => {
    const createPostDto = { title: 'Test', content: 'Test content' };
    await service.create(createPostDto);
    expect(mockRepository.save).toHaveBeenCalledWith(createPostDto);
  });

  it('update should modify a post', async () => {
    const updatePostDto = { title: 'Updated Test', content: 'Updated content' };
    const postId = 1;
    await service.update(updatePostDto, postId);
    expect(mockRepository.update).toHaveBeenCalledWith(postId, updatePostDto);
  });

  it('delete should remove a post', async () => {
    const postId = 1;
    await service.delete(postId);
    expect(mockRepository.delete).toHaveBeenCalledWith(postId);
  });
});
