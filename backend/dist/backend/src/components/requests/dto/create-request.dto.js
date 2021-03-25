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
exports.CreateRequestDto = void 0;
const create_relation_dto_interface_1 = require("../../../../../shared/types/relations/create-relation.dto.interface");
const relation_type_enum_1 = require("../../../../../shared/types/relations/relation-type.enum");
const class_validator_1 = require("class-validator");
class CreateRequestDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "comment", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Object)
], CreateRequestDto.prototype, "endAt", void 0);
__decorate([
    class_validator_1.IsDateString(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "startAt", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "toUserId", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "fromUserId", void 0);
__decorate([
    class_validator_1.IsEnum(relation_type_enum_1.RelationType),
    __metadata("design:type", String)
], CreateRequestDto.prototype, "type", void 0);
exports.CreateRequestDto = CreateRequestDto;
//# sourceMappingURL=create-request.dto.js.map