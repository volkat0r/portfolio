import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Testimonial section component.
 *
 * Renders peer references / colleague quotes that are sourced
 * from the i18n translation files, making them available in
 * both German and English.
 */
@Component({
  selector: 'app-testimonial',
  imports: [ContentBox, TranslatePipe],
  templateUrl: './testimonial.html',
  styleUrl: `./testimonial.scss`,
})
export class Testimonial {}
