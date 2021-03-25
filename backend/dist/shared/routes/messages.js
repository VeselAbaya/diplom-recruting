"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (routes) => {
    routes.messages = (fromUser, toUser) => 'messages/:fromUser/:toUser';
};
exports.register = register;
//# sourceMappingURL=messages.js.map