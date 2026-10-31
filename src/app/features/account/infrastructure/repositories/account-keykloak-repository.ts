import { Injectable } from "@angular/core";
import Keycloak from 'keycloak-js';
import type { KeycloakTokenParsed } from 'keycloak-js';
import { environment } from "../../../../environments/environment-local";

@Injectable({ providedIn: 'root' })
export class AccountKeycloakRepository {
    private readonly keycloak = new Keycloak({
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
    });

    async initialize(): Promise<boolean> {
        try {
            const authenticated = await this.keycloak.init({
                onLoad: 'check-sso',
                checkLoginIframe: false
            });
            return authenticated;
        } catch (error) {
            console.error('Error initializing Keycloak:', error);
            return false;
        }
    }

    async register(): Promise<void> {
        try {
            await this.keycloak.register();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }
}