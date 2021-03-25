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
exports.UserEntity = void 0;
const bcrypt_1 = require("bcrypt");
const class_transformer_1 = require("class-transformer");
const search_params_dto_interface_1 = require("../../../../../shared/types/search/search-params.dto.interface");
const user_dto_interface_1 = require("../../../../../shared/types/user/user.dto.interface");
const utils_1 = require("../../../shared/utils");
const constants_1 = require("../../../../../shared/constants");
class UserEntity {
    constructor(userProps) {
        this.lastName = '';
        this.phone = '';
        this.about = '';
        this.workSchedule = null;
        this.workType = null;
        this.experience = null;
        this.english = null;
        this.keywords = [];
        this.hourlyRate = null;
        this.avatarSrc = constants_1.DEFAULT_AVATAR_URL;
        this._keywordsStr = '';
        this.accessToken = null;
        this.refreshToken = null;
        for (const [key, val] of Object.entries(userProps)) {
            this[key] = val;
        }
    }
    static dummy() {
        return {
            avatarSrc: constants_1.DEFAULT_AVATAR_URL,
            about: '',
            english: null,
            experience: null,
            hourlyRate: null,
            lastName: '',
            phone: '',
            workSchedule: null,
            workType: null,
            email: '',
            firstName: '',
            keywords: [],
            _keywordsStr: '',
            password: '',
            salt: '',
            accessToken: null,
            refreshToken: null
        };
    }
    async validatePassword(password) {
        return await bcrypt_1.hash(password, this.salt) === this.password;
    }
}
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", Object)
], UserEntity.prototype, "_keywordsStr", void 0);
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", Object)
], UserEntity.prototype, "accessToken", void 0);
__decorate([
    class_transformer_1.Exclude(),
    __metadata("design:type", Object)
], UserEntity.prototype, "refreshToken", void 0);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map