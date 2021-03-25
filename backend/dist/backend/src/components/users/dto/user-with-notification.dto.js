"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithNotificationDto = void 0;
const user_entity_1 = require("../user/user.entity");
const with_notification_interface_1 = require("../../../../../shared/types/with-notification.interface");
const utils_1 = require("../../../shared/utils");
class UserWithNotificationDto extends user_entity_1.UserEntity {
    constructor(userProps, notifications) {
        super(userProps);
        this.notifications = notifications;
    }
}
exports.UserWithNotificationDto = UserWithNotificationDto;
//# sourceMappingURL=user-with-notification.dto.js.map