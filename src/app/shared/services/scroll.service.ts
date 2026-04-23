import { Injectable } from '@angular/core';

/**
 * Scroll navigation service.
 *
 * Provides smooth-scroll helpers for both direct element targeting
 * and sequential section-by-section navigation. The service is
 * aware of the fixed header height so that scrolled-to sections
 * are not obscured by the header bar.
 */
@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  /** Ordered list of section ids used for sequential navigation. */
  private readonly sectionIds = ['home', 'about', 'tech', 'work', 'testimonials', 'contact'];

  /**
   * Scrolls to the section with the given element id.
   * @param id - The `id` attribute of the target `<section>` element.
   * @throws {Error} If no element with the given id is found in the DOM.
   */
  scrollToElementById(id: string) {
    const el = this.getElementById(id);

    this.scrollToElement(el);
  }

  /**
   * Scrolls to the section immediately before or after the currently
   * visible one.
   *
   * @param direction - `'next'` to move down, `'previous'` to move up.
   * @returns `true` if a target section was found and scrolled to,
   *          `false` when already at the first or last section.
   */
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

  /**
   * Returns the `HTMLElement` for a given id.
   * @throws {Error} If the element is not present in the DOM.
   */
  private getElementById(id: string): HTMLElement {
    const el = document.getElementById(id);

    if (!el) {
      throw new Error('section ${id} was not found!');
    }
    return el!;
  }

  /**
   * Performs a smooth scroll to the given element,
   * offsetting for the sticky header and the element's own top padding.
   *
   * @param el - The target HTML element to scroll into view.
   */
  scrollToElement(el: HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY - this.getScrollOffset(el);

    window.scrollTo({ top, behavior: 'smooth' });
  }

  /** Returns the list of known sections that are currently present in the DOM. */
  private getSections() {
    return this.sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => !!section);
  }

  /**
   * Determines which section index corresponds to the current scroll position.
   * Uses a threshold based on the header height so the active section
   * changes as soon as its top edge clears the header.
   */
  private getCurrentSectionIndex(sections: HTMLElement[]) {
    const threshold = this.getHeaderOffset() + 24;
    const currentTop = window.scrollY + threshold;

    return sections.reduce((activeIndex, section, index) => {
      return section.offsetTop <= currentTop ? index : activeIndex;
    }, 0);
  }

  /** Returns the current height of the sticky `<header>` element, or 0 if absent. */
  private getHeaderOffset() {
    const header = document.querySelector('header');

    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }

  /**
   * Calculates the combined offset (header + element padding-top) to apply
   * when scrolling so the section content is not hidden behind the header.
   */
  private getScrollOffset(el: HTMLElement) {
    const headerOffset = this.getHeaderOffset();
    const elementPaddingTop = Number.parseFloat(window.getComputedStyle(el).paddingTop) || 0;

    return Math.max(0, headerOffset - elementPaddingTop);
  }
}
