import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AVATAR_EXT, DEFAULT_AVATAR_URL } from '@monorepo/constants';

export interface IProfileInfoChangeEvent {
  hourlyRate: number | null;
  name: string;
  email: string;
}

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileInfoComponent {
  @ViewChild('cropperDialog', { static: true }) readonly cropperDialogRef: TemplateRef<unknown> | null = null;

  @Input() avatarSrc = DEFAULT_AVATAR_URL;
  @Input() hourlyRate: number | null = null;
  @Input() name: string | null = null;
  @Input() email: string | null = null;
  @Output() readonly avatarChange = new EventEmitter<Blob>();
  @Output() readonly infoChange = new EventEmitter<IProfileInfoChangeEvent>();
  _uploadedAvatarDataUrl: string | null = null;

  _editable = false;
  @Input() set editable(val: string | boolean) {
    this._editable = typeof val === 'string' ? true : val;
  }

  constructor(private readonly snackbar: MatSnackBar, private readonly dialog: MatDialog) {
  }

  onChange(prop: 'name' | 'email', event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (inputEl.value && inputEl.checkValidity()) {
      // @ts-ignore
      this[prop] = inputEl.value;
      this.infoChange.emit({
        hourlyRate: this.hourlyRate,
        name: (this.name as string).trim(),
        email: (this.email as string).trim()
      });
    } else {
      this.snackbar.open(
        prop === 'name'
          ? 'You should write first name at least'
          : (inputEl.value ? 'Invalid email' : 'Email is required'),
        'Close', { panelClass: 'warn' }
      );
      inputEl.value = (this[prop] ?? '').toString();
    }
  }

  onRateChange(newRate: number | null): void {
    this.hourlyRate = newRate;
    this.infoChange.emit({
      hourlyRate: this.hourlyRate,
      name: (this.name as string).trim(),
      email: (this.email as string).trim()
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

  onAvatarCrop(croppedCanvas: HTMLCanvasElement): void {
    croppedCanvas.toBlob(blob => {
      if (!blob) {
        this.snackbar.open('Something went wrong', 'Close');
        return;
      }
      this.avatarChange.emit(blob);
    }, `image/${AVATAR_EXT}`, .75);
    this.avatarSrc = croppedCanvas.toDataURL(`image/${AVATAR_EXT}`);
  }
}
