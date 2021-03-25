import { HttpException } from '@nestjs/common';
import { IException } from '@monorepo/types/exception.interface';
export declare class AuthException extends HttpException {
    constructor(e: IException);
    static userNotFound(): AuthException;
    static emailAlreadyExists(): AuthException;
    static passwordIncorrect(): AuthException;
    static tokenExpired(): AuthException;
    static tokenInvalid(): AuthException;
    static tokenInBlackList(): AuthException;
}
