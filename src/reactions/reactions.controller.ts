import { Controller, Post, Body } from '@nestjs/common';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post('like')
  async likePost(
    @Body('postId') postId: string,
    @Body('userId') userId: string,
  ) {
    return this.reactionsService.likePost(postId, userId);
  }

  @Post('comment')
  async commentOnPost(
    @Body('postId') postId: string,
    @Body('userId') userId: string,
    @Body('content') content: string,
  ) {
    return this.reactionsService.commentOnPost(postId, userId, content);
  }
}
