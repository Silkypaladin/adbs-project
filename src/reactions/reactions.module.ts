import { Module } from "@nestjs/common";
import { MongoModule } from "../database/mongo/mongo.module";
import { ReactionsController } from "./reactions.controller";
import { ReactionsService } from "./reactions.service";

@Module({
  imports: [MongoModule],
  controllers: [ReactionsController],
  providers: [ReactionsService]
})
export class ReactionsModule{}