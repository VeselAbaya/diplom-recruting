"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const config = require("config");
const neo4j_config_interface_1 = require("./db/neo4j/neo4j-config.interface");
class Config {
    static get DB() {
        return config.get('db');
    }
    static get JWT() {
        return config.get('jwt');
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map