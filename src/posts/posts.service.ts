import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService  {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
      ) {}
}
