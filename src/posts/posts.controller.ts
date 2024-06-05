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

  @Post(':postId/comment')
  async addComment(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.postsService.addComment(postId, userId, content);
  }

  @Post(':postId/like')
  async addLike(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.postsService.addLike(postId, userId);
  }

  @Get(':userId')
  async getAllUserPosts(@Param('userId') userId: string) {
    return this.postsService.findPostsByUserId(userId);
  }

  @Get('reactions/:userId')
  async getUserReactions(@Param('userId') userId: string) {
    return this.postsService.findReactionsByUserId(userId);
  }
}
