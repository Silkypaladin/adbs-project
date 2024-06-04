import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongoModule } from '../database/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
