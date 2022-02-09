import { FullNamePipe } from './full-name.pipe';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

describe('FullNamePipe', () => {
  const pipe = new FullNamePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform user to it\'s fullname', () => {
    const user: Pick<IUserDto, 'firstName' | 'lastName'> = {
      firstName: 'Antay',
      lastName: 'Juskovets'
    };
    expect(pipe.transform(user)).toBe('Antay Juskovets');
  });

  it('should transform user without last name to it\'s trimmed firstName only', () => {
    const user: Pick<IUserDto, 'firstName' | 'lastName'> = {
      firstName: 'Antay',
      lastName: null
    };
    expect(pipe.transform(user)).toBe('Antay');
  });

  it('should return empty string in case of null input', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
