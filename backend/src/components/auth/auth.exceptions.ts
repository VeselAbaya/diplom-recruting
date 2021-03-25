import { HttpException } from '@nestjs/common';
import { IException } from '@monorepo/types/exception.interface';

export class AuthException extends HttpException {
  constructor(e: IException) {
    super({
      statusCode: e.statusCode,
      message: [e.message],
      error: e.error,
    }, e.statusCode || 400);
  }

  static userNotFound(): AuthException {
    return new AuthException({
      statusCode: 404,
      message: ['User not found'],
      error: 'user-not-found'
    });
  }

  static emailAlreadyExists(): AuthException {
    return new AuthException({
      statusCode: 400,
      message: ['User with given email already exists'],
      error: 'email-already-exists'
    });
  }

  static passwordIncorrect(): AuthException {
    return new AuthException({
      statusCode: 401,
      message: ['Password is incorrect'],
      error: 'password-incorrect'
    });
  }

  static tokenExpired(): AuthException {
    return new AuthException({
      statusCode: 401,
      message: ['JWT token is expired'],
      error: 'token-expired'
    });
  }

  static tokenInvalid(): AuthException {
    return new AuthException({
      statusCode: 401,
      message: ['JWT token is invalid'],
      error: 'token-invalid'
    });
  }

  static tokenInBlackList(): AuthException {
    return new AuthException({
      statusCode: 401,
      message: ['JWT token is in blacklist'],
      error: 'token-in-blacklist'
    });
  }
}
