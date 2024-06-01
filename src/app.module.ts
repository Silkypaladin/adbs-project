import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jAdbsModule } from './database/neo4j/neo4j.module';
import { MongoModule } from './database/mongo/mongo.module';
import { PostsService } from './service/posts.service';
import { ReactionsService } from './service/reactions.service';
import { UsersService } from './service/users.service';
import { PostsController } from './controllers/posts.controller';
import { ReactionsController } from './controllers/reactions.controller';

@Module({
  imports: [Neo4jAdbsModule, MongoModule],
  controllers: [AppController, PostsController, ReactionsController],
  providers: [AppService, PostsService, ReactionsService, UsersService],
})
export class AppModule {}
