import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.sass'],
    standalone: true,
    imports: [
      MatDialogContent,
      MatDialogActions,
      MatDialogTitle,
      MatButtonModule
    ]
})
export class AlertDialogComponent {
  dialogRef = inject<MatDialogRef<AlertDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  title: string;
  message: string;

  constructor() {
    const data = this.data;

    this.title = data.title;
    this.message = data.message;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
