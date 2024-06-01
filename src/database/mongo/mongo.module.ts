import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import {
  createPostsCollection,
  createReactionsCollection,
  createUsersCollection,
} from './init';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();
        const db = client.db('social-network');

        try {
          await createUsersCollection(db);
          await createPostsCollection(db);
          await createReactionsCollection(db);
        } catch (err) {
          if (err.codeName !== 'NamespaceExists') throw err;
        }
        return db;
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class MongoModule {}
