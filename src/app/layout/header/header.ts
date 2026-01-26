import { ContactLinks } from './contact-links/contact-links';
import { Component } from '@angular/core';
import { LanguageToggle } from './language-toggle/language-toggle';
import { MainNav } from './main-nav/main-nav';

@Component({
  selector: 'app-header',
  imports: [ContactLinks, LanguageToggle, MainNav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
