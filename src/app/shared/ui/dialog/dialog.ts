import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  @Input() variant: 'blue' | 'yellow' = 'blue';
  @ViewChild('dialogElement') nativeDialog!: ElementRef<HTMLDialogElement>;
  private isPreviewOpen = false;

  dialog = document.getElementById('dialog');
  closeBtn = document.getElementById('close');

  openDialog() {
    if (this.isPreviewOpen && this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.close();
      this.isPreviewOpen = false;
    }

    if (!this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.showModal();
    }
  }

  openPreview() {
    if (!this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.show();
      this.isPreviewOpen = true;
    }
  }

  closePreview() {
    if (this.isPreviewOpen) {
      this.closeDialog();
    }
  }

  onDialogClick(event: MouseEvent) {
    const rect = this.nativeDialog.nativeElement.getBoundingClientRect();

    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      this.closeDialog();
    }
  }

  closeDialog() {
    this.isPreviewOpen = false;
    setTimeout(() => {
      if (this.nativeDialog.nativeElement.open) {
        this.nativeDialog.nativeElement.close();
      }
    });
  }
}
