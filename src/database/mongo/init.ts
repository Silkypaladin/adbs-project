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
            description: 'must be a string and is required',
            minLength: 5,
            maxLength: 20,
          },
          email: {
            bsonType: 'string',
            description: 'must be a string and match the email pattern',
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          },
          password: {
            bsonType: 'string',
            description: 'must be a string and is required',
            minLength: 10,
            maxLength: 30,
          },
          createdAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
          updatedAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
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
        required: ['authorId', 'content', 'createdAt', 'updatedAt'],
        properties: {
          authorId: {
            bsonType: 'objectId',
            description: 'must be an objectId and is required',
          },
          content: {
            bsonType: 'string',
            description: 'must be a string and is required',
            minLength: 1,
            maxLength: 144,
          },
          createdAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
          updatedAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
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
            description: 'must be an objectId and is required',
          },
          userId: {
            bsonType: 'objectId',
            description: 'must be an objectId and is required',
          },
          type: {
            enum: ['like', 'comment'],
            description: 'can only be one of the enum values and is required',
          },
          content: {
            bsonType: 'string',
            description: 'required if type is comment and max length is 144',
            maxLength: 144,
          },
          createdAt: {
            bsonType: 'date',
            description: 'must be a date and is required',
          },
        },
      },
    },
  });
}
