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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../users/user/user.entity");
const user_decorator_1 = require("../users/user/user.decorator");
const signup_dto_1 = require("./dto/signup.dto");
const routes_1 = require("../../../shared/routes");
const signin_dto_1 = require("./dto/signin.dto");
const tokens_dto_interface_1 = require("../../../shared/types/auth/tokens.dto.interface");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signupDto) {
        return this.authService.signup(signupDto);
    }
    signIn(signinDto) {
        return this.authService.signIn(signinDto);
    }
    logout(user) {
        this.authService.logout(user);
    }
    refresh({ refreshToken }) {
        return this.authService.refresh(refreshToken);
    }
};
__decorate([
    common_1.Post(routes_1.SubPath.auth.signup()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post(routes_1.SubPath.auth.signin()),
    __param(0, common_1.Body(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    common_1.Delete(routes_1.SubPath.auth.logout()),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    common_1.Post(routes_1.SubPath.auth.refresh()),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
AuthController = __decorate([
    common_1.Controller(routes_1.SubPath.auth()),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map