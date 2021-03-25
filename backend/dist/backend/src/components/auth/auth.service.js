"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../users/user/user.repository");
const tokens_dto_interface_1 = require("../../../../shared/types/auth/tokens.dto.interface");
const tokens_service_1 = require("./tokens.service");
const auth_exceptions_1 = require("./auth.exceptions");
let AuthService = class AuthService {
    constructor(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    async signup(signupDto) {
        const newUser = await this.users.create(signupDto);
        if (!newUser) {
            throw new common_1.InternalServerErrorException({
                statusCode: 500,
                message: ['Something went wrond during user creation'],
                error: 'user-creation-error'
            });
        }
        return newUser;
    }
    async signIn(signinDto) {
        const user = await this.users.validateUserPassword(signinDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.tokens.generate({ id: user.id });
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await this.users.save(user);
        return tokens;
    }
    async logout(user) {
        user.accessToken = null;
        user.refreshToken = null;
        await this.users.save(user);
    }
    async refresh(refreshToken) {
        const { id: userId } = this.tokens.verify(refreshToken);
        const user = await this.users.findBy('id', userId);
        if (!user) {
            throw auth_exceptions_1.AuthException.userNotFound();
        }
        const tokens = await this.tokens.generate({ id: user.id });
        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await this.users.save(user);
        return tokens;
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        tokens_service_1.TokensService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map