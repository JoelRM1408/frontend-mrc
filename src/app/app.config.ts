import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export function registerIcons(registry: MatIconRegistry, sanitizer: DomSanitizer) {
  return () => {
    registry.addSvgIcon('matricula', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/docint.svg'));
    registry.addSvgIcon('proyecto', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/proyecto.svg'));
    registry.addSvgIcon('informe', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/informe.svg'));
    registry.addSvgIcon('actividad', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/actividad.svg'));
    registry.addSvgIcon('regresardashboard', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/regresardashboard.svg'));
  };
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    MatIconRegistry,
    {
      provide: APP_INITIALIZER,
      useFactory: registerIcons,
      deps: [MatIconRegistry, DomSanitizer],
      multi: true
    }
  ]
};
