import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from "./posts/posts.module";
import { ReactionsModule } from "./reactions/reactions.module";
import { RelationshipsModule } from "./relationships/relationships.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [PostsModule, ReactionsModule, RelationshipsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
