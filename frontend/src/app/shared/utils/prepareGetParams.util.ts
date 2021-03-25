import { HttpParams } from '@angular/common/http';
import { isNil } from 'ramda';

export const prepareGetParams = (obj: object) =>
  Object.entries(obj).reduce((httpParams, [key, value]) => {
    if (!isNil(value) && value !== '') {
      // @ts-ignore
      return httpParams.append(key, value);
    }
    return httpParams;
  }, new HttpParams());
