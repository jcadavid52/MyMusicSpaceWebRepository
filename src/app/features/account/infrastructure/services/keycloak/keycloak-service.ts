import { Injectable } from "@angular/core";
import { environment } from "../../../../../environments/environment-local";
import Keycloak, { KeycloakError, KeycloakTokenParsed } from "keycloak-js";
import { AccountError, AccountErrorCode } from "../../../domain/errors/account-error";
import { catchError, defer, from, Observable, throwError } from "rxjs";
import { SessionModel } from "../../../domain/model/account-model";


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

    callLogin(): Observable<void> {
        return defer(() => {
            if (!this.keycloak.didInitialize) {
                return throwError(() => new AccountError('KEYCLOAK_NOT_INITIALIZED'));
            }

            return from(this.keycloak.login());
        }).pipe(
            catchError((error: unknown) => {
                console.error('Error during login:', error);
                return throwError(() => this.mapError(error, 'LOGIN_FAILED'));
            }),
        );
    }

    getSession(): SessionModel | null {
        if (!this.keycloak.authenticated || !this.keycloak.token) {
            return null;
        }

        const idData = this.keycloak.idTokenParsed;
        const tokenData = this.keycloak.tokenParsed;
        const refreshData = this.keycloak.refreshTokenParsed;

        return {
            user: {
                id: String(idData?.['sub'] ?? tokenData?.sub ?? ''),
                name: String(idData?.['name'] ?? idData?.['name'] ?? ''),
                username: String(idData?.['preferred_username'] ?? tokenData?.['preferred_username'] ?? ''),
                //phone: String(idData?.['telefono'] ?? tokenData?.['telefono'] ?? ''),
                email: String(idData?.['email'] ?? tokenData?.['email'] ?? ''),
                //role: this.obtenerRol(tokenData)
            },
            accessToken: this.keycloak.token,
            refreshToken: this.keycloak.refreshToken ?? '',
            expirationAccessToken: new Date(Number(tokenData?.exp ?? 0) * 1000),
            expirationRefreshToken: new Date(Number(refreshData?.exp ?? 0) * 1000)
        };
    }

    private obtenerRol(tokenData: KeycloakTokenParsed | undefined): string {
        const realmRoles = tokenData?.realm_access?.roles;
        if (realmRoles && realmRoles.length > 0) {
            return realmRoles[0];
        }
        const clientRoles = tokenData?.resource_access?.[environment.keycloak.clientId]?.roles;
        if (clientRoles && clientRoles.length > 0) {
            return clientRoles[0];
        }
        return 'User';
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