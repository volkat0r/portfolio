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

  dialog = document.getElementById('dialog');
  closeBtn = document.getElementById('close');

  openDialog() {
    this.nativeDialog.nativeElement.showModal();
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
    setTimeout(() => {
      this.nativeDialog.nativeElement.close();
    });
  }
}
