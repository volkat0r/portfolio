import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-legal',
  imports: [Header, Footer, TranslatePipe],
  templateUrl: './legal.html',
  styleUrl: `legal.scss`,
})
export class Legal {}
