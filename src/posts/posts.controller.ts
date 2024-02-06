import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService){}
    @Get('')
        getPosts() {
          //   return { name: 'Nihal', email: 'nihalnrasiya@gmail.com' }
          return this.postService.get();
        }

        @Post('')
        @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(Role.Admin)
        store(@Body() createPostDto: CreatePostDto) {
          return this.postService.create(createPostDto);
        }
      
        @Patch('/:postId')
        @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(Role.Admin)
        update(
          @Body() updatePostDto: UpdatePostDto,
          @Param('postId', ParseIntPipe) postId: number,
        ) {
          return this.postService.update(updatePostDto, postId);
        }

        @Delete('/:postId')
        @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(Role.Admin)
        delete(
          @Param('postId', ParseIntPipe) postId: number,
        ) {
          return this.postService.delete(postId);
        }

}
