import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Work / Projects section component.
 *
 * Implements a simple carousel for portfolio projects.
 * Navigation is handled by {@link btnNext} and {@link btnPrev},
 * which update the active slide index used for CSS class binding.
 */
@Component({
  selector: 'app-work',
  imports: [ContentBox, ButtonComponent, TranslatePipe],
  templateUrl: './work.html',
  styleUrl: `./work.scss`,
})
export class Work {
  /** Zero-based index of the currently visible slide. */
  current_slide_index: number = 0;

  /** Total number of project slides. */
  readonly total_slides: number = 3;

  /** Advances to the next slide, wrapping back to the first when the end is reached. */
  btnNext() {
    if (this.current_slide_index < this.total_slides - 1) {
      this.current_slide_index++;
    } else {
      this.current_slide_index = 0;
    }
  }

  /** Goes back to the previous slide, wrapping to the last when the start is reached. */
  btnPrev() {
    if (this.current_slide_index > 0) {
      this.current_slide_index--;
    } else {
      this.current_slide_index = this.total_slides - 1;
    }
  }
}
