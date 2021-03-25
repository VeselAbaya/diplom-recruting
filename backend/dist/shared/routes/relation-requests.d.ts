import { Base } from './index';
export interface RelationRequests {
    request: (requestId?: string) => string;
    decline: (requestId?: string) => string;
    accept: (requestId?: string) => string;
    reopen: (requestId?: string) => string;
    (): string;
}
export declare const register: (routes: Base) => void;
