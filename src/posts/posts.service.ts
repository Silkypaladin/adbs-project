import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class PostsService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async createPost(authorId: string, content: string) {
    const result = await this.db.collection('posts').insertOne({
      authorId: new ObjectId(authorId),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result.insertedId;
  }

  // Inne metody CRUD dla postów...
}
