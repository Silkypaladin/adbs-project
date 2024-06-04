import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post('send-friend-request')
  async sendFriendRequest(
    @Body() sendFriendRequestDto: { fromUserId: string; toUserId: string },
  ) {
    const { fromUserId, toUserId } = sendFriendRequestDto;
    return await this.relationshipsService.sendFriendRequest(
      fromUserId,
      toUserId,
    );
  }

  @Post('accept-friend-request')
  async acceptFriendRequest(
    @Body() acceptFriendRequestDto: { fromUserId: string; toUserId: string },
  ) {
    const { fromUserId, toUserId } = acceptFriendRequestDto;
    return await this.relationshipsService.acceptFriendRequest(
      fromUserId,
      toUserId,
    );
  }

  @Post('reject-friend-request')
  async rejectFriendRequest(
    @Body() rejectFriendRequestDto: { fromUserId: string; toUserId: string },
  ) {
    const { fromUserId, toUserId } = rejectFriendRequestDto;
    return await this.relationshipsService.rejectFriendRequest(
      fromUserId,
      toUserId,
    );
  }

  @Get('suggest-friends/:userId')
  async suggestFriends(@Param('userId') userId: string) {
    return await this.relationshipsService.suggestFriends(userId);
  }
}
