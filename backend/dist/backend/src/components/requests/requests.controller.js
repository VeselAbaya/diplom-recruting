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
exports.RequestsController = void 0;
const common_1 = require("@nestjs/common");
const requests_service_1 = require("./requests.service");
const create_request_dto_1 = require("./dto/create-request.dto");
const routes_1 = require("../../../../shared/routes");
const request_entity_1 = require("./request/request.entity");
const user_decorator_1 = require("../users/user/user.decorator");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../users/user/user.entity");
const get_requests_params_dto_1 = require("./dto/get-requests-params.dto");
const get_relation_requests_dto_interface_1 = require("../../../../shared/types/relations/get-relation-requests.dto.interface");
const update_request_dto_1 = require("./dto/update-request.dto");
const request_sender_guard_1 = require("./guards/request-sender.guard");
const request_sender_or_receiver_guard_service_1 = require("./guards/request-sender-or-receiver-guard.service");
const request_receiver_guard_1 = require("./guards/request-receiver.guard");
const request_decliner_guard_1 = require("./guards/request-decliner.guard");
const relationship_entity_1 = require("../relationships/relationship/relationship.entity");
let RequestsController = class RequestsController {
    constructor(requests) {
        this.requests = requests;
    }
    create(user, createRequestDto) {
        return this.requests.create(user, createRequestDto);
    }
    getRequestsFromOneUserToAnother(params) {
        return this.requests.getRequestsFromOneUserToAnother(params);
    }
    update(id, updateRequestDto) {
        return this.requests.update(id, updateRequestDto);
    }
    decline(id, userId) {
        return this.requests.decline(id, userId);
    }
    reopen(id, userId) {
        return this.requests.reopen(id);
    }
    accept(id) {
        return this.requests.accept(id);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, user_decorator_1.User()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.UsePipes(new common_1.ValidationPipe({ transform: true })),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_requests_params_dto_1.GetRequestsParamsDto]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "getRequestsFromOneUserToAnother", null);
__decorate([
    common_1.Patch(routes_1.SubPath.relationRequests.request()),
    common_1.UseGuards(passport_1.AuthGuard(), request_sender_guard_1.RequestSenderGuard),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_request_dto_1.UpdateRequestDto]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "update", null);
__decorate([
    common_1.Patch(routes_1.SubPath.relationRequests.decline()),
    common_1.UseGuards(passport_1.AuthGuard(), request_sender_or_receiver_guard_service_1.RequestSenderOrReceiverGuard),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "decline", null);
__decorate([
    common_1.Patch(routes_1.SubPath.relationRequests.reopen()),
    common_1.UseGuards(passport_1.AuthGuard(), request_decliner_guard_1.RequestDeclinerGuard),
    __param(0, common_1.Param('id')), __param(1, user_decorator_1.User('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "reopen", null);
__decorate([
    common_1.Delete(routes_1.SubPath.relationRequests.accept()),
    common_1.UseGuards(passport_1.AuthGuard(), request_receiver_guard_1.RequestReceiverGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestsController.prototype, "accept", null);
RequestsController = __decorate([
    common_1.Controller(routes_1.SubPath.relationRequests()),
    __metadata("design:paramtypes", [requests_service_1.RequestsService])
], RequestsController);
exports.RequestsController = RequestsController;
//# sourceMappingURL=requests.controller.js.map