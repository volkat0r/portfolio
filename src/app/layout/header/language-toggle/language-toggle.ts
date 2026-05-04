import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Language toggle component.
 *
 * Provides DE / EN buttons that switch the active ngx-translate
 * language. The currently selected language button receives the
 * CSS class `active` for visual feedback.
 */
@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.html',
  styleUrl: './language-toggle.scss',
})
export class LanguageToggle implements OnInit {
  private translate = inject(TranslateService);

  /** Reference to the German language button element. */
  @ViewChild('deBtn', { static: true }) buttonDe!: ElementRef<HTMLLIElement>;

  /** Reference to the English language button element. */
  @ViewChild('enBtn', { static: true }) buttonEn!: ElementRef<HTMLLIElement>;

  ngOnInit(): void {
    const current = this.translate.currentLang ?? this.translate.defaultLang;
    this.activeLanguage(current);
  }

  /**
   * Activates the given language in ngx-translate and updates the
   * active state on the toggle buttons.
   *
   * @param language - ISO 639-1 language code, e.g. `'de'` or `'en'`.
   */
  useLanguage(language: string): void {
    this.translate.use(language);
    this.activeLanguage(language);
  }

  /**
   * Adds the `active` CSS class to the selected language button
   * and removes it from the other.
   *
   * @param useLanguage - ISO 639-1 language code of the active language.
   */
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
