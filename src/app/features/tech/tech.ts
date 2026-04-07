import { Component } from '@angular/core';
import { ContentBox } from '../../shared/ui/content-box/content-box';
import { Dialog } from '../../shared/ui/dialog/dialog';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tech',
  imports: [ContentBox, Dialog, TranslatePipe],
  templateUrl: './tech.html',
  styleUrl: './tech.scss',
})
export class Tech {}
