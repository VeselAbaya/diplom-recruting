import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRelationRequestUserDto } from '@monorepo/types/relations/relation-request-user.dto.interface';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { RelationsFacade } from '@shared/components/relations/relations.facade';
import { RelationsComponent } from '@shared/components/relations/relations.component';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, switchMap, take, tap } from 'rxjs/operators';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { FormControl, Validators } from '@angular/forms';
import { RelationsService } from '@modules/search/relations.service';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

export interface IRelationsListDialogData {
  fromUser: IRelationRequestUserDto;
  toUser: IRelationRequestUserDto;
  relations: IRelationshipDto[];
  selectedRelation?: IRelationshipDto;
  edit?: boolean;
}

@Component({
  selector: 'app-relations-list-dialog',
  templateUrl: './relations-list-dialog.component.html',
  styleUrls: ['./relations-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsListDialogComponent extends OnDestroyMixin implements OnInit, AfterViewInit {
  @ViewChild(RelationsComponent, {static: true}) relationsComponent!: RelationsComponent;
  isFormEqualsToInitial$: Observable<boolean> | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IRelationsListDialogData,
              public readonly dialogRef: MatDialogRef<RelationsListDialogComponent>,
              public readonly facade: RelationsFacade,
              private readonly relations: RelationsService) {
    super();
    this.dialogRef.addPanelClass('pn-dialog-overflow-visible');
    if (this.data.selectedRelation) {
      this.facade.select(this.data.selectedRelation);
    }

    this.dialogRef.afterClosed().subscribe(() => this.facade.select(null));
  }

  ngOnInit(): void {
    this.relationsComponent.form.get('comment')?.setValidators([Validators.required]);

    this.isFormEqualsToInitial$ = combineLatest([
      this.facade.selected$,
      this.relationsComponent.form.valueChanges.pipe(debounceTime(300))
    ]).pipe(
      map(([initialValue]) => {
        const currentValue = this.relationsComponent.form.getRawValue();
        return !!initialValue &&
          initialValue.description === currentValue.description &&
          initialValue.startAt === (currentValue.startAt instanceof Date ? currentValue.startAt.toISOString() : currentValue.startAt) &&
          (initialValue.endAt || null) === (currentValue.endAt instanceof Date ? currentValue.endAt.toISOString() : currentValue.endAt) &&
          initialValue.type === currentValue.type;
      })
    );
  }

  ngAfterViewInit(): void {
    this.relationsComponent.form.get('type')?.disable({emitEvent: false});
  }

  onSubmit(formValue: ICreateRelationDto): void {
    if (this.relationsComponent.form.invalid) {
      return;
    }

    this.facade.selected$.pipe(
      isNotNullOrUndefined(),
      take(1),
      switchMap(selected => this.relations.updateRelation(selected.id, formValue)),
      tap(updatedRelation => {
        this.facade.select(updatedRelation);
        const spliceIndex = this.data.relations.findIndex(rel => rel.id === updatedRelation.id);
        if (spliceIndex !== -1) {
          this.data.relations.splice(spliceIndex, 1, updatedRelation);
        }
      })
    ).subscribe();
  }
}
