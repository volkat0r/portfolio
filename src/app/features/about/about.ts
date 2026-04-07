import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ScrollService } from '../../shared/services/scroll.service';
import { Dialog } from '../../shared/ui/dialog/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [ContentBox, ButtonComponent, Dialog, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
