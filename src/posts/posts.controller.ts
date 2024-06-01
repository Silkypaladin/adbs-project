import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body('authorId') authorId: string,
    @Body('content') content: string,
  ) {
    return this.postsService.createPost(authorId, content);
  }

  @Get(':userId')
  async getAllUserPosts(@Param('id') id: string) {
    return this.postsService.findPostsByUserId(id);
  }
}
