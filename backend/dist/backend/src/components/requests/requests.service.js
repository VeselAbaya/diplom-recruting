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
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const request_repository_1 = require("./request/request.repository");
const user_entity_1 = require("../users/user/user.entity");
const request_entity_1 = require("./request/request.entity");
const get_requests_params_dto_1 = require("./dto/get-requests-params.dto");
const get_requests_dto_1 = require("./dto/get-requests.dto");
const relationship_entity_1 = require("../relationships/relationship/relationship.entity");
const messages_service_1 = require("../messages/messages.service");
let RequestsService = class RequestsService {
    constructor(requests, messages) {
        this.requests = requests;
        this.messages = messages;
    }
    async create(user, createRequestDto) {
        const request = await this.requests.save(user, createRequestDto);
        if (createRequestDto.comment) {
            this.messages.save({
                fromUserId: createRequestDto.fromUserId,
                toUserId: createRequestDto.toUserId,
                text: createRequestDto.comment
            });
        }
        return request;
    }
    getRequestsFromOneUserToAnother(getRequestsParamsDto) {
        return this.requests.get(getRequestsParamsDto);
    }
    update(requestId, updateRequestDto) {
        return this.requests.update(requestId, updateRequestDto);
    }
    decline(requestId, declinerId) {
        return this.requests.decline(requestId, declinerId);
    }
    reopen(requestId) {
        return this.requests.reopen(requestId);
    }
    accept(requestId) {
        return this.requests.accept(requestId);
    }
};
RequestsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [request_repository_1.RequestRepository, messages_service_1.MessagesService])
], RequestsService);
exports.RequestsService = RequestsService;
//# sourceMappingURL=requests.service.js.map