import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { SideNavigation } from './navigation/side-navigation';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, SideNavigation],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
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
