import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.injection-tokens';
import { INeo4jConfig } from './neo4j-config.interface';
import { Driver, QueryResult, Result, session } from 'neo4j-driver';
import { Parameters } from 'neo4j-driver/types/query-runner';

@Injectable()
export class Neo4j implements OnApplicationShutdown {
  constructor(@Inject(NEO4J_CONFIG) private readonly config: INeo4jConfig,
              @Inject(NEO4J_DRIVER) private readonly driver: Driver) {
  }

  // tslint:disable-next-line:no-any
  static hydrateOne<T>(res: QueryResult, cypherAlias: string, Type?: new (prop: any) => T): T | null {
    if (!res.records.length) {
      return null;
    }

    const raw = res.records[0].get(cypherAlias).properties;
    return Type ? new Type(raw) : raw;
  }

  static getMatchParams(paramsObj: {[key: string]: unknown}): string {
    return Object.entries(paramsObj).reduce((paramStrings: string[], [key, value]) => {
      if (value !== null && value !== undefined) {
        paramStrings.push(`${key} : $${key}`);
      }
      return paramStrings;
    }, []).join(',');
  }

  read(cypher: string, params?: Parameters, database?: string): Result {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.READ,
    }).run(cypher, params);
  }

  write(cypher: string, params?: Parameters, database?: string): Result {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: session.WRITE,
    }).run(cypher, params);
  }

  onApplicationShutdown(): void {
    this.driver.close();
  }
}
