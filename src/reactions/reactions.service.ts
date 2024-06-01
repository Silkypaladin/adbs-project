import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { MongoProvider } from '../database/mongo/mongo.provider';

@Injectable()
export class ReactionsService {
  constructor(private readonly mongoProvider: MongoProvider) {}

  async likePost(postId: string, userId: string) {
    const reactionsCollection = this.mongoProvider.getCollection('reactions');
    const result = await reactionsCollection.insertOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
      type: 'like',
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async commentOnPost(postId: string, userId: string, content: string) {
    const reactionsCollection = this.mongoProvider.getCollection('reactions');
    const result = await reactionsCollection.insertOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
      type: 'comment',
      content,
      createdAt: new Date(),
    });
    return result.insertedId;
  }
}
