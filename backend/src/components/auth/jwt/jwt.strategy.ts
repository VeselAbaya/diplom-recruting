import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { UserRepository } from '../../users/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../users/user/user.entity';
import { Config } from '@config';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: (req: FastifyRequest) => req.cookies.access,
      secretOrKey: process.env.JWT_SECRET || Config.JWT.secret
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findBy('id', payload.id);
    if (!user || !user.accessToken) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
