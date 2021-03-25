import { DynamicModule } from '@nestjs/common';
import { INeo4jConfig } from './neo4j-config.interface';
export declare class Neo4jModule {
    static forRoot(config: INeo4jConfig): DynamicModule;
}
