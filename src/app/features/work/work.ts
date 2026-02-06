import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-work',
  imports: [ContentBox, ButtonComponent, TranslatePipe],
  templateUrl: './work.html',
  styleUrl: `./work.scss`,
})
export class Work {}
