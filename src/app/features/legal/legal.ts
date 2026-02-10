import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-legal',
  imports: [Header, Footer],
  templateUrl: './legal.html',
  styleUrl: `legal.scss`,
})
export class Legal {}
