import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const User = createParamDecorator(
  (userEntityField: keyof UserEntity | undefined, ctx: ExecutionContext): UserEntity | Partial<UserEntity> => {
    const req = ctx.switchToHttp().getRequest();
    return userEntityField ? req.user[userEntityField] : req.user;
  }
);
