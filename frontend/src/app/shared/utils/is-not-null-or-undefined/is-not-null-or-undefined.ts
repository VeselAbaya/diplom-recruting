import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNil } from 'ramda';

type NilOr<T> = null | undefined | T;

function inputIsNotNullOrUndefined<T>(input: NilOr<T> | NilOr<T>[]): input is T {
  return Array.isArray(input)
    ? input.every(inputIsNotNullOrUndefined)
    : !isNil(input);
}

export const isNotNullOrUndefined = <T>() => (source$: Observable<NilOr<T> | NilOr<T>[]>) =>
  source$.pipe(
    filter(inputIsNotNullOrUndefined)
  );
