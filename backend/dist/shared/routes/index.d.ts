import { Auth } from './auth';
import { Users } from './users';
import { RelationRequests } from './relation-requests';
import { Messages } from './messages';
export interface Base {
    auth: Auth;
    users: Users;
    relationRequests: RelationRequests;
    messages: Messages;
    (): string;
}
export declare const routes: Base;
export declare const Path: Base;
export declare const SubPath: Base;
