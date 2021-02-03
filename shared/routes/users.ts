import { Base } from './index';

export interface Users {
  me: () => string;
  changePassword: () => string;
  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.users = () => 'users';
  routes.users.me = () => 'me';
  routes.users.changePassword = () => 'me/password';
};
