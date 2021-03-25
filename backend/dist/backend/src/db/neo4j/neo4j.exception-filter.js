"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neo4jExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const neo4j_driver_1 = require("neo4j-driver");
const auth_exceptions_1 = require("../../components/auth/auth.exceptions");
let Neo4jExceptionFilter = class Neo4jExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = 500;
        let error = 'database-error';
        let message = ['Something went wrong'];
        if (exception.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
            if (exception.message.includes('already exists with')) {
                throw auth_exceptions_1.AuthException.emailAlreadyExists();
            }
            else if (exception.message.includes('must have the property')) {
                statusCode = 400;
                error = 'Bad Request';
                const match = exception.message.match(/`([a-z0-9]+)`/gi);
                if (!match || !match[1]) {
                    message = ['Database constraint validation failed'];
                }
                else {
                    message = [`${match[1].replace(/`/g, '')} should not be empty`];
                }
            }
        }
        else {
            console.error(exception);
        }
        response.status(statusCode).json({
            statusCode,
            message,
            error,
        });
    }
};
Neo4jExceptionFilter = __decorate([
    common_1.Catch(neo4j_driver_1.Neo4jError)
], Neo4jExceptionFilter);
exports.Neo4jExceptionFilter = Neo4jExceptionFilter;
//# sourceMappingURL=neo4j.exception-filter.js.map