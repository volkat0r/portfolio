import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from '../../../shared/services/scroll.service';

/**
 * Main navigation component.
 *
 * Renders the primary navigation menu with smooth-scroll links to
 * all portfolio sections. On mobile the menu is toggled via a
 * hamburger button. Navigation is suppressed on the legal page
 * since that page does not contain the one-page sections.
 */
@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [],
  templateUrl: './main-nav.html',
  styleUrl: './main-nav.scss',
})
export class MainNav {
  /** Controls the open/closed state of the mobile navigation drawer. */
  isNavOpen: boolean = false;

  constructor(
    private scrollService: ScrollService,
    private router: Router,
  ) {}

  /** Returns `true` when the current route is a legal page (imprint or privacy). */
  isLegalPage(): boolean {
    return (
      this.router.url.startsWith('/legal') ||
      this.router.url.startsWith('/imprint') ||
      this.router.url.startsWith('/privacy')
    );
  }

  /**
   * Scrolls to the section with the given element id.
   * @param id - The id attribute of the target section element.
   */
  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  /** Toggles the mobile navigation drawer open or closed. */
  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  /** Closes the mobile navigation drawer. */
  closeNav(): void {
    this.isNavOpen = false;
  }
}
