import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';

@Component({
  selector: 'app-testimonial',
  imports: [ContentBox],
  templateUrl: './testimonial.html',
  styleUrl: `./testimonial.scss`,
})
export class Testimonial {}
