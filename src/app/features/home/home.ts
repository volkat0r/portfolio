import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { About } from '../about/about';
import { Tech } from '../tech/tech';
import { Work } from '../work/work';
import { Testimonial } from '../testimonial/testimonial';
import { Contact } from '../contact/contact';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../shared/services/scroll.service';

/**
 * Home page component.
 *
 * Acts as the single-page shell that renders all portfolio sections
 * (About, Tech, Work, Testimonial, Contact) sequentially.
 *
 * On desktop viewports it intercepts mouse-wheel and keyboard
 * arrow-key events to trigger smooth section-by-section navigation
 * via {@link ScrollService}. A debounce flag (`isNavigating`) prevents
 * rapid successive scrolls. Event listeners are registered in
 * `ngAfterViewInit` and cleaned up in `ngOnDestroy` to avoid memory leaks.
 */
@Component({
  selector: 'app-home',
  imports: [ButtonComponent, About, Tech, Work, Testimonial, Contact, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  /** Prevents overlapping section navigations during the scroll animation. */
  private isNavigating = false;

  /** Stable reference to the wheel event handler for correct removeEventListener pairing. */
  private readonly wheelHandler = (event: WheelEvent) => this.handleWheel(event);

  /** Stable reference to the keydown event handler for correct removeEventListener pairing. */
  private readonly keyHandler = (event: KeyboardEvent) => this.handleKeydown(event);

  constructor(private scrollService: ScrollService) {}

  /** Registers wheel and keyboard listeners after the view is initialised. */
  ngAfterViewInit() {
    window.addEventListener('wheel', this.wheelHandler, { passive: false });
    window.addEventListener('keydown', this.keyHandler);
  }

  /** Removes all window event listeners to prevent memory leaks on component destruction. */
  ngOnDestroy() {
    window.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('keydown', this.keyHandler);
  }

  /**
   * Scrolls the page to the section with the given element id.
   * @param id - The id attribute of the target section element.
   */
  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  /**
   * Handles mouse-wheel events for section navigation.
   * Ignores small deltas and events originating from interactive elements.
   * Calls `preventDefault` only when a section scroll was actually performed.
   */
  private handleWheel(event: WheelEvent) {
    if (!this.canUseSectionNavigation(event.target) || Math.abs(event.deltaY) < 12) {
      return;
    }

    const direction = event.deltaY > 0 ? 'next' : 'previous';
    const didScroll = this.navigate(direction);

    if (didScroll) {
      event.preventDefault();
    }
  }

  /**
   * Handles ArrowDown / ArrowUp key events for section navigation.
   * Ignores events originating from interactive elements.
   */
  private handleKeydown(event: KeyboardEvent) {
    if (!this.canUseSectionNavigation(event.target)) {
      return;
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return;
    }

    const direction = event.key === 'ArrowDown' ? 'next' : 'previous';
    const didScroll = this.navigate(direction);

    if (didScroll) {
      event.preventDefault();
    }
  }

  /**
   * Performs the section navigation if not already in progress and on a desktop viewport.
   * Sets `isNavigating` for 700 ms after a successful scroll to prevent rapid re-triggering.
   *
   * @param direction - `'next'` to scroll down, `'previous'` to scroll up.
   * @returns `true` if a scroll was initiated, `false` otherwise.
   */
  private navigate(direction: 'next' | 'previous') {
    if (this.isNavigating || !this.isDesktopViewport()) {
      return false;
    }

    const didScroll = this.scrollService.scrollToAdjacentSection(direction);

    if (!didScroll) {
      return false;
    }

    this.isNavigating = true;
    window.setTimeout(() => (this.isNavigating = false), 700);
    return true;
  }

  /**
   * Returns `false` if the event target is an interactive element
   * (input, textarea, select, button, anchor) where native scroll
   * behaviour should not be overridden.
   *
   * @param target - The DOM element that triggered the event.
   */
  private canUseSectionNavigation(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
      return true;
    }

    return !target.closest('input, textarea, select, button, a');
  }

  /** Returns `true` when the viewport width is wide enough for desktop layout. */
  private isDesktopViewport() {
    return window.matchMedia('(min-width: 56.25rem)').matches;
  }
}
