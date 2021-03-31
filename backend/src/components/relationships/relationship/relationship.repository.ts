import { Injectable } from '@nestjs/common';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { UserRepository } from '@components/users/user/user.repository';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { EnglishLevel } from '@monorepo/types/search/search-params.dto.interface';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { Relationship } from 'neo4j-driver';
import { ExcludeFunctions } from '@shared/utils';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';

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
      CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
      WHERE ($workSchedule IS NULL OR u.workSchedule = $workSchedule)
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
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})<-[:RECEIVED_BY]-(m:Message {read: false, fromUserId: u.id})
        WITH size(collect(m)) as messagesCount
        RETURN messagesCount
      }
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})-[relation:RELATIONSHIP]-(u)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
      CALL {
        WITH u
        MATCH (u)-[r:RELATIONSHIP*1..${params.networkSize || 1}]-(fromUser:User {id: $fromUserId})
        RETURN fromUser, collect(r) as pathRelationships
      }
      RETURN apoc.coll.toSet(apoc.coll.flatten(collect(pathRelationships), true)) as edges,
             apoc.coll.toSet(
               collect(u{.*, relationsCount: relationsCount, messagesCount: messagesCount}) +
               fromUser{.*, relationsCount: 0, messagesCount: 0}
             ) as nodes`,
      {
        ...params,
        english: params.english || EnglishLevel.A1,
        hourlyRateMin: params.hourlyRateMin || 0,
        search: `*${params.search || ''}*~`,
        workSchedule: params.workSchedule || null,
        workType: params.workType || null,
        fromUserId: params.fromUserId || null,
        searcherUserId
      }
    );

    return res.records.length ? new GraphDto(
      res.records[0].get('nodes').map((node: ExcludeFunctions<UserListItemDto>) => new UserListItemDto(
        node,
        node.notifications,
        node.relationsCount
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
}