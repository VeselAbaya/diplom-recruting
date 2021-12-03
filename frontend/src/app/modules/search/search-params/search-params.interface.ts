import { ISearchParamsDto } from '@monorepo/types/search/search-params.dto.interface';

export type ISearchParams = Omit<ISearchParamsDto, 'fromUserId'>;
