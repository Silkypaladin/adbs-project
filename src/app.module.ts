import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jAdbsModule } from './database/neo4j/neo4j.module';

@Module({
  imports: [Neo4jAdbsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
