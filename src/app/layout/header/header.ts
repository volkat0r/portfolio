import { Component, AfterViewInit, HostBinding, OnDestroy } from '@angular/core';
import { ContactLinks } from './contact-links/contact-links';
import { LanguageToggle } from './language-toggle/language-toggle';
import { MainNav } from './main-nav/main-nav';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactLinks, LanguageToggle, MainNav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit, OnDestroy {
  private onWindowScroll = () => this.updateTopState();

  constructor(private scrollService: ScrollService) {}

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  @HostBinding('class') activeTheme = 'theme-dark';

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    this.updateTopState();

    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const sectionId = target.id;
            const theme = target.dataset['theme'];
            this.updateSectionClass(sectionId);
            if (theme) {
              document.body.classList.remove('theme-light', 'theme-dark');
              document.body.classList.add(`theme-${theme}`);
              this.activeTheme = `theme-${theme}`;
            }
          }
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  private updateSectionClass(activeId: string) {
    const body = document.body;

    // Entfernt alle Klassen, die mit "is-viewing-" beginnen
    const classes = body.className.split(' ').filter((c) => !c.startsWith('sector-'));
    body.className = classes.join(' ').trim();

    // Fügt die neue spezifische Klasse hinzu
    body.classList.add(`sector-${activeId}`);
  }

  private updateTopState() {
    const body = document.body;

    if (window.scrollY <= 4) {
      body.classList.add('at-top');
    } else {
      body.classList.remove('at-top');
    }
  }
}
