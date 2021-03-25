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
exports.RelationshipsController = void 0;
const common_1 = require("@nestjs/common");
const relationships_service_1 = require("./relationships.service");
const create_relationship_dto_1 = require("./dto/create-relationship.dto");
const update_relationship_dto_1 = require("./dto/update-relationship.dto");
let RelationshipsController = class RelationshipsController {
    constructor(relationshipsService) {
        this.relationshipsService = relationshipsService;
    }
    create(createRelationshipDto) {
        return this.relationshipsService.create(createRelationshipDto);
    }
    findAll() {
        return this.relationshipsService.findAll();
    }
    findOne(id) {
        return this.relationshipsService.findOne(+id);
    }
    update(id, updateRelationshipDto) {
        return this.relationshipsService.update(+id, updateRelationshipDto);
    }
    remove(id) {
        return this.relationshipsService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_relationship_dto_1.CreateRelationshipDto]),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_relationship_dto_1.UpdateRelationshipDto]),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationshipsController.prototype, "remove", null);
RelationshipsController = __decorate([
    common_1.Controller('relationships'),
    __metadata("design:paramtypes", [relationships_service_1.RelationshipsService])
], RelationshipsController);
exports.RelationshipsController = RelationshipsController;
//# sourceMappingURL=relationships.controller.js.map