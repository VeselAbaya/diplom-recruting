import { Base } from './index';

export interface Auth {
  login: () => string;
  logout: () => string;
  refresh: () => string;

  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.auth = () => 'auth';
  routes.auth.login = () => 'login';
  routes.auth.logout = () => 'logout';
  routes.auth.refresh = () => 'refresh';
};
