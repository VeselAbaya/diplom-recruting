import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRelationRequestUserDto } from '@monorepo/types/relations/relation-request-user.dto.interface';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { RelationsFacade } from '@shared/components/relations/relations.facade';

export interface IRelationsListDialogData {
  fromUser: IRelationRequestUserDto;
  toUser: IRelationRequestUserDto;
  relations: IRelationshipDto[];
  selectedRelation?: IRelationshipDto;
}

@Component({
  selector: 'app-relations-list-dialog',
  templateUrl: './relations-list-dialog.component.html',
  styleUrls: ['./relations-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsListDialogComponent {
  selectedRelation: IRelationshipDto | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IRelationsListDialogData,
              public readonly dialogRef: MatDialogRef<RelationsListDialogComponent>,
              private readonly facade: RelationsFacade) {
    dialogRef.addPanelClass('pn-dialog-overflow-visible');
    if (data.selectedRelation) {
      this.selectedRelation = data.selectedRelation;
      this.facade.select(this.selectedRelation);
    }
  }
}
