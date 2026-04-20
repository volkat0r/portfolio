import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly sectionIds = ['home', 'about', 'tech', 'work', 'testimonials', 'contact'];

  scrollToElementById(id: string) {
    const el = this.getElementById(id);

    this.scrollToElement(el);
  }

  scrollToAdjacentSection(direction: 'next' | 'previous') {
    const sections = this.getSections();

    if (!sections.length) {
      return false;
    }

    const currentIndex = this.getCurrentSectionIndex(sections);
    const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    const target = sections[targetIndex];

    if (!target) {
      return false;
    }

    this.scrollToElement(target);
    return true;
  }

  private getElementById(id: string): HTMLElement {
    const el = document.getElementById(id);

    if (!el) {
      throw new Error('section ${id} was not found!');
    }
    return el!;
  }

  scrollToElement(el: HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY - this.getScrollOffset(el);

    window.scrollTo({ top, behavior: 'smooth' });
  }

  private getSections() {
    return this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section);
  }

  private getCurrentSectionIndex(sections: HTMLElement[]) {
    const threshold = this.getHeaderOffset() + 24;
    const currentTop = window.scrollY + threshold;

    return sections.reduce((activeIndex, section, index) => {
      return section.offsetTop <= currentTop ? index : activeIndex;
    }, 0);
  }

  private getHeaderOffset() {
    const header = document.querySelector('header');

    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }

  private getScrollOffset(el: HTMLElement) {
    const headerOffset = this.getHeaderOffset();
    const elementPaddingTop = Number.parseFloat(window.getComputedStyle(el).paddingTop) || 0;

    return Math.max(0, headerOffset - elementPaddingTop);
  }
}
