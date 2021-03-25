"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestEntity = void 0;
const relation_request_dto_interface_1 = require("../../../../../shared/types/relations/relation-request.dto.interface");
const relation_type_enum_1 = require("../../../../../shared/types/relations/relation-type.enum");
const utils_1 = require("../../../shared/utils");
class RequestEntity {
    constructor(requestProps) {
        this.endAt = null;
        for (const [key, val] of Object.entries(requestProps)) {
            this[key] = val;
        }
    }
    static dummy() {
        return {
            comment: '',
            declined: false,
            description: '',
            endAt: null
        };
    }
}
exports.RequestEntity = RequestEntity;
//# sourceMappingURL=request.entity.js.map