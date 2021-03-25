import { Base } from './index';

export interface Users {
  changePassword: () => string;
  me: () => string;
  avatar: () => string;
  user: (id?: string) => string;
  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.users = () => 'users';
  routes.users.me = () => 'me';
  routes.users.avatar = () => 'avatar';
  routes.users.changePassword = () => 'me/password';
  routes.users.user = (id?: string) => ':id';
};
