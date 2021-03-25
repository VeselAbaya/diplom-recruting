import { Base } from './index';

export interface RelationRequests {
  request: (requestId?: string) => string;
  decline: (requestId?: string) => string;
  accept: (requestId?: string) => string;
  reopen: (requestId?: string) => string;

  (): string;
}

export const register = (routes: Base) => {
  // @ts-ignore
  routes.relationRequests = () => 'relation-requests';
  routes.relationRequests.request = (requestId?: string) => ':id';
  routes.relationRequests.decline = (requestId?: string) => 'decline/:id';
  routes.relationRequests.accept = (requestId?: string) => 'accept/:id';
  routes.relationRequests.reopen = (requestId?: string) => 'reopen/:id';
};
