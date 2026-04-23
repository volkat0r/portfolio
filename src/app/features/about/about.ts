import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { Dialog } from '../../shared/ui/dialog/dialog';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * About section component.
 *
 * Displays a short personal introduction, a dialog with extended
 * information, and a call-to-action button that scrolls the user
 * to the contact section.
 */
@Component({
  selector: 'app-about',
  imports: [ContentBox, ButtonComponent, Dialog, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(private scrollService: ScrollService) {}

  /**
   * Scrolls the page to the section with the given element id.
   * @param id - The id attribute of the target section element.
   */
  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
