import { Injectable } from '@nestjs/common';
import { MongoProvider } from '../database/mongo/mongo.provider';

@Injectable()
export class PostsService {
  constructor(private readonly mongoProvider: MongoProvider) {}

  async createPost(userId: string, content: string) {
    const postsCollection = this.mongoProvider.getCollection('posts');
    const result = await postsCollection.insertOne({
      userId,
      content,
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async findPostsByUserId(userId: string) {
    const postsCollection = this.mongoProvider.getCollection('posts');
    return await postsCollection.find({ userId }).toArray();
  }
}
