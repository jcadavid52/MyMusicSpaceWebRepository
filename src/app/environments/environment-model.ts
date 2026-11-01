export interface KeycloakConfigure {
    url: string;
    realm: string;
    clientId: string;
}

export interface EnvironmentModel {
    keycloak: KeycloakConfigure;
    name: string;
    apiUrl: string;
}
