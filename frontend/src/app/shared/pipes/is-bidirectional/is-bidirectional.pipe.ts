import { Pipe, PipeTransform } from '@angular/core';
import { isBidirectional, RelationType } from '@monorepo/types/relations/relation-type.enum';

@Pipe({
  name: 'isBidirectional'
})
export class IsBidirectionalPipe implements PipeTransform {
  transform(type: RelationType): boolean {
    return isBidirectional(type);
  }
}
