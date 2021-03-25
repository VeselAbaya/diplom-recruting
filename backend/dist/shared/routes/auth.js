"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (routes) => {
    routes.auth = () => 'auth';
    routes.auth.signin = () => 'signin';
    routes.auth.signup = () => 'signup';
    routes.auth.logout = () => 'logout';
    routes.auth.refresh = () => 'refresh';
};
exports.register = register;
//# sourceMappingURL=auth.js.map