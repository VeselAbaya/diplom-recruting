import * as config from 'config';
import { INeo4jConfig } from '@db/neo4j/neo4j-config.interface';

export interface IJwtConfig {
  accessExpiresIn: number;
  refreshExpiresIn: number;
  secret: string;
}

export class Config {
  static get DB(): INeo4jConfig {
    return config.get<INeo4jConfig>('db');
  }

  static get JWT(): IJwtConfig {
    return config.get<IJwtConfig>('jwt');
  }
}
