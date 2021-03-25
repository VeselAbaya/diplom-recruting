import { Base } from './index';
export interface Auth {
    signin: () => string;
    signup: () => string;
    logout: () => string;
    refresh: () => string;
    (): string;
}
export declare const register: (routes: Base) => void;
