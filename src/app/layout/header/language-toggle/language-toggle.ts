import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  @Input() theme = 'theme-dark';
}
