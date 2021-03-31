import { SearchParamsDto } from '@components/users/dto/search-params.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GraphSearchParamsDto extends SearchParamsDto {
  @IsNotEmpty()
  @IsUUID()
  fromUserId!: string;
}
