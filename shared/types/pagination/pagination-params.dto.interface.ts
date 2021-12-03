import {IPaginationMeta} from './pagination.interface';

export type IPaginationParamsDto = Partial<Pick<IPaginationMeta, 'limit' | 'page'>>
