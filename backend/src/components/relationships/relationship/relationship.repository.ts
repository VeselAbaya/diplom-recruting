import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { UserRepository } from '@components/users/user/user.repository';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { EnglishLevel } from '@monorepo/types/search/search-params.dto.interface';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { Relationship } from 'neo4j-driver';
import { ExcludeFunctions } from '@shared/utils';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { UpdateRelationshipDto } from '@components/relationships/dto/update-relationship.dto';

@Injectable()
export class RelationshipRepository {
  constructor(private readonly db: Neo4j, private readonly users: UserRepository) {}

  async getRelationships(fromUserId: string, toUserId: string): Promise<RelationshipEntity[]> {
    await this.users.getUserOrThrowError(toUserId);
    await this.users.getUserOrThrowError(fromUserId);
    const res = await this.db.write(`
      MATCH (:User {id: $fromUserId})-[r:RELATIONSHIP]-(:User {id: $toUserId})
      RETURN r
      ORDER BY r.createdAt
    `, {fromUserId, toUserId});
    return res.records.map(record => new RelationshipEntity(record.get('r').properties));
  }

  async getGraph(searcherUserId: string, params: GraphSearchParamsDto): Promise<GraphDto> {
    await this.users.getUserOrThrowError(params.fromUserId);

    const res = await this.db.read(`
      CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u
      WHERE (CASE WHEN $fromUserId IS NOT NULL
                    THEN EXISTS((u)-[:RELATIONSHIP*1..${params.networkSize || 1}]-(:User {id: $fromUserId}))
                  ELSE true END)
        AND ($workSchedule IS NULL OR u.workSchedule = $workSchedule)
        AND ($workType IS NULL OR u.workType = $workType)
        AND (CASE WHEN u.english IS NOT NULL THEN u.english >= $english
                  ELSE $english = ${EnglishLevel.A1} END)
        AND (CASE WHEN u.hourlyRate IS NOT NULL
                    THEN $hourlyRateMin <= u.hourlyRate ${params.hourlyRateMax ? '<= $hourlyRateMax' : ''}
                  ELSE true END)
        AND ($experience = 0
             OR ($experience <> -1 AND u.experience >= $experience)
             OR ($experience = -1 AND u.experience <= 0))
        AND (CASE WHEN $fromUserId IS NOT NULL
                    THEN u.id <> $fromUserId
                  ELSE true END)
      WITH collect(u) as searchSatisfyingUsers
      CALL {
        WITH searchSatisfyingUsers
        UNWIND searchSatisfyingUsers as u
        MATCH path = (u)-[r:RELATIONSHIP*1..${params.networkSize || 1}]-(fromUser:User {id: $fromUserId})
        WHERE all(rel IN r WHERE rel.type IN $relationTypes)
        RETURN nodes(path) as pathNodes,
               collect(r) as pathRelationships
      }
      WITH apoc.coll.toSet(apoc.coll.flatten(collect(pathNodes))) as users,
           apoc.coll.toSet(apoc.coll.flatten(collect(pathRelationships), true)) as edges,
           searchSatisfyingUsers
      UNWIND users as user
      CALL {
        WITH user
        MATCH (:User {id: $searcherUserId})<-[:RECEIVED_BY]-(m:Message {read: false, fromUserId: user.id})
        WITH size(collect(m)) as messagesCount
        RETURN messagesCount
      }
      CALL {
        WITH user
        MATCH (:User {id: $searcherUserId})-[relation:RELATIONSHIP]-(user)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
      CALL {
        WITH user
        MATCH (relatedUser:User)-[:RELATIONSHIP]-(user)
        WITH size(apoc.coll.toSet(collect(relatedUser))) as networkSize
        RETURN networkSize
      }
      RETURN edges,
             apoc.coll.toSet(
               collect(user{
                 .*,
                 relationsCount: relationsCount,
                 messagesCount: messagesCount,
                 networkSize: networkSize,
                 intermediate: CASE WHEN user.id = $fromUserId
                                 THEN false
                                 ELSE NOT user IN searchSatisfyingUsers
                               END
               })
             ) as nodes,
             searchSatisfyingUsers`,
      {
        ...params,
        english: params.english || EnglishLevel.A1,
        hourlyRateMin: params.hourlyRateMin || 0,
        search: `*${params.search || ''}*~`,
        workSchedule: params.workSchedule || null,
        workType: params.workType || null,
        fromUserId: params.fromUserId || null,
        relationTypes: params.relationTypes,
        searcherUserId
      }
    );

    return res.records.length ? new GraphDto(
      res.records[0].get('nodes').map((node: ExcludeFunctions<UserListItemDto>) => new UserListItemDto(
        node,
        node.notifications,
        node.relationsCount,
        node.networkSize,
        node.intermediate
      )),
      res.records[0].get('edges').map((edge: Relationship) => new RelationshipEntity(
        edge.properties as ExcludeFunctions<RelationshipEntity>
      ))
    ) : new GraphDto();

    // return res.records.reduce((graph, record) => {
    //   graph.nodes.push(record)
    //   return graph;
    // }, new GraphDto()){
    //   nodes: res.records.map(record => new UserEntity(record.get('u').properties)),
    //   edges: res.records.map()
    // };
  }

  async getUserRelationTypes(userId: string): Promise<RelationType[]> {
    await this.users.getUserOrThrowError(userId);
    const res = await this.db.write(`
      MATCH (:User {id: $userId})-[r:RELATIONSHIP]-(:User)
      RETURN DISTINCT r.type as relationType
    `, {userId});

    return res.records.map(record => record.get('relationType'));
  }

  async update(id: string, patchDto: UpdateRelationshipDto): Promise<RelationshipEntity> {
    const res = await this.db.write(`
      MATCH ()-[r:RELATIONSHIP {id: $id}]-()
      SET r += $properties
      RETURN DISTINCT r
    `, {
      id,
      properties: {
        description: patchDto.description,
        endAt: patchDto.endAt,
        startAt: patchDto.startAt
      }
    });

    const savedRel = Neo4j.hydrateOne(res, 'r', RelationshipEntity);
    if (!savedRel) {
      throw new InternalServerErrorException();
    }

    return savedRel;
  }
}
