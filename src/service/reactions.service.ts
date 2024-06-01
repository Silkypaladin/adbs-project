import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ReactionsService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async likePost(postId: string, userId: string) {
    const result = await this.db.collection('reactions').insertOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
      type: 'like',
      createdAt: new Date(),
    });
    return result.insertedId;
  }

  async commentOnPost(postId: string, userId: string, content: string) {
    const result = await this.db.collection('reactions').insertOne({
      postId: new ObjectId(postId),
      userId: new ObjectId(userId),
      type: 'comment',
      content,
      createdAt: new Date(),
    });
    return result.insertedId;
  }
}
