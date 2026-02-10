import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-testimonial',
  imports: [ContentBox, TranslatePipe],
  templateUrl: './testimonial.html',
  styleUrl: `./testimonial.scss`,
})
export class Testimonial {}
