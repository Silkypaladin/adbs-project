import { Controller } from "@nestjs/common";
import { RelationshipsService } from "./relationships.service";

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {
  }
}