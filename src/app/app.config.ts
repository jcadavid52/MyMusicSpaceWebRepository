import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { spotifyAuthInterceptor } from './core/interceptors/spotify-auth-interceptor';
import { infrastructureProviders } from './features/account/infrastructure/providers/infrastructure-provider';
import { KeycloakService } from './features/account/infrastructure/services/keycloak/keycloak-service';
import { songInfrastructureProviders } from './features/song/infrastructure/providers/song-infrastructure-provider';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([spotifyAuthInterceptor])),
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
    ...infrastructureProviders,
    ...songInfrastructureProviders
  ]
};
