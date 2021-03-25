"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListItemDto = void 0;
const user_entity_1 = require("../user/user.entity");
const with_notification_interface_1 = require("../../../../../shared/types/with-notification.interface");
const utils_1 = require("../../../shared/utils");
class UserListItemDto extends user_entity_1.UserEntity {
    constructor(userProps, notifications, relationsCount) {
        super(userProps);
        this.notifications = notifications;
        this.relationsCount = relationsCount;
    }
}
exports.UserListItemDto = UserListItemDto;
//# sourceMappingURL=user-list-item.dto.js.map