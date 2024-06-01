import { Injectable } from '@nestjs/common';
import { MongoProvider } from '../database/mongo/mongo.provider';

@Injectable()
export class UsersService {
  constructor(private readonly mongoProvider: MongoProvider) {}

  async createUser(username: string, email: string, password: string) {
    const usersCollection = this.mongoProvider.getCollection('users');
    const result = await usersCollection.insertOne({
      username,
      email,
      password,
    });
    return result.insertedId;
  }

  async findUserByUsername(username: string) {
    const usersCollection = this.mongoProvider.getCollection('users');
    return await usersCollection.findOne({ username });
  }
}
