import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { infrastructureProviders } from './features/account/infrastructure/providers/infrastructure-provider';
import { AccountKeycloakRepository } from './features/account/infrastructure/repositories/account-keycloak-repository';
import { KeycloakService } from './features/account/infrastructure/services/keycloak/keycloak-service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAppInitializer(() => {
      const keycloakService = inject(KeycloakService);
      
      return keycloakService.initialize().then(
        (authenticated) => {
          if (!authenticated) {
            console.info('[Keycloak] No active session');
          }
          console.info('[Keycloak] Initialization completed successfully');
        },
        (error: unknown) => {
          console.error('[Keycloak] Initialization failed', error);
        }
      );
    }),
    ...infrastructureProviders
  ]
};
