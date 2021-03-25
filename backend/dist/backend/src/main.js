"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const neo4j_exception_filter_1 = require("./db/neo4j/neo4j.exception-filter");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const fastify_multipart_1 = require("fastify-multipart");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
        allowedHeaders: ['Authorization', '*']
    });
    app.useGlobalFilters(new neo4j_exception_filter_1.Neo4jExceptionFilter());
    app.register(fastify_multipart_1.default);
    await app.listen(3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map