import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollToElementById(id: string) {
    const el = this.getElementById(id);

    this.scrollToElement(el);
  }

  private getElementById(id: string): HTMLElement {
    const el = document.getElementById(id);

    if (!el) {
      throw new Error('section ${id} was not found!');
    }
    return el!;
  }

  scrollToElement(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
