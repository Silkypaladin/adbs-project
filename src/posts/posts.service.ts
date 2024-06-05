import { Injectable } from '@nestjs/common';
import { MongoProvider } from '../database/mongo/mongo.provider';
import { ObjectId } from 'mongodb';

export interface Reaction {
  userId: ObjectId;
  type: 'like' | 'comment';
  content?: string;
  createdAt: Date;
}

export interface Post {
  authorId: ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  reactions: Reaction[];
}

@Injectable()
export class PostsService {
  constructor(private readonly mongoProvider: MongoProvider) {}

  async createPost(authorId: string, content: string) {
    const postsCollection = this.mongoProvider.getCollection<Post>('posts');
    const result = await postsCollection.insertOne({
      authorId: new ObjectId(authorId),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      reactions: [],
    });
    return result.insertedId;
  }

  async addComment(postId: string, userId: string, content: string) {
    const postsCollection = this.mongoProvider.getCollection<Post>('posts');
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          reactions: {
            userId: new ObjectId(userId),
            type: 'comment',
            content,
            createdAt: new Date(),
          } as Reaction,
        },
        $set: { updatedAt: new Date() },
      },
    );
    return result.modifiedCount > 0;
  }

  async addLike(postId: string, userId: string) {
    const postsCollection = this.mongoProvider.getCollection<Post>('posts');
    const result = await postsCollection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          reactions: {
            userId: new ObjectId(userId),
            type: 'like',
            createdAt: new Date(),
          } as Reaction,
        },
        $set: { updatedAt: new Date() },
      },
    );
    return result.modifiedCount > 0;
  }

  async findPostsByUserId(userId: string) {
    const postsCollection = this.mongoProvider.getCollection<Post>('posts');
    return await postsCollection
      .find({ authorId: new ObjectId(userId) })
      .toArray();
  }

  async findReactionsByUserId(userId: string) {
    const postsCollection = this.mongoProvider.getCollection<Post>('posts');
    const posts = await postsCollection
      .find({
        'reactions.userId': new ObjectId(userId),
      })
      .toArray();

    return posts.map((post) => ({
      postId: post._id,
      reactions: post.reactions.filter((reaction) =>
        reaction.userId.equals(new ObjectId(userId)),
      ),
    }));
  }
}
