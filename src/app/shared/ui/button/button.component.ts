import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable button / link component.
 *
 * Renders either a `<button>` or an `<a>` element depending on
 * whether an `href` is supplied. Supports three visual variants
 * (`primary`, `secondary`, `ghost`) and full link-target control.
 */
@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Visual style variant of the button. Defaults to `'primary'`. */
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  /** HTML button type attribute. Only relevant when rendered as `<button>`. */
  @Input() type: 'button' | 'submit' = 'button';

  /** When set, the component renders as an `<a>` element pointing to this URL. */
  @Input() href?: string;

  /** Link target attribute. Defaults to `'_self'`. */
  @Input() target: '_self' | '_blank' = '_self';
}
