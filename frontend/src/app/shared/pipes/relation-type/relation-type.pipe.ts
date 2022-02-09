import { Pipe, PipeTransform } from '@angular/core';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';

@Pipe({
  name: 'relationType'
})
export class RelationTypePipe implements PipeTransform {
  private readonly relationTypeMap = {
    [RelationType.WorksWith]: 'Works with',
    [RelationType.StudiedWith]: 'Studied with',
    [RelationType.Teammates]: 'Teammates',
    [RelationType.Supervised]: 'Supervised',
    [RelationType.SubordinateTo]: 'Subordinate to'
  };

  transform(type: RelationType): string {
    return this.relationTypeMap[type];
  }
}
