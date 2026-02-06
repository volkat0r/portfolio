import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [],
  templateUrl: './main-nav.html',
  styleUrl: './main-nav.scss',
})
export class MainNav {
  isNavOpen: boolean = false;

  constructor(private scrollService: ScrollService) {}

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }
  closeNav(): void {
    this.isNavOpen = false;
  }
}
