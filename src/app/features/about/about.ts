import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-about',
  imports: [ContentBox, ButtonComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
