import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { isNil } from 'ramda';

function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return !isNil(input);
}

function inputIsNotNullOrUndefinedArray<T>(input: (null | undefined | T)[]): input is T[] {
  return input.every(inputIsNotNullOrUndefined);
}

export const isNotNullOrUndefined = <T>() => (source$: Observable<null | undefined | T>) =>
  source$.pipe(
    filter(inputIsNotNullOrUndefined)
  );

export const isNotNullOrUndefinedArray = <T>() => (source$: Observable<(null | undefined | T)[]>) =>
  source$.pipe(
    filter(inputIsNotNullOrUndefinedArray)
  );
