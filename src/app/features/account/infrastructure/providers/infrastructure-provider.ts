import { inject, Provider } from '@angular/core';
import { ACCOUNT_REPOSITORY } from '../../domain/repositories/account-repository';
import { AccountKeycloakRepository } from '../repositories/account-keycloak-repository';

export const infrastructureProviders: Provider[] = [
    {
        provide: ACCOUNT_REPOSITORY,
        useClass: AccountKeycloakRepository,
    },
];

// export function keycloakInicialize(): Promise<void> {
//     const accountKeycloakRepository = inject(AccountKeycloakRepository);

//     return accountKeycloakRepository.initialize().then(
//         (authenticated) => {
//             if (!authenticated) {
//                 console.info('[Keycloak] No active session');
//             }

//             console.info('[Keycloak] Initialization completed successfully');
//         },
//         (error: unknown) => {
//             console.error('[Keycloak] Initialization failed', error);
//         },
//     );
// }
