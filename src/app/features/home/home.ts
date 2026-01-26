import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
