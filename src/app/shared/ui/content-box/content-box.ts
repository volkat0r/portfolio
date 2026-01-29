import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-content-box',
  templateUrl: './content-box.html',
  styleUrl: './content-box.scss',
})
export class ContentBox {
  @Input() variant: 'black' | 'blue' | 'testimonial' | 'work' = 'black';
}
