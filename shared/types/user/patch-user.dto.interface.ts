import { IUserDto } from './user.dto.interface';

export type IPatchUserDto = Partial<Pick<IUserDto,
  'email' |
  'firstName' |
  'lastName' |
  'phone' |
  'about' |
  'workSchedule' |
  'workType' |
  'experience' |
  'english' |
  'keywords' |
  'hourlyRate'
>>;
