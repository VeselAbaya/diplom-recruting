export type ExcludeFunctions<T> = Pick<T, {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T]>;
