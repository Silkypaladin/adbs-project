import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async createUser(username: string, email: string, password: string) {
    const result = await this.db.collection('users').insertOne({
      username,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  }

  async findUserById(id: string) {
    return this.db.collection('users').findOne({ _id: new ObjectId(id) });
  }
}
