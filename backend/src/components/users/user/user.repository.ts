import { UserEntity } from './user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
import { SigninDto } from '../../auth/dto/signin.dto';
import { SearchParamsDto } from '../dto/search-params.dto';
import { EnglishLevel } from '@monorepo/types/search/search-params.dto.interface';
import { int } from 'neo4j-driver';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';

@Injectable()
export class UserRepository {
  constructor(private db: Neo4j) {}

  async create(signUpDto: ISignupDto): Promise<UserEntity | null> {
    const salt = await genSalt();
    const res = await this.db.write(
      `CREATE (u:User)
             SET u += $properties, u.id = randomUUID(), u.createdAt = timestamp()
             RETURN u`,
      {
        properties: {
          ...UserEntity.dummy(),
          ...signUpDto,
          salt,
          password: await hash(signUpDto.password, salt),
        },
      }
    );
    return new UserEntity(res.records[0]?.get('u').properties);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const res = await this.db.write(`MATCH (u:User {id: $id}) SET u += $properties RETURN u`, {
      id: user.id,
      properties: JSON.parse(JSON.stringify(user))
    });

    const savedUser = Neo4j.hydrateOne(res, 'u', UserEntity);
    if (!savedUser) {
      throw new InternalServerErrorException();
    }

    return savedUser;
  }

  async findBy(key: keyof Exclude<UserEntity, () => void>, value: unknown): Promise<UserEntity | null> {
    const res = await this.db.read(`MATCH (u:User {${key}: $${key}}) RETURN u`, {[key]: value});
    return Neo4j.hydrateOne(res, 'u', UserEntity);
  }

  async find(searcherUserId: string, params: SearchParamsDto): Promise<PaginationDto<UserListItemDto>> {
    const res = await this.db.read(`
      CALL db.index.fulltext.queryNodes("usersSearch", $search) YIELD node as u, score
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
      WITH u ORDER BY score
      WITH collect(u) as users
      WITH users, size(users) as total
      UNWIND users as u
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})<-[:RECEIVED_BY]-(m:Message {read: false, fromUserId: u.id})
        WITH size(collect(m)) as messagesCount
        RETURN messagesCount
      }
      CALL {
        WITH u
        MATCH (:User {id: $fromUserId})-[relation:RELATIONSHIP]-(u)
        WITH size(collect(relation)) as relationsWithOriginCount
        RETURN relationsWithOriginCount
      }
      CALL {
        WITH u
        MATCH (:User {id: $searcherUserId})-[relation:RELATIONSHIP]-(u)
        WITH size(collect(relation)) as relationsCount
        RETURN relationsCount
      }
      CALL {
        WITH u
        MATCH (relatedUser:User)-[:RELATIONSHIP]-(u)
        WITH size(apoc.coll.toSet(collect(relatedUser))) as networkSize
        RETURN networkSize
      }
      RETURN u, total, messagesCount, relationsCount, relationsWithOriginCount, networkSize
      SKIP $page
      LIMIT $limit`,
      {
        ...params,
        english: params.english || EnglishLevel.A1,
        hourlyRateMin: params.hourlyRateMin || 0,
        search: `*${params.search || ''}*~`,
        workSchedule: params.workSchedule || null,
        workType: params.workType || null,
        page: int(params.page * params.limit),
        limit: int(params.limit),
        fromUserId: params.fromUserId || null,
        searcherUserId
      }
    );

    return new PaginationDto(
      res.records.map(record => new UserListItemDto(
        record.get('u').properties,
        record.get('messagesCount') || 0,
        record.get('relationsCount') || 0,
        record.get('relationsWithOriginCount') || 0,
        record.get('networkSize') || 0,
        false
      )),
      params.limit,
      params.page,
      res.records[0]?.get('total') || 0
    );
  }

  async validateUserPassword({email, password}: SigninDto): Promise<UserEntity | null> {
    const user = await this.findBy('email', email);
    return user && await user.validatePassword(password) ? user : null;
  }

  async getUserOrThrowError(userId: string): Promise<UserEntity> {
    const user = await this.findBy('id', userId);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }
}
