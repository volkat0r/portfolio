import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

const languageStorageKey = 'preferred-language';

function getInitialLanguage() {
  const storedLanguage = window.localStorage.getItem(languageStorageKey);

  return storedLanguage === 'en' ? 'en' : 'de';
}

/**
 * Root application configuration.
 *
 * Registers the following providers:
 * - `provideRouter` – Angular router with the application route table.
 * - `provideHttpClient` – Angular HTTP client used by the contact form.
 * - `provideTranslateService` – ngx-translate with German as the default
 *   and fallback language; translations are loaded from
 *   `/assets/i18n/<lang>.json`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'disabled',
      }),
    ),
    provideHttpClient(),
    provideTranslateService({
      lang: getInitialLanguage(),
      fallbackLang: 'de',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
        enforceLoading: true,
      }),
    }),
  ],
};
