import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { About } from '../about/about';
import { Tech } from '../tech/tech';
import { Work } from '../work/work';
import { Testimonial } from '../testimonial/testimonial';
import { Contact } from '../contact/contact';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollService } from '../../shared/services/scroll.service';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent, About, Tech, Work, Testimonial, Contact, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  private isNavigating = false;
  private readonly wheelHandler = (event: WheelEvent) => this.handleWheel(event);
  private readonly keyHandler = (event: KeyboardEvent) => this.handleKeydown(event);

  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit() {
    window.addEventListener('wheel', this.wheelHandler, { passive: false });
    window.addEventListener('keydown', this.keyHandler);
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('keydown', this.keyHandler);
  }

  scrollToSection(id: string) {
    this.scrollService.scrollToElementById(id);
  }

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

  private canUseSectionNavigation(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
      return true;
    }

    return !target.closest('input, textarea, select, button, a');
  }

  private isDesktopViewport() {
    return window.matchMedia('(min-width: 56.25rem)').matches;
  }
}
