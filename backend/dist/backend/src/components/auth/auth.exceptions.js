"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthException = void 0;
const common_1 = require("@nestjs/common");
const exception_interface_1 = require("../../../../shared/types/exception.interface");
class AuthException extends common_1.HttpException {
    constructor(e) {
        super({
            statusCode: e.statusCode,
            message: [e.message],
            error: e.error,
        }, e.statusCode || 400);
    }
    static userNotFound() {
        return new AuthException({
            statusCode: 404,
            message: ['User not found'],
            error: 'user-not-found'
        });
    }
    static emailAlreadyExists() {
        return new AuthException({
            statusCode: 400,
            message: ['User with given email already exists'],
            error: 'email-already-exists'
        });
    }
    static passwordIncorrect() {
        return new AuthException({
            statusCode: 401,
            message: ['Password is incorrect'],
            error: 'password-incorrect'
        });
    }
    static tokenExpired() {
        return new AuthException({
            statusCode: 401,
            message: ['JWT token is expired'],
            error: 'token-expired'
        });
    }
    static tokenInvalid() {
        return new AuthException({
            statusCode: 401,
            message: ['JWT token is invalid'],
            error: 'token-invalid'
        });
    }
    static tokenInBlackList() {
        return new AuthException({
            statusCode: 401,
            message: ['JWT token is in blacklist'],
            error: 'token-in-blacklist'
        });
    }
}
exports.AuthException = AuthException;
//# sourceMappingURL=auth.exceptions.js.map