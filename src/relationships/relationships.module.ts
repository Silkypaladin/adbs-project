import { Module } from "@nestjs/common";
import { Neo4jModule } from "../database/neo4j/neo4j.module";
import { RelationshipsController } from "./relationships.controller";
import { RelationshipsService } from "./relationships.service";

@Module({
  imports: [Neo4jModule],
  controllers: [RelationshipsController],
  providers: [RelationshipsService]
})
export class RelationshipsModule {}