import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import {
  createPostsCollection,
  createReactionsCollection,
  createUsersCollection,
} from './init';

@Injectable()
export class MongoProvider implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    this.client = new MongoClient('mongodb://localhost:27017');
    await this.client.connect();
    this.db = this.client.db('social-network');
    await this.initializeCollections();
    await this.createIndexes();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  getCollection(name: string) {
    return this.db.collection(name);
  }

  private async initializeCollections() {
    try {
      await createUsersCollection(this.db);
      await createPostsCollection(this.db);
      await createReactionsCollection(this.db);
    } catch (err) {
      if (err.codeName !== 'NamespaceExists') throw err;
    }
  }

  private async createIndexes() {
    const usersCollection = this.getCollection('users');
    await usersCollection.createIndex({ username: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    const postsCollection = this.getCollection('posts');
    await postsCollection.createIndex({ userId: 1 });
    await postsCollection.createIndex({ createdAt: 1 });

    const reactionsCollection = this.getCollection('reactions');
    await reactionsCollection.createIndex({ postId: 1 });
    await reactionsCollection.createIndex({ userId: 1 });
  }
}
