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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user/user.repository");
const pagination_interface_1 = require("../../../shared/types/pagination/pagination.interface");
const util_1 = require("util");
const stream = require("stream");
const fs_1 = require("fs");
const constants_1 = require("../../../shared/constants");
const path_1 = require("path");
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
    }
    patchUser(user, patchUserDto) {
        return this.users.save(Object.assign(user, patchUserDto));
    }
    search(searchParamsDto) {
        return this.users.find(searchParamsDto);
    }
    async uploadAvatar(file, user) {
        const avatarLocation = path_1.join('public', 'uploads', `avatar-${user.id}.${constants_1.AVATAR_EXT}`);
        const pipeline = util_1.promisify(stream.pipeline);
        const writeStream = fs_1.createWriteStream(avatarLocation);
        await pipeline(file, writeStream);
        user.avatarSrc = avatarLocation;
        await this.users.save(user);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map