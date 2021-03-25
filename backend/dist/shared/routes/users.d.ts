import { Base } from './index';
export interface Users {
    changePassword: () => string;
    me: () => string;
    avatar: () => string;
    user: (id?: string) => string;
    (): string;
}
export declare const register: (routes: Base) => void;
