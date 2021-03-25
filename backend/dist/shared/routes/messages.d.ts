import { Base } from './index';
export interface Messages {
    (fromUser?: string, toUser?: string): string;
}
export declare const register: (routes: Base) => void;
