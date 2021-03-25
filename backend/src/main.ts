import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Neo4jExceptionFilter } from '@db/neo4j/neo4j.exception-filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';

// tslint:disable-next-line:no-any
declare const module: any;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', '*']
  });
  app.useGlobalFilters(new Neo4jExceptionFilter());
  app.register(fastifyMultipart);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
