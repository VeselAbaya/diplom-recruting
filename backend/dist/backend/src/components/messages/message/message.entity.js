"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntity = void 0;
const message_dto_interface_1 = require("../../../../../shared/types/message/message.dto.interface");
const utils_1 = require("../../../shared/utils");
class MessageEntity {
    constructor(requestProps) {
        for (const [key, val] of Object.entries(requestProps)) {
            this[key] = val;
        }
    }
}
exports.MessageEntity = MessageEntity;
//# sourceMappingURL=message.entity.js.map