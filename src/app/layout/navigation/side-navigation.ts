import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-side-navigation',
  imports: [],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.scss',
})
export class SideNavigation implements OnInit, OnDestroy {
  currentSection = signal<string>('home');
  private sectionIds = ['home', 'about', 'tech', 'work', 'testimonials', 'contact'];

  constructor(private scrollService: ScrollService) {}

  ngOnInit() {
    window.addEventListener('scroll', () => this.updateCurrentSection());
    this.updateCurrentSection();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.updateCurrentSection());
  }

  private updateCurrentSection() {
    const sections = this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section);

    if (!sections.length) return;

    const threshold = this.getHeaderOffset() + 24;
    const currentTop = window.scrollY + threshold;

    const activeIndex = sections.reduce((activeIndex, section, index) => {
      return section.offsetTop <= currentTop ? index : activeIndex;
    }, 0);

    this.currentSection.set(this.sectionIds[activeIndex]);
  }

  private getHeaderOffset() {
    const header = document.querySelector('header');
    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
