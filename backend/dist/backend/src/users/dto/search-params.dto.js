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
exports.SearchParamsDto = void 0;
const search_params_dto_interface_1 = require("../../../../shared/types/search/search-params.dto.interface");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const limits_1 = require("../../../../shared/types/pagination/limits");
class SearchParamsDto {
    constructor() {
        this.page = 0;
        this.limit = limits_1.LIMITS[0];
    }
}
__decorate([
    class_transformer_1.Transform(({ value }) => parseInt(value, 10)),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], SearchParamsDto.prototype, "page", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => parseInt(value, 10)),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Object)
], SearchParamsDto.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SearchParamsDto.prototype, "search", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SearchParamsDto.prototype, "hourlyRateMin", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => value === 'null' ? null : parseInt(value, 10)),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    __metadata("design:type", Number)
], SearchParamsDto.prototype, "hourlyRateMax", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([1, 2, 3, 4, 5]),
    __metadata("design:type", Number)
], SearchParamsDto.prototype, "networkSize", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    __metadata("design:type", Number)
], SearchParamsDto.prototype, "experience", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.EnglishLevel),
    __metadata("design:type", Number)
], SearchParamsDto.prototype, "english", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.WorkSchedule),
    __metadata("design:type", String)
], SearchParamsDto.prototype, "workSchedule", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEnum(search_params_dto_interface_1.WorkType),
    __metadata("design:type", String)
], SearchParamsDto.prototype, "workType", void 0);
exports.SearchParamsDto = SearchParamsDto;
//# sourceMappingURL=search-params.dto.js.map