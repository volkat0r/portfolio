import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { SideNavigation } from './navigation/side-navigation';

/**
 * Root layout component.
 *
 * Wraps every routed page with the shared header, footer, and
 * side-navigation. Also intercepts arrow-key presses at the window
 * level to enable keyboard-driven scroll navigation between sections,
 * while leaving arrow keys available inside form inputs.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, SideNavigation],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  /**
   * Handles ArrowDown / ArrowUp key presses for full-viewport scroll.
   * Ignored when the focused element is an `<input>` or `<textarea>`.
   *
   * @param event - The native keyboard event forwarded by the Angular host listener.
   */
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }
      event.preventDefault();

      const scrollAmount = event.key === 'ArrowDown' ? window.innerHeight : -window.innerHeight;

      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  }
}
