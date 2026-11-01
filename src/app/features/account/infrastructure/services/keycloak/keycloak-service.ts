import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment-local";
import Keycloak, { KeycloakError } from "keycloak-js";
import { AccountError, AccountErrorCode } from "../../../domain/errors/account-error";
import { catchError, defer, from, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class KeycloakService {

    private readonly keycloak = new Keycloak({
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
    });

    async initialize(): Promise<boolean> {
        try {
            return await this.keycloak.init({
                onLoad: 'check-sso',
                checkLoginIframe: false,
            });
        } catch (error) {
            throw this.mapError(error, 'KEYCLOAK_UNREACHABLE');
        }
    }
    
    callRegister(): Observable<void> {
        return defer(() => {
            if (!this.keycloak.didInitialize) {
                return throwError(() => new AccountError('KEYCLOAK_NOT_INITIALIZED'));
            }
            
            return from(this.keycloak.register());
        }).pipe(
            catchError((error: unknown) => {
                console.error('Error during registration:', error);
                return throwError(() => this.mapError(error, 'REGISTRATION_FAILED'));
            }),
        );
    }

    private mapError(error: unknown, fallbackCode: AccountErrorCode): AccountError {
        if (error instanceof AccountError) {
            return error;
        }

        const keycloakError = error as Partial<KeycloakError> | null;
        if (keycloakError?.error) {
            return new AccountError('AUTH_CALLBACK_ERROR', error, keycloakError.error_description);
        }

        return new AccountError(fallbackCode, error);
    }
}