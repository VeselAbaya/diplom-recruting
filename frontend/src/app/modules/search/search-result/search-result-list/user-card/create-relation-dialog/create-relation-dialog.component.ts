import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RequestsService } from '@modules/requests/requests.service';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsService } from '@core/services/errors.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

@Component({
  selector: 'app-create-relation-dialog',
  templateUrl: './create-relation-dialog.component.html',
  styleUrls: ['./create-relation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRelationDialogComponent {
  constructor(private readonly requests: RequestsService,
              private readonly snackbar: MatSnackBar,
              private readonly errors: ErrorsService,
              private readonly dialog: MatDialogRef<CreateRelationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public readonly data: {fromUser: IUserDto, toUser: IUserDto}) {}

  onSubmit(createRelationDto: ICreateRelationDto): void {
    this.requests.createRelationRequest(createRelationDto).subscribe({
      next: () => {
        this.snackbar.open('Relations request has been sent', 'Close', {panelClass: 'primary'});
        this.dialog.close();
      },
      error: this.errors.handle
    });
  }
}
