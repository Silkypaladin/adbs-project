import { Inject, Injectable } from '@nestjs/common';
import { Driver } from 'neo4j-driver';

@Injectable()
export class RelationshipsService {
  constructor(@Inject('NEO4J_DRIVER') private driver: Driver) {}

  async createUserNode(userId: string, username: string) {
    const session = this.driver.session();
    const query = `
      CREATE (u:User {id: $userId, username: $username})
      RETURN u
    `;
    try {
      const result = await session.run(query, { userId, username });
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
      ON CREATE SET r.status = 'PENDING'
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
      SET r.status = 'ACCEPTED'
      RETURN r
    `;
    try {
      const result = await session.run(query, { fromUserId, toUserId });
      await session.run(
        `MATCH (a:User {id: $toUserId}), (b:User {id: $fromUserId})
         MERGE (a)-[r:FRIENDS_WITH {status: 'ACCEPTED'}]->(b)`,
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
      SET r.status = 'REJECTED'
      RETURN r
    `;
    try {
      const result = await session.run(query, { fromUserId, toUserId });
      return result.records[0].get('r').properties;
    } finally {
      await session.close();
    }
  }

  async getUserFriends(userId: string) {
    const session = this.driver.session();
    const query = `
      MATCH (u:User {id: $userId})-[:FRIENDS_WITH {status: 'ACCEPTED'}]-(friend:User)
      RETURN DISTINCT friend
    `;
    try {
      const result = await session.run(query, { userId });
      return result.records.map((record) => record.get('friend').properties);
    } finally {
      await session.close();
    }
  }

  async getSuggestedFriends(userId: string) {
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
