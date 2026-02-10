import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-work',
  imports: [ContentBox, ButtonComponent, TranslatePipe],
  templateUrl: './work.html',
  styleUrl: `./work.scss`,
})
export class Work {
  current_slide_index: number = 0;
  readonly total_slides: number = 3;

  btnNext() {
    if (this.current_slide_index < this.total_slides - 1) {
      this.current_slide_index++;
    } else {
      this.current_slide_index = 0;
    }
  }
  btnPrev() {
    if (this.current_slide_index > 0) {
      this.current_slide_index--;
    } else {
      this.current_slide_index = this.total_slides - 1;
    }
  }
}
