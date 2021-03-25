import { Test, TestingModule } from '@nestjs/testing';
import { Neo4j } from './neo4j.service';

describe('Neo4jService', () => {
  let service: Neo4j;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Neo4j],
    }).compile();

    service = module.get<Neo4j>(Neo4j);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
