import { Pipe, PipeTransform } from '@angular/core';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(obj: Pick<IUserDto, 'firstName' | 'lastName'> | null): string {
    return obj ? `${obj.firstName} ${obj.lastName ?? ''}`.trim() : '';
  }
}
