"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipsService = void 0;
const common_1 = require("@nestjs/common");
let RelationshipsService = class RelationshipsService {
    create(createRelationshipDto) {
        return 'This action adds a new relationship';
    }
    findAll() {
        return `This action returns all relationships`;
    }
    findOne(id) {
        return `This action returns a #${id} relationship`;
    }
    update(id, updateRelationshipDto) {
        return `This action updates a #${id} relationship`;
    }
    remove(id) {
        return `This action removes a #${id} relationship`;
    }
};
RelationshipsService = __decorate([
    common_1.Injectable()
], RelationshipsService);
exports.RelationshipsService = RelationshipsService;
//# sourceMappingURL=relationships.service.js.map