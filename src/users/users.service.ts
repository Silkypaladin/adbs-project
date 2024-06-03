import { Injectable, } from "@nestjs/common";
import { MongoProvider } from '../database/mongo/mongo.provider';
import { RelationshipsService } from "../relationships/relationships.service";

@Injectable()
export class UsersService {
  constructor(private mongoProvider: MongoProvider, private relationshipsService: RelationshipsService) {}

  async createUser(username: string, email: string, password: string) {
    const usersCollection = this.mongoProvider.getCollection('users');
    const result = await usersCollection.insertOne({
      username,
      email,
      password,
    });

    const userId = result.insertedId.toString()

    await this.relationshipsService.createUserNode(userId, username);

    return userId;
  }

  async findUserByUsername(username: string) {
    const usersCollection = this.mongoProvider.getCollection('users');
    return await usersCollection.findOne({ username });
  }
}
