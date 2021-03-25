"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_request_dto_1 = require("./create-request.dto");
const update_relation_request_dto_interface_1 = require("../../../../../shared/types/relations/update-relation-request.dto.interface");
class UpdateRequestDto extends mapped_types_1.PartialType(create_request_dto_1.CreateRequestDto) {
}
exports.UpdateRequestDto = UpdateRequestDto;
//# sourceMappingURL=update-request.dto.js.map