import { Controller, Get } from '@nestjs/common';
import { UserRepository } from '@components/users/user/user.repository';
import { WorkSchedule, WorkType } from '@monorepo/types/search/search-params.dto.interface';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { UserEntity } from '@components/users/user/user.entity';
import { RequestRepository } from '@components/requests/request/request.repository';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { clone } from 'ramda';

const randomInt = (to: number, roundFn = Math.floor) => roundFn(Math.random() * to);

const getOtherUserId = (users: UserEntity[], userId: string) => {
  while (true) {
    const otherUserId = users[randomInt(users.length)].id;
    if (otherUserId === userId) {
      continue;
    }
    return otherUserId;
  }
};

@Controller()
export class AppController {
  names = [
    'Devis',
    'Ilya',
    'Katya',
    'Aleksei',
    'John',
    'Andrew',
    'Max',
    'Ann',
    'Tanya',
    'Kira',
    'Sanofi',
    'Echart',
    'Ivan',
    'Bushe',
    'Stol',
    'Kek',
    'Magic',
    'Every',
    'One',
    'Twe',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Threatenaaa',
    'Fourteen',
    'Another',
    'AndAnother',
    'VeselAbaya',
    'OnePiece',
    'Menu',
    'Bottle',
    'BottleNeck'
  ];
  surnames = [
    'Tolle',
    'Petrow',
    'Mask',
    'Johnson',
    'Messi',
    'Lavrich',
    'Pompaev',
    'Zolotarev',
    'Golotvin',
    'Many',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Petrov',
    'Anrew',
    'Alabama',
    'Trumb',
    'Trump',
    'Abama',
    'Rzhomba',
    'KALIIAK',
    '}{otabibch',
    'Dyd',
    'Yoyru',
    'Kkdir'
  ];
  domens = ['gmail.com', 'yandex.ru', 'mail.ru', 'yahoo.com', 'zhumaisinba.kz'];
  // tslint:disable-next-line:no-any
  workSchedules = [...Object.values(WorkSchedule), null];
  workTypes = [...Object.values(WorkType), null];
  relationTypes = Object.values(RelationType);

  constructor(private readonly users: UserRepository,
              private readonly db: Neo4j,
              private readonly requests: RequestRepository) {}

  @Get('generate-users')
  generateUsers(): Promise<(UserEntity | null)[]> {
    const generatingUsers = [this.generateUser('Antay', 'Juskovets', 'gmail.com')];

    for (const name of this.names) {
      for (const surname of this.surnames) {
        generatingUsers.push(this.generateUser(name, surname, this.domens[randomInt(this.domens.length)]));
      }
    }

    return Promise.all(generatingUsers);
  }

  private generateUser(name: string, surname: string, domen: string): Promise<UserEntity | null> {
    return this.users.create({
      firstName: name,
      lastName: surname,
      password: '123456',
      email: `${name}${surname}@${domen}`
    }).then(user => {
      if (user) {
        user.hourlyRate = randomInt(3) ? randomInt(150) : null;
        user.english = randomInt(6);
        user.experience = randomInt(12) - 1; // experience is from -1 to 10
        user.workSchedule = this.workSchedules[randomInt(this.workSchedules.length)];
        user.workType = this.workTypes[randomInt(this.workTypes.length)];
        return this.users.save(user);
      } else {
        return null;
      }
    });
  }

  @Get('generate-relations')
  async generateRelations(): Promise<UserEntity[]> {
    const users = (await this.db.read('MATCH (u:User) RETURN u')).records.map(
      record => new UserEntity(record.get('u').properties)
    );

    for (const user of users) {
      if (randomInt(4) === 3) {
        continue;
      }

      const relationsCount = randomInt(5, Math.ceil);
      const relationTypes = clone(this.relationTypes);
      for (let i = 0; i !== relationsCount; ++i) {
        const relationIndex = randomInt(relationTypes.length);
        const request = await this.requests.save(user, {
          fromUserId: user.id,
          endAt: null,
          comment: '',
          description: '',
          startAt: new Date().toString(),
          toUserId: getOtherUserId(users, user.id),
          type: relationTypes.splice(relationIndex, 1)[0]
        });
        await this.requests.accept(request.id);
      }
    }

    return users;
  }

  @Get('ping')
  ping(): Promise<string> {
    return Promise.resolve('pong');
  }
}
