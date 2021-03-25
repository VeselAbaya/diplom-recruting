import { INeo4jConfig } from '@db/neo4j/neo4j-config.interface';
export interface IJwtConfig {
    accessExpiresIn: number;
    refreshExpiresIn: number;
    secret: string;
}
export declare class Config {
    static get DB(): INeo4jConfig;
    static get JWT(): IJwtConfig;
}
