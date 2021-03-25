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
exports.GetRequestsDto = void 0;
const get_relation_requests_dto_interface_1 = require("../../../../../shared/types/relations/get-relation-requests.dto.interface");
const user_entity_1 = require("../../users/user/user.entity");
const request_entity_1 = require("../request/request.entity");
const class_transformer_1 = require("class-transformer");
const relation_request_user_dto_interface_1 = require("../../../../../shared/types/relations/relation-request-user.dto.interface");
class GetRequestsDto {
    constructor({ fromUser, toUser, requests }) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.requests = requests;
    }
    static _transformUserToPLain(user) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id,
            hourlyRate: user.hourlyRate,
            avatarSrc: user.avatarSrc
        };
    }
}
__decorate([
    class_transformer_1.Transform(({ value }) => GetRequestsDto._transformUserToPLain(value), { toPlainOnly: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], GetRequestsDto.prototype, "fromUser", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => GetRequestsDto._transformUserToPLain(value), { toPlainOnly: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], GetRequestsDto.prototype, "toUser", void 0);
exports.GetRequestsDto = GetRequestsDto;
//# sourceMappingURL=get-requests.dto.js.map