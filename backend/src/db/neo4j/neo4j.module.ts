import neo4j from 'neo4j-driver';
import { DynamicModule, Module } from '@nestjs/common';
import { Neo4j } from './neo4j.service';
import { INeo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.injection-tokens';

@Module({
  exports: [Neo4j]
})
export class Neo4jModule {
  static forRoot(config: INeo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        Neo4j,
        {
          provide: NEO4J_CONFIG,
          useValue: config
        },
        {
          provide: NEO4J_DRIVER,
          useFactory: async () => {
            const driver = neo4j.driver(
              `${config.scheme}://${config.host}:${config.port}`,
              neo4j.auth.basic(config.username, config.password),
              {disableLosslessIntegers: true} // todo | Find out what is going on with that integers
            );
            await driver.verifyConnectivity();
            return driver;
          }
        }
      ]
    };
  }
}
