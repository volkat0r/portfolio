import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactLinks } from './contact-links/contact-links';
import { LanguageToggle } from './language-toggle/language-toggle';
import { MainNav } from './main-nav/main-nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactLinks, LanguageToggle, MainNav, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements AfterViewInit, OnDestroy {
  private onWindowScroll = () => {
    this.updateTopState();
    this.scheduleActiveSectionSync();
  };
  private vvHandler: (() => void) | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  private frameId: number | null = null;
  private sections: HTMLElement[] = [];
  private sectionRatios = new Map<string, number>();
  private activeSectionId = '';
  private activeTheme = '';

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    this.updateTopState();
    this.initVisualViewport();

    this.sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          this.sectionRatios.set(target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        this.scheduleActiveSectionSync();
      },
      { threshold: this.buildThresholds() },
    );

    this.sections.forEach((section) => this.sectionObserver?.observe(section));
    this.syncActiveSection();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
    this.sectionObserver?.disconnect();
    if (this.frameId !== null) {
      window.cancelAnimationFrame(this.frameId);
    }
    if (this.vvHandler && window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.vvHandler);
      window.visualViewport.removeEventListener('scroll', this.vvHandler);
    }
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

  private initVisualViewport() {
    if (!window.visualViewport) return;
    const update = () => {
      const offsetTop = window.visualViewport!.offsetTop;
      document.documentElement.style.setProperty('--pf-vv-top', `${offsetTop}px`);
    };
    this.vvHandler = update;
    window.visualViewport.addEventListener('resize', update, { passive: true });
    window.visualViewport.addEventListener('scroll', update, { passive: true });
    update();
  }

  private scheduleActiveSectionSync() {
    if (this.frameId !== null) {
      return;
    }

    this.frameId = window.requestAnimationFrame(() => {
      this.frameId = null;
      this.syncActiveSection();
    });
  }

  private syncActiveSection() {
    const activeSection = this.getMostRelevantSection();

    if (!activeSection) {
      return;
    }

    if (activeSection.id !== this.activeSectionId) {
      this.activeSectionId = activeSection.id;
      this.updateSectionClass(activeSection.id);
    }

    const theme = activeSection.dataset['theme'];

    if (theme && theme !== this.activeTheme) {
      this.activeTheme = theme;
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${theme}`);
    }
  }

  private getMostRelevantSection() {
    const headerOffset = this.getHeaderOffset();
    const visibleSections = this.sections.filter((section) => {
      const rect = section.getBoundingClientRect();
      return rect.bottom > headerOffset && rect.top < window.innerHeight;
    });

    if (!visibleSections.length) {
      return this.sections.at(-1) ?? null;
    }

    return visibleSections.reduce((bestSection, section) => {
      const bestScore = this.getSectionScore(bestSection, headerOffset);
      const currentScore = this.getSectionScore(section, headerOffset);

      return currentScore > bestScore ? section : bestSection;
    });
  }

  private getSectionScore(section: HTMLElement, headerOffset: number) {
    const rect = section.getBoundingClientRect();
    const ratio = this.sectionRatios.get(section.id) ?? 0;
    const distanceToHeader = Math.abs(rect.top - headerOffset);

    return ratio * 1000 - distanceToHeader;
  }

  private getHeaderOffset() {
    const header = document.querySelector('header');

    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }

  private buildThresholds() {
    return Array.from({ length: 21 }, (_, index) => index / 20);
  }
}
