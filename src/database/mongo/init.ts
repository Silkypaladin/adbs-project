import { Db } from 'mongodb';

export async function createUsersCollection(db: Db) {
  return db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'email', 'password'],
        properties: {
          username: {
            bsonType: 'string',
            description:
              'username is required and has to be between 5 and 20 characters',
            minLength: 5,
            maxLength: 20,
          },
          email: {
            bsonType: 'string',
            description: 'email is required and has to match email pattern',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          },
          password: {
            bsonType: 'string',
            description:
              'password is required and has to be between 10 and 30 characters',
            minLength: 10,
            maxLength: 30,
          },
          createdAt: {
            bsonType: 'date',
            description: 'createdAt is required and must be a date',
          },
        },
      },
    },
  });
}

export async function createPostsCollection(db: Db) {
  return db.createCollection('posts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['authorId', 'content', 'createdAt'],
        properties: {
          authorId: {
            bsonType: 'objectId',
            description: 'authorId is required and has to be ObjectId',
          },
          content: {
            bsonType: 'string',
            description:
              'content is required and has to be between 1 and 144 characters',
            minLength: 1,
            maxLength: 144,
          },
          createdAt: {
            bsonType: 'date',
            description: 'createdAt is required and must be a date',
          },
        },
      },
    },
  });
}

export async function createReactionsCollection(db: Db) {
  return db.createCollection('reactions', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['postId', 'userId', 'type', 'createdAt'],
        properties: {
          postId: {
            bsonType: 'objectId',
            description: 'postId is required and has to be ObjectId',
          },
          userId: {
            bsonType: 'objectId',
            description: 'userId is required and has to be ObjectId',
          },
          type: {
            enum: ['like', 'comment'],
            description: 'type is required and has to be "like" or "comment"',
          },
          content: {
            bsonType: 'string',
            description:
              'content is required and has to be between 1 and 144 characters',
            minLength: 1,
            maxLength: 144,
          },
          createdAt: {
            bsonType: 'date',
            description: 'createdAt is required and must be a date',
          },
        },
      },
    },
  });
}
