import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jAdbsModule } from './database/neo4j/neo4j.module';
import { MongoModule } from './database/mongo/mongo.module';

@Module({
  imports: [Neo4jAdbsModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
