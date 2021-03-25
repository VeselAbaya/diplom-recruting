import { IPagination } from '@monorepo/types/pagination/pagination.interface';

export class PaginationDto<T> implements IPagination<T> {
  constructor(public items: T[],
              public limit: number,
              public page: number,
              public total: number) {
  }
}
