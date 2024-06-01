import { Module } from '@nestjs/common';
import neo4j from 'neo4j-driver';

@Module({
  providers: [
    {
      provide: 'NEO4J_DRIVER',
      useFactory: () => {
        return neo4j.driver(
          'bolt://localhost:7687',
          neo4j.auth.basic('neo4j', 'password'),
          {
            encrypted: "ENCRYPTION_OFF",
            trust: "TRUST_ALL_CERTIFICATES",
          }
        );
      },
    },
  ],
  exports: ['NEO4J_DRIVER'],
})
export class Neo4jModule {}
