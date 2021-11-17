import { InjectionToken } from '@angular/core';

export const APP_PORT = new InjectionToken<string | number>('Port on which application is started up');
