import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { Dialog } from '../../shared/ui/dialog/dialog';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Tech section component.
 *
 * Displays the developer's technology stack as a visual grid.
 * A dialog provides additional context for skills not listed
 * and communicates openness to learning new technologies.
 */
@Component({
  selector: 'app-tech',
  imports: [ContentBox, Dialog, TranslatePipe],
  templateUrl: './tech.html',
  styleUrl: './tech.scss',
})
export class Tech {}
