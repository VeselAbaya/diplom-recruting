"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipEntity = void 0;
const relationship_dto_interface_1 = require("../../../../../shared/types/relationships/relationship.dto.interface");
const relation_type_enum_1 = require("../../../../../shared/types/relations/relation-type.enum");
const utils_1 = require("../../../shared/utils");
class RelationshipEntity {
    constructor(requestProps) {
        for (const [key, val] of Object.entries(requestProps)) {
            this[key] = val;
        }
    }
}
exports.RelationshipEntity = RelationshipEntity;
//# sourceMappingURL=relationship.entity.js.map