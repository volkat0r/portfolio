import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactLinks } from './contact-links/contact-links';
import { LanguageToggle } from './language-toggle/language-toggle';
import { MainNav } from './main-nav/main-nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ContactLinks, LanguageToggle, MainNav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit {
  @HostBinding('class') activeTheme = 'theme-dark';

  ngAfterViewInit() {
    const sections = document.querySelectorAll<HTMLElement>('section[data-theme]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = (entry.target as HTMLElement).dataset['theme'];
            if (theme) {
              document.body.classList.remove('theme-light', 'theme-dark');
              document.body.classList.add(`theme-${theme}`);

              this.activeTheme = `theme-${theme}`;
            }
          }
        });
      },
      { threshold: 0.7 },
    );

    sections.forEach((section) => observer.observe(section));
  }
}
