import { cold } from 'jasmine-marbles';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined/is-not-null-or-undefined';

describe('isNotNullOrUndefined Util', () => {
  it('should filter every nil values', () => {
    const values = {
      z: 0,         // [z]ero
      n: null,      // [n]ull
      u: undefined, // [u]ndefined
      s: '',        // [s]tring
      a: []         // [a]rray
    };
    const source = cold('z-n-s-u-n-a|', values);

    const filteredSource = source.pipe(isNotNullOrUndefined());

    expect(filteredSource).toBeObservable(cold('z---s-----a|', values));
  });

  it('should filter array with every nil values', () => {
    const values = {
      a: [null, undefined],
      b: [],
      c: [1, 2, 'str']
    };
    const source = cold('a-b-c|', values);

    const filteredSource = source.pipe(isNotNullOrUndefined());

    expect(filteredSource).toBeObservable(cold('--b-c|', values));
  });
});
