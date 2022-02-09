import { HttpParams } from '@angular/common/http';
import { isEmpty, isNil } from 'ramda';

export const getParamsWithoutNilsAndEmptyStringsOrArrays = (obj: object) =>
  Object.entries(obj).reduce((httpParams, [key, value]) =>
      isNil(value) || isEmpty(value)
        ? httpParams
        : httpParams.append(key, value),
    new HttpParams()
  );
