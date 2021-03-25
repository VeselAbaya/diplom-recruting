"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubPath = exports.Path = exports.routes = void 0;
const auth_1 = require("./auth");
const users_1 = require("./users");
const relation_requests_1 = require("./relation-requests");
const messages_1 = require("./messages");
const routes = () => 'api';
exports.routes = routes;
auth_1.register(exports.routes);
users_1.register(exports.routes);
relation_requests_1.register(exports.routes);
messages_1.register(exports.routes);
const applyProxy = (fn, prefix = undefined) => new Proxy(fn, {
    get(target, prop) {
        return applyProxy(target[prop], prefix ? `${prefix}/${target()}` : target());
    },
    apply(propTarget, self, args) {
        if (prefix) {
            let path = `${prefix}/${propTarget()}`;
            for (const value of args) {
                path = path.replace(/:\w+/i, value);
            }
            return path;
        }
        else {
            return propTarget();
        }
    }
});
exports.Path = applyProxy(exports.routes);
exports.SubPath = exports.routes;
//# sourceMappingURL=index.js.map