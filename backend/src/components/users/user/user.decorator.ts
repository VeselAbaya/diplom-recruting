import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './user.entity';

export const User = createParamDecorator(
  (userEntityField: keyof UserEntity | undefined, ctx: ExecutionContext): UserEntity | Partial<UserEntity> | null => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user) {
      return null;
    }

    return userEntityField ? req.user[userEntityField] : req.user;
  }
);
