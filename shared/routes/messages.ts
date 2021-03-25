import { Base } from './index';

export interface Messages {
  (fromUser?: string, toUser?: string): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.messages = (fromUser?: string, toUser?: string) => 'messages/:fromUser/:toUser';
};
