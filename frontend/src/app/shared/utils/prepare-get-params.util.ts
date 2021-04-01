import { HttpParams } from '@angular/common/http';
import { isNil } from 'ramda';

export const prepareGetParams = (obj: object) =>
  Object.entries(obj).reduce((httpParams, [key, value]) => {
    if (isNil(value) ||
        value === '' ||
        Array.isArray(value) && !value.length) {
      return httpParams;
    }
    // @ts-ignore
    return httpParams.append(key, value);
  }, new HttpParams());
