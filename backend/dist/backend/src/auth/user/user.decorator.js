"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((userEntityField, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return userEntityField ? req.user[userEntityField] : req.user;
});
//# sourceMappingURL=user.decorator.js.map