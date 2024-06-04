import { Inject, Injectable } from '@nestjs/common';
import { Driver, Transaction } from "neo4j-driver";

@Injectable()
export class RelationshipsService {
  constructor(@Inject('NEO4J_DRIVER') private driver: Driver) {}

  async createUserNodeWithTransaction(transaction: Transaction, userId: string, username: string) {
    const query = `
      CREATE (u:User {id: $userId, username: $username})
      RETURN u
    `;
    await transaction.run(query, { userId, username });
  }

  async createUserNode(userId: string, username: string) {
    const session = this.driver.session();
    const query = `
      CREATE (u:User {id: $userId, username: $username})
      RETURN u
    `;
    try {
      const result = await session.run(query, { userId, username});
      return result.records[0].get('u').properties;
    } finally {
      await session.close();
    }
  }

  async sendFriendRequest(fromUserId: string, toUserId: string) {
    const session = this.driver.session();
    const query = `
      MATCH (a:User {id: $fromUserId}), (b:User {id: $toUserId})
      MERGE (a)-[r:FRIENDS_WITH]->(b)
      ON CREATE SET r.status = 'PENDING', r.createdAt = date()
      RETURN r
    `;
    try {
      const result = await session.run(query, { fromUserId, toUserId });
      return result.records[0].get('r').properties;
    } finally {
      await session.close();
    }
  }

  async acceptFriendRequest(fromUserId: string, toUserId: string) {
    const session = this.driver.session();
    const query = `
      MATCH (a:User {id: $fromUserId})-[r:FRIENDS_WITH]->(b:User {id: $toUserId})
      SET r.status = 'ACCEPTED', r.acceptedAt = date()
      RETURN r
    `;
    try {
      const result = await session.run(query, { fromUserId, toUserId });
      await session.run(
        `MATCH (a:User {id: $toUserId}), (b:User {id: $fromUserId})
         MERGE (a)-[r:FRIENDS_WITH {status: 'ACCEPTED', acceptedAt: date()}]->(b)`,
        { fromUserId, toUserId },
      );
      return result.records[0].get('r').properties;
    } finally {
      await session.close();
    }
  }

  async rejectFriendRequest(fromUserId: string, toUserId: string) {
    const session = this.driver.session();
    const query = `
      MATCH (a:User {id: $fromUserId})-[r:FRIENDS_WITH]->(b:User {id: $toUserId})
      SET r.status = 'REJECTED', r.rejectedAt = date()
      RETURN r
    `;
    try {
      const result = await session.run(query, { fromUserId, toUserId });
      return result.records[0].get('r').properties;
    } finally {
      await session.close();
    }
  }

  async suggestFriends(userId: string) {
    const session = this.driver.session();
    const query = `
      MATCH (u:User {id: $userId})
      CALL apoc.neighbors.athop(u, 'FRIENDS_WITH', 2) YIELD node AS fof
      WHERE NOT (u)-[:FRIENDS_WITH]-(fof) AND u <> fof
      RETURN DISTINCT fof
    `;
    try {
      const result = await session.run(query, { userId });
      return result.records.map((record) => record.get('fof').properties);
    } finally {
      await session.close();
    }
  }
}
