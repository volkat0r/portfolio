import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-about',
  imports: [ContentBox, ButtonComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
