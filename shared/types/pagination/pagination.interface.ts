export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IPagination<T> extends IPaginationMeta {
  items: T[];
}
