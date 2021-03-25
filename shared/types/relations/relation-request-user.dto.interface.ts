import { IUserDto } from '../user/user.dto.interface';

export type IRelationRequestUserDto = Pick<IUserDto,
                                           'firstName' | 'lastName' | 'id' | 'email' | 'hourlyRate' | 'avatarSrc'>;
