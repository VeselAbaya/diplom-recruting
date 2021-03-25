import { Strategy } from 'passport-jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { UserRepository } from '../../users/user/user.repository';
import { UserEntity } from '../../users/user/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: IJwtPayload): Promise<UserEntity>;
}
export {};
