import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Neo4jExceptionFilter } from '@db/neo4j/neo4j.exception-filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyMultipart from 'fastify-multipart';
import fastifyCookie from 'fastify-cookie';
import fastifyCsrf from 'fastify-csrf';

// tslint:disable-next-line:no-any
declare const module: any;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://www.pn-graph.com', 'https://pn-graph.com'],
    methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', '*'],
    credentials: true
  });
  app.useGlobalFilters(new Neo4jExceptionFilter());

  await app.register(fastifyCookie);
  // TODO figure out why csrf-token cookie not setting by fastifyCsrf
  await app.register(fastifyCsrf, {
    cookieKey: 'XSRF-TOKEN',
    cookieOpts: {
      sameSite: 'none',
      secure: true,
      path: '/',
      domain: '.pn-graph.com'
    },
  });
  await app.register(fastifyMultipart);

  await app.listen(3000, '0.0.0.0');
  console.log('Server listen on port 3000');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
