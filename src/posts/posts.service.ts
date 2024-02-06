import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostsService  {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
      ) {}

      get(): Promise<Post[]> {
        return this.postRepository.find();
      }
      create(createPostDto: CreatePostDto) {
        return this.postRepository.save(createPostDto);
      }
      update(updatePostDto: UpdatePostDto, postId: number) {
        return this.postRepository.update(postId, updatePostDto);
      }
      delete(postId: number) {
        return this.postRepository.delete(postId);
      }
}
