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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_decorator_1 = require("./user/user.decorator");
const user_entity_1 = require("./user/user.entity");
const routes_1 = require("../../../../shared/routes");
const patch_user_dto_1 = require("./dto/patch-user.dto");
const users_service_1 = require("./users.service");
const search_params_dto_1 = require("./dto/search-params.dto");
const pagination_interface_1 = require("../../../../shared/types/pagination/pagination.interface");
const is_multipart_interceptor_1 = require("./is-multipart.interceptor");
const rxjs_1 = require("rxjs");
const user_list_item_dto_1 = require("./dto/user-list-item.dto");
const pagination_dto_1 = require("../../shared/pagination.dto");
let UsersController = class UsersController {
    constructor(users) {
        this.users = users;
    }
    getUserByToken(user) {
        return user;
    }
    async getUserById(id, user) {
        return id === user.id ? user : this.users.getUserById(id);
    }
    patchUser(user, patchUserDto) {
        return this.users.patchUser(user, patchUserDto);
    }
    getUsers(searchParamsDto, userId) {
        return this.users.search(userId, searchParamsDto);
    }
    uploadAvatar(req, user) {
        req.multipart((_, file) => this.users.uploadAvatar(file, user), rxjs_1.noop);
    }
};
__decorate([
    common_1.Get(routes_1.SubPath.users.me()),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", user_entity_1.UserEntity)
], UsersController.prototype, "getUserByToken", null);
__decorate([
    common_1.Get(routes_1.SubPath.users.user()),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Param('id', common_1.ParseUUIDPipe)), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    common_1.Patch(routes_1.SubPath.users.me()),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, user_decorator_1.User()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, patch_user_dto_1.PatchUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patchUser", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } })),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Query()), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_params_dto_1.SearchParamsDto, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Post(routes_1.SubPath.users.avatar()),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UseInterceptors(is_multipart_interceptor_1.IsMultipartInterceptor),
    __param(0, common_1.Req()), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadAvatar", null);
UsersController = __decorate([
    common_1.Controller(routes_1.SubPath.users()),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map