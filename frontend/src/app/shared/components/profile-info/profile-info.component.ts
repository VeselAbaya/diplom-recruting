import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { DEFAULT_AVATAR_SRC } from '@shared/components/avatar/avatar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

export interface IProfileInfoChangeEvent {
  rate: number | null;
  name: string | null;
  email: string | null;
}

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoComponent {
  @ViewChild('cropperDialog', {static: true}) readonly cropperDialogRef: TemplateRef<unknown> | null = null;

  @Input() avatarSrc = DEFAULT_AVATAR_SRC;
  @Input() rate: number | null = null;
  @Input() name: string | null = null;
  @Input() email: string | null = null;
  @Output() readonly avatarChange = new EventEmitter<Blob>();
  @Output() readonly infoChange = new EventEmitter<IProfileInfoChangeEvent>();
  _uploadedAvatarDataUrl: string | null = null;

  _editable = false;
  @Input() set editable(val: string | boolean) {
    this._editable = typeof val === 'string' ? true : val;
  }

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {}

  onChange(prop: 'name' | 'email', event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.value && inputEl.checkValidity()) {
      // @ts-ignore
      this[prop] = inputEl.value;
      this.infoChange.emit({
        rate: this.rate,
        name: this.name,
        email: this.email
      });
    } else {
      inputEl.value = (this[prop] ?? '').toString();
    }
  }

  onRateChange(newRate: number | null): void {
    this.rate = newRate;
    this.infoChange.emit({
      rate: this.rate,
      name: this.name,
      email: this.email
    });
  }

  onAvatarFileOpen(file: File | undefined): void {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (!this.cropperDialogRef) {
          this.snackbar.open('Something went wrong', 'Close');
          return;
        }

        this.dialog.open(this.cropperDialogRef);
        this._uploadedAvatarDataUrl = reader.result as string;
      };
      reader.onerror = () => this.snackbar.open('Something went wrong while processing the file', 'Close');
    }
  }

  onAvatarCrop(cropper: Cropper): void {
    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob(blob => {
      if (!blob) {
        this.snackbar.open('Something went wrong', 'Close');
        return;
      }
      this.avatarChange.emit(blob);
    }, 'image/jpeg');
    this.avatarSrc = canvas.toDataURL('image/jpeg');
  }
}
