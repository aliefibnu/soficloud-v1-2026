import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from '../routes/app.routes';
import { LanguageService } from '../lib/language.service';
import { provideCustomImageLoader } from '../lib/image-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideCustomImageLoader(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideTranslateService({
      fallbackLang: 'id',
      lang: 'id',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideAppInitializer(() => {
      const languageService = inject(LanguageService);
      return languageService.init();
    }),
    provideAppInitializer(() => {
      const viewportScroller = inject(ViewportScroller);
      viewportScroller.setOffset(() => {
        if (typeof document === 'undefined') return [0, 0];
        const header = document.querySelector('app-navbar header');
        const height = header ? header.getBoundingClientRect().height : 88;
        return [0, height];
      });
    }),
  ],
};
