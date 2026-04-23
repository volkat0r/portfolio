import { Component, Input } from '@angular/core';

/**
 * Content box UI component.
 *
 * A generic styled container used across multiple sections.
 * The `variant` input selects the visual style (background colour,
 * border treatment, etc.) via a CSS class binding.
 */
@Component({
  selector: 'ui-content-box',
  templateUrl: './content-box.html',
  styleUrl: './content-box.scss',
})
export class ContentBox {
  /** Visual style variant. Defaults to `'black'`. */
  @Input() variant: 'black' | 'blue' | 'testimonial' | 'work' = 'black';
}
