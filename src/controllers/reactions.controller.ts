import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ReactionsService } from '../service/reactions.service';

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
    if (content.length > 144) {
      throw new BadRequestException(
        'Comment content must be 144 characters or less.',
      );
    }
    return this.reactionsService.commentOnPost(postId, userId, content);
  }
}
