import { OnApplicationShutdown } from '@nestjs/common';
import { INeo4jConfig } from './neo4j-config.interface';
import { Driver, QueryResult, Result } from 'neo4j-driver';
import { Parameters } from 'neo4j-driver/types/query-runner';
export declare class Neo4j implements OnApplicationShutdown {
    private readonly config;
    private readonly driver;
    constructor(config: INeo4jConfig, driver: Driver);
    static hydrateOne<T>(res: QueryResult, cypherAlias: string, Type?: new (prop: any) => T): T | null;
    static getMatchParams(paramsObj: {
        [key: string]: unknown;
    }): string;
    read(cypher: string, params?: Parameters, database?: string): Result;
    write(cypher: string, params?: Parameters, database?: string): Result;
    onApplicationShutdown(): void;
}
