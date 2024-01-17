
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EnvConfigurationService } from './core/config/env-configuration.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

export function initializeApp(envConfigService: EnvConfigurationService) {
  return () => envConfigService.load();
}


export const appConfig: ApplicationConfig = {


  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [EnvConfigurationService],
      multi: true,
    },
  ],

};
