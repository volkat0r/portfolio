import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ScrollService } from '../../shared/services/scroll.service';

/**
 * Side navigation component.
 *
 * Renders a vertical list of dot-shaped indicators, one per section.
 * The dot corresponding to the section currently in the viewport
 * receives an `active` state. Clicking a dot smoothly scrolls the
 * page to that section via {@link ScrollService}.
 *
 * The active section is updated on every `scroll` event.
 * Note: the scroll listener is registered as an anonymous function
 * in `ngOnInit`, which means `removeEventListener` in `ngOnDestroy`
 * will not remove it. Consider storing the handler reference for
 * proper cleanup.
 */
@Component({
  selector: 'app-side-navigation',
  imports: [],
  templateUrl: './side-navigation.html',
  styleUrl: './side-navigation.scss',
})
export class SideNavigation implements OnInit, OnDestroy {
  /** Signal holding the id of the currently active section. */
  currentSection = signal<string>('home');

  /** Ordered section ids used to build the dot indicators. */
  private sectionIds = ['home', 'about', 'tech', 'work', 'testimonials', 'contact'];

  constructor(private scrollService: ScrollService) {}

  /** Registers the scroll listener and sets the initial active section. */
  ngOnInit() {
    window.addEventListener('scroll', () => this.updateCurrentSection());
    this.updateCurrentSection();
  }

  /** Removes the scroll event listener on component destruction. */
  ngOnDestroy() {
    window.removeEventListener('scroll', () => this.updateCurrentSection());
  }

  /**
   * Determines which section is currently most visible and updates
   * `currentSection` accordingly.
   */
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

  /** Returns the height of the sticky `<header>` element, or 0 if absent. */
  private getHeaderOffset() {
    const header = document.querySelector('header');
    return header instanceof HTMLElement ? header.offsetHeight : 0;
  }

  /**
   * Scrolls to the section with the given element id.
   * @param id - The id attribute of the target section element.
   */
  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }
}
