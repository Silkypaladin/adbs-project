import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { MongoProvider } from '../database/mongo/mongo.provider';
import { Driver, Session } from "neo4j-driver";
import { ClientSession } from "mongodb";
import { RelationshipsService } from "../relationships/relationships.service";

@Injectable()
export class UsersService {
  constructor(private mongoProvider: MongoProvider, @Inject('NEO4J_DRIVER') private neo4jDriver: Driver, private relationshipsService: RelationshipsService) {}

  async createUserWithTransaction(username: string, email: string, password: string) {
    const mongoSession: ClientSession = this.mongoProvider.startSession();
    const neo4jSession = this.neo4jDriver.session();
    const neo4jTransaction = neo4jSession.beginTransaction();

    try {
      mongoSession.startTransaction();
      const usersCollection = this.mongoProvider.getCollection('users');
      const result = await usersCollection.insertOne({
        username,
        email,
        password,
      }, { session: mongoSession });

      const userId = result.insertedId.toString();

      await this.relationshipsService.createUserNodeWithTransaction(neo4jTransaction, userId, username);

      await mongoSession.commitTransaction();
      await neo4jTransaction.commit();

      return userId;
    } catch (error) {
      console.log(`${error}`)
      await mongoSession.abortTransaction();
      await neo4jTransaction.rollback();
      throw new InternalServerErrorException('Failed to create user');
    } finally {
      await mongoSession.endSession();
      await neo4jSession.close();
    }
  }
}
