import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-nav.html',
  styleUrl: './main-nav.scss',
})
export class MainNav {
  isNavOpen: boolean = false;
  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
  closeNav(): void {
    this.isNavOpen = false;
  }
}
