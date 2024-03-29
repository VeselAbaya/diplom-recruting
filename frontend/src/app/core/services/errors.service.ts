import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IException } from '@monorepo/types/exception.interface';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  constructor(private readonly snackbar: MatSnackBar) {
    this.handle = this.handle.bind(this);
  }

  handle({ error: { message } }: { error: IException }): void {
    let snackMsg = 'Something went wrong';
    try {
      snackMsg = typeof message === 'string' ? message : message.join('\n');
    } finally {
      this.snackbar.open(snackMsg, 'Close', { panelClass: 'warn' });
    }
  }
}
