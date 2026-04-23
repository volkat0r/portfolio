import { Component, Input, ViewChild, ElementRef } from '@angular/core';

/**
 * Native HTML dialog wrapper component.
 *
 * Wraps the browser's `<dialog>` element and exposes two display
 * modes:
 * - **Modal** (`openDialog`) – blocks interaction with the rest of
 *   the page and can be closed by clicking outside the dialog rect.
 * - **Non-modal preview** (`openPreview` / `closePreview`) – shows
 *   the dialog without blocking the page, used for hover-based
 *   preview interactions.
 *
 * Clicking outside the dialog boundary (detected via bounding-rect
 * comparison) automatically closes it.
 */
@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
})
export class Dialog {
  /** Visual colour variant of the dialog. Defaults to `'blue'`. */
  @Input() variant: 'blue' | 'yellow' = 'blue';

  /** Reference to the native `<dialog>` element in the template. */
  @ViewChild('dialogElement') nativeDialog!: ElementRef<HTMLDialogElement>;

  /** Tracks whether the non-modal preview is currently open. */
  private isPreviewOpen = false;

  dialog = document.getElementById('dialog');
  closeBtn = document.getElementById('close');

  /**
   * Opens the dialog as a modal.
   * If a preview is currently open it is closed first.
   */
  openDialog() {
    if (this.isPreviewOpen && this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.close();
      this.isPreviewOpen = false;
    }

    if (!this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.showModal();
    }
  }

  /** Opens the dialog in non-modal (preview) mode. */
  openPreview() {
    if (!this.nativeDialog.nativeElement.open) {
      this.nativeDialog.nativeElement.show();
      this.isPreviewOpen = true;
    }
  }

  /** Closes the dialog if it is currently open in preview mode. */
  closePreview() {
    if (this.isPreviewOpen) {
      this.closeDialog();
    }
  }

  /**
   * Closes the dialog when the user clicks outside its bounding rectangle.
   * @param event - The mouse click event used to determine click coordinates.
   */
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

  /** Closes the dialog and resets the preview state after the current microtask. */
  closeDialog() {
    this.isPreviewOpen = false;
    setTimeout(() => {
      if (this.nativeDialog.nativeElement.open) {
        this.nativeDialog.nativeElement.close();
      }
    });
  }
}
