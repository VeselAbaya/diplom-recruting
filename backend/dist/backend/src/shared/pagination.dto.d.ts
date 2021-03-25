import { IPagination } from '@monorepo/types/pagination/pagination.interface';
export declare class PaginationDto<T> implements IPagination<T> {
    items: T[];
    limit: number;
    page: number;
    total: number;
    constructor(items: T[], limit: number, page: number, total: number);
}
