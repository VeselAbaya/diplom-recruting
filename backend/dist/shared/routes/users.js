"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (routes) => {
    routes.users = () => 'users';
    routes.users.me = () => 'me';
    routes.users.avatar = () => 'avatar';
    routes.users.changePassword = () => 'me/password';
    routes.users.user = (id) => ':id';
};
exports.register = register;
//# sourceMappingURL=users.js.map