import {
  getParamsWithoutNilsAndEmptyStringsOrArrays
} from '@shared/utils/get-params-without-nils-and-empty-strings-or-arrays/get-params-without-nils-and-empty-strings-or-arrays.util';

describe('getParamsWithoutNilsAndEmptyStringsOrArrays Util', () => {
  it('should filter all nils and empty string or arrays', () => {
    const obj = {
      param1: 'param1',
      param2: 2,
      arrayOfNils: [null, undefined],
      nullParam: null,
      undefinedParam: undefined,
      emptyString: '',
      emptyArray: []
    };

    const keys = getParamsWithoutNilsAndEmptyStringsOrArrays(obj).keys();
    expect(keys).toContain('param1');
    expect(keys).toContain('param2');
    expect(keys).toContain('arrayOfNils');
    expect(keys).not.toContain('nullParam');
    expect(keys).not.toContain('undefinedParam');
    expect(keys).not.toContain('emptyString');
    expect(keys).not.toContain('emptyArray');
  });
});
