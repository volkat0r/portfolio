import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle {
  private translate = inject(TranslateService);

  @ViewChild('deBtn', { static: true }) buttonDe!: ElementRef<HTMLLIElement>;
  @ViewChild('enBtn', { static: true }) buttonEn!: ElementRef<HTMLLIElement>;

  useLanguage(language: string): void {
    this.translate.use(language);
    this.activeLanguage(language);
  }

  activeLanguage(useLanguage: string): void {
    if (useLanguage == 'de') {
      this.buttonDe.nativeElement.classList.add('active');
      this.buttonEn.nativeElement.classList.remove('active');
    }
    if (useLanguage == 'en') {
      this.buttonEn.nativeElement.classList.add('active');
      this.buttonDe.nativeElement.classList.remove('active');
    }
  }
}
