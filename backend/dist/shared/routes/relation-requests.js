"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = (routes) => {
    routes.relationRequests = () => 'relation-requests';
    routes.relationRequests.request = (requestId) => ':id';
    routes.relationRequests.decline = (requestId) => 'decline/:id';
    routes.relationRequests.accept = (requestId) => 'accept/:id';
    routes.relationRequests.reopen = (requestId) => 'reopen/:id';
};
exports.register = register;
//# sourceMappingURL=relation-requests.js.map