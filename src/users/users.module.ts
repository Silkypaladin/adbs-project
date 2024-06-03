import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongoModule } from "../database/mongo/mongo.module";
import { RelationshipsModule } from "../relationships/relationships.module";
import { RelationshipsService } from "../relationships/relationships.service";
import { Neo4jModule } from "../database/neo4j/neo4j.module";

@Module({
  imports: [MongoModule, RelationshipsModule, Neo4jModule],
  controllers: [UsersController],
  providers: [UsersService, RelationshipsService],
})
export class UsersModule {}
