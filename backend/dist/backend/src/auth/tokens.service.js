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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const tokens_dto_interface_1 = require("../../../shared/types/auth/tokens.dto.interface");
const jwt_1 = require("@nestjs/jwt");
const _config_1 = require("../config");
const auth_exceptions_1 = require("./auth.exceptions");
const jsonwebtoken_1 = require("jsonwebtoken");
let TokensService = class TokensService {
    constructor(jwt) {
        this.jwt = jwt;
    }
    async generate(payload) {
        const accessToken = await this.jwt.sign(payload, { expiresIn: _config_1.Config.JWT.accessExpiresIn });
        const refreshToken = await this.jwt.sign(Object.assign(Object.assign({}, payload), { accessToken }), { expiresIn: _config_1.Config.JWT.refreshExpiresIn });
        return { accessToken, refreshToken };
    }
    verify(token, options) {
        try {
            return this.jwt.verify(token, options);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                throw auth_exceptions_1.AuthException.tokenExpired();
            }
            throw auth_exceptions_1.AuthException.tokenInvalid();
        }
    }
};
TokensService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map