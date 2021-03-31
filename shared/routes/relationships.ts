import { Base } from './index';

export interface Relationships {
  ofUsers: (fromUser?: string, toUser?: string) => string;
  graph: () => string;

  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.relationships = () => 'relationships';
  routes.relationships.ofUsers = (fromUser?: string, toUser?: string) => ':fromUser/:toUser';
  routes.relationships.graph = () => 'graph';
};
