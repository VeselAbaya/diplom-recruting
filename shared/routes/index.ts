import { Auth, register as registerAuth } from './auth';
import { Users, register as registerUsers } from './users';

export interface Base {
  auth: Auth;
  users: Users;
  (): string;
}

// @ts-ignore
export const routes: Base = () => 'api';
registerAuth(routes);
registerUsers(routes);

// @ts-ignore
const applyProxy = (fn, prefix = undefined) => new Proxy(fn, {
  get(target, prop): () => string {
    return applyProxy(target[prop], prefix ? `${prefix}/${target()}` : target());
  },

  apply(propTarget, self, args): string {
    if (prefix) {
      let path = `${prefix}/${propTarget()}`;
      for (const value of args) {
        path = path.replace(/:\w+/i, value);
      }
      return path;
    } else {
      return propTarget();
    }
  }
});

export const Path = applyProxy(routes) as Base;
export const SubPath = routes;
