import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body('authorId') authorId: string,
    @Body('content') content: string,
  ) {
    if (content.length < 1 || content.length > 144) {
      throw new BadRequestException(
        'Content must be between 1 and 144 characters.',
      );
    }
    return this.postsService.createPost(authorId, content);
  }
}
