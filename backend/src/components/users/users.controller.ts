import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, Param, ParseUUIDPipe,
  Patch, Post, Query, Req,
  UseGuards,
  UseInterceptors, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/user.decorator';
import { UserEntity } from './user/user.entity';
import { SubPath } from '@monorepo/routes';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';
import { SearchParamsDto } from './dto/search-params.dto';
import { IPagination } from '@monorepo/types/pagination/pagination.interface';
import { FastifyRequest } from 'fastify';
import { IsMultipartInterceptor } from './is-multipart.interceptor';
import { noop } from 'rxjs';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';

@Controller(SubPath.users())
export class UsersController {
  constructor(private readonly users: UsersService) {
  }

  @Get(SubPath.users.me())
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  getUserByToken(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get(SubPath.users.user())
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserById(@Param('id', ParseUUIDPipe) id: string, @User() user: UserEntity): Promise<UserEntity> {
    return id === user.id ? user : this.users.getUserById(id);
  }

  @Patch(SubPath.users.me())
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  patchUser(@User() user: UserEntity, @Body() patchUserDto: PatchUserDto): Promise<UserEntity> {
    return this.users.patchUser(user, patchUserDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: true}}))
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(@Query() searchParamsDto: SearchParamsDto, @User('id') userId: string): Promise<PaginationDto<UserListItemDto>> {
    return this.users.search(userId, searchParamsDto);
  }

  @Post(SubPath.users.avatar())
  @UseGuards(AuthGuard())
  @UseInterceptors(IsMultipartInterceptor)
  uploadAvatar(@Req() req: FastifyRequest, @User() user: UserEntity): void {
    req.multipart((_, file) => this.users.uploadAvatar(file, user), noop);
  }
}
