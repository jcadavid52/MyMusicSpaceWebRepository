import { inject, Provider } from "@angular/core";
import { AccountKeycloakRepository } from "../repositories/account-keykloak-repository";
import { ACCOUNT_REPOSITORY } from "../../domain/repositories/account-repository";

export const infrastructureProviders: Provider[] = [
    {
        provide: ACCOUNT_REPOSITORY,
        useClass: AccountKeycloakRepository
    }
]

export function keycloakInicialize(): Promise<void | boolean> {
    const accountKeycloakRepository = inject(AccountKeycloakRepository);

    return accountKeycloakRepository
        .initialize()
        .then((authenticated: boolean) => {
            if (authenticated) {
                console.log('Keycloak initialized successfully');
                return true;
            } else {
                console.warn('Keycloak initialization failed');
                return false;
            }
        })

}