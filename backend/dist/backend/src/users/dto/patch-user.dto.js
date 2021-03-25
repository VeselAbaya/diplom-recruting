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
exports.PatchUserDto = void 0;
const patch_user_dto_interface_1 = require("../../../../shared/types/user/patch-user.dto.interface");
const search_params_dto_interface_1 = require("../../../../shared/types/search/search-params.dto.interface");
const class_validator_1 = require("class-validator");
class PatchUserDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail({ require_tld: false }),
    __metadata("design:type", String)
], PatchUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlpha(),
    __metadata("design:type", String)
], PatchUserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsAlpha(),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.NotContains('-'),
    class_validator_1.NotContains('.'),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "about", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.WorkSchedule),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "workSchedule", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.WorkType),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "workType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(-1),
    class_validator_1.Max(10),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "experience", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.EnglishLevel),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "english", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], PatchUserDto.prototype, "keywords", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], PatchUserDto.prototype, "hourlyRate", void 0);
exports.PatchUserDto = PatchUserDto;
//# sourceMappingURL=patch-user.dto.js.map