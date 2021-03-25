import { Base } from './index';

export interface Auth {
  signin: () => string;
  signup: () => string;
  logout: () => string;
  refresh: () => string;

  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.auth = () => 'auth';
  routes.auth.signin = () => 'signin';
  routes.auth.signup = () => 'signup';
  routes.auth.logout = () => 'logout';
  routes.auth.refresh = () => 'refresh';
};
