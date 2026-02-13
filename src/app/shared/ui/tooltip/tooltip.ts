import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: `./tooltip.scss`,
})
export class Tooltip {
  @Input() variant: 'blue' | 'yellow' = 'blue';
}
