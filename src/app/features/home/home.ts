import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { About } from '../about/about';
import { Tech } from '../tech/tech';
import { Work } from '../work/work';
import { Testimonial } from '../testimonial/testimonial';
import { Contact } from '../contact/contact';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, About, Tech, Work, Testimonial, Contact, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private scrollService: ScrollService) {}

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
