import 'zone.js/dist/zone-node';
import '@ng-web-apis/universal/mocks';

import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { existsSync } from 'fs';
import { isNil } from 'ramda';

import cookieParser from 'cookie-parser';
import { ACCESS_TOKEN } from '@shared/tokens/access.token';

// @ts-ignore
import * as xhr2 from 'xhr2';
// To be able to send cookie from Angular HttpClient
xhr2.prototype._restrictedHeaders = {};

const port = isNil(process.env.PORT) ? 4200 : +process.env.PORT;

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/professional-network/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index.html';

  server.use(cookieParser());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    // If inlineCriticalCss: true
    // it adds to <link rel="stylesheet" href="dark.css" media="(prefers-color-scheme: dark)">
    //  attribute <link ... onload="this.media='(prefers-color-scheme: dark)'">
    // and it's breaking all scheme-related stuff
    inlineCriticalCss: false
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req: express.Request, res: express.Response) => {
    res.render(indexHtml, {
      req,
      providers: [
        { provide: ACCESS_TOKEN, useValue: req.cookies.access }
      ]
    });
  });

  return server;
}

function run(): void {
  // Start up the Node server
  const server = app();
  server.listen(port, '0.0.0.0', () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
