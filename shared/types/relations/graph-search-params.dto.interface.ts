import { ISearchParamsDto } from '../search/search-params.dto.interface';

export interface IGraphSearchParamsDto extends ISearchParamsDto {
  fromUserId: string;
}
